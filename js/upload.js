/*document
.getElementById("faultForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const device =
    document.getElementById("deviceName").value;

    const department =
    document.getElementById("department").value;

    const description =
    document.getElementById("problemDescription").value;

    let reports =
    JSON.parse(
        localStorage.getItem("reports")
    ) || [];

    reports.push({

        device,
        department,
        description,
        date:
        new Date().toLocaleString()

    });

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    alert(
        "Fault Report Submitted Successfully!"
    );

    document
    .getElementById("faultForm")
    .reset();

});*/



document.getElementById("faultForm")
.addEventListener("submit", function(e){

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

    if(imageFile){

        const reader =
        new FileReader();

        reader.onload = function(){

            saveReport(reader.result);

        };

        reader.readAsDataURL(imageFile);

    }else{

        saveReport(null);

    }

    function saveReport(imageData){

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

});