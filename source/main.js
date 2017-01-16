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

function makeDraggable(selector,grabber_selector) {
  Array.prototype.forEach.call(document.querySelectorAll(selector), function(el) {
    var graboffsetx, graboffsety, beingDragged=false;
    var grabber_els = grabber_selector ? el.querySelectorAll(grabber_selector) : [el];
    Array.prototype.forEach.call(grabber_els, function(grabber_el) {
      grabber_el.addEventListener("mousedown", function(event) {
        beingDragged = true;
        var bounds = el.getBoundingClientRect();
        var style = window.getComputedStyle(el);
        graboffsetx = event.screenX - (bounds.left-parseFloat(style['margin-left']));
        graboffsety = event.screenY - (bounds.top-parseFloat(style['margin-top']));
      });
      grabber_el.addEventListener("mouseup", function(event) {
        beingDragged = false;
      });
      grabber_el.addEventListener("mousemove", function(event) {
        beingDragged = beingDragged && ((event.buttons % 2) == 1);
        if (beingDragged) {
          el.style.position = "absolute";
          el.style.left = "" + (event.screenX-graboffsetx) + "px";
          el.style.top = "" + (event.screenY-graboffsety) + "px";
        }
      });
    });
  });
}

makeDraggable(".c-icon");
makeDraggable(".o-window",".o-window__titlebar");

