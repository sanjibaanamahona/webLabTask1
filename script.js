let currentType = "public";

// fill the city dropdown
const citySelect = document.getElementById("city");
for (const name in cities) {
  citySelect.innerHTML += '<option value="' + name + '">' + name + '</option>';
}

// Open the Public or Private list
function showUniversities(type) {
  currentType = type;
  location.hash = type;                 // so the Back link from a university page returns here
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("universityPage").classList.remove("hidden");
  document.getElementById("pageTitle").innerHTML =
    type === "public" ? "Public Universities" : "Private Universities";
  render();
}

// Back to the home page
function goBack() {
  history.replaceState(null, "", "index.html");
  document.getElementById("universityPage").classList.add("hidden");
  document.getElementById("homePage").classList.remove("hidden");
}

function chooseCity() {
  const name = citySelect.value;
  if (name) { saveLocation(cities[name][0], cities[name][1], name); render(); }
}

function useGPS() {
  navigator.geolocation.getCurrentPosition(function (p) {
    saveLocation(p.coords.latitude, p.coords.longitude, "your GPS location");
    render();
  }, function () { alert("Could not get location. Please choose a city instead."); });
}

// Draw the university buttons
function render() {
  const loc = getLocation();
  document.getElementById("locText").innerHTML =
    loc ? "Distances measured from: <b>" + loc.label + "</b>"
        : "Choose your location to see distances.";

  let list = universities.filter(function (u) { return u.type === currentType; });

  const sort = document.getElementById("sort").value;
  list.sort(function (a, b) {
    // empty values always go to the bottom
    if (sort === "alpha") return a.name.localeCompare(b.name);
    if (sort === "distance") return (distanceTo(a) ?? 1e9) - (distanceTo(b) ?? 1e9);
    if (sort === "deadline") return (a.deadline || "9999").localeCompare(b.deadline || "9999");
    if (sort === "fee") return (a.fee ?? 1e9) - (b.fee ?? 1e9);
  });

  const box = document.getElementById("universityList");
  box.innerHTML = "";
  list.forEach(function (u) {
    const d = distanceTo(u);
    box.innerHTML +=
      '<a class="uni-btn" href="university.html?id=' + u.id + '">' +
        '<b>' + u.name + '</b>' +
        
'<span>' +
  'Distance: ' + (d === null ? "N/A" : Math.round(d) + " km") + ' &nbsp;|&nbsp; ' +
  'Admission Date: ' + (u.deadline ? formatDate(u.deadline) : "Not added") + ' &nbsp;|&nbsp; ' +
  'Admission Fee: ' + (u.admissionFee === null ? "Not added" : u.admissionFee + " Tk") +
'</span>' +
 +
      '</a>';
  });
}

// If we arrive from a university page (index.html#public), open that list directly
if (location.hash === "#public" || location.hash === "#private") {
  showUniversities(location.hash.replace("#", ""));
}