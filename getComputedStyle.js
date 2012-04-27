// getComputedStyle
!('getComputedStyle' in this) && this.getComputedStyle = (function () {
	function getPixelSize(element, sizeWithSuffix, rootSize) {
		var
		size = parseFloat(sizeWithSuffix),
		suffix = sizeWithSuffix.split(/\d/)[0];

		if (rootSize == null) {
			rootSize = /em|%/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle.fontSize, null) : 16;
		}

		return (suffix == 'em') ? size * rootSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
	}

	function getComputedStyle(element) {
		var
		currentStyle = element.currentStyle,
		styles = {},
		fontSize = getPixelSize(element, currentStyle.fontSize, null);

		for (property in currentStyle) {
			if (/(margin|padding)(Top|Right|Bottom|Left)|border(Top|Right|Bottom|Left)Width/.test(property)) {
				styles[property] = getPixelSize(element, currentStyle[property], fontSize) + 'px';
			} else {
				styles[property] = currentStyle[property];
			}
		}

		styles.fontSize = fontSize + 'px';

		return styles;
	}

	return getComputedStyle;
})(this);