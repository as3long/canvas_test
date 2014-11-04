define(function() {
	var Quadratic = {};
	Quadratic.easeIn = function(ratio, unused1, unused2, unused3) {
		return ratio * ratio;
	}

	Quadratic.easeOut = function(ratio, unused1, unused2, unused3) {
		return -ratio * (ratio - 2);
	}

	Quadratic.easeInOut = function(ratio, unused1, unused2, unused3) {
		return (ratio < 0.5) ? 2 * ratio * ratio : -2 * ratio * (ratio - 2) - 1;
	}
	return Quadratic;
});