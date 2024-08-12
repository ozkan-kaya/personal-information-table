let id = parseInt(localStorage.getItem('id')) || 1000000;
let number = parseInt(localStorage.getItem('number')) || 1;
let personalList = JSON.parse(localStorage.getItem('personalList')) || [];
let currentlyEditingUserId;

renderPersonalList();

function generateID() {
  id++;
  localStorage.setItem('id', id);
  document.querySelector('.id').innerHTML = `${id}`;
}

function renderPersonalList() {
  document.querySelector('.id').innerHTML = `${id}`;
  const personalInfoContainer = document.querySelector('.database-personal-info');
  personalInfoContainer.innerHTML = '';

  for (let i = 0; i < personalList.length; i++) {
    const personal = personalList[i];
    const personalInfo = `
      <div class="personal">
        <p>${personal.number}</p>
        <p>${personal.id}</p>
        <p>${personal.name}</p>
        <p>${personal.surname}</p>
        <p>${personal.tc}</p>
        <p>${personal.phoneNumber}</p>
        <div class="icons">
          <i class='bx bx-edit' onclick="editPersonal('${personal.id}', '${personal.name}', '${personal.surname}', '${personal.tc}', '${personal.phoneNumber}')"></i>
          <i class='bx bx-trash' onclick="deleteBySearch(${personal.id})"></i>
        </div>
      </div>
    `;

    personalInfoContainer.innerHTML += personalInfo;
  }
}

function addPersonal() {
  const nameInputElement = document.querySelector('.name-input');
  const surnameInputElement = document.querySelector('.surname-input');
  const tcInputElement = document.querySelector('.tc-input');
  const phoneNumberInputElement = document.querySelector('.phone-number-input');

  const name = nameInputElement.value;
  const surname = surnameInputElement.value;
  const tc = tcInputElement.value;
  const phoneNumber = phoneNumberInputElement.value;

  if (tc.length === 11) {
    if (name && surname && tc) {
      personalList.push({
        number,
        id,
        name,
        surname,
        tc,
        phoneNumber
      });

      nameInputElement.value = '';
      surnameInputElement.value = '';
      tcInputElement.value = '';
      phoneNumberInputElement.value = '';

      renderPersonalList();
      savePersonalList();

      console.log('A new personal has been added ' + id + ' ' + name + ' ' + surname + ' ' + tc + ' ' + phoneNumber);

      number++;
      localStorage.setItem('number', number);
      generateID();
    }
  } else {
    alert('Lütfen istenilen bilgileri istenilen formatta ve eksiksiz giriniz.');
  }
}

function editPersonal(id, name, surname, tc, phoneNumber) {
  currentlyEditingUserId = id;
  const editMenu = document.querySelector('.edit-user-menu');
  editMenu.querySelector('.id').innerText = id;
  editMenu.querySelector('.name-input').value = name;
  editMenu.querySelector('.surname-input').value = surname;
  editMenu.querySelector('.tc-input').value = tc;
  editMenu.querySelector('.phone-number-input').value = phoneNumber;
}

function updatePersonal() {
  const editMenu = document.querySelector('.edit-user-menu');
  const updatedName = editMenu.querySelector('.name-input');
  const updatedSurname = editMenu.querySelector('.surname-input');
  const updatedTC = editMenu.querySelector('.tc-input');
  const updatedPhoneNumber = editMenu.querySelector('.phone-number-input');

  for (let i = 0; i < personalList.length; i++) {
    const personal = personalList[i];

    if (personal.id == currentlyEditingUserId) {
      personal.name = updatedName.value;
      personal.surname = updatedSurname.value;
      personal.tc = updatedTC.value;
      personal.phoneNumber = updatedPhoneNumber.value;

      updatedName.value = '';
      updatedSurname.value = '';
      updatedTC.value = '';
      updatedPhoneNumber.value = '';
      editMenu.querySelector('.id').innerText = '';

      currentlyEditingUserId = null;
      savePersonalList();
      renderPersonalList();
      break;
    }
  }
}

function deleteAll() {
  if (personalList.length > 0) {
    const userConfirm = confirm('Bütün personelleri silmek istediğinize emin misiniz?');

    if (userConfirm) {
      personalList.splice(0, personalList.length);
      savePersonalList();

      id = 1000000;
      localStorage.setItem('id', id);
      number = 1;
      localStorage.setItem('number', number);

      renderPersonalList();
      console.log('All personals have been deleted.');
    }
  }
}

function deleteBySearch(){
  const searchInputElement = document.querySelector('.search-input');

  for (let i = 0; i < personalList.length; i++) {
    const personal = personalList[i];

    if (searchInputElement.value == personal.number || searchInputElement.value == personal.id){
      personalList.splice(i,1);
      renderPersonalList();
    }
  }
  searchInputElement.value = '';
}

function savePersonalList() {
  localStorage.setItem('personalList', JSON.stringify(personalList));
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (currentlyEditingUserId) {
      updatePersonal();
    }

    else {
      const nameInputElement = document.querySelector('.name-input');
      const surnameInputElement = document.querySelector('.surname-input');
      const tcInputElement = document.querySelector('.tc-input');

      if (nameInputElement && surnameInputElement && tcInputElement) {
        addPersonal();
      }
    }
  }
});