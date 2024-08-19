const imageUrl = "../img/food1.jpg";

const imgElement = document.getElementById("foodImage");
imgElement.src = imageUrl;

const locationUrl =
  "https://www.bing.com/maps?mepi=0%7E%7EUnknown%7EAddress_Link&ty=18&q=Ethiopian+Skylight+Hotel&ss=ypid.YN8055x15108076698675560561&ppois=8.98766040802002_38.79039764404297_Ethiopian+Skylight+Hotel_YN8055x15108076698675560561%7E&cp=8.987666%7E38.790407&v=2&sV=1&FORM=MPSRPL&lvl=16.0";
const locationBtn = document.getElementById("locationBtn");
locationBtn.addEventListener("click", function () {
  window.open(locationUrl, "_blank");
});

let placeName = "Mest Restaurant";
document.getElementById("placeName").innerHTML = placeName;

let foodName = "Full Agelgil";
document.getElementById("foodName").innerHTML = foodName;

let Reviews = "3.3K Reviews";
document.getElementById("reviews").innerHTML = Reviews;

// quickTip
let locationTip =
  "Summit Fiyel Bet, next to pommy clinic.Across the road from Debonairs.";
document.getElementById("locationTip").innerHTML = locationTip;

//likeFood
const whiteHeart = "../img/whiteheart.png";
const redHeart = "../img/iconsheart.png";
const heart = document.getElementById("likeFood");
heart.addEventListener("click", function () {
  if (heart.src.includes("iconsheart.png")) {
    heart.src = whiteHeart;
  } else {
    heart.src = redHeart;
  }
});

//downloadImage
document.getElementById("downloadImage").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "Sweet Burger.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

//meal populate info
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("meal");

  // Fetch the meal information from the JSON file
  if (mealId) {
    fetch("../mealInfo.json")
      .then((response) => response.json())
      .then((data) => {
        const meal = data[mealId];

        if (meal) {
          // Update HTML elements with meal data
          document.getElementById("foodImage").src = meal.image;
          document.getElementById("foodImage").alt = meal.title;
          document.getElementById("foodName").textContent = meal.title;
          document.getElementById("placeName").textContent = meal.title;

          document.getElementById("locationTip").textContent =
            meal.description || "No description available.";
        } else {
          console.error("Meal not found");
        }
      })
      .catch((error) => console.error("Error fetching meal info:", error));
  } else {
    console.error("Meal ID not provided");
  }
});

//meal id for view2
document.addEventListener("DOMContentLoaded", () => {
  // Extract mealId from the current page's URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentMealId = urlParams.get("meal") || "defaultMealId"; // Fallback if no mealId is found

  // Set the href of the link dynamically
  const viewListLink = document.getElementById("viewListLink");
  if (viewListLink) {
    viewListLink.href = `../html/view2.html?meal=${currentMealId}`;
  } else {
    console.error("Element with ID 'viewListLink' not found.");
  }
});

//back to prev page
document.addEventListener("DOMContentLoaded", () => {
  const backLink = document.getElementById("backLink");
  if (backLink) {
    backLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.back();
    });
  } else {
    console.error("Element with ID 'backLink' not found.");
  }
});

/// SHARE ----
document.getElementById("share").addEventListener("click", function (event) {
  document.getElementById("shareBoxContainer").style.display = "block";
});

// Function to close the share box
function closeShareBox() {
  document.getElementById("shareBoxContainer").style.display = "none";
}

document.getElementById("share").addEventListener("click", function (event) {
  document.getElementById("shareBoxContainer").style.display = "block";
});
