// addEventListener polyfill (incomplete)
('Element' in this) && !('addEventListener' in this.Element.prototype) && (function (global) {
	function Event(e, element) {
		var instance = this;

		for (property in e) {
			instance[property] = e[property];
		}

		instance.currentTarget =  element;
		instance.target = e.srcElement || element;
		instance.timeStamp = +new Date;

		instance.preventDefault = function () {
			e.returnValue = false;
		};
		instance.stopPropagation = function () {
			e.cancelBubble = true;
		};
	}

	function addEventListener(type, listener) {
		var
		element = this,
		listeners = element.listeners = element.listeners || [],
		index = listeners.push([listener, function (e) {
			listener.call(element, new Event(e, element));
		}]) - 1;

		element.attachEvent('on' + type, listeners[index][1]);
	}

	function removeEventListener(type, listener) {
		for (var element = this, listeners = element.listeners || [], length = listeners.length, index = 0; index < length; ++index) {
			if (listeners[index][0] === listener) {
				element.detachEvent('on' + type, listeners[index][1]);
			}
		}
	}

	global.addEventListener = document.addEventListener = global.Element.prototype.addEventListener = addEventListener;
	global.removeEventListener = document.removeEventListener = global.Element.prototype.removeEventListener = removeEventListener;
})(this);