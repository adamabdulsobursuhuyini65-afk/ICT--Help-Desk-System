let tickets =
JSON.parse(localStorage.getItem("tickets")) || [];

function displayTickets() {

    let table = document.getElementById("ticketTable");

    table.innerHTML = "";

    tickets.forEach((ticket, index) => {

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

function addTicket() {

    let staff =
    document.getElementById("staffName").value;

    let problem =
    document.getElementById("problem").value;

    let priority =
    document.getElementById("priority").value;

    if (staff === "" || problem === "") {

        alert("Please fill all fields");

        return;
    }

    tickets.push({
        staff,
        problem,
        priority,
        status: "Open"
    });

    displayTickets();

    document.getElementById("staffName").value = "";
    document.getElementById("problem").value = "";
}

function deleteTicket(index) {

    tickets.splice(index, 1);

    displayTickets();
}

function resolveTicket(index){

    tickets[index].status = "Resolved";

    displayTickets();
}

displayTickets();