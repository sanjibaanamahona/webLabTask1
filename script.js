const universities = [

    {
        name: "Bangladesh University of Engineering and Technology (BUET)",
        file: "buet.html",
        deadline: "2027-01-07",
        fee: 1300
    },

    {
        name: "Bangladesh University of Professionals",
        file: "bup.html",
        deadline: "",
        fee: 1100
    },

    {
        name: "Dhaka University",
        file: "du.html",
        deadline: "2026-11-25",
        fee: 1200
    },

    {
        name: "Jahangirnagar University",
        file: "ju.html",
        deadline: "2026-12-15",
        fee: 800
    },

    {
        name: "Chittagong University of Engineering & Technology (CUET)",
        file: "cuet.html",
        deadline: "",
        fee: null
    },

    {
        name: "Rajshahi University of Engineering & Technology (RUET)",
        file: "ruet.html",
        deadline: "",
        fee: null
    },

    {
        name: "Khulna University of Engineering & Technology (KUET)",
        file: "kuet.html",
        deadline: "",
        fee: null
    },

    {
        name: "University of Chittagong",
        file: "cu.html",
        deadline: "2026-12-10",
        fee: 1000
    },

    {
        name: "Rajshahi University",
        file: "ru.html",
        deadline: "2026-11-30",
        fee: 1100
    },

    {
        name: "GST",
        file: "gst.html",
        deadline: "",
        fee: null
    },

    {
        name: "Military Institute of Science and Technology",
        file: "mist.html",
        deadline: "",
        fee: null
    }

];


// Show University List
function showUniversities() {

    document.getElementById("homePage")
        .classList.add("hidden");

    document.getElementById("universityPage")
        .classList.remove("hidden");

    render();

}


// Back to Home
function goBack() {

    document.getElementById("universityPage")
        .classList.add("hidden");

    document.getElementById("homePage")
        .classList.remove("hidden");

}


// Format Date
function formatDate(iso) {

    if (!iso) return "Deadline not added";

    const p = iso.split("-");

    const m = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    return Number(p[2]) + " " +
        m[Number(p[1]) - 1] + " " + p[0];

}


// Render University List
function render() {

    const sort = document.getElementById("sort").value;

    const list = [...universities];

    list.sort((a, b) => {

        if (sort === "alpha") {
            return a.name.localeCompare(b.name);
        }

        if (sort === "deadline") {
            return (a.deadline || "9999")
                .localeCompare(b.deadline || "9999");
        }

        return (a.fee ?? 999999) - (b.fee ?? 999999);

    });


    const box = document.getElementById("universityList");

    box.innerHTML = "";


    list.forEach(u => {

        const a = document.createElement("a");

        a.className = "uni-btn";
        a.href = u.file;


        const b = document.createElement("b");

        b.textContent = u.name;


        const s = document.createElement("span");

        s.textContent =
            formatDate(u.deadline) +
            " | " +
            (u.fee == null ? "Fee not added" : u.fee + " Tk");


        a.append(b, s);

        box.appendChild(a);

    });

}


// Open University List from URL
if (location.hash === "#universities") {

    showUniversities();

}