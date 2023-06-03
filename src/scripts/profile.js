async function renderRepositories() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.name;

  const headerButton = document.querySelector(".header-button");

  headerButton.addEventListener("click", () => {
    location.replace("../../index.html");
  });

  const container = document.querySelector(".repositories__container");
  const profilePicture = document.querySelector(".profile-picture");
  const userName = document.querySelector(".username");
  profilePicture.src = user.avatar_url;
  userName.innerText = username;

  container.innerHTML = "";

  const repositories = await repositoriesList(user.login);

  if (repositories) {
    repositories.map((item) => {
      const card = createCard(item, user.login);
      container.append(card);
    });
  } else {
    const noRepositories = document.createElement("p");
    noRepositories.innerText = "Este usuário não possui repositórios";
    container.append(noRepositories);
  }
}

const repositoriesList = async (username) => {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function createCard(item, username) {
  const link = document.createElement("a");
  const li = document.createElement("li");
  li.classList.add("repository__item");

  const title = document.createElement("h2");
  title.classList.add("repository-name");
  let formatedString = item.name.replaceAll("-", " ");
  title.innerText = formatedString;

  const description = document.createElement("p");
  description.classList.add("repository-description");

  if (item.description !== null) {
    description.innerText = item.description;
  } else {
    description.innerText = "Esse projeto não tem uma descrição própria";
  }

  const button = document.createElement("button");
  button.classList.add("repository-button");
  button.innerText = "Repositório";

  button.addEventListener("click", () => {
    link.setAttribute("target", "_blank");
    link.setAttribute("href", `https://github.com/${username}/${item.name}`);
    link.href = `https://github.com/${username}/${item.name}`;
  });

  link.append(button);
  li.append(title, description, link);

  return li;
}

renderRepositories();
