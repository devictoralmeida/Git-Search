function handleLogin() {
  const button = document.querySelector(".form__button");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    handleSearchUser();
  });
}

const handleSearchUser = async () => {
  const usernameInput = document.querySelector(".username-input");
  const inputValue = usernameInput.value;
  const url = `https://api.github.com/users/${inputValue}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("user", JSON.stringify(data));
      return location.replace("./src/pages/profile.html");
    } else {
      return location.replace("./src/pages/error.html");
    }
  } catch (error) {
    console.log(error);
    return location.replace("./src/pages/error.html");
  }
};

handleLogin();

