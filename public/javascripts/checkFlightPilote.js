
let createBtn = document.getElementById("createBtn");
createBtn.onclick = checkData;

// const checkDeparture;
// const checkDestination;
// const checkAirCraft;
// const checkPrice;


function checkData(e) {
//createBtn.setAttribute("disabled", "");  
const fieldDepart = document.getElementsByName("Departure")[0].value;
const fieldDest = document.getElementsByName("Destination")[0].value;
const fieldAirCraft = document.getElementsByName("Aircraft")[0].value;
const fieldImmatr = document.getElementsByName("immatriculation")[0].value;
const fieldNbSeats = document.getElementsByName("numberOfSeats")[0].value;
const fieldAvailSeats = document.getElementsByName("availableSeats")[0].value;
const fieldPrice = document.getElementsByName("Price")[0].value;
//const fieldDescr = document.getElementsByName("Description")[0].value;

// Check departure
if(!fieldDepart){
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("departure");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should fill a departure";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

    parentDiv.onchange = (e) => {
        parentDiv.removeChild(newLineHtml);
        createBtn.removeAttribute("disabled", "");
    }
}

//Check Destination
if(!fieldDest){
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("destination");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should fill a destination";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

    parentDiv.onchange = (e) => {
        parentDiv.removeChild(newLineHtml);
        createBtn.removeAttribute("disabled", "");
    }
}

// Check Aircraft
if(fieldAirCraft === "-1"){
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("aircraft");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should select an Aircraft";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

    parentDiv.onchange = (e) => {
        parentDiv.removeChild(newLineHtml);
        createBtn.removeAttribute("disabled", "");
    }
}

// Check Immatriculation
if(!fieldImmatr){
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("immatriculation");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should fill an immatriculation";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

    parentDiv.onchange = (e) => {
        parentDiv.removeChild(newLineHtml);
        createBtn.removeAttribute("disabled", "");
    }
}

//Check NbSeat
if(!fieldNbSeats){
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("nbSeat");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should fill a number";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

    parentDiv.onchange = (e) => {
        parentDiv.removeChild(newLineHtml);
        createBtn.removeAttribute("disabled", "");
    }
}

//Check availSeat
if(!fieldAvailSeats){
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("availSeat");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should fill a number";
    newLineHtml.style.color= "red";
    parentDiv.appendChild(newLineHtml);

    parentDiv.onchange = (e) => {
        parentDiv.removeChild(newLineHtml);
        createBtn.removeAttribute("disabled", "");
    }
}

console.log("Numnber?",Number(fieldPrice));

//Check availSeat
if(!fieldPrice || !Number(fieldPrice)){
    console.log("Numnber?",Number(fieldPrice));
    createBtn.setAttribute("disabled", "");  
    const parentDiv = document.getElementById("Price");
    const newLineHtml = document.createElement("div");
    newLineHtml.innerHTML = "You should fill a number";
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