function getRepo(repo) {
  fetch("https://api.github.com/repos/" + repo, {
    headers: {
      accept: "application/vnd.github.mercy-preview+json",
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(function (data) {
      let name = data.name;
      let owner = data.owner.login;
      let owner_url = data.owner.html_url;
      let repo_url = data.html_url;
      let lang = data.language;
      let forks = data.forks_count;
      let issues = data.open_issues_count;
      let stars = data.stargazers_count;
      let desc = data.description;
      let image = data.owner.avatar_url;
      let topics = data.topics;

      let frks = document.createElement("div");
      frks.setAttribute("class", "forks icon");
      frks.setAttribute("title", "Forks: " + forks);
      frks.innerHTML = forks;

      let strs = document.createElement("div");
      strs.setAttribute("class", "stars icon");
      strs.setAttribute("title", "Stars: " + stars);
      strs.innerHTML = stars;

      let lngs = document.createElement("div");
      lngs.setAttribute("class", "lang icon");
      lngs.setAttribute("title", "Language: " + lang);
      lngs.innerHTML = lang;

      let iss = document.createElement("div");
      iss.setAttribute("class", "issues icon");
      iss.setAttribute("title", "Open Issues: " + issues);
      iss.innerHTML = issues;

      let img = document.createElement("img");
      img.setAttribute("src", image);
      img.setAttribute("alt", owner);

      let tpc = document.createElement("div");
      tpc.setAttribute("class", "topics no-hacktoberfest");
      tpc.innerHTML = "Not opted for Hacktoberfest";

      for (i = 0; i < topics.length; i++) {
        if (topics[i] === "hacktoberfest") {
          tpc.classList.add("hacktoberfest");
          tpc.classList.remove("no-hacktoberfest");
          tpc.innerHTML = "Opted-in for Hacktoberfest";
          break;
        }
      }

      let repo_link = document.createElement("a");
      repo_link.setAttribute("href", repo_url);
      repo_link.setAttribute("title", name);
      repo_link.innerHTML = name;

      let owner_link = document.createElement("a");
      owner_link.setAttribute("href", owner_url);
      owner_link.innerHTML = owner;

      let rep = document.createElement("div");
      rep.setAttribute("class", "repo");
      rep.appendChild(repo_link);

      let own = document.createElement("div");
      own.setAttribute("class", "owner");
      own.appendChild(owner_link);

      let des = document.createElement("p");
      if (desc != null && desc.length > 80) {
        desc = desc.slice(0, 79) + "...";
      }
      des.innerHTML = desc;

      let dta = document.createElement("div");
      dta.setAttribute("class", "repodata");
      dta.appendChild(lngs);
      dta.appendChild(strs);
      dta.appendChild(frks);
      dta.appendChild(iss);

      let the_repo = document.createElement("div");
      the_repo.setAttribute("class", "repomain");
      the_repo.appendChild(img);
      the_repo.appendChild(rep);
      the_repo.appendChild(own);
      the_repo.appendChild(tpc);
      the_repo.appendChild(des);
      the_repo.appendChild(dta);

      document.getElementById("repo-container").appendChild(the_repo);
    })
    .catch((error) => {
      console.log(error);
    });
}

var repos_list = [
  "TheAlgorithms/C",
  "trekhleb/javascript-algorithms",
  "thedevdojo/tails",
  "div-bargali/Data-Structures-and-Algorithms",
];

for (i = 0; i < repos_list.length; i++) {
  getRepo(repos_list[i]);
}

let modal = document.getElementById("modal");
let dimg = document.getElementById("display-image");

document.getElementById("close").onclick = () => {
  modal.style.display = "none";
  dimg.src = "";
};
modal.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    dimg.src = "";
  }
};

let imgs = document.getElementsByClassName("gallery-image");

for (i = 0; i < imgs.length; i++) {
  let img = imgs[i];
  img.addEventListener("click", () => {
    let src = img.getElementsByTagName("img")[0].src;
    dimg.src = src.replace("-min", "");
    modal.style.display = "block";
  });
}

const buttonRight = document.getElementById("slide-right");
const buttonLeft = document.getElementById("slide-left");

buttonRight.onclick = function () {
  document.getElementById("gallery-pics").scrollLeft += 50;
};
buttonLeft.onclick = function () {
  document.getElementById("gallery-pics").scrollLeft -= 50;
};
