const reports =
JSON.parse(localStorage.getItem("reports")) || [];

const reportTable =
document.getElementById("reportTable");

/*reports.forEach(report => {

    reportTable.innerHTML += `

    <tr>

        <td>${report.device}</td>

        <td>${report.department}</td>

        <td>${report.description}</td>

        <td>${report.date}</td>

    </tr>

    `;

});*/

reports.forEach((report,index) => {

    reportTable.innerHTML += `

    <tr>

        <td>${report.device}</td>
        <td>${report.department}</td>
        <td>${report.description}</td>
        <td>${report.date}</td>
        <td>
            <button onclick="deleteReport(${index})">
                Delete
            </button>
        </td>
        <td>
            <button onclick="viewEvidence(${index})">
                View
            </button>
        </td>

    </tr>

    `;

});


function viewEvidence(index){

    const reports =
    JSON.parse(
        localStorage.getItem("reports")
    );

    const report = reports[index];

    let imageSection = "";
    let videoSection = "";

    if(report.image){

        imageSection = `

        <h3>Image Evidence</h3>

        <img
        src="${report.image}"

        style="
        max-width:90%;
        border-radius:10px;
        margin-bottom:20px;
        ">

        `;
    }

    if(report.video){

        videoSection = `

        <h3>Video Evidence</h3>

        <video
        controls

        style="
        max-width:90%;
        border-radius:10px;
        ">

        <source src="${report.video}">

        </video>

        `;
    }

    if(
        !report.image &&
        !report.video
    ){

        alert("No evidence uploaded.");

        return;

    }

    const win = window.open("");

    win.document.write(`

    <html>

    <head>

    <title>Evidence Viewer</title>

    <style>

    body{

        font-family:Arial,sans-serif;
        text-align:center;
        padding:30px;
        background:#f5f5f5;

    }

    .container{

        background:white;

        max-width:1000px;

        margin:auto;

        padding:20px;

        border-radius:15px;

        box-shadow:
        0 4px 12px rgba(0,0,0,0.2);

    }

    h2{

        color:#006400;

    }

    </style>

    </head>

    <body>

    <div class="container">

        <h2>Fault Report Evidence</h2>

        <p>

        <strong>Device:</strong>
        ${report.device}

        </p>

        <p>

        <strong>Department:</strong>
        ${report.department}

        </p>

        <p>

        <strong>Description:</strong>
        ${report.description}

        </p>

        <hr>

        ${imageSection}

        ${videoSection}

    </div>

    </body>

    </html>

    `);

}
/*
function viewEvidence(index){

    const reports =
    JSON.parse(
        localStorage.getItem("reports")
    );

    const report =
    reports[index];

    let content = "";

    if(report.image){

        content = `
        <img
            src="${report.image}"
            style="
                max-width:90%;
                max-height:80vh;
            ">
        `;
    }

    else if(report.video){

        content = `
        <video
            controls
            style="
                max-width:90%;
                max-height:80vh;
            ">

            <source
                src="${report.video}">

        </video>
        `;
    }

    else{

        alert("No evidence uploaded.");

        return;
    }

    const newWindow =
    window.open("");

    newWindow.document.write(`

    <html>

    <head>
        <title>Evidence</title>
    </head>

    <body
        style="
        text-align:center;
        padding:20px;
        ">

        <h2>Uploaded Evidence</h2>

        ${content}

    </body>

    </html>

    `);

}*/
/*
function viewEvidence(index){

    const reports =
    JSON.parse(
        localStorage.getItem("reports")
    );

    const report =
    reports[index];

    if(!report.image){

        alert("No evidence uploaded.");

        return;
    }

    const newWindow =
    window.open("");

    newWindow.document.write(`

    <html>

    <head>

    <title>Evidence</title>

    </head>

    <body style="
        text-align:center;
        padding:20px;
    ">

    <h2>Uploaded Evidence</h2>

    <img
    src="${report.image}"
    style="
        max-width:90%;
        max-height:80vh;
    ">

    </body>

    </html>

    `);

}*/

function deleteReport(index){

    reports.splice(index,1);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    location.reload();

}

document
.getElementById("clearReportsBtn")
.addEventListener("click", () => {

    const confirmDelete =
    confirm(
        "Are you sure you want to clear all reports?"
    );

    if(confirmDelete){

        localStorage.removeItem("reports");

        location.reload();

    }

});