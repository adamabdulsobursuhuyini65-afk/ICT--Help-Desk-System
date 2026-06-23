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

displayAssets();

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