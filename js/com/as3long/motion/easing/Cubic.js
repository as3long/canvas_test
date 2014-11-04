define(function(){
	var Cubic={};
	Cubic.easeIn=function(ratio, unused1, unused2, unused3){
		return ratio*ratio*ratio;
	}
	
	Cubic.easeOut=function(ratio, unused1, unused2, unused3){
		return (ratio-=1)*ratio*ratio+1;
	}
		
	Cubic.easeInOut=function(ratio, unused1, unused2, unused3){
		return (ratio < 0.5) ? 4*ratio*ratio*ratio : 4*(ratio-=1)*ratio*ratio+1;
	}
	return Cubic;
});
