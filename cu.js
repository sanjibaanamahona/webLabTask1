const u = {"id": "cu", "name": "University of Chittagong", "type": "public", "applicationStart": "2026-11-15", "deadline": "2026-12-10", "fee": 1000, "feeNote": "Tk 1,000 per unit (2025-26 figure, 2026-27 not confirmed)", "testDate": "C: 29 January 2027, A: 30 January 2027, B1: 3 February 2027, B2: 4 February 2027, B: 5 February 2027, D: 6 February 2027, D1: 8 February 2027", "note": "GPA rules not added yet - check the official circular.", "units": [], "website": ""};
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function date(iso){if(!iso)return "Not added yet";const p=iso.split("-");const m=["January","February","March","April","May","June","July","August","September","October","November","December"];return Number(p[2])+" "+m[Number(p[1])-1]+" "+p[0];}
function deadlineStatus(){if(!u.deadline)return "Not added yet";return date(u.deadline)+(new Date(u.deadline+"T23:59:59")<new Date()?" (Closed)":" (Open)");}
document.title=u.name+" | Admission Orbit";
document.getElementById("uniName").textContent=u.name;
document.getElementById("uniType").textContent=u.type;
let stats=`<div class="stat card-box"><span>Application deadline</span><b>${esc(deadlineStatus())}</b></div>
<div class="stat card-box"><span>Application fee</span><b>${u.fee==null?"Not added yet":esc(u.fee+" Tk")}</b></div>
<div class="stat card-box"><span>Application opens</span><b>${esc(date(u.applicationStart))}</b></div>
<div class="stat card-box"><span>Admission test</span><b>${u.testDate?"See details below":"Not added yet"}</b></div>`;
document.getElementById("stats").innerHTML=stats;
const application=u.applicationStart&&u.deadline?date(u.applicationStart)+" to "+date(u.deadline):u.applicationStart?"Opens "+date(u.applicationStart):u.deadline?"Until "+date(u.deadline):"Not added yet";
const fee=u.fee==null?"Not added yet":esc(u.fee+" Tk")+(u.feeNote?`<div class="small">${esc(u.feeNote)}</div>`:"");
let unitHTML=u.units.map(x=>{let min=[];if(x.min[0]!=null)min.push("SSC "+x.min[0]);if(x.min[1]!=null)min.push("HSC "+x.min[1]);if(x.min[2]!=null)min.push("Total "+x.min[2]);return `<div class="unit"><b>${esc(x.name)}</b><div>Who can apply: ${esc(x.groups.join(", "))}</div><div>Minimum GPA: ${min.length?esc(min.join(", ")):"See official requirements"}</div>${x.note?`<div class="small">${esc(x.note)}</div>`:""}</div>`;}).join("");
let info=`<div class="block"><h4>About</h4><div class="value">Not added yet</div></div>
<div class="block"><h4>Application period</h4><div class="value">${esc(application)}</div></div>
<div class="block"><h4>Admission test date</h4><div class="value">${esc(u.testDate||"Not added yet")}</div></div>
<div class="block"><h4>Application fee</h4><div class="value">${fee}</div></div>
<div class="block"><h4>Admission / tuition fee</h4><div class="value">Not added yet</div></div>
<div class="block"><h4>Units and GPA requirements</h4><div class="value">${unitHTML||"Not added yet"}</div></div>
<div class="block"><h4>Programs / departments</h4><div class="value">Not added yet</div></div>
<div class="block"><h4>Total seats</h4><div class="value">Not added yet</div></div>
<div class="block"><h4>Scholarship / waiver</h4><div class="value">Not added yet</div></div>
<div class="block"><h4>Contact</h4><div class="value">Not added yet</div></div>
<div class="block"><h4>Location</h4><div class="value">Not added yet</div></div>
${u.note?`<div class="note"><b>Note:</b> ${esc(u.note)}</div>`:""}
${u.website?`<div class="links"><a class="linkbtn" href="${esc(u.website)}" target="_blank" rel="noopener noreferrer">Official website</a></div>`:""}`;
document.getElementById("info").innerHTML=info;
function checkEligibility(){
 const s=document.getElementById("ssc").value,h=document.getElementById("hsc").value,g=document.getElementById("group").value,r=document.getElementById("result");
 if(s===""||h===""||!g){r.className="warn";r.textContent="Please fill all fields.";return;}
 const a=Number(s),b=Number(h);if(!Number.isFinite(a)||!Number.isFinite(b)||a<0||a>5||b<0||b>5){r.className="warn";r.textContent="Please enter GPA between 0 and 5.";return;}
 if(!u.units.length){r.className="warn";r.textContent="Requirements not added yet. Check the official website.";return;}
 const matches=u.units.filter(x=>x.groups.includes(g));if(!matches.length){r.className="no";r.textContent="Not eligible: no listed unit accepts your group.";return;}
 let eligible=[],possible=[],failed=[];matches.forEach(x=>{const m=x.min;let unknown=m.some(v=>v==null),fail=(m[0]!=null&&a<m[0])||(m[1]!=null&&b<m[1])||(m[2]!=null&&a+b<m[2]);if(fail)failed.push(x.name);else if(unknown)possible.push(x.name);else eligible.push(x.name);});
 let html="";if(eligible.length){r.className="ok";html="<b>You meet the listed GPA requirements for:</b><br>"+eligible.map(esc).join("<br>");}
 else if(possible.length){r.className="warn";html="<b>Eligibility needs confirmation for:</b><br>"+possible.map(esc).join("<br>");}
 else{r.className="no";html="<b>Not eligible based on the listed GPA requirements.</b>";}
 if(eligible.length&&possible.length)html+="<br><br><b>Needs confirmation:</b><br>"+possible.map(esc).join("<br>");
 if(failed.length)html+="<br><br><b>Below listed GPA requirement:</b><br>"+failed.map(esc).join("<br>");
 r.innerHTML=html;
}