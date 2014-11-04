define(function() {
	var Quartic = {};
	Quartic.easeIn = function(ratio, unused1, unused2, unused3) {
		return ratio * ratio * ratio * ratio;
	}

	Quartic.easeOut = function(ratio, unused1, unused2, unused3) {
		return 1 - (ratio -= 1) * ratio * ratio * ratio;
	}

	Quartic.easeInOut = function(ratio, unused1, unused2, unused3) {
		return (ratio < 0.5) ? 8 * ratio * ratio * ratio * ratio : -8 * (ratio -= 1) * ratio * ratio * ratio + 1;
	}
	return Quartic;
});