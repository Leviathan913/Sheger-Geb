document.addEventListener("DOMContentLoaded", () => {
  const mealSlides = document.getElementById("mealSlides");

  // Fetch meals
  fetch("https://your-wordpress-site.com/wp-json/wp/v2/meal?_embed")
    .then((response) => response.json())
    .then((meals) => {
      mealSlides.innerHTML = "";

      meals.forEach((meal, index) => {
        const mealDiv = document.createElement("div");
        mealDiv.className = "meal";

        const miniSlideDiv = document.createElement("div");
        miniSlideDiv.className = "mini_slide";

        const img = document.createElement("img");
        img.src = meal._embedded["wp:featuredmedia"][0].source_url;
        img.alt = meal.title.rendered;
        img.className = index === 0 ? "active" : "";

        const video = document.createElement("video");
        video.src = meal.acf.video;
        video.controls = true;

        if (index === 0) {
          video.className = "active";
        }

        miniSlideDiv.appendChild(img);
        miniSlideDiv.appendChild(video);

        const dotsContainer = document.createElement("div");
        dotsContainer.className = "dots";

        // Create and add dots
        const dotImg = document.createElement("span");
        dotImg.className = `dot ${index === 0 ? "active" : ""}`;

        dotImg.onclick = () => {
          showSlide(miniSlideDiv, 1); // Show image
        };

        const dotVid = document.createElement("span");
        dotVid.className = `dot ${index === 0 ? "" : "active"}`;

        dotVid.onclick = () => {
          showSlide(miniSlideDiv, 2); // Show video
        };

        dotsContainer.appendChild(dotImg);
        dotsContainer.appendChild(dotVid);

        mealDiv.appendChild(miniSlideDiv);
        mealDiv.appendChild(dotsContainer);

        const h2 = document.createElement("h2");
        h2.innerText = meal.title.rendered;

        mealDiv.appendChild(h2);
        mealSlides.appendChild(mealDiv);
      });
    });

  // minislide dot and swipe
  function showSlide(container, slideNumber) {
    const slides = container.querySelectorAll("img, video");
    const dots = container.nextElementSibling.querySelectorAll(".dot");

    // Ensure the slideNumber is within the correct range
    if (slideNumber > slides.length) {
      slideNumber = 1;
    }
    if (slideNumber < 1) {
      slideNumber = slides.length;
    }

    // Deactivate all slides and dots
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Activate the correct slide and corresponding dot
    slides[slideNumber - 1].classList.add("active");
    dots[slideNumber - 1].classList.add("active");

    // Ensure the video slides are correctly handled
    if (slides[slideNumber - 1].tagName === "VIDEO") {
      slides[slideNumber - 1].play(); // Play the video if it's a video
    } else {
      slides.forEach((slide) => {
        if (slide.tagName === "VIDEO") {
          slide.pause(); // Pause any playing video if it's an image
        }
      });
    }
  }

  // Swipe and click functionality for mini slides
  document.querySelectorAll(".mini_slide").forEach((miniSlideDiv) => {
    let startX;

    // Touch event listeners for mobile
    miniSlideDiv.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    miniSlideDiv.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      const activeDot =
        miniSlideDiv.nextElementSibling.querySelector(".dot.active");
      let slideIndex =
        Array.from(
          miniSlideDiv.nextElementSibling.querySelectorAll(".dot")
        ).indexOf(activeDot) + 1;

      if (startX > endX + 30) {
        // Swipe left (next slide)
        slideIndex++;
      } else if (startX < endX - 30) {
        // Swipe right (previous slide)
        slideIndex--;
      }

      // Ensure the slideIndex wraps around correctly
      if (slideIndex > miniSlideDiv.querySelectorAll("img, video").length) {
        slideIndex = 1;
      } else if (slideIndex < 1) {
        slideIndex = miniSlideDiv.querySelectorAll("img, video").length;
      }

      showSlide(miniSlideDiv, slideIndex);
    });

    // Mouse event listeners for desktop
    miniSlideDiv.addEventListener("mousedown", (e) => {
      startX = e.clientX;
    });

    miniSlideDiv.addEventListener("mouseup", (e) => {
      let endX = e.clientX;
      const activeDot =
        miniSlideDiv.nextElementSibling.querySelector(".dot.active");
      let slideIndex =
        Array.from(
          miniSlideDiv.nextElementSibling.querySelectorAll(".dot")
        ).indexOf(activeDot) + 1;

      if (startX > endX + 30) {
        // Swipe left (next slide)
        slideIndex++;
      } else if (startX < endX - 30) {
        // Swipe right (previous slide)
        slideIndex--;
      }

      // Ensure the slideIndex wraps around correctly
      if (slideIndex > miniSlideDiv.querySelectorAll("img, video").length) {
        slideIndex = 1;
      } else if (slideIndex < 1) {
        slideIndex = miniSlideDiv.querySelectorAll("img, video").length;
      }

      showSlide(miniSlideDiv, slideIndex);
    });

    // Add click event listeners to dots
    miniSlideDiv.nextElementSibling
      .querySelectorAll(".dot")
      .forEach((dot, index) => {
        dot.addEventListener("click", () => {
          const activeDot =
            miniSlideDiv.nextElementSibling.querySelector(".dot.active");
          let currentIndex =
            Array.from(
              miniSlideDiv.nextElementSibling.querySelectorAll(".dot")
            ).indexOf(activeDot) + 1;
          let targetIndex = index + 1;

          if (targetIndex > currentIndex) {
            // Move forward
            currentIndex++;
          } else if (targetIndex < currentIndex) {
            // Move backward
            currentIndex--;
          } else {
            return;
          }

          // Ensure the slideIndex wraps around correctly
          if (
            targetIndex > miniSlideDiv.querySelectorAll("img, video").length
          ) {
            targetIndex = 1;
          } else if (targetIndex < 1) {
            targetIndex = miniSlideDiv.querySelectorAll("img, video").length;
          }

          showSlide(miniSlideDiv, targetIndex);
        });
      });
  });

  // Search form submission
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const query = document.getElementById("search").value.toLowerCase();
      const meals = document.querySelectorAll("#mealSlides .meal");

      meals.forEach((meal) => {
        const mealName = meal.querySelector("h2").innerText.toLowerCase();

        if (mealName.includes(query)) {
          meal.style.display = "block";
        } else {
          meal.style.display = "none";
        }
      });
    });
});

//current page
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  const page = path.substring(path.lastIndexOf("/") + 1);

  const navLinks = document.querySelectorAll(".nav_1 ul li a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href").endsWith(page)) {
      link.classList.add("active");
    }
  });
});

//navbox
function showNav() {
  document.getElementById("navBox").style.right = "0";
  document.querySelector("main").style.opacity = "0.3";
  document.getElementById("filter-sidebar").style.boxShadow = "none";
}

function hideNav() {
  document.getElementById("navBox").style.right = "-250px";
  document.querySelector("main").style.opacity = "1";
  document.getElementById("filter-sidebar").style.boxShadow =
    "2px 0 5px rgba(111, 116, 174, 0.1)";
}

//hide search_bar
document.addEventListener("scroll", function () {
  const searchBar = document.getElementById("search_bar");

  if (window.innerWidth <= 768) {
    if (window.scrollY > 1) {
      searchBar.classList.add("visible");
    } else {
      searchBar.classList.remove("visible");
    }
  }
});

//filter
function showFilterModal() {
  document.getElementById("filterModal").style.display = "block";
}

function hideFilterModal() {
  document.getElementById("filterModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const rangeInput = document.getElementById("price-range");
  const output = document.getElementById("price-output");

  output.textContent = `${rangeInput.value} birr`;

  rangeInput.addEventListener("input", function () {
    output.textContent = `${this.value} birr`;
  });
});

// Apply filters function
function applyFilters() {
  const priceRange = document.getElementById("priceRange").value;
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;

  document.getElementById("search").value = `${priceRange} ${location} ${date}`;

  hideFilterModal();
}
