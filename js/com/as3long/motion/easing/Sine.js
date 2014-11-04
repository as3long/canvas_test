define(function() {
	var Sine = {};

	Sine.easeIn = function(ratio, unused1, unused2, unused3) {
		return 1 - Math.cos(ratio * (Math.PI / 2));
	}

	Sine.easeOut = function(ratio, unused1, unused2, unused3) {
		return Math.sin(ratio * (Math.PI / 2));
	}

	Sine.easeInOut = function(ratio, unused1, unused2, unused3) {
		return -0.5 * (Math.cos(ratio * Math.PI) - 1);
	}
	
	return Sine;
})