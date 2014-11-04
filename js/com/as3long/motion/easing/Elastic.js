define(function(){
	var Elastic={};
	Elastic.a=1;
	Elastic.p=0.3;
	Elastic.s=Elastic.p/4;
		
	Elastic.easeIn=function(ratio, unused1, unused2, unused3){
		if (ratio == 0 || ratio == 1) { return ratio; }
		return -(a * Math.pow(2, 10 * (ratio -= 1)) * Math.sin((ratio - Elastic.s) * (2 * Math.PI) / Elastic.p));
	}
		
	Elastic.easeOut=function(ratio, unused1, unused2, unused3){
		if (ratio == 0 || ratio == 1) { return ratio; }
		return a * Math.pow(2, -10 * ratio) *  Math.sin((ratio - Elastic.s) * (2 * Math.PI) / Elastic.p) + 1;
	}
		
	Elastic.easeInOut=function(ratio, unused1, unused2, unused3){
		if (ratio == 0 || ratio == 1) { return ratio; }
		ratio = ratio*2-1;
		if (ratio < 0) {
			return -0.5 * (Elastic.a * Math.pow(2, 10 * ratio) * Math.sin((ratio - Elastic.s*1.5) * (2 * Math.PI) /(Elastic.p*1.5)));
		}
		return 0.5 * Elastic.a * Math.pow(2, -10 * ratio) * Math.sin((ratio - Elastic.s*1.5) * (2 * Math.PI) / (Elastic.p*1.5)) + 1;
	}
	return Elastic;
})
