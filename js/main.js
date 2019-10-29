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

// Single Page Application Functionality
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
    let pages = document.querySelectorAll("nav ul li a");
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

// Responsive navigation
// toggle active (displayBlock) class on nav ul
function toggleNavUl() {
    let navUl = document.querySelector("nav ul");
    if (navUl.classList.value === "displayBlock") {
        navUl.classList.remove("displayBlock");
    } else {
        navUl.classList.add("displayBlock");
    }
}

// uncheck checkbox controlling Responsive navigation
function removeNavUl() {
    let checkbox = document.querySelector("#menuToggle");
    checkbox.checked = false;
    //then toggle to remove displayBlock
    let navUl = document.querySelector("nav ul");
    navUl.classList.remove("displayBlock");
}


// Chart

const _db = firebase.firestore();
const _dataRef = _db.collection("Data");
let _sustainabilityData;

// listen for changes on _dataRef
_dataRef.orderBy("year").onSnapshot(function (snapshotData) {
    _sustainabilityData = []; // reset _sustainabilityData
    snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
        let data = doc.data(); // save the data in a variable
        data.id = doc.id; // add the id to the data variable
        _sustainabilityData.push(data); // push the data object to the global array _sustainabilityData
    });
    appendCows(_sustainabilityData); // call appendCows with _sustainabilityData as function argument

});
let cows = [];
let years = [];
let electricity = [];
let diesel = [];
let footprint = [];
let sufficiency = [];
let region = [];
let farmer = [];

let cowsNorth = [];
let yearsNorth = [];
let electricityNorth = [];
let dieselNorth = [];
let footprintNorth = [];
let sufficiencyNorth = [];
let cowsAvg = [];
let yearsAvg = [];
let electricityAvg = [];
let dieselAvg = [];
let footprintAvg = [];
let sufficiencyAvg = [];
let cowsUser = [];
let yearsUser = [];
let electricityUser = [];
let dieselUser = [];
let footprintUser = [];
let sufficiencyUser = [];
let farmerNorth = [];

let farmersList = [];
let farmersListAvg = [];
let farmersListAvgNorth = [];

function appendCows(sustainabilityData) {
    // prepare data

    sustainabilityData.forEach(data => {
        cows.push(data.cows);
        years.push(data.year);
        electricity.push(data.electricity);
        diesel.push(data.diesel);
        footprint.push(data.footprint);
        sufficiency.push(data.sufficiency);
        region.push(data.region);
        farmer.push(data.farmer);
    });
    sustainabilityData.forEach(data => {
        if (data.region === 'north') {
            cowsNorth.push(data.cows);
            yearsNorth.push(data.year);
            electricityNorth.push(data.electricity);
            dieselNorth.push(data.diesel);
            footprintNorth.push(data.footprint);
            sufficiencyNorth.push(data.sufficiency);
            farmerNorth.push(data.farmer);
        }

        console.log(farmerNorth);

    });
    sustainabilityData.forEach(data => {
        if (data.farmer === 1) {
            cowsUser.push(data.cows);
            yearsUser.push(data.year);
            electricityUser.push(data.electricity);
            dieselUser.push(data.diesel);
            footprintUser.push(data.footprint);
            sufficiencyUser.push(data.sufficiency);
        }


    });
    let yearsUnique = [...new Set(years)];
    let farmerUnique = [...new Set(farmer)];
    let northUnique = [...new Set(farmerNorth)];


    console.log(cowsNorth);
    console.log(cowsUser);
    console.log(yearsUnique);
    console.log(farmerUnique);

    for (let i = 1; i <= farmerUnique.length; i++) {
        let number = 1;
        let farmerObject;
        let cowsX = [];
        let yearsX = [];
        let electricityX = [];
        let dieselX = [];
        let footprintX = [];
        let sufficiencyX = [];
        let regionX;

        sustainabilityData.forEach(data => {

            if (data.farmer === i) {
                cowsX.push(data.cows);
                yearsX.push(data.year);
                electricityX.push(data.electricity);
                dieselX.push(data.diesel);
                footprintX.push(data.footprint);
                sufficiencyX.push(data.sufficiency);
                regionX = data.region;

            }
            farmerObject = [
                {
                    "cows": cowsX,
                    "years": yearsX,
                    "electricity": electricityX,
                    "diesel": dieselX,
                    "footprint": footprintX,
                    "sufficiency": sufficiencyX,
                    "region": regionX
              }
          ]



        });
        farmersList[i] = farmerObject;


    }
    console.log(farmersList);
    for (let i = 0; i < yearsUnique.length; i++) {
        let cowsY = 0;
        let yearsY = 0;
        let electricityY = 0;
        let dieselY = 0;
        let footprintY = 0;
        let sufficiencyY = 0;
        let regionY;

        for (let j = 1; j <= farmerUnique.length; j++) {
            cowsY = cowsY + farmersList[j][0].cows[i];
            yearsY = yearsY + farmersList[j][0].years[i];
            dieselY = dieselY + farmersList[j][0].diesel[i];
            footprintY = footprintY + farmersList[j][0].footprint[i];
            sufficiencyY = sufficiencyY + farmersList[j][0].sufficiency[i];
            electricityY = electricityY + farmersList[j][0].electricity[i];
            regionY = farmersList[j][0].region;
        }
        farmersListAvg[i] = [{
            "cows": cowsY / farmerUnique.length,
            "years": yearsY / farmerUnique.length,
            "electricity": electricityY / farmerUnique.length,
            "diesel": dieselY / farmerUnique.length,
            "footprint": footprintY / farmerUnique.length,
            "sufficiency": sufficiencyY / farmerUnique.length,
            "region": regionY
            }]
        // farmersListAvg[i] = farmerObject;

    }
    for (let i = 0; i < yearsUnique.length; i++) {
        let cowsY = 0;
        let yearsY = 0;
        let electricityY = 0;
        let dieselY = 0;
        let footprintY = 0;
        let sufficiencyY = 0;
        let regionY;

        for (let j = 1; j <= farmerUnique.length; j++) {
            regionY = farmersList[j][0].region;
            console.log(regionY);
            if (regionY == 'north') {
                cowsY = cowsY + farmersList[j][0].cows[i];
                yearsY = yearsY + farmersList[j][0].years[i];
                dieselY = dieselY + farmersList[j][0].diesel[i];
                footprintY = footprintY + farmersList[j][0].footprint[i];
                electricityY = electricityY + farmersList[j][0].electricity[i];
                sufficiencyY = sufficiencyY + farmersList[j][0].sufficiency[i];
            }
            console.log(footprintY);

        }
        farmersListAvgNorth[i] = [{
            "cows": cowsY / northUnique.length,
            "years": yearsY / northUnique.length,
            "electricity": electricityY / northUnique.length,
            "diesel": dieselY / northUnique.length,
            "footprint": footprintY / northUnique.length,
            "sufficiency": sufficiencyY / northUnique.length,
            "region": regionY
            }]
        // farmersListAvg[i] = farmerObject;

    }
    console.log(farmersListAvgNorth);


    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2014', '2015', '2016', '2017', '2018'],
            datasets: [{
                    label: 'Your footprint',
                    data: footprintUser,
                    backgroundColor: [
                'rgba(96, 182, 203, 0.5)'
            ],
                    borderColor: ['rgba(96, 182, 203, 1)'],
                    borderWidth: 1,
                    lineTension: 0,

        },
                {
                    label: 'Average footprint',
                    data: [farmersListAvg[0][0].footprint, farmersListAvg[1][0].footprint, farmersListAvg[2][0].footprint, farmersListAvg[3][0].footprint, farmersListAvg[4][0].footprint],
                    backgroundColor: 'rgba(25, 93, 108, 0.5)',
                    borderColor: [
                'rgba(25, 93, 108, 1)'
            ],
                    borderWidth: 1,
                    lineTension: 0
        }, {
                    label: 'Average footprint from your region',
                    data: [farmersListAvgNorth[0][0].footprint, farmersListAvgNorth[1][0].footprint, farmersListAvgNorth[2][0].footprint, farmersListAvgNorth[3][0].footprint, farmersListAvgNorth[4][0].footprint],
                    backgroundColor: [
                'rgba(29, 35, 68, 0.5)'
            ],
                    borderColor: ['rgba(29, 35, 68, 1)'],
                    borderWidth: 1,
                    lineTension: 0
        }
                  ]
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
    var ctx = document.getElementById('myChart2');
    var myChart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2014', '2015', '2016', '2017', '2018'],
            datasets: [{
                    label: 'Your diesel consumption',
                    data: dieselUser,
                    backgroundColor: [
                'rgba(141, 186, 207, 0.5)'
            ],
                    borderColor: [
                'rgba(141, 186, 207, 1)'
            ],
                    borderWidth: 1,
                    lineTension: 0,

        },
                {
                    label: 'Average diesel consumption',
                    data: [farmersListAvg[0][0].diesel, farmersListAvg[1][0].diesel, farmersListAvg[2][0].diesel, farmersListAvg[3][0].diesel, farmersListAvg[4][0].diesel],
                    backgroundColor: 'rgba(86, 135, 158, 0.5)',
                    borderColor: [
                'rgba(86, 135, 158, 1)'
            ],
                    borderWidth: 1,
                    lineTension: 0
        }, {
                    label: 'Average diesel consumption from your region',
                    data: [farmersListAvgNorth[0][0].diesel, farmersListAvgNorth[1][0].diesel, farmersListAvgNorth[2][0].diesel, farmersListAvgNorth[3][0].diesel, farmersListAvgNorth[4][0].diesel],
                    backgroundColor: [
                'rgba(21, 74, 99, 0.5)'
            ],
                    borderColor: [
                'rgba(21, 74, 99, 1)'
            ],
                    borderWidth: 1,
                    lineTension: 0
        }
                  ]
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
    var ctx = document.getElementById('myChart3');
    var myChart3 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2014', '2015', '2016', '2017', '2018'],
            datasets: [{
                    label: 'Your footprint',
                    data: electricityUser,
                    backgroundColor: [
                'rgba(18, 55, 38, 0.5)'
            ],
                    borderColor: ['rgba(18, 55, 38, 1)'],
                    borderWidth: 1,
                    lineTension: 0,

        },
                {
                    label: 'Average footprint',
                    data: [farmersListAvg[0][0].electricity, farmersListAvg[1][0].electricity, farmersListAvg[2][0].electricity, farmersListAvg[3][0].electricity, farmersListAvg[4][0].electricity],
                    backgroundColor: 'rgba(54, 99, 78, 0.8)',
                    borderColor: [
                'rgba(54, 99, 78, 1)'
            ],
                    borderWidth: 1,
                    lineTension: 0
        }, {
                    label: 'Average footprint from your region',
                    data: [farmersListAvgNorth[0][0].electricity, farmersListAvgNorth[1][0].electricity, farmersListAvgNorth[2][0].electricity, farmersListAvgNorth[3][0].electricity, farmersListAvgNorth[4][0].electricity],
                    backgroundColor: [
                'rgba(102, 167, 137, 1)'
            ],
                    borderColor: [
                'rgba(102, 167, 137, 1)'
            ],
                    borderWidth: 1,
                    lineTension: 0
        }
                  ]
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
    console.log(footprintNorth);

}
console.log(farmersListAvg);
