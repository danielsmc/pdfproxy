Array.prototype.forEach.call(document.querySelectorAll(".c-icon"), function(el) {
	el.addEventListener("dblclick", function(event) {
		var win = el.id+"-window";
		document.getElementById(win).className += " o-window--open";
	});
});

Array.prototype.forEach.call(document.querySelectorAll(".c-window__close"), function(el) {
	el.addEventListener("click", function(event) {
		var win = el.parentElement.parentElement;
		win.className = win.className.replace(/\bo-window--open\b/g,"");
	});
});