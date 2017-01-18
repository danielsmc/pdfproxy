(function() {
'use strict';

function matchingParent(el,sel) {
  var cand = el;
  while (!cand.matches(sel)) {
    cand = cand.parentElement;
  }
  return cand;
}

function qsForEach(sel,fn) {
  Array.prototype.forEach.call(document.querySelectorAll(sel),fn);
}

qsForEach(".c-icon", function(el) {
  var win = document.getElementById(el.id+"-window");
  var sound = document.getElementById(el.dataset.clickSound);
  if (win) {
    el.addEventListener("dblclick", function(event) {
      win.classList.add("o-window--open");
      if (sound) sound.play();
    });
  }
});

qsForEach("[data-window-close]", function(el) {
  var win = matchingParent(el,'.o-window');
  el.addEventListener("click", function(event) {
    win.classList.remove("o-window--open");
  });
});

var dragThis, graboffsetx, graboffsety;

qsForEach('[data-drag-handle]', function(el) {
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

qsForEach('[data-drag-handle] img', function(img) {
  img.addEventListener("dragstart", function(e) { e.preventDefault(); });
});

})();
