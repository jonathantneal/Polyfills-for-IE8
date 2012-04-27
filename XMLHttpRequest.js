// XMLHttpRequest
!('XMLHttpRequest' in this) && (this.XMLHttpRequest = function () {
	return new ActiveXObject('Microsoft.XMLHTTP');
});