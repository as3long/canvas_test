define(['Class'],function(Class) {
	var AEvent = Class.extend({
		type: '',
		className:"AEvent",
		target: null,
		init: function(type) {
			this.type = type;
		},
		data:null
	});
	AEvent.ENTER_FRAME="enterFrame";
	AEvent.EXIT_FRAME="exitFrame";
	/**
	 * 属性说明
	 * @property {string} 完成事件字符串
	 */
	AEvent.COMPLETE="complete";
	return AEvent;
});