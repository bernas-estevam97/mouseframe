// function to give time for all initial functions to load without flashing any element.


document.querySelectorAll('[data-version]').forEach(el => {
  el.textContent = CURRENT_VERSION;
});







