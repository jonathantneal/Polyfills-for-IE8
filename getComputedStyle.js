// getComputedStyle
!('getComputedStyle' in this) && (this.getComputedStyle = (function () {
	function getPixelSize(element, sizeWithSuffix, rootSize) {
		var
		size = parseFloat(sizeWithSuffix),
		suffix = sizeWithSuffix.split(/\d/)[0];

		if (rootSize == null) {
			rootSize = /em|%/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle.fontSize, null) : 16;
		}

		return (suffix == 'em') ? size * rootSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
	}

	function setShortStyleProperty(style, property) {
		var
		borderSuffix = property == 'border' ? 'Width' : '',
		t = property + 'Top' + borderSuffix,
		r = property + 'Right' + borderSuffix,
		b = property + 'Bottom' + borderSuffix,
		l = property + 'Left' + borderSuffix;

		style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
		: style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
		: style[l] == style[r] ? [style[t], style[r], style[b]]
		: [style[t], style[r], style[b], style[l]]).join(' ');
	}

	function getComputedStyle(element) {
		var
		currentStyle = element.currentStyle,
		style = {},
		fontSize = getPixelSize(element, currentStyle.fontSize, null);

		for (property in currentStyle) {
			style[property] = currentStyle[property];

			if (/(margin|padding)(Top|Right|Bottom|Left)|border(Top|Right|Bottom|Left)Width/.test(property)) {
				style[property] = getPixelSize(element, style[property], fontSize) + 'px';
			}
		}

		setShortStyleProperty(style, 'margin');
		setShortStyleProperty(style, 'padding');
		setShortStyleProperty(style, 'border');

		style.fontSize = fontSize + 'px';

		return style;
	}

	return getComputedStyle;
})(this));