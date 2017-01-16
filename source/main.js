(function() {
'use strict';

function matchingParent(el,sel) {
  var cand = el;
  while (!cand.matches(sel)) {
    cand = cand.parentElement;
  }
  return cand;
}

Array.prototype.forEach.call(document.querySelectorAll(".c-icon"), function(el) {
  el.addEventListener("dblclick", function(event) {
    var win = el.id+"-window";
    document.getElementById(win).className += " o-window--open";
  });
});

Array.prototype.forEach.call(document.querySelectorAll("[data-window-close]"), function(el) {
  var win = matchingParent(el,'.o-window');
  el.addEventListener("click", function(event) {
    win.className = win.className.replace(/\bo-window--open\b/g,"");
  });
});

var dragThis, graboffsetx, graboffsety;

Array.prototype.forEach.call(document.querySelectorAll('[data-drag-handle]'), function(el) {
  var draggable = matchingParent(el,"[data-draggable]");
  el.addEventListener("mousedown", function(event) {
    dragThis = draggable;
    var bounds = draggable.getBoundingClientRect();
    var style = window.getComputedStyle(draggable);
    graboffsetx = event.screenX - (bounds.left-parseFloat(style['margin-left']));
    graboffsety = event.screenY - (bounds.top-parseFloat(style['margin-top']));
  });
})

window.addEventListener("mousemove", function(event) {
  if (dragThis) {
    dragThis.style.position = "absolute";
    dragThis.style.left = "" + (event.screenX-graboffsetx) + "px";
    dragThis.style.top = "" + (event.screenY-graboffsety) + "px";
  }
});

window.addEventListener("mouseup", function(event) {
  dragThis = false;
});

})();
