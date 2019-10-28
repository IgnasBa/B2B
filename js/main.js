"use strict";
// firebase config initialization
const firebaseConfig = {
  apiKey: "AIzaSyBFhSZT2ORV1RmTLsqQCbzy-rq9H0L7mvI",
  authDomain: "b2bbaby-136e0.firebaseapp.com",
  databaseURL: "https://b2bbaby-136e0.firebaseio.com",
  projectId: "b2bbaby-136e0",
  storageBucket: "b2bbaby-136e0.appspot.com",
  messagingSenderId: "189982050241",
  appId: "1:189982050241:web:dacc41626f3aec1a7f1140"
};
  firebase.initializeApp(firebaseConfig);

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
  let pages = document.querySelectorAll(".sideNav ul li a");
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
  let page = "dashboard";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

// Chart

const _db = firebase.firestore();
const _dataRef = _db.collection("Data");
let _sustainabilityData;

// listen for changes on _dataRef
_dataRef.orderBy("year").onSnapshot(function(snapshotData) {
  _sustainabilityData = []; // reset _sustainabilityData
  snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
    let data = doc.data(); // save the data in a variable
    data.id = doc.id; // add the id to the data variable
    _sustainabilityData.push(data); // push the data object to the global array _sustainabilityData
  });
  console.log(_sustainabilityData);
  appendCows(_sustainabilityData); // call appendCows with _sustainabilityData as function argument
 
});
  let cows = [];
  let years = [];
     let electricity = [];
     let diesel = [];
     let footprint = [];
     let sufficiency = [];
function appendCows(sustainabilityData) {
  // prepare data

  sustainabilityData.forEach(data => {
      cows.push(data.cows);
      years.push(data.year);
      electricity.push(data.electricity);
      diesel.push(data.diesel);
      footprint.push(data.footprint);
      sufficiency.push(data.sufficiency);
    
  });

  console.log(cows);
  console.log(years);

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2014', '2015', '2016', '2017', '2018'],
        datasets: [{
            label: 'footprint',
            data: footprint,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            lineTension: 0
        },
        {
            label: 'AVGfootprint',
            data: [555, 476, 500, 520, 450],
            backgroundColor: [
                'pink'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            lineTension: 0
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
myChart.canvas.parentNode.style.height = '350px';
myChart.canvas.parentNode.style.width = '1000px';
myChart.canvas.parentNode.style.marginLeft = '100px';
}