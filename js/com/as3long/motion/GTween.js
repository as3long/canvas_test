define(["com/as3long/events/EventDispatcher","com/as3long/events/AEvent","com/as3long/utils/Utils","Class"],function (EventDispatcher, AEvent, Utils,Class) {
//  var EventDispatcher = require("com/as3long/events/EventDispatcher");
//  var AEvent = require("com/as3long/events/AEvent");
//  var Utils = require("com/as3long/utils/Utils");
//  var Class=require("Class");
    var isNaN = Utils.isNull;
    var isBoolean=Utils.isBoolean;
    var GTween = EventDispatcher.extend({
        _delay: 0,
        _values: null,
        _paused: true,
        _position: 0,
        _inited: false,
        _initValues: null,
        _rangeValues: null,
        _proxy: null,
        autoPlay: true,
        data: null,
        duration: null,
        ease: null,
        nextTween: null,
        pluginData: null,
        reflect: null,
        repeatCount: 1,
        target: null,
        useFrames: null,
        timeScale: 1,
        positionOld: null,
        ratio: null,
        ratioOld: null,
        calculatedPosition: null,
        calculatedPositionOld: null,
        suppressEvents: null,
        dispatchEvents: null,
        onComplete: null,
        onChange: null,
        onInit: null,
        init: function (target, duration, values, props, pluginData) {
        	this.callSuper();
            target = target || null;
            duration = duration || 1;
            var swap;
            this.ease = GTween.defaultEase;
            this.dispatchEvents = GTween.defaultDispatchEvents;
            this.target = target;
            this.duration = duration;
            this.pluginData = this.copy(pluginData, {});
            if (props) {
                swap = props.swapValues;
                delete(props.swapValues);
            }
            this.copy(props, this);
            this.resetValues(values);
            if (swap) {
                this.swapValues();
            }
            if (duration == 0 && this.delay == 0 && this.autoPlay) {
                this.setPosition(0);
            }
        },
        getPaused: function () {
            return this._paused;
        },
        setPaused: function (value) {
            if (value == this._paused) {
                return;
            }
            this._paused = value;
            if (this._paused) {
                delete(GTween.tickList[this._classObjectId]);
                if (this.target instanceof EventDispatcher) {
                    this.target.removeEventListener("_", this.invalidate);
                }
                delete(GTween.gcLockList[this._classObjectId]);
            } else {
                if (this._position == null || (this.repeatCount != 0 && this._position >= this.repeatCount * this.duration)) {
                    // reached the end, reset.
                    this._inited = false;
                    this.calculatedPosition = this.calculatedPositionOld = this.ratio = this.ratioOld = this.positionOld = 0;
                    this._position = -this.delay;
                }
                GTween.tickList[this._classObjectId] = this;
                // prevent garbage collection:
                if (this.target&&this.target.addEventListener){
                    this.target.addEventListener("_", this.invalidate, this);
                } else {
                    GTween.gcLockList[this._classObjectId] = this;
                }
            }
        },
        getPosition: function () {
            return this.position;
        },
        setPosition: function (value) {
            this.positionOld = this._position;
            this.ratioOld = this.ratio;
            this.calculatedPositionOld = this.alculatedPosition;

            var maxPosition = this.repeatCount * this.duration;

            var end = (value >= maxPosition && this.repeatCount > 0);
            var l,i;
            if (end) {
                if (this.calculatedPositionOld == maxPosition) {
                    return;
                }
                this._position = this.maxPosition;
                this.calculatedPosition = (this.reflect && !(this.repeatCount & 1)) ? 0 : this.duration;
            } else {
                this._position = value;
                this.calculatedPosition = this._position < 0 ? 0 : this._position % this.duration;
                if (this.reflect && (this._position / this.duration & 1)) {
                    this.calculatedPosition = this.duration - this.calculatedPosition;
                }
            }

            this.ratio = (this.duration == 0 && this._position >= 0) ? 1 : this.ease(this.calculatedPosition / this.duration, 0, 1, 1);
            if (this.target && (this._position >= 0 || this.positionOld >= 0) && this.calculatedPosition != this.calculatedPositionOld) {
                if (!this._inited) {
                    this.initTween();
                }
                for (var n in this._values) {
                    var initVal = this._initValues[n];
                    var rangeVal = this._rangeValues[n];
                    var val = initVal + rangeVal * this.ratio;

                    var pluginArr = GTween.plugins[n];
                    if (pluginArr) {
                        l = pluginArr.length;
                        for (i = 0; i < l; i++) {
                            val = pluginArr[i].tween(this, n, val, this.initVal, this.rangeVal, this.ratio, end);
                        }
                        if (!isNaN(val)) {
                            this.target[n] = val;
                        }
                    } else {
                        this.target[n] = val;
                    }
                }
            }

            if (this.hasStarPlugins) {
                this.pluginArr = GTween.plugins["*"];
                l = this.pluginArr.length;
                for (i = 0; i < l; i++) {
                    this.pluginArr[i].tween(this, "*", NaN, NaN, NaN, this.ratio, end);
                }
            }

            if (!this.suppressEvents) {
                if (this.dispatchEvents) {
                    this.dispatchEvt("change");
                }
                if (this.onChange != null) {
                    this.onChange(this);
                }
            }
            if (end) {
                this.setPaused(true);
                if (this.nextTween) {
                    this.nextTween.setPaused(false);
                }
                if (!this.suppressEvents) {
                    if (this.dispatchEvents) {
                        this.dispatchEvt("complete");
                    }
                    if (this.onComplete != null) {
                        this.onComplete(this);
                    }
                }
            }
        },
        getDelay: function () {
            return this._delay;
        },
        setDelay: function (value) {
            if (this._position <= 0) {
                this._position = -value;
            }
            this._delay = value;
        },
        getProxy: function () {
            if (this._proxy == null) {
                this._proxy = TargetProxy.create(this);
            }
            return this._proxy;
        },
        setValue: function (name, value) {
            this._values[name] = value;
            this.invalidate();
        },
        getValue: function (name) {
            return this._values[name];
        },
        deleteValue: function (name) {
            delete(this._rangeValues[name]);
            delete(this._initValues[name]);
            return delete(this._values[name]);
        },
        setValues: function (values) {
            this.copy(values, this._values, true);
            this.invalidate();
        },
        resetValues: function (values) {
            this._values = {};
            this.setValues(values);
        },
        getValues: function () {
            return this.copy(this._values, {});
        },
        getInitValue: function (name) {
            return this._initValues[name];
        },
        swapValues: function () {
            if (!this._inited) {
                this.initTween();
            }
            var o = this._values;
            this._values = this._initValues;
            this._initValues = o;
            for (var n in this._rangeValues) {
                this._rangeValues[n] *= -1;
            }
            if (this._position < 0) {
                // render it at position 0:
                var pos = this.positionOld;
                this.position = 0;
                this._position = this.positionOld;
                this.positionOld = this.pos;
            } else {
                this.position = this._position;
            }
        },
        initTween: function () {
            this._inited = true;
            this._initValues = {};
            this._rangeValues = {};
            for (var n in this._values) {
                if (GTween.plugins[n]) {
                    var pluginArr = GTween.plugins[n];
                    var l = pluginArr.length;
                    var value = (n in this.target) ? this.target[n] : NaN;
                    for (var i = 0; i < l; i++) {
                        value = this.pluginArr[i].initTween(this, n, value);
                    }
                    if (!isNaN(value)) {
                        this._rangeValues[n] = this._values[n] - (this._initValues[n] = value);
                    }
                } else {
                    this._rangeValues[n] = this._values[n] - (this._initValues[n] = this.target[n]);
                }
            }
            if (this.hasStarPlugins) {
                this.pluginArr = GTween.plugins["*"];
                l = this.pluginArr.length;
                for (i = 0; i < l; i++) {
                    this.pluginArr[i].initTween(this, "*", NaN);
                }
            }

            if (!this.suppressEvents) {
                if (this.dispatchEvents) {
                    this.dispatchEvt("init");
                }
                if (this.onInit != null) {
                    this.onInit(this);
                }
            }
        },
        beginning: function () {
            this.setPosition(0);
            this.setPaused(true);
        },
        end: function () {
            this.setPosition((this.repeatCount > 0) ? this.repeatCount * this.duration : this.duration);
        },
        invalidate: function () {
            this._inited = false;
            if (this._position > 0) {
                this._position = 0;
            }
            if (this.autoPlay) {
                this.setPaused(false);
            }
        },
        copy: function (o1, o2, smart) {
            smart = smart || false;
            for (var n in o1) {
                if (smart && o1[n] == null) {
                    delete(o2[n]);
                } else {
                    o2[n] = o1[n];
                }
            }
            return o2;
        },
        dispatchEvt: function (name) {
            if (this.hasEventListener(name)) {
                this.dispatchEvent(AEvent.create(name));
            }
        }
    });
    var getTimer = function () {
        return Utils.now();
    }
    GTween.tickList = {};
    GTween.gcLockList = {};
    GTween.timeScaleAll = 1;
    GTween.time = 0;
    GTween.pauseAll = false;
    GTween.defaultDispatchEvents = false;
    GTween.version = 2.01;
    GTween.hasStarPlugins = false;
    GTween.plugins = {};
    GTween.linerEase = function (a, b, c, d) {
        return a;
    }
    GTween.defaultEase = GTween.linerEase;
    GTween.staticInit = function (stage) {
    	GTween.time = getTimer()/ 1000;
        stage.addEventListener(AEvent.ENTER_FRAME, GTween.staticTick);
    }
    GTween.staticTick = function (event) {
        var t = GTween.time;
        GTween.time = getTimer() / 1000;
        if (GTween.pauseAll) {
            return;
        }
        var dt = (GTween.time - t) * GTween.timeScaleAll;
        for (var tween in GTween.tickList) {
        	tween=GTween.tickList[tween];
            tween.setPosition(tween._position + (tween.useFrames ? GTween.timeScaleAll : dt) * tween.timeScale);
        }
    }
    GTween.installPlugin = function (plugin, propertyNames, highPriority) {
        highPriority = highPriority || false;
        for (var i = 0; i < propertyNames.length; i++) {
            var propertyName = propertyNames[i];
            if (propertyName == "*") {
                GTween.hasStarPlugins = true;
            }
            if (GTween.plugins[propertyName] == null) {
                GTween.plugins[propertyName] = [plugin];
                continue;
            }
            if (highPriority) {
                GTween.plugins[propertyName].unshift(plugin);
            } else {
                GTween.plugins[propertyName].push(plugin);
            }
        }
    }
    
    var TargetProxy=Class.extend({
    	tween:null,
    	init:function(tween){
    		this.tween=tween;
    	},
    	callProperty:function(methodName,args){
    		return this.tween.target[methodName].apply(this.tween.target,args);
    	},
    	getProperty:function(prop){
    		var value = this.tween.getValue(prop);
			return (isNaN(value)) ? this.tween.target[prop] : value;
    	},
    	setProperty:function(prop,value){
    		if (isBoolean(value)|| toString.call(value)=='[object String]'|| isNaN(value)) { this.tween.target[prop] = value; }
			else { this.tween.setValue(prop, value); }
    	},
    	deleteProperty:function(prop){
    		this.tween.deleteValue(prop);
			return true;
    	}
    });
    return GTween;
})