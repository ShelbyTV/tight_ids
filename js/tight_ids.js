String.prototype.toTightObjectId = function() {
	var len = this.length;
	var high = this.slice(0,len/2);
	var low = this.slice(len/2,len);
	var high64 = RadixURL.fromNumber(parseInt(high, 16));
	var low64 = RadixURL.fromNumber(parseInt(low, 16));
	
	return high64+low64;
};

String.prototype.toLooseObjectId = function() {
	var len = this.length;
	var high64 = this.slice(0,len/2);
	var low64 = this.slice(len/2,len);
	var high = RadixURL.toNumber(high64);
	var low = RadixURL.toNumber(low64);
	
	return high.toString(16)+low.toString(16);
};

String.prototype.rpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

RadixURL = {

    _Rixits :
//   0       8       16      24      32      40      48      56      64      72     79
//   v       v       v       v       v       v       v       v       v       v      v
//	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+.-_~:[]@!$'()*;,=\",
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+.-_~:[]@!$'()*;,=\"☀☁☂☃☄★☆☇☈☉☊☋☌☍☎☏☔☕☘☙☚☛☜☝☞☟♠♡♢♣♤♥♦♧♨♩♪♫♬♭♮♯♰♱♲♳♴♵♶♷♸♹♺♻♼♽♾♿⽀⽁⽂⽃⽄⽅⽆⽇⽈⽉⽊⽋⽌⽍⽎⽏⽐⽑⽒⽓⽔⽕⽖⽗⽘⽙⽚⽛⽜⽝⽞⽟",

    // This cannot handle negative numbers and only works on the 
    //     integer part, discarding the fractional part.
    fromNumber : function(number) {
        if (isNaN(Number(number)) || number === null ||
            number === Number.POSITIVE_INFINITY)
            throw "The input is not valid";
        if (number < 0)
            throw "Can't represent negative numbers now";

				var r = this._Rixits.length;
						
        var rixit; // like 'digit', only in some non-decimal radix 
        var residual = Math.floor(number);
        var result = '';
        while (true) {
            rixit = residual % r
            //console.log("rixit : " + rixit);
            //console.log("result before : " + result);
            result = this._Rixits[rixit] + result;
            //console.log("result after : " + result);
            //console.log("residual before : " + residual);
            residual = Math.floor(residual / r);
            //console.log("residual after : " + residual);

            if (residual == 0)
                break;
            }
        return result;
    },

    toNumber : function(rixits) {
				var r = this._Rixits.length;
				
        var result = 0;
        // console.log("rixits : " + rixits);
        // console.log("rixits.split('') : " + rixits.split(''));
        rixits = rixits.split('');
        for (e in rixits) {
            // console.log("_Rixits.indexOf(" + rixits[e] + ") : " + 
                // this._Rixits.indexOf(rixits[e]));
            // console.log("result before : " + result);
            result = (result * r) + this._Rixits.indexOf(rixits[e]);
            // console.log("result after : " + result);
        }
        return result;
    }
}