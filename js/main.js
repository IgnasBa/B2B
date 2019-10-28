"use strict";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFhSZT2ORV1RmTLsqQCbzy-rq9H0L7mvI",
  authDomain: "b2bbaby-136e0.firebaseapp.com",
  databaseURL: "https://b2bbaby-136e0.firebaseio.com",
  projectId: "b2bbaby-136e0",
  storageBucket: "b2bbaby-136e0.appspot.com",
  messagingSenderId: "189982050241",
  appId: "1:189982050241:web:dacc41626f3aec1a7f1140"
};

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();
