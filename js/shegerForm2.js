document.addEventListener("DOMContentLoaded", () => {
  // Fetch the query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("meal");

  // Check if mealId is present
  if (!mealId) {
    console.error("No meal ID provided in the URL.");
    return;
  }

  // Function to fetch JSON data
  async function fetchMealData() {
    try {
      const response = await fetch("../mealInfo.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      populateMeal(data);
    } catch (error) {
      console.error("Failed to fetch meal data:", error);
    }
  }

  // Function to populate the meal information
  function populateMeal(data) {
    const mealData = data[mealId];
    if (!mealData) {
      console.error("Meal ID not found in JSON data.");
      return;
    }

    // Populate the HTML elements
    document.getElementById("foodImage").src =
      mealData.image || "../img/default.jpg";
    document.getElementById("mealTitle").textContent =
      mealData.title || "No Title";
    document.getElementById("placeName").textContent =
      mealData.placeName || "No Place";
    document.getElementById("price").textContent = mealData.price || "No Price";
    document.getElementById("portionSize").textContent =
      mealData.portionSize || "No Portion Size";
    document.getElementById("locationTip").textContent =
      mealData.location || "No Location Tip";
    document.getElementById("quickTip").textContent =
      mealData.quickTip || "No Quick Tip";

    // Update star ratings
    const stars = document.querySelectorAll(".cStar img");
    stars.forEach((star, index) => {
      if (index < mealData.rating) {
        star.src = "../img/iconstar.png";
      } else {
        star.style.display = "none";
      }
    });

    // Update GPS location button
    const locationBtn = document.getElementById("locationBtn");
    if (mealData.gpsUrl) {
      locationBtn.addEventListener("click", () => {
        window.open(mealData.gpsUrl, "_blank");
      });
    } else {
      locationBtn.disabled = true; // Disable the button if no GPS URL is provided
    }
  }

  // Call the function to fetch the meal data
  fetchMealData();

  // Event listeners for star rating
  const GoldStar = "../img/goldstar.png";
  const whiteStar = "../img/iconstar.png";
  const stars = document.querySelectorAll(".cStar img");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      if (star.src.includes("iconstar.png")) {
        star.src = GoldStar;
      } else {
        star.src = whiteStar;
      }
    });
  });

  // Event listener for image download
  document.getElementById("downloadImage").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = document.getElementById("foodImage").src;
    link.download = "MealImage.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Translation toggle
  let isTranslated = false;
  const translateBtn = document.getElementById("translate-btn");
  const quickTipElement = document.getElementById("quickTip");
  translateBtn.addEventListener("click", () => {
    if (!isTranslated) {
      const amharicText = "ይህ ነው ወደ አማርኛ ተተርጉሟል።";
      quickTipElement.textContent = amharicText;
      isTranslated = true;
    } else {
      quickTipElement.textContent =
        document.getElementById("quickTip").textContent;
      isTranslated = false;
    }
  });
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
