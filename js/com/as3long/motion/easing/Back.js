define(function () {
	var Back={};
	Back.s=1.70158;
	Back.easeIn=function(ratio, unused1, unused2, unused3){
		return ratio*ratio*((Back.s+1)*ratio-Back.s);
	}
	Back.easeOut=function(ratio, unused1, unused2, unused3){
		return (ratio -= 1)*ratio*((Back.s+1)*ratio+Back.s)+1
	}
		
	Back.easeInOut=function(ratio, unused1, unused2, unused3){
		return ((ratio *= 2) < 1) ? 0.5*(ratio*ratio*((Back.s*1.525+1)*ratio-Back.s*1.525)) : 0.5*((ratio -= 2)*ratio*((Back.s*1.525+1)*ratio+Back.s*1.525)+2);
	}
	return Back;
});