import APIHandler from "./apiHandlers.js";
//const stylesApi = new APIHandler("/api/styles");
const stylesApi = new APIHandler("http://localhost:3030");

editListeners();

function editListeners() {
  const inputDepart = document.getElementById("departure");
  if (inputDepart) {
    inputDepart.oninput = (e) => {
      // if(e.target.value.length>0){
      stylesApi
        .findAll(e.target.value)
        .then((apiResponse) => {
          const parentDiv = document.querySelector(".card-box");
          parentDiv.innerHTML = "";
          apiResponse.data.forEach((travel) => {
            const findTravel = document.createElement("div");
            findTravel.className = "property-card";
            findTravel.setAttribute("data-aos", "zoom-in");
            findTravel.innerHTML += `
              <div id="bouttonSee" class="property-image">
              <img id="imageSee" class="size-image" class="image" src="/images/rusty-watson-Xo7MkRUKNPQ-unsplash.jpg" alt="" srcset="">
              <div class="property-image-title">
                  <form action="/book/${travel._id}" method="post">
                      <button class="ui primary button" name="book">See this flight</button>
                  </form>
              </div>
          </div>   
          <div id="textSee" class="property-description">
          <h5>Destination: ${travel.Destination}</h5>
          <p>Departure: ${travel.Departure}</p>
          <p>Price : ${travel.Price}€</p>
          <p>Available Seats : ${travel.availableSeats}</p>
      </div>  `;
            parentDiv.appendChild(findTravel);
            console.log(travel.Destination);
          });
        })
        .catch((apiError) => {
          console.log(apiError);
        });
    };
  }
}
