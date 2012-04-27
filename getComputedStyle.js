// getComputedStyle
!('getComputedStyle' in this) && (this.getComputedStyle = function (element) {
	return element.currentStyle;
});