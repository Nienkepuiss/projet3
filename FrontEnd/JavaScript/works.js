//DISPLAY THE ARCHITECT'S PROJECTS//

let work
let gallery
let categories
let filter

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
        work = data;
        displayWork(work);
        categoryList();
        filter = document.querySelector(".filtres");
        categoryFilter(categories, filter);
        sessionStorage.setItem("isConnected", JSON.stringify(false));
    });

function displayWork(data) {
  gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  data.forEach((work) => {

  const figure = document.createElement('figure'); 
  const figureImage = document.createElement('img');
  const figureCaption = document.createElement('figcaption');
 

  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = work.title
  figure.dataset.category = work.category.name;
  figure.className = "figure";
  
  gallery.appendChild(figure);
  figure.append(figureImage, figureCaption);    

  return figure;
  });
}

// FILTERS //

function categoryList() {
    let listCategories = new Set();

    work.forEach((work) => {
      listCategories.add(JSON.stringify(work.category));
    });
    
    const arrayOfStrings = [...listCategories];
    
    categories = arrayOfStrings.map((s) => JSON.parse(s));
  } 
  
  function categoryFilter(categories, filter) {
    const button = document.createElement("button");
    button.innerText = "Tous";
    button.className = "filterButton";
    button.dataset.category = "Tous";
    filter.appendChild(button);
    filterButtons(categories, filter);
    functionFilter();
  }
 
  function filterButtons(categories, filter) {
    categories.forEach((categorie) => {
      createButtonFilter(categorie, filter);
    });
  }
  
  function createButtonFilter(categorie, filter) {
    const button = document.createElement("button");
    button.innerText = categorie.name;
    button.className = "filterButton";
    button.dataset.category = categorie.name;
    filter.appendChild(button);
  }
  
 
  function functionFilter() {
    const filterButtons = document.querySelectorAll(".filterButton");
   
    filterButtons.forEach((i) => {
      i.addEventListener("click", function () {
        toggleProjects(i.dataset.category);
      });
    });
  }
  
  
  function toggleProjects(datasetCategory) {
    const figures = document.querySelectorAll(".figure");
    if ("Tous" === datasetCategory) {
      figures.forEach((figure) => {
        figure.style.display = "block";
      });
    } else {
      figures.forEach((figure) => {
        figure.dataset.category === datasetCategory
          ? (figure.style.display = "block")
          : (figure.style.display = "none");
      });
    };
}
  
// ADMIN MODE //

document.addEventListener("DOMContentLoaded", function() {

  const token = sessionStorage.getItem("token");

  const filtersContainer = document.querySelector(".filtres");
  const logOut = document.getElementById("loggedOut")
  const logIn = document.getElementById("loggedIn")
  const modify = document.querySelector(".btn-modifier")
  const bannerAdmin = document.querySelector(".connexion-banner")

  if(token) {
    filtersContainer.style.display = "none";
    logOut.style.display = "flex";
    logIn.style.display = "none";
    modify.style.display = "flex";
    bannerAdmin.style.display = "flex";
  }
  
  // LOGOUT //

  logOut.addEventListener("click", (event) => {
  event.preventDefault();
  sessionStorage.removeItem("token")
  window.location.replace("index.html")

});
});

// MODALE //

document.addEventListener("DOMContentLoaded", function() {
  const openModale = function(e) {
      e.preventDefault();
      const modal = document.getElementById("modale");
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
  };

  const buttonModale = document.getElementById("button-modale");
  if (buttonModale) {
      buttonModale.addEventListener("click", openModale);
  } else {
      console.error("L'élément avec l'ID 'button-modale' n'a pas été trouvé.");
  }
});



