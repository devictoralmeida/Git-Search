function returnToHomePage() {
  const button = document.querySelector(".return__button");

  button.addEventListener("click", () => {
    location.replace("../../index.html");
  });
}

returnToHomePage();
