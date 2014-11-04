define(function () {
	var Circular={};
	Circular.easeIn=function(ratio, unused1, unused2, unused3){
		return -(Math.sqrt(1-ratio*ratio)-1);
	}
	Circular.easeOut=function(ratio, unused1, unused2, unused3){
		return Math.sqrt(1-(ratio-1)*(ratio-1));
	}
		
	Circular.easeInOut=function(ratio, unused1, unused2, unused3){
		return ((ratio *= 2) < 1) ? -0.5*(Math.sqrt(1-ratio*ratio)-1) : 0.5*(Math.sqrt(1-(ratio-=2)*ratio)+1);
	}
	return Circular;
});