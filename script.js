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

/*TICKETS*/
let tickets =
JSON.parse(localStorage.getItem("tickets")) || [];

function displayTickets(){

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

function addTicket(){

    let staff =
    document.getElementById("staffName").value.trim();

    let problem =
    document.getElementById("problem").value.trim();

    let priority =
    document.getElementById("priority").value;

    if(staff === "" || problem === ""){

        alert("Please fill all fields");

        return;
    }

    tickets.push({

        staff: staff,
        problem: problem,
        priority: priority,
        status: "Open"

    });

    displayTickets();

    document.getElementById("staffName").value = "";
    document.getElementById("problem").value = "";
}

function resolveTicket(index){

    tickets[index].status = "Resolved";

    displayTickets();
}

function deleteTicket(index){

    tickets.splice(index,1);

    displayTickets();
}

displayTickets();


/*MAINTENANCE*/
let maintenance =
JSON.parse(localStorage.getItem("maintenance")) || [];

function displayMaintenance(){

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

function addMaintenance(){

    let assetId =
    document.getElementById("assetId").value.trim();

    let fault =
    document.getElementById("fault").value.trim();

    let action =
    document.getElementById("actionTaken").value.trim();

    let technician =
    document.getElementById("technician").value.trim();

    if(
        assetId === "" ||
        fault === "" ||
        action === "" ||
        technician === ""
    ){

        alert("Please fill all fields.");

        return;
    }

    maintenance.push({

        assetId: assetId,
        fault: fault,
        action: action,
        technician: technician

    });

    displayMaintenance();

    document.getElementById("assetId").value = "";
    document.getElementById("fault").value = "";
    document.getElementById("actionTaken").value = "";
    document.getElementById("technician").value = "";
}

function deleteMaintenance(index){

    maintenance.splice(index,1);

    displayMaintenance();
}

displayMaintenance();

/*REPORTS*/
let reports =
JSON.parse(localStorage.getItem("reports")) || [];

const reportTable =
document.getElementById("reportTable");

function displayReports(){

    if(!reportTable) return;

    reportTable.innerHTML = "";

    reports.forEach((report,index)=>{

        reportTable.innerHTML += `
        <tr>
            <td>${report.device}</td>
            <td>${report.department}</td>
            <td>${report.description}</td>
            <td>${report.date}</td>

            <td>
                <button onclick="viewEvidence(${index})">
                    View
                </button>
            </td>

            <td>
                <button onclick="deleteReport(${index})">
                    Delete
                </button>
            </td>

        </tr>
        `;

    });

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );
}

function deleteReport(index){

    reports.splice(index,1);

    displayReports();
}

function viewEvidence(index){

    const report = reports[index];

    if(!report){
        alert("Report not found.");
        return;
    }

    let imageSection = "";
    let videoSection = "";

    if(report.image){
        imageSection = `
            <h3>Image Evidence</h3>
            <img
                src="${report.image}"
                style="
                    max-width:100%;
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
                    max-width:100%;
                    border-radius:10px;
                ">

                <source src="${report.video}" type="video/mp4">

                Your browser does not support the video tag.

            </video>
        `;
    }

    if(!report.image && !report.video){
        alert("No evidence uploaded for this report.");
        return;
    }

    const win = window.open("", "_blank");

    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Evidence Viewer</title>

            <style>

                body{
                    font-family:Arial,sans-serif;
                    background:#f5f5f5;
                    margin:0;
                    padding:30px;
                }

                .container{
                    max-width:900px;
                    margin:auto;
                    background:white;
                    padding:25px;
                    border-radius:12px;
                    box-shadow:0 4px 12px rgba(0,0,0,.2);
                }

                h2{
                    color:#006400;
                    text-align:center;
                }

                h3{
                    color:#006400;
                }

                p{
                    font-size:16px;
                }

                img,
                video{
                    width:100%;
                    margin-top:15px;
                    border-radius:10px;
                }

            </style>

        </head>

        <body>

            <div class="container">

                <h2>Fault Report Evidence</h2>

                <p><strong>Device:</strong> ${report.device}</p>

                <p><strong>Department:</strong> ${report.department}</p>

                <p><strong>Description:</strong> ${report.description}</p>

                <p><strong>Date:</strong> ${report.date}</p>

                <hr>

                ${imageSection}

                ${videoSection}

            </div>

        </body>

        </html>
    `);

    win.document.close();
}
displayReports();

/* CLEAR ALL REPORTS */

const clearBtn =
document.getElementById("clearReportsBtn");

if(clearBtn){

    clearBtn.addEventListener("click", function(){

        const confirmDelete =
        confirm("Are you sure you want to clear all reports?");

        if(confirmDelete){

            reports = [];

            localStorage.removeItem("reports");

            displayReports();

            alert("All reports have been deleted.");

        }

    });

}

/*UPLOAD*/

const faultForm =
document.getElementById("faultForm");

if(faultForm){

faultForm.addEventListener("submit",function(e){

    e.preventDefault();

    const device =
    document.getElementById("deviceName").value.trim();

    const department =
    document.getElementById("department").value.trim();

    const description =
    document.getElementById("problemDescription").value.trim();

    const imageFile =
    document.getElementById("imageUpload").files[0];

    const videoFile =
    document.getElementById("videoUpload").files[0];

    let imageData = "";
    let videoData = "";

    function saveReport(){

        reports.push({

            device: device,
            department: department,
            description: description,
            image: imageData,
            video: videoData,
            date: new Date().toLocaleString()

        });

        localStorage.setItem(
            "reports",
            JSON.stringify(reports)
        );

        alert("Report submitted successfully!");

        faultForm.reset();

    }

    function processVideo(){

        if(videoFile){

            const videoReader =
            new FileReader();

            videoReader.onload = function(){

                videoData =
                videoReader.result;

                saveReport();

            };

            videoReader.readAsDataURL(videoFile);

        }else{

            saveReport();

        }

    }

    if(imageFile){

        const imageReader =
        new FileReader();

        imageReader.onload = function(){

            imageData =
            imageReader.result;

            processVideo();

        };

        imageReader.readAsDataURL(imageFile);

    }else{

        processVideo();

    }

});

}
