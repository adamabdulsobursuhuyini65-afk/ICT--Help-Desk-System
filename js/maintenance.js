let maintenance =
JSON.parse(localStorage.getItem("maintenance")) || [];

function displayMaintenance() {

    let table =
    document.getElementById("maintenanceTable");

    table.innerHTML = "";

    maintenance.forEach((record, index) => {

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

function addMaintenance() {

    let assetId =
    document.getElementById("assetId").value;

    let fault =
    document.getElementById("fault").value;

    let action =
    document.getElementById("actionTaken").value;

    let technician =
    document.getElementById("technician").value;

    if (
        assetId === "" ||
        fault === "" ||
        action === "" ||
        technician === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    maintenance.push({
        assetId,
        fault,
        action,
        technician
    });

    displayMaintenance();

    document.getElementById("assetId").value = "";
    document.getElementById("fault").value = "";
    document.getElementById("actionTaken").value = "";
    document.getElementById("technician").value = "";
}

function deleteMaintenance(index) {

    maintenance.splice(index, 1);

    displayMaintenance();
}

displayMaintenance();