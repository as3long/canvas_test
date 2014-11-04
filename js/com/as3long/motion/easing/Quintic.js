define(function() {
	var Quintic = {};

	Quintic.easeIn = function(ratio, unused1, unused2, unused3) {
		return ratio * ratio * ratio * ratio * ratio;
	}

	Quintic.easeOut = function(ratio, unused1, unused2, unused3) {
		return 1 + (ratio -= 1) * ratio * ratio * ratio * ratio;
	}

	Quintic.easeInOut = function(ratio, unused1, unused2, unused3) {
		return (ratio < 0.5) ? 16 * ratio * ratio * ratio * ratio * ratio : 16 * (ratio -= 1) * ratio * ratio * ratio * ratio + 1;
	}
	
	return Quintic;
});