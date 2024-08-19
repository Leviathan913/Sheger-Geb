const imageUrl = "../img/modefemale.png";
//foodImage
const foodImage = "../img/food1.jpg";
const imgElement = document.getElementById("foodImage");
imgElement.src = foodImage;

let commentInput = document.getElementById("comment");

commentInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

let wrapperDiv = document.getElementById("wrapper");
let userComment = document.getElementById("comment");

function userCommentDivs() {
  let newText = userComment.value;
  userComment.style.height = "24px";

  let userConDiv = document.createElement("div");
  userConDiv.className = "UserCon";

  let upperContainerDiv = document.createElement("div");
  upperContainerDiv.className = "upperContainer";

  let profileDiv = document.createElement("div");
  profileDiv.className = "profile";

  let profileImg = document.createElement("img");
  profileImg.id = "userprofile";
  profileImg.alt = "";
  profileImg.src = imageUrl;
  profileDiv.appendChild(profileImg);

  let userNameDiv = document.createElement("div");
  userNameDiv.className = "userName";
  let userNameHeading = document.createElement("h4");
  userNameHeading.id = "myuserName";
  userNameHeading.textContent = "Edu";
  userNameDiv.appendChild(userNameHeading);

  let lowerContainerDiv = document.createElement("div");
  lowerContainerDiv.id = "lowerContainer";

  let newTextarea = document.createElement("textarea");
  newTextarea.id = "mycom";
  newTextarea.textContent = newText;
  lowerContainerDiv.appendChild(newTextarea);

  const adjustTextareaHeight = (textareaElement) => {
    textareaElement.style.height = "auto";
    textareaElement.style.height = `${textareaElement.scrollHeight}px`;
  };

  newTextarea.addEventListener("input", () => {
    adjustTextareaHeight(newTextarea);
  });

  wrapperDiv.appendChild(userConDiv);
  userConDiv.appendChild(upperContainerDiv);
  upperContainerDiv.appendChild(profileDiv);
  upperContainerDiv.appendChild(userNameDiv);
  userConDiv.appendChild(lowerContainerDiv);

  userComment.value = "";
}

userComment.addEventListener("keydown", function (event) {
  if (window.innerWidth > 550) {
    if (event.ctrlKey && event.key === "Enter") {
      userCommentDivs();
    }
  }
});

let sendbtn = document.getElementById("sendbtn");
sendbtn.addEventListener("click", function () {
  if (userComment.value !== "") {
    userCommentDivs();
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
