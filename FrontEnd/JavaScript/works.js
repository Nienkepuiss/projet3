//DISPLAY THE ARCHITECT'S PROJECTS//

let work
let gallery
let categories
let filter
let galleryModale

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
        work = data;
        displayWork(work);
        categoryList();
        filter = document.querySelector(".filtres");
        categoryFilter(categories, filter);
        modaleGallery(data);
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
//open//

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

//close//

const buttonClose = document.getElementById("close-modale");
const modal = document.getElementById("modale");

  function closeModale() {
    modal.style.display = "none";
  }
buttonClose.addEventListener("click", closeModale)

//display work in modale//  

function modaleGallery(data) {
  const galleryModale = document.querySelector(".modale-gallery");
  galleryModale.innerHTML = "";

  data.forEach((work) => {
      const modaleWork = document.createElement("figure");
      const modaleWorkImg = document.createElement("img");
      const deleteButton = document.createElement("button");
      const deleteIcon = document.createElement("i");

      modaleWorkImg.src = work.imageUrl;
      modaleWorkImg.alt = work.title;
      modaleWorkImg.className = "modaleWork-img"; 
      modaleWork.className = "modaleWork";

      deleteButton.className = "delete-button";
      deleteButton.dataset.id = work.id;
      deleteIcon.className = "fa-solid fa-trash-can"; 

      deleteButton.appendChild(deleteIcon); 
      modaleWork.appendChild(modaleWorkImg);
      modaleWork.appendChild(deleteButton); 

      galleryModale.appendChild(modaleWork);

       deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const workId = deleteButton.dataset.id;
        deleteWorkById(workId);
  });
  } 
  )};

//DELETE WORK//

function deleteWorkById(i) {
  let token = sessionStorage.getItem("token");
  fetch("http://localhost:5678/api/works/" + i, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      alert("projet supp avec succes")
      work = work.filter((work) => work.id != i);
      displayWork(work);
      modaleGallery(work);
    } else {
      alert("Erreur : " + response.status);
      closeModale;
    }
  });
}

//OPEN MODALE2//

const modale = document.getElementById('modale');
const modaleAdd = document.getElementById('modale-add');
const btnAdd = document.getElementById('add-picture');
const returnBtn = document.getElementById('return-btn');
const closeModale2Btn = document.getElementById('close-modale2');

// open modale add
function openModaleAdd() {
    modale.style.display = 'none'; 
    modaleAdd.style.display = 'flex'; 
}

// return
function returnToModale() {
    modale.style.display = 'flex'; 
    modaleAdd.style.display = 'none'; 
}

// close modale add
function closeModaleAdd() {
    modaleAdd.style.display = 'none'; 
}

// Event listeners
btnAdd.addEventListener('click', openModaleAdd);
returnBtn.addEventListener('click', returnToModale);
closeModale2Btn.addEventListener('click', closeModaleAdd);

//PHOTO PREVIEW//

const inputImage = document.getElementById("photo");
const labelImage = document.getElementById("photo-library");
const pImage = document.querySelector("#labelPhoto > p");
const iconeImage = document.querySelector("#pictureIcon");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.maxHeight = "220px";
  imgPreview.style.width = "auto";

  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iconeImage.style.display = "none";
  document.getElementById("labelPhoto").appendChild(imgPreview);
});

//category form//

const selectCategory = document.getElementById('selectCategory');

const reponseCategory = fetch('http://localhost:5678/api/categories')
.then((response) => response.json())
.then((data) => {
  data.forEach((category) => {
    const categoryOption = document.createElement('option')
    const categoryLabel = document.createElement('label')

    categoryOption.setAttribute('value', category.id)
    categoryLabel.innerHTML = category.name

    selectCategory.appendChild(categoryOption)
    categoryOption.appendChild(categoryLabel)
  });
});

const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('selectCategory');
const imageInput = document.getElementById('photo');
const submitButton = document.getElementById('valider');

function formValidity() {
  if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
    submitButton.style.backgroundColor = '#1D6154';
  } else {
    submitButton.style.backgroundColor = '';
    }
  }

titleInput.addEventListener('input', formValidity);
categorySelect.addEventListener('change', formValidity);
imageInput.addEventListener('change', formValidity);

//ADD NEW WORK//

const btnValider = document.getElementById("valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("token");

  const title = document.getElementById("title").value;
  const category = document.getElementById("selectCategory").value;
  const image = document.getElementById("photo").files[0];


  if(!title || !category || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return;
  }
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }
  
const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

sendNewData(token, formData, title, category)

const addToWork = function(data, category) {
  newWork = {};
  newWork.title = data.title;
  newWork.id = data.id;
  newWork.category = {"id" : data.categoryId, "name" : category};
  newWork.imageUrl = data.imageUrl;
  work.push(newWork);
}

//API call for new work//
function sendNewData(token, formData, title, category) {
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Nouveau projet ajouté avec succès : " + title);
        return response.json();
      } else {
        console.error("Erreur:", response.status);
      }
    })
    .then ((data) => {
      addToWork(data, category);
      displayWork(work);
      document.getElementById("modale").style.display = "none";
      document.getElementById("modale-add").style.display = "none";
    })
    .catch((error) => console.error("Erreur:", error));
  }}
