// function to give time for all initial functions to load without flashing any element.

window.addEventListener('load', function () {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
});




const CURRENT_VERSION = "1.0.0 standalone";

document.querySelectorAll('[data-version]').forEach(el => {
  el.textContent = CURRENT_VERSION;
});






