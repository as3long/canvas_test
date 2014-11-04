define(function() {
	var Exponential = {};
	Exponential.easeIn = function(ratio, unused1, unused2, unused3) {
		return (ratio == 0) ? 0 : Math.pow(2, 10 * (ratio - 1));
	}

	Exponential.easeOut = function(ratio, unused1, unused2, unused3) {
		return (ratio == 1) ? 1 : 1 - Math.pow(2, -10 * ratio);
	}

	Exponential.easeInOut = function(ratio, unused1, unused2, unused3) {
		if (ratio == 0 || ratio == 1) {
			return ratio;
		}
		if (0 > (ratio = ratio * 2 - 1)) {
			return 0.5 * Math.pow(2, 10 * ratio);
		}
		return 1 - 0.5 * Math.pow(2, -10 * ratio);
	}
	return Exponential;
})