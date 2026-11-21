// find which university from the link: university.html?id=buet
const id = new URLSearchParams(location.search).get("id");
const u = universities.find(function (x) { return x.id === id; });
const NA = "Not added yet - check official website";

// turns [3.5, 3.5, 8.0] into "SSC 3.5, HSC 3.5, Total 8"
function minText(m) {
  const parts = [];
  if (m[0] !== null) parts.push("SSC " + m[0]);
  if (m[1] !== null) parts.push("HSC " + m[1]);
  if (m[2] !== null) parts.push("Total " + m[2]);
  return parts.length ? parts.join(", ") : "see note";
}

// one labelled section
function block(title, value) {
  return '<div class="block"><h4>' + title + '</h4><div class="value">' + (value || NA) + '</div></div>';
}

// one quick-fact tile at the top
function stat(label, value) {
  return '<div class="stat card-box"><span>' + label + '</span><b>' + (value || "Not added yet") + '</b></div>';
}

// days left until the deadline
function daysLeft(u) {
  if (!u.deadline) return "";
  const days = Math.ceil((new Date(u.deadline + "T23:59:59") - new Date()) / 86400000);
  if (days < 0) return " - closed " + Math.abs(days) + " days ago";
  return " - " + days + " days left";
}

// "15 November 2026 to 30 November 2026"
function applicationPeriod(u) {
  if (u.applicationStart && u.deadline) return formatDate(u.applicationStart) + " to " + formatDate(u.deadline);
  if (u.applicationStart) return "Opens " + formatDate(u.applicationStart) + " (deadline not announced)";
  if (u.deadline) return "Until " + formatDate(u.deadline);
  return "";
}

if (!u) {
  document.body.innerHTML = '<p style="padding:20px">University not found. <a href="index.html">Go back</a></p>';
} else {
  document.title = u.name;
  document.getElementById("uniName").innerHTML = u.name;
  const typeTag = document.getElementById("uniType");
  typeTag.innerHTML = u.type;
  typeTag.className = "badge " + u.type;

  const d = distanceTo(u);

  // quick facts
  document.getElementById("stats").innerHTML =
    stat("Application deadline", u.deadline ? deadlineStatus(u) : "") +
    stat("Application fee", u.fee === null ? "" : u.fee + " Tk") +
    stat("Admission test", u.testDate ? "See details below" : "") +
    stat("Distance from you", d === null ? "Choose location on home page" : Math.round(d) + " km");

  const unitText = u.units.length
    ? u.units.map(function (x) {
        return '<div class="unit"><b>' + x.name + '</b>' +
               '<div>Who can apply: ' + x.groups.join(", ") + '</div>' +
               '<div>Minimum GPA: ' + minText(x.min) + '</div>' +
               (x.note ? '<div class="small">' + x.note + '</div>' : "") + '</div>';
      }).join("")
    : "";

  const contact = [
    u.address ? "Address: " + u.address : "",
    u.phone ? "Phone: " + u.phone : "",
    u.email ? "Email: " + u.email : ""
  ].filter(Boolean).join("<br>");

  const links =
    (u.website ? '<a class="linkbtn" href="' + u.website + '" target="_blank">Official website</a>' : "") +
    (u.lat !== null ? '<a class="linkbtn light" href="https://www.google.com/maps?q=' + u.lat + ',' + u.lng + '" target="_blank">See on map</a>' : "");

  document.getElementById("info").innerHTML =
    block("About", u.about) +
    block("Application period", applicationPeriod(u) + (u.deadline ? '<div class="small">' + deadlineStatus(u) + daysLeft(u) + '</div>' : "")) +
    block("Admission test date", u.testDate) +
    block("Application fee", u.fee === null ? "" : u.fee + " Tk" + (u.feeNote ? '<div class="small">' + u.feeNote + '</div>' : "")) +
    block("Admission / tuition fee", (u.admissionFee === null ? "" : u.admissionFee + " Tk<br>") + u.tuition) +
    block("Units, who can apply and minimum GPA", unitText) +
    block("Programs / departments", u.programs) +
    block("Total seats", u.seats) +
    block("Scholarship / waiver", u.scholarship) +
    block("Contact", contact) +
    (u.note ? '<div class="note"><b>Note:</b> ' + u.note + '</div>' : "") +
    (links ? '<div class="links">' + links + '</div>' : "");
}

function checkEligibility() {
  const ssc = Number(document.getElementById("ssc").value);
  const hsc = Number(document.getElementById("hsc").value);
  const group = document.getElementById("group").value;
  const out = document.getElementById("result");

  function show(cls, html) { out.className = cls; out.innerHTML = html; }

  if (!ssc || !hsc || !group) { show("warn", "Please fill all fields."); return; }
  if (!u.units.length) { show("warn", "Requirements not added yet for this university. Check the official website."); return; }

  const forGroup = u.units.filter(function (x) { return x.groups.includes(group); });
  if (!forGroup.length) { show("no", "<b>Not eligible</b><br>No unit here accepts your group."); return; }

  const total = ssc + hsc;
  const ok = forGroup.filter(function (x) {
    const m = x.min;
    return (m[0] === null || ssc >= m[0]) && (m[1] === null || hsc >= m[1]) && (m[2] === null || total >= m[2]);
  });

  if (!ok.length) {
    show("no", "<b>Not eligible</b><br>Your GPA is below the minimum for your group.<br><br>" +
      forGroup.map(function (x) { return x.name + ": " + minText(x.min); }).join("<br>"));
    return;
  }

  show("ok", "<b>You are eligible to apply!</b><br>You can apply to:<br>" +
    ok.map(function (x) { return "&bull; " + x.name + (x.note ? " <i>(" + x.note + ")</i>" : ""); }).join("<br>"));
}