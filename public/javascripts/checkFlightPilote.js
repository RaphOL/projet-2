
let createBtn = document.getElementById("createBtn");
createBtn.onclick = checkData;

// const checkDeparture;
// const checkDestination;
// const checkAirCraft;
// const checkPrice;


function checkData(e) {
createBtn.setAttribute("disabled", "");  
const fieldDepart = document.getElementsByName("Departure")[0].value;
const fieldDest = document.getElementsByName("Destination")[0].value;
const fieldAirCraft = document.getElementsByName("Aircraft")[0].value;
const fieldImmatr = document.getElementsByName("immatriculation")[0].value;
const fieldNbSeats = document.getElementsByName("numberOfSeats")[0].value;
const fieldAvailSeats = document.getElementsByName("availableSeats")[0].value;
const fieldPrid = document.getElementsByName("Price")[0].value;
//const fieldDescr = document.getElementsByName("Description")[0].value;

if(fieldAirCraft === "-1"){
    const parentDiv = document.getElementById("test");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "Vous devez selectionner un Aircraft";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

parentDiv.onchange = (e) => {
    parentDiv.removeChild(newLineHtml);
    createBtn.removeAttribute("disabled", "");
}


}

if (fieldDepart && fieldDest && fieldAirCraft!=-1){
    console.log("super: ", fieldAirCraft);
}


};