require('fs').unlink('index.html',() => {
	let logger = require('fs').createWriteStream('obfuscated.html', {
	    flags: 'a',
	    encoding: 'utf8'
	});
	require('fs').readFile('src.js', {
	    encoding: 'utf8'
	}, function (err, data) {
		logger.write(`<html><body><script language="javascript" type="text/javascript">\n/*\n*No source for you! Samy.pl is the man!\n*//`);    
	    for(let i = 0; i < data.length; i++) {
	    	let bin = data.charCodeAt(i).toString(2);
	    	while(bin.length < 7) {
	    		bin = `0${bin}`;
	    	}
	        logger.write(bin.replaceAll("0"," ").replaceAll("1", "	"));
	    }
	    logger.write(`/.source.replace(/.{7}/g,function(w){document.write(String.fromCharCode(parseInt(w.replace(/ /g,'0').replace(/	/g,'1'),2)))});\n</script></body></html>`);
	});
});

String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};