var addBtn = document.getElementById("add-contact");
var contactName = document.getElementById("contactName");
var contactNumber = document.getElementById("contactNumber");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactType = document.getElementById("contactType");
var contactNote = document.getElementById("contactNote");
var checkboxFavorite = document.getElementById("checkboxFavorite");
var checkboxEmergency = document.getElementById("checkboxEmergency");
var formWrapper = document.querySelector(".form-wrapper");
var closeBtn = document.querySelector(".form-wrapper .btn-close");
var cancelBtn = document.querySelector(".form-wrapper .btn-li");
var contactPhoto = document.getElementById("contactPhoto");
var btnSaveContact = document.getElementById("btnSaveContact");
var searchInput = document.getElementById("searchInput");
var foundNo = document.getElementById("foundNo");
var addNewContact = document.getElementById("addNewContact");
var totalContacts = document.querySelectorAll(".totalContact")
var favCount = document.querySelector(".favCount");
var emergCount = document.querySelector(".emergCount");
var favSidebar = document.querySelector(".fav-sidebar");
var noFavDiv = document.querySelector(".no-fav");
var stars = document.querySelectorAll(".star");

var favListDiv = document.querySelector(".fav-list");
var editIndex = null;
var currentIndex = null;
var contacts =[];





if (localStorage.getItem("contactsContainer")) {
    contacts = JSON.parse(localStorage.getItem("contactsContainer")) 
displayContact() 
hideFoundNO()
updateFavCount()
updateEmergCount()

}

function hideFoundNO() {
    if (contacts.length > 0 ) {
        foundNo.style.display = "none"
    }
    
}


function openForm() {
    formWrapper.style.display = "block";
}

function closeForm() {
    formWrapper.style.display = "none";
}
function clearForm() {
    contactName.value = "";
    contactNumber.value = "";
    contactEmail.value = "";
    contactAddress.value = "";
    contactType.value = "";
    contactNote.value = "";
    checkboxFavorite.checked = false;
    checkboxEmergency.checked = false;
    contactPhoto.value = "";
}
addBtn.addEventListener("click", openForm);
closeBtn.addEventListener("click", closeForm);
cancelBtn.addEventListener("click", closeForm);


function addContact() {
    var contact ={
        name : contactName.value ,
        number : contactNumber.value ,
        email : contactEmail.value ,
        address : contactAddress.value ,
        type : contactType.value ,
        note : contactNote.value ,
        fav : checkboxFavorite.checked ,
        emerg : checkboxEmergency.checked ,
        photo : contactPhoto.value ,
    }
    contacts.push(contact);
    localStorage.setItem("contactsContainer", JSON.stringify(contacts))    
    foundNo.style.display="none"
    displayContact();
    updateFavCount();
    updateEmergCount()
    totContacts();
    clearForm();
    closeForm();

}


function displayContact() {
    var box ="";
    for (let i = 0; i < contacts.length; i++) {
      
        box +=`
                     <div class="con-card col-6">
                      <div class="contact-card card mb-4 ">
                        <div class="card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="avatar position-relative">
                                <span>${contacts[i].name.slice(0, 2).toUpperCase()}</span>
                                <i class="fa-solid fa-star fav-icon ${contacts[i].fav ? '' : 'd-none'}"></i>
                                
                                </div>
                                <div>
                                <h6 class="mb-2 fw-semibold">${contacts[i].name}</h6>
                                <div class="info-item">
                                <i class="fa-solid fa-phone"></i>
                                <span>${contacts[i].number}</span>
                                  </div>
                                </div>
                                <div class="heart-icon ${contacts[i].emerg ? '' : 'd-none'} " id="heartIcon">
                                 <i class="fa-solid fa-heart-pulse"></i>
                                </div>
                            </div>
                            </div>
                            <div class="info-list mb-3">
                            
                            <div class="info-item">
                                <i class="fa-solid fa-envelope"></i>
                                <span>${contacts[i].email}</span>
                            </div>
                            <div class="info-item">
                                <i class="fa-solid fa-location-dot"></i>
                                <span>${contacts[i].type}</span>
                            </div>
                            </div>
                            <div class="tags mb-3 ">
                            <span class="tag school">School</span>
                            <span class="tag emergency d-none"><i class="fa-solid fa-heart-pulse"></i> Emergency</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center w-100 bg-light pt-2">
                            <div class="d-flex gap-2">
                                <button class="btn action-btn phone"><i class="fa-solid fa-phone"></i></button>
                                <button class="btn action-btn mail"><i class="fa-solid fa-envelope"></i></button>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn action-btn star" onclick="toggleFavorite(${i})"><i class="${contacts[i].fav ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star'}"></i></button>
                                <button class="btn action-btn heart " onclick="toggleEmerg(${i})"><i class="${contacts[i].emerg ? 'fa-solid fa-heart-pulse text-danger' : 'fa-regular fa-heart'}"></i></button>
                                <button class="btn action-btn edit"><i class="fa-solid fa-pen"></i></button>
                                <button onclick="deleteCard(${i})" class="btn action-btn delete"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            </div>
                        </div>
                      </div>
                   </div>
                   
        `
    }
    document.getElementById("conCards").innerHTML=box
    totContacts()
    addEditEvents()

}

function updateFavCount() {
    let count = 0;

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].fav) {
            count++;
        }
    }

    favCount.innerHTML = count;
}
function updateEmergCount() {
    let count = 0;

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].emerg) {
            count++;
        }
    }

    emergCount.innerHTML = count;
}




function toggleFavorite(index) {
    contacts[index].fav = !contacts[index].fav;

    localStorage.setItem("contactsContainer", JSON.stringify(contacts));

    updateFavCount();   
    displayContact();
}
function toggleEmerg(index) {
    contacts[index].emerg = !contacts[index].emerg;

    localStorage.setItem("contactsContainer", JSON.stringify(contacts));

   updateEmergCount();   
    displayContact();
}





/* btnSaveContact.addEventListener("click", function(e) {
    e.preventDefault(); 
}); */


function deleteCard(index) {
    contacts.splice(index ,1);
    displayContact();
    localStorage.setItem("contactsContainer", JSON.stringify(contacts));
    updateFavCount()
    updateEmergCount()

}

totContacts()
function totContacts() {
    for (let i = 0; i < totalContacts.length; i++) {
        
        totalContacts[i].innerHTML = contacts.length;
    }
    
}
searchInput.addEventListener("input" , searchData);

function searchData() {
    var term = searchInput.value;
    var box ="";
    for (let i = 0; i < contacts.length; i++) {
      
        if (contacts[i].name.toLowerCase().includes(term.toLowerCase())) {
        box +=`
                     <div class="con-card col-6">
                      <div class="contact-card card mb-4 ">
                        <div class="card-body">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="avatar position-relative">
                                <span>  ${contacts[i].name.split(' ').map(function(word){ return word[0]; }).join('').substring(0,2).toUpperCase()}

                                </span>
                                <i class="fa-solid fa-star fav-icon"></i>
                                
                                </div>
                                <div>
                                <h6 class="mb-2 fw-semibold">${contacts[i].name}</h6>
                                <div class="info-item">
                                <i class="fa-solid fa-phone"></i>
                                <span>${contacts[i].number}</span>
                                  </div>
                                </div>
                                <div class="heart-icon " id="heartIcon">
                                 <i class="fa-solid fa-heart-pulse"></i>
                                </div>
                            </div>
                            </div>
                            <div class="info-list mb-3">
                            
                            <div class="info-item">
                                <i class="fa-solid fa-envelope"></i>
                                <span>${contacts[i].email}</span>
                            </div>
                            <div class="info-item">
                                <i class="fa-solid fa-location-dot"></i>
                                <span>${contacts[i].type}</span>
                            </div>
                            </div>
                            <div class="tags mb-3 ">
                            <span class="tag school">School</span>
                            <span class="tag emergency d-none"><i class="fa-solid fa-heart-pulse"></i> Emergency</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center w-100 bg-light pt-2">
                            <div class="d-flex gap-2">
                                <button class="btn action-btn phone"><i class="fa-solid fa-phone"></i></button>
                                <button class="btn action-btn mail"><i class="fa-solid fa-envelope"></i></button>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn action-btn star "><i class="fa-regular fa-star"></i></button>
                                <button class="btn action-btn heart "><i class="fa-regular fa-heart"></i></button>
                                <button class="btn action-btn edit"><i class="fa-solid fa-pen"></i></button>
                                <button onclick="deleteCard(${i})" class="btn action-btn delete"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            </div>
                        </div>
                      </div>
                   </div>
                   
        `
    
      
     }
    
    }
    document.getElementById("conCards").innerHTML=box
    totContacts()
    addEditEvents()
}

function addEditEvents() {
var edit = document.querySelectorAll(".edit")

    for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener("click", function() {
               setUpdateInfo(i)
        });
    }
}
/* function favIcon() {
var star = document.querySelector(".star");

    for (let i = 0; i < star.length; i++) {
        star[i].addEventListener("click", function() {
               
        });
    }
} */

function setUpdateInfo(index) {
    openForm();
    addNewContact.innerHTML="Edit Contact";
    editIndex = index;
    currentIndex = index;
    contactName.value =contacts[index].name;
    contactNumber.value =contacts[index].number;
    contactEmail.value =contacts[index].email;
    contactAddress.value =contacts[index].address;
    contactType.value =contacts[index].type;
    contactNote.value =contacts[index].note;
    checkboxFavorite.checked =contacts[index].fav;
    checkboxEmergency.checked =contacts[index].emerg;


}
btnSaveContact.addEventListener("click", function(e) {
    e.preventDefault();

    if (editIndex === null) {
        addContact();
    } else {
        
        contacts[editIndex] = {
            name: contactName.value,
            number: contactNumber.value,
            email: contactEmail.value,
            address: contactAddress.value,
            type: contactType.value,
            note: contactNote.value,
            fav: checkboxFavorite.checked,
            emerg: checkboxEmergency.checked,
            photo: contactPhoto.value
        };
        localStorage.setItem("contactsContainer", JSON.stringify(contacts));
        editIndex = null; 
        displayContact();
        clearForm();
        closeForm();    
        updateFavCount()
        updateEmergCount()
              
    }
});

contactName.addEventListener("input", validationName);

function validationName() {
    let regex = /^[a-zA-Z\s]{2,50}$/;
    let text =contactName.value;
    var msgName = document.getElementById("msgName");
     
     if (regex.test(text)) {
        msgName.classList.add("d-none");
        return true;
     }
     else{
    msgName.classList.remove("d-none");
         return false;
     }
     
    
}
contactNumber.addEventListener("input", validationNumber);

function validationNumber() {
    let regex = /^01[0-2,5]{1}[0-9]{8}$/;
    let text =contactNumber.value;
    var msgNumber = document.getElementById("msgNumber");
     
     if (regex.test(text)) {
        msgNumber.classList.add("d-none");
        return true;
     }
     else{
    msgNumber.classList.remove("d-none");
         return false;
     }
     
    
}
contactEmail.addEventListener("input", validationEmail);

function validationEmail() {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let text =contactNumber.value;
    var msgEmail = document.getElementById("msgEmail");
     
     if (regex.test(text)) {
        msgEmail.classList.add("d-none");
        return true;
     }
     else{
    msgEmail.classList.remove("d-none");
         return false;
     }
     
    
}









