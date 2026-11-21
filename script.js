
let currentType = "public";

// Open the Public or Private university list
function showUniversities(type) {
    currentType = type;



    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("universityPage").classList.remove("hidden");

    document.getElementById("pageTitle").textContent =
        type === "public" ? "Public Universities" : "Private Universities";

    render();
}


// Back to the home page
function goBack() {

    document.getElementById("universityPage").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");

    currentType = "public";
}


// Display and sort universities
function render() {

    // Get universities according to selected type
    let list = universities.filter(function (u) {
        return u.type === currentType;
    });

    // Get selected sorting option
    const sort = document.getElementById("sort").value;

    // Sort universities
    list.sort(function (a, b) {

        // Alphabetical order
        if (sort === "alpha") {
            return a.name.localeCompare(b.name);
        }

        // Application deadline (earliest first)
        if (sort === "deadline") {
            return (a.deadline || "9999").localeCompare(
                b.deadline || "9999"
            );
        }

        // Application fee (lowest first)
        if (sort === "fee") {
            return (a.fee ?? 1e9) - (b.fee ?? 1e9);
        }

        return 0;
    });


    // Get university list container
    const box = document.getElementById("universityList");

    // Clear previous university cards
    box.innerHTML = "";


    // Create university cards
    list.forEach(function (u) {

        const card = document.createElement("a");

        card.className = "uni-btn";
        card.href = "university.html?id=" + encodeURIComponent(u.id);

        const name = document.createElement("b");
        name.textContent = u.name;

        const details = document.createElement("span");

        const deadline = u.deadline
            ? formatDate(u.deadline)
            : "Deadline not added";

        const fee = u.fee === null
            ? "Fee not added"
            : u.fee + " Tk";

        details.textContent = deadline + " | " + fee;

        card.appendChild(name);
        card.appendChild(details);

        box.appendChild(card);
    });
}




