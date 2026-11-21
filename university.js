
// Get university ID from the URL
const id = new URLSearchParams(location.search).get("id");

// Find the selected university
const u = universities.find(function (uni) {
    return uni.id === id;
});


// Convert special characters into HTML-safe text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
        const symbols = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return symbols[char];
    });
}


// Check whether university exists
if (u) {

    // Display university name
    document.title = u.name;
    document.getElementById("uniName").textContent = u.name;


    // Display university type
    document.getElementById("uniType").textContent = u.type;
    document.getElementById("uniType").className = "badge " + u.type;


    // Display quick facts
    let stats = "";

    stats += '<div class="stat card-box">';
    stats += '<span>Application deadline</span><b>';
    stats += u.deadline ? deadlineStatus(u) : "Not added yet";
    stats += '</b></div>';

    stats += '<div class="stat card-box">';
    stats += '<span>Application fee</span><b>';
    stats += u.fee === null ? "Not added yet" : u.fee + " Tk";
    stats += '</b></div>';

    stats += '<div class="stat card-box">';
    stats += '<span>Admission test</span><b>';
    stats += u.testDate ? "See details below" : "Not added yet";
    stats += '</b></div>';

    document.getElementById("stats").innerHTML = stats;


    // Display university units and GPA requirements
    let units = "";

    u.units.forEach(function (unit) {

        units += '<div class="unit">';

        units += '<b>' + escapeHTML(unit.name) + '</b>';

        units += '<div>Who can apply: ' +
            escapeHTML(unit.groups.join(", ")) + '</div>';

        units += '<div>Minimum GPA: ';

        let minimum = [];

        if (unit.min[0] !== null) {
            minimum.push("SSC " + unit.min[0]);
        }

        if (unit.min[1] !== null) {
            minimum.push("HSC " + unit.min[1]);
        }

        if (unit.min[2] !== null) {
            minimum.push("Total " + unit.min[2]);
        }

        units += minimum.length
            ? escapeHTML(minimum.join(", "))
            : "See official requirements";

        units += '</div>';

        if (unit.note) {
            units += '<div class="small">' +
                escapeHTML(unit.note) + '</div>';
        }

        units += '</div>';
    });


    // Display application period
    let application = "Not added yet";

    if (u.applicationStart && u.deadline) {
        application = formatDate(u.applicationStart) +
            " to " + formatDate(u.deadline);
    }
    else if (u.applicationStart) {
        application = "Opens " + formatDate(u.applicationStart);
    }
    else if (u.deadline) {
        application = "Until " + formatDate(u.deadline);
    }


    // Display application fee
    let fee = "Not added yet";

    if (u.fee !== null) {

        fee = escapeHTML(u.fee + " Tk");

        if (u.feeNote) {
            fee += '<div class="small">' +
                escapeHTML(u.feeNote) + '</div>';
        }
    }


    // Display admission and tuition fees
    let tuition = "";

    if (u.admissionFee !== null) {
        tuition += escapeHTML(u.admissionFee + " Tk<br>");
    }

    if (u.tuition) {
        tuition += escapeHTML(u.tuition);
    }


    // Display contact information
    let contact = "";

    if (u.phone) {
        contact += "Phone: " + escapeHTML(u.phone) + "<br>";
    }

    if (u.email) {
        contact += "Email: " + escapeHTML(u.email);
    }


    // Display university location
    let location = "Not added yet";

    if (u.address) {
        location = escapeHTML(u.address);
    }


    // Display official website
    let website = "";

    if (u.website) {
        website = '<a class="linkbtn" href="' +
            escapeHTML(u.website) +
            '" target="_blank" rel="noopener noreferrer">' +
            'Official website</a>';
    }


    // Display all university information
    let info = "";

    info += '<div class="block"><h4>About</h4>';
    info += '<div class="value">' +
        escapeHTML(u.about || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Application period</h4>';
    info += '<div class="value">' +
        escapeHTML(application) + '</div></div>';

    info += '<div class="block"><h4>Admission test date</h4>';
    info += '<div class="value">' +
        escapeHTML(u.testDate || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Application fee</h4>';
    info += '<div class="value">' + fee + '</div></div>';

    info += '<div class="block"><h4>Admission / tuition fee</h4>';
    info += '<div class="value">' +
        (tuition || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Units and GPA requirements</h4>';
    info += '<div class="value">' +
        (units || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Programs / departments</h4>';
    info += '<div class="value">' +
        escapeHTML(u.programs || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Total seats</h4>';
    info += '<div class="value">' +
        escapeHTML(u.seats || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Scholarship / waiver</h4>';
    info += '<div class="value">' +
        escapeHTML(u.scholarship || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Contact</h4>';
    info += '<div class="value">' +
        (contact || "Not added yet") + '</div></div>';

    info += '<div class="block"><h4>Location</h4>';
    info += '<div class="value">' + location + '</div></div>';

    if (u.note) {
        info += '<div class="note"><b>Note:</b> ' +
            escapeHTML(u.note) + '</div>';
    }

    if (website) {
        info += '<div class="links">' + website + '</div>';
    }

    document.getElementById("info").innerHTML = info;

}
else {

    // University not found
    document.body.innerHTML =
        '<p style="padding:20px">' +
        'University not found. ' +
        '<a href="index.html">Go back</a></p>';
}


// ===================================
// ELIGIBILITY CHECKER
// ===================================

function checkEligibility() {

    // Get student information
    const ssc = document.getElementById("ssc").value;
    const hsc = document.getElementById("hsc").value;
    const group = document.getElementById("group").value;

    const result = document.getElementById("result");


    // Check empty fields
    if (ssc === "" || hsc === "" || group === "") {

        result.className = "warn";
        result.innerHTML = "Please fill all fields.";

        return;
    }


    // Convert GPA into numbers
    const sscGPA = Number(ssc);
    const hscGPA = Number(hsc);


    // Check valid GPA
    if (
        !Number.isFinite(sscGPA) ||
        !Number.isFinite(hscGPA) ||
        sscGPA < 0 || sscGPA > 5 ||
        hscGPA < 0 || hscGPA > 5
    ) {

        result.className = "warn";
        result.innerHTML = "Please enter GPA between 0 and 5.";

        return;
    }


    // Check university requirements
    if (!u || u.units.length === 0) {

        result.className = "warn";
        result.innerHTML =
            "Requirements not added yet. Check the official website.";

        return;
    }


    // Calculate total GPA
    const totalGPA = sscGPA + hscGPA;

    let eligible = "";
    let possible = "";
    let failed = "";
    let groupFound = false;


    // Check each university unit
    u.units.forEach(function (unit) {

        if (unit.groups.includes(group)) {

            groupFound = true;

            const min = unit.min;

            let notEligible = false;
            let unknown = false;


            // Check SSC GPA
            if (min[0] === null) {
                unknown = true;
            }
            else if (sscGPA < min[0]) {
                notEligible = true;
            }


            // Check HSC GPA
            if (min[1] === null) {
                unknown = true;
            }
            else if (hscGPA < min[1]) {
                notEligible = true;
            }


            // Check total GPA
            if (min[2] === null) {
                unknown = true;
            }
            else if (totalGPA < min[2]) {
                notEligible = true;
            }


            // Store eligibility result
            if (notEligible) {
                failed += escapeHTML(unit.name) + "<br>";
            }
            else if (unknown) {
                possible += escapeHTML(unit.name) + "<br>";
            }
            else {
                eligible += escapeHTML(unit.name) + "<br>";
            }

        }

    });


    // Check whether the student's group is accepted
    if (!groupFound) {

        result.className = "no";
        result.innerHTML =
            "<b>Not eligible</b><br>No unit accepts your group.";

        return;
    }


    // Display eligibility result
    if (eligible !== "") {

        result.className = "ok";

        result.innerHTML =
            "<b>You meet the listed GPA requirements!</b><br>" +
            "You can apply to:<br><br>" + eligible;
    }
    else if (possible !== "") {

        result.className = "warn";

        result.innerHTML =
            "<b>Eligibility needs confirmation.</b><br>" +
            "Some GPA requirements are not available yet.<br><br>" +
            possible;
    }
    else {

        result.className = "no";

        result.innerHTML =
            "<b>Not eligible</b><br>" +
            "Your GPA is below the minimum requirement.<br><br>" +
            failed;
    }


    // Also show units with incomplete requirements
    if (eligible !== "" && possible !== "") {

        result.innerHTML +=
            "<br><br><b>Eligibility needs confirmation for:</b><br>" +
            possible;
    }

}
