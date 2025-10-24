// function to give time for all initial functions to load without flashing any element.

window.addEventListener('load', function () {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
});


let closeBtn = document.getElementById("closeModal");
let modalNews = document.getElementById("modalNews"); 
let showNews = document.getElementById("showNews");

// const CURRENT_VERSION = "1.0.0 standalone";

document.querySelectorAll('[data-version]').forEach(el => {
  el.textContent = CURRENT_VERSION;
});

const SAVED_VERSION = localStorage.getItem("modalNewsVersion");

if (SAVED_VERSION !== CURRENT_VERSION) {
  // New version or first visit — show modal
  modalNews.classList.remove("hidden");
  localStorage.setItem("modalNewsVersion", CURRENT_VERSION);
} else {
  modalNews.classList.add("hidden"); // Already seen this version
}

// MODAL FOR NEWS AND VERSION UPDATES

closeBtn.onclick = function displayNone(){
    modalNews.classList.add("hidden");
};

showNews.onclick = function displayNews(){
    modalNews.classList.remove("hidden");
};






