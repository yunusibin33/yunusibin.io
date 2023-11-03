document.addEventListener('DOMContentLoaded', function () {
    // Sayfa yüklendiğinde kişileri çek ve tabloyu güncelle
    getPersonsAndPopulateTable();
  });
  
  async function getPersonsAndPopulateTable() {
    // Önce yerel depolamadan kişileri çek
    const storedPersons = JSON.parse(localStorage.getItem('persons')) || [];
  
    // Tabloyu temizle
    const tableBody = document.getElementById('personTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
  
    // Yerel depolamadan çekilen kişileri tabloya ekle
    storedPersons.forEach(person => {
      addPersonToTable(person.firstName, person.lastName, person.image);
    });
    
  
    // Sonra MongoDB'den kişileri çek ve tabloyu güncelle
    const response = await fetch('http://localhost:3000/getPersons');
    const persons = await response.json();
  
    // Kişileri yerel depolamada sakla
    localStorage.setItem('persons', JSON.stringify(persons));
  
    // Kişileri tabloya ekle
    persons.forEach(person => {
      addPersonToTable(person.firstName, person.lastName, person.image.data);
    });
  }
  // Kişiyi tabloya ekle
  function addPersonToTable(firstName, lastName, imageData) {
    if (!imageData) {
      alert('Lütfen bir fotoğraf çekin.');
      return;
    }
    const table = document.getElementById('personTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
  
    const personInfoDiv = document.createElement('div');
    personInfoDiv.classList.add('person-info');
    const nameDiv = document.createElement('div');
    nameDiv.innerHTML = `<strong>${firstName}</strong>`;
    const lastNameDiv = document.createElement('div');
    lastNameDiv.innerHTML = lastName;
    const imageDiv = document.createElement('div');
    imageDiv.innerHTML = `<img src="data:image/*;base64,${imageData.toString('base64')}" alt="${firstName} ${lastName}" class="img-thumbnail" onclick="openLightbox('data:image/*;base64,${imageData.toString('base64')}')">`;
  
    cell1.appendChild(personInfoDiv);
    personInfoDiv.appendChild(nameDiv);
    personInfoDiv.appendChild(lastNameDiv);
    cell3.appendChild(imageDiv);
}

  
  // Diğer fonksiyonlar...
  async function prepareImage() {
    // Diğer kodlar...
  
    // Sunucuya resmi gönder
    const formData = new FormData();
    formData.append('image', preparedImage);
    
    try {
      const response = await fetch('http://localhost:3000/addPerson', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      console.log(result); // Sunucudan gelen cevap
    } catch (error) {
      console.error('Hata:', error);
    }
  }
  