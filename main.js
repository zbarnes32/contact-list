let currentContact = {};
let contacts = [];
loadContacts();
/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form 
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target

  /* Converting my first attempt into one object, "contact".
  let contactName = form.contactName.value
  let contactPhone = form.contactPhone.value
  let emergencyContact = form.emergencyContact.value

  currentContact = contacts.find(contact => contact.name == contactName)
  
  if (!currentContact){
    currentContact = {name: contactName, phone: contactPhone, emergency: emergencyContact}
    contacts.push(currentContact)
    saveContacts()
  } */

  let contact = {
    id: generateId(),
    contactName: form.contactName.value,
    contactPhone: form.contactPhone.value,
    emergencyContact: form.emergencyContact.checked
  };

  contacts.push(contact);
  saveContacts();

  form.reset();

}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem('contacts', JSON.stringify(contacts))
  drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactInfo = JSON.parse(window.localStorage.getItem('contacts'));
  if(contactInfo){
    contacts = contactInfo
  }
};

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let contactListElem = document.getElementById('contact-list')
  let template = "";

  contacts.forEach(contact => {
    template += `
    <div class="contact-card card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
        <h3 class="mt-1 mb-1">${contact.contactName}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.contactPhone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onClick="removeContact('${contact.id}')"remove></i>
        </div>
      </div>`
  }
  )
  contactListElem.innerHTML = template;
}



/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1) {
    throw new Error('Invalid Contact Id')
  }
  contacts.splice(index, 1)
  saveContacts();
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle('hidden');
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()
