!function(){"use strict";function e(e,t){for(var n=e;!n.matches(t);)n=n.parentElement;return n}function t(e,t){Array.prototype.forEach.call(document.querySelectorAll(e),t)}t(".c-icon",function(e){function t(e){n.classList.add("o-window--open"),o&&o.play()}var n=document.getElementById(e.id+"-window");if(n){var o=document.getElementById(e.dataset.clickSound);e.addEventListener("dblclick",t),e.addEventListener("touchstart",t)}}),t("[data-window-close]",function(t){var n=e(t,".o-window");t.addEventListener("click",function(e){n.classList.remove("o-window--open")})});var n,o,a;t("[data-drag-handle]",function(t){var d=e(t,"[data-draggable]");t.addEventListener("mousedown",function(e){n=d;var t=d.getBoundingClientRect(),i=window.getComputedStyle(d);o=e.screenX-(t.left-parseFloat(i["margin-left"])),a=e.screenY-(t.top-parseFloat(i["margin-top"]))})}),window.addEventListener("mousemove",function(e){n&&(n.style.position="absolute",n.style.left=""+(e.screenX-o)+"px",n.style.top=""+(e.screenY-a)+"px")}),window.addEventListener("mouseup",function(e){n=!1}),t("[data-drag-handle] img",function(e){e.addEventListener("dragstart",function(e){e.preventDefault()})}),document.addEventListener("submit",function(e){setTimeout(function(){e.target.querySelector("fieldset").setAttribute("disabled",!0)},0)})}();