/*ASSESTS*/
let assets =
JSON.parse(localStorage.getItem("assets")) || [];

function displayAssets(){

let table = document.getElementById("assetTable");

table.innerHTML = "";

assets.forEach((asset,index)=>{

table.innerHTML += `
<tr>
<td>${asset.assetId}</td>
<td>${asset.name}</td>
<td>${asset.status}</td>

<td>
<button onclick="editAsset(${index})">
Edit
</button>

<button onclick="deleteAsset(${index})">
Delete
</button>
</td>
</tr>
`;

});

localStorage.setItem("assets",
JSON.stringify(assets));
}

function addAsset(){

let name =
document.getElementById("assetName").value;

let status =
document.getElementById("assetStatus").value;

if(name===""){
alert("Enter Asset Name");
return;
}

const assetId =
"AST" + String(Date.now()).slice(-4);

assets.push({
assetId,
name,
status
});

displayAssets();

document.getElementById("message")
.textContent =
"Asset Added Successfully";

setTimeout(() => {

document.getElementById("message")
.textContent = "";

}, 3000);

document.getElementById("assetName").value="";
}

function deleteAsset(index){

assets.splice(index,1);

displayAssets();
}

if(document.getElementById("assetTable")){
    displayAssets();
}

function editAsset(index){

let newName =
prompt(
"Enter New Asset Name",
assets[index].name
);

if(newName){

assets[index].name = newName;

displayAssets();

}

}

function searchAssets(){

let input =
document.getElementById("searchAsset")
.value.toLowerCase();

let rows =
document.querySelectorAll("#assetTable tr");

rows.forEach(row => {

let text =
row.textContent.toLowerCase();

row.style.display =
text.includes(input)
? ""
: "none";

});

}

function exportCSV(){

let csv =
"Asset ID,Name,Status\n";

assets.forEach(asset => {

csv +=
`${asset.assetId},
${asset.name},
${asset.status}\n`;

});

let blob =
new Blob(
[csv],
{type:"text/csv"}
);

let link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"assets.csv";

link.click();

}


/*MAINTENANCE*/
function displayMaintenance() {

    let table =
    document.getElementById("maintenanceTable");

    if(!table) return;

    table.innerHTML = "";

    maintenance.forEach((record,index)=>{

        table.innerHTML += `
        <tr>
            <td>${record.assetId}</td>
            <td>${record.fault}</td>
            <td>${record.action}</td>
            <td>${record.technician}</td>
            <td>
                <button onclick="deleteMaintenance(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    localStorage.setItem(
        "maintenance",
        JSON.stringify(maintenance)
    );
}

/*REPORTS*/
const reports =
JSON.parse(localStorage.getItem("reports")) || [];

const reportTable =
document.getElementById("reportTable");

if(reportTable){

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
    
}


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

function deleteReport(index){

    reports.splice(index,1);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    location.reload();

}
const clearBtn =
document.getElementById("clearReportsBtn");

if(clearBtn){

clearBtn.addEventListener("click", () => {
    const confirmDelete =
    confirm(
        "Are you sure you want to clear all reports?"
    );

    if(confirmDelete){

        localStorage.removeItem("reports");

        location.reload();

    }

});
    
}


/*TICKETS*/
function displayTickets() {

    let table =
    document.getElementById("ticketTable");

    if(!table) return;

    table.innerHTML = "";

    tickets.forEach((ticket,index)=>{

        table.innerHTML += `
        <tr>
            <td>${ticket.staff}</td>
            <td>${ticket.problem}</td>
            <td>${ticket.priority}</td>
            <td>${ticket.status}</td>
            <td>
                <button onclick="resolveTicket(${index})">
                    Resolve
                </button>

                <button onclick="deleteTicket(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );
}

/*UPLOAD*/
const faultForm =
document.getElementById("faultForm");

if(faultForm){

faultForm.addEventListener("submit", function(e){

    e.preventDefault();

    const device =
    document.getElementById("deviceName").value;

    const department =
    document.getElementById("department").value;

    const description =
    document.getElementById("problemDescription").value;

    const imageFile =
    document.getElementById("imageUpload").files[0];

    const videoFile =
    document.getElementById("videoUpload").files[0];

    let imageData = null;
    let videoData = null;

    function saveReport(){

        let reports =
        JSON.parse(
            localStorage.getItem("reports")
        ) || [];

        reports.push({

            device,
            department,
            description,
            image:imageData,
            video:videoData,
            date:new Date().toLocaleString()

        });

        localStorage.setItem(
            "reports",
            JSON.stringify(reports)
        );

        alert("Report Submitted Successfully!");

        document
        .getElementById("faultForm")
        .reset();

    }

    if(imageFile){

        const imageReader =
        new FileReader();

        imageReader.onload = function(){

            imageData = imageReader.result;

            if(videoFile){

                const videoReader =
                new FileReader();

                videoReader.onload = function(){

                    videoData = videoReader.result;

                    saveReport();

                };

                videoReader.readAsDataURL(videoFile);

            }else{

                saveReport();

            }

        };

        imageReader.readAsDataURL(imageFile);

    }else if(videoFile){

        const videoReader =
        new FileReader();

        videoReader.onload = function(){

            videoData = videoReader.result;

            saveReport();

        };

        videoReader.readAsDataURL(videoFile);

    }else{

        saveReport();

    }

});

}
});

