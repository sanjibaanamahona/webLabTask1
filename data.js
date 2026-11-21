// ===== ALL UNIVERSITY INFO LIVES HERE =====
// Use null (or "") if you don't know a value yet.
// Each unit has: name, groups (who can apply), min = [SSC GPA, HSC GPA, SSC+HSC total]
// Dates use "YYYY-MM-DD" and are shown on the website as 25 November 2026

function uni(id, name, type, lat, lng, extra) {
  return Object.assign({
    id: id, name: name, type: type, lat: lat, lng: lng,
    applicationStart: null, deadline: null,
    fee: null, feeNote: "", admissionFee: null,
    testDate: "", seats: null, units: [], note: "", website: "",
    about: "", address: "", phone: "", email: "",
    tuition: "", scholarship: "", programs: ""
  }, extra || {});
}

const universities = [

  // ---------- PUBLIC (2026-27 info, checked 22 November 2026) ----------
  uni("buet", "Bangladesh University of Engineering and Technology (BUET)", "public", 23.7265, 90.3925, {
    applicationStart: "2026-11-21", deadline: "2027-01-07",
    fee: 1300, feeNote: "Tk 1,300 or 1,500 depending on department (2025-26 circular)",
    testDate: "1 February 2027 (moved from 16 January 2027)",
    note: "Deadline is reported as 7 or 8 January 2027. Confirm on the official website.",
    units: [{ name: "Engineering / Architecture / Planning", groups: ["Science"], min: [4.0, 5.0, null],
              note: "Also needs GPA 5.0 in Physics, Chemistry and Maths combined." }],
    website: "https://www.buet.ac.bd"
  }),

  uni("bup", "Bangladesh University of Professionals", "public", 23.8393, 90.3595, {
    fee: 1100, feeNote: "2025-26 figure. 2026-27 fee not confirmed.",
    testDate: "FBS: 1 January 2027 and 9 January 2027, FASS: 2 January 2027, FST/FET: 8 January 2027 (BUP notice of August 2026, may be revised)",
    note: "2026-27 application dates are not added yet. The GPA rules below are from the 2025-26 circular and are not confirmed for 2026-27. Check the official website.",
    units: [
      { name: "FBS (Business Studies)", groups: ["Science"], min: [null, null, 8.5] },
      { name: "FBS (Business Studies)", groups: ["Business"], min: [null, null, 8.0] },
      { name: "FBS (Business Studies)", groups: ["Humanities"], min: [null, null, 7.5] },
      { name: "FASS (Arts & Social Science)", groups: ["Science", "Business"], min: [null, null, 8.0] },
      { name: "FASS (Arts & Social Science)", groups: ["Humanities"], min: [null, null, 7.5] }
    ],
    website: "https://admission.bup.edu.bd"
  }),

  uni("du", "Dhaka University", "public", 23.7340, 90.3928, {
    applicationStart: "2026-11-11", deadline: "2026-11-25", fee: 1200,
    feeNote: "Arts/Law/Social Sci, Science, Business: Tk 1,200. Fine Arts: Tk 1,400. IBA: Tk 1,500.",
    testDate: "IBA: 5 December 2026, Science: 12 December 2026, Arts: 19 December 2026, Fine Arts: 22 December 2026, Business: 26 December 2026",
    note: "SSC must be passed 2021-2024 and HSC in 2026. GPA includes the 4th subject.",
    units: [
      { name: "Science Unit", groups: ["Science"], min: [3.5, 3.5, 8.0] },
      { name: "Science Unit (for Humanities/Business students)", groups: ["Humanities", "Business"], min: [3.0, 3.0, 7.5] },
      { name: "Arts, Law & Social Sciences Unit", groups: ["Humanities", "Business"], min: [3.0, 3.0, 7.5] },
      { name: "Arts, Law & Social Sciences Unit (for Science students)", groups: ["Science"], min: [3.5, 3.5, 8.0] },
      { name: "Business Studies Unit", groups: ["Business", "Humanities"], min: [3.0, 3.0, 7.5] },
      { name: "Business Studies Unit (for Science students)", groups: ["Science"], min: [3.5, 3.5, 8.0] },
      { name: "Fine Arts Unit", groups: ["Science", "Business", "Humanities"], min: [3.0, 3.0, 6.5] },
      { name: "IBA Unit", groups: ["Science", "Business", "Humanities"], min: [3.5, 3.5, 8.0] }
    ],
    website: "https://admission.eis.du.ac.bd"
  }),

  uni("ju", "Jahangirnagar University", "public", 23.8800, 90.2670, {
    applicationStart: "2026-11-22", deadline: "2026-12-15", fee: 800,
    feeNote: "Units A-D: Tk 800. Unit E: Tk 700. C1 and IBA-JU: Tk 600. (+1.2% service charge)",
    testDate: "10 January 2027 to 21 January 2027",
    seats: "1848 (A 424, B 396, C 402, C1 64, D 316, E 176, IBA-JU 70)",
    units: [
      { name: "Unit A (Mathematical & Physical Sciences)", groups: ["Science"], min: [3.5, 3.5, 7.5] },
      { name: "Unit B (Social Sciences & Law)", groups: ["Science"], min: [3.5, 3.5, 7.5] },
      { name: "Unit B (Social Sciences & Law)", groups: ["Humanities", "Business"], min: [3.0, 3.0, 6.5] },
      { name: "Unit C (Arts & Humanities)", groups: ["Science", "Business"], min: [3.5, 3.5, 7.5] },
      { name: "Unit C (Arts & Humanities)", groups: ["Humanities"], min: [3.0, 3.0, 6.5] },
      { name: "Unit C1 (Drama & Fine Arts)", groups: ["Science", "Business", "Humanities"], min: [3.0, 3.0, 6.5] },
      { name: "Unit D (Biological Sciences)", groups: ["Science"], min: [3.5, 3.5, 8.0] },
      { name: "Unit E (Business Studies)", groups: ["Science"], min: [3.5, 3.5, 7.5] },
      { name: "Unit E (Business Studies)", groups: ["Humanities", "Business"], min: [3.0, 3.0, 6.5] },
      { name: "IBA-JU", groups: ["Science"], min: [3.5, 3.5, 7.5] },
      { name: "IBA-JU", groups: ["Humanities", "Business"], min: [3.0, 3.0, 6.5] }
    ]
  }),

  uni("cuet", "Chittagong University of Engineering & Technology (CUET)", "public", 22.4633, 91.9714, {
    note: "2026-27 dates, fees and eligibility not added yet - check the official website."
  }),

  uni("ruet", "Rajshahi University of Engineering & Technology (RUET)", "public", 24.3636, 88.6241, {
    testDate: "28 January 2027",
    note: "Application dates and fees not added yet - check the official website.",
    units: [{ name: "Engineering / Architecture", groups: ["Science"], min: [null, null, null],
              note: "HSC: combined GPA of 13 in Maths, Physics and Chemistry, with at least 4 in each. SSC rule not confirmed." }]
  }),

  uni("kuet", "Khulna University of Engineering & Technology (KUET)", "public", 22.8993, 89.5026, {
    testDate: "8 January 2027",
    note: "Application dates, fees and eligibility not added yet - check the official website."
  }),

  uni("cu", "University of Chittagong", "public", 22.4724, 91.7860, {
    applicationStart: "2026-11-15", deadline: "2026-12-10", fee: 1000,
    feeNote: "Tk 1,000 per unit (2025-26 figure, 2026-27 not confirmed)",
    testDate: "C: 29 January 2027, A: 30 January 2027, B1: 3 February 2027, B2: 4 February 2027, B: 5 February 2027, D: 6 February 2027, D1: 8 February 2027",
    note: "GPA rules not added yet - check the official circular."
  }),

  uni("ru", "Rajshahi University", "public", 24.3733, 88.6430, {
    applicationStart: "2026-11-15", deadline: "2026-11-30", fee: 1100,
    feeNote: "2025-26 fees were Tk 1,320 (A, C units) and Tk 1,100 (B unit). 2026-27 not confirmed.",
    testDate: "B Unit: 12 February 2027, C Unit: 13 February 2027, A Unit: 20 February 2027",
    note: "A separate 7-day window is planned for supplementary exam candidates. Humanities/Business combined GPA rule not confirmed.",
    units: [
      { name: "C Unit (Science)", groups: ["Science"], min: [3.5, 3.5, 7.0] },
      { name: "A Unit (Humanities)", groups: ["Humanities"], min: [3.0, 3.0, null] },
      { name: "B Unit (Business Studies)", groups: ["Business"], min: [3.0, 3.0, null] }
    ]
  }),

  uni("gst", "GST", "public", null, null, {
    note: "2026-27 schedule not confirmed yet. Check the official GST admission website."
  }),

  uni("mist", "Military Institute of Science and Technology", "public", 23.8403, 90.3715, {
    testDate: "18 December 2026 to 19 December 2026 (reported in August, may have changed)",
    note: "Application dates, fees and eligibility not added yet - check the official website.",
    website: "https://mist.ac.bd"
  }),

  // ---------- PRIVATE ----------
  uni("brac", "BRAC University", "private", 23.7806, 90.4075),
  uni("nsu", "North South University", "private", 23.8151, 90.4254),
  uni("aiub", "American International University-Bangladesh", "private", 23.7945, 90.4044),
  uni("uiu", "United International University", "private", 23.7977, 90.4496),
  uni("diu", "Daffodil International University", "private", 23.8770, 90.3200),
  uni("aust", "Ahsanullah University of Science and Technology", "private", 23.7640, 90.4065),
  uni("ewu", "East West University", "private", 23.7684, 90.4253),
  uni("seu", "Southeast University", "private", 23.7937, 90.4043),
  uni("ulab", "University of Liberal Arts Bangladesh", "private", 23.7461, 90.3742),
  uni("iub", "Independent University, Bangladesh", "private", 23.8149, 90.4259)
];

// Cities for the "Your location" dropdown (approximate centre points)
const cities = {
  "Dhaka": [23.8103, 90.4125], "Chattogram": [22.3569, 91.7832],
  "Rajshahi": [24.3745, 88.6042], "Khulna": [22.8456, 89.5403],
  "Sylhet": [24.8949, 91.8687], "Barishal": [22.7010, 90.3535],
  "Rangpur": [25.7439, 89.2752], "Mymensingh": [24.7471, 90.4203],
  "Comilla": [23.4607, 91.1809], "Bogura": [24.8465, 89.3773],
  "Cox's Bazar": [21.4272, 92.0058], "Jessore": [23.1664, 89.2081]
};

// Distance in km between two points (Haversine formula)
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Saved location helpers (remembered between pages)
function getLocation() {
  const s = localStorage.getItem("myLocation");
  return s ? JSON.parse(s) : null;
}
function saveLocation(lat, lng, label) {
  localStorage.setItem("myLocation", JSON.stringify({ lat: lat, lng: lng, label: label }));
}
function distanceTo(u) {
  const loc = getLocation();
  if (!loc || u.lat === null) return null;
  return distanceKm(loc.lat, loc.lng, u.lat, u.lng);
}

// 2026-11-25  ->  25 November 2026
function formatDate(iso) {
  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
  const p = iso.split("-");
  return Number(p[2]) + " " + months[Number(p[1]) - 1] + " " + p[0];
}

function deadlineStatus(u) {
  if (!u.deadline) return "Not added yet";
  const closed = new Date(u.deadline + "T23:59:59") < new Date();
  return formatDate(u.deadline) + (closed ? " (Closed)" : " (Open)");
}