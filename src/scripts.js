import './css/styles.css';
import { getTravelerData, post } from './apiCalls'
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import formFeedbackMessage from './formFeedback';
import './images/user-profile.png';
import './images/traveler.png';
import './images/traveler-trimmed.png';


// Login Page Selectors
const loginDisplay = document.getElementById('travelerLoginDisplay');
const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const userPassword = document.getElementById('password');
const loginFeedback = document.getElementById('loginFeedback');

// Main View Selectors
const displayArea = document.getElementById('displayArea');
const mainImage = document.getElementById('travelerImage');
const loginName = document.getElementById('userName');
const panel = document.querySelectorAll('.page');
const navTabs = document.querySelectorAll('.nav-btn');
const viewHomeTab = document.getElementById('viewHomeBtn');
const viewPastTab = document.getElementById('viewPastBtn');
const viewPlanTripTab = document.getElementById('viewPlanTripBtn');
const userGreeting = document.getElementById('greeting');
const upComingTripTable = document.getElementById('upcomingTrps');
const tripAllTime = document.getElementById('totalSpent');
const pastTripTable = document.getElementById('pastTrps');
const destinationCardDisplay = document.getElementById('destinationCards');

// Book Trip Form Selectors
const cancelTripBtn = document.getElementById('cancelTripBook');
const bookTripFormDisplay = document.getElementById('bookTripFormDisplay');
const bookTripForm = document.getElementById('bookTripForm');
const formDestinationCard = document.getElementById('formDestCard');
const formDestinationId = document.getElementById('formDestinationId');
const formDestination = document.getElementById('formDestination');
const formDate = document.getElementById('formDate');
const formDuration = document.getElementById('formDuration');
const formTravelers = document.getElementById('formTravelers');
const formSubTotal = document.getElementById('tripSubTotal');
const formFeedback = document.getElementById('formFeedback');
const formConfirmDisplay = document.getElementById('confirmationDisplay');
const formConfirmDest = document.getElementById('confirmDest');
const formConfirmCloseBtn = document.getElementById('confirmationCloseBtn');

let allDestinations;
let currentUser;
let currentUserTrips;

loginForm.addEventListener('submit', () => {
    event.preventDefault();
    userLogin();
})
viewHomeTab.addEventListener('click', (event) => {
    changePanel(event.target.id, 'homeDisplay');
})
viewPastTab.addEventListener('click', (event) => {
    changePanel(event.target.id, 'pastDisplay');
});
viewPlanTripTab.addEventListener('click', (event) => {
    changePanel(event.target.id, 'planTripDisplay');
});
cancelTripBtn.addEventListener('click', cancelBookTripForm);
formDuration.addEventListener('input', calculateSubtotal);
formTravelers.addEventListener('input', calculateSubtotal);
bookTripForm.addEventListener('submit', () => {
    event.preventDefault();
    submitTripForm();
})

formConfirmCloseBtn.addEventListener('click', confirmClose);

function userLogin() {
    const travelerId = getTravelerId(username.value);
    const travelerPw = password.value;

    if (validateUserName(travelerId) && validatePassword(travelerPw)) {
        getTravelerData(travelerId)
            .then(data => {
                currentUser = new Traveler(data[0]);
                currentUserTrips = new Trip(data[0], data[2].trips);
                allDestinations = new Destination(data[1].destinations);
                populateUponLogin();
                changePanel('viewHomeBtn', 'homeDisplay');
                hide(loginDisplay);
                show(displayArea);
            })
            .catch(err => {
                if (err === 422) {
                    declareInvalidLogin();
                } else {
                    setFormFeedback(loginFeedback, 'other')
                    clearLoginFields();
                }
            });
    }
}

function getTravelerId(username) {
    const travelerId = Number(username.slice(8));

    return travelerId;
}

function validateUserName(id) {
    if (!id) {
        declareInvalidLogin();
    } else {
        return true;
    }
}

function validatePassword(password) {
    if (password !== 'travel') {
        declareInvalidLogin();
    } else {
        return true;
    }
}

function clearLoginFields() {
    clearFormField(userPassword)
    clearFormField(username)
}

function changePanel(targetId, panelId) {
    updateTabs(targetId);
    updateTabPanels(panelId);
}

function updateTabs(targetId) {
    const selectedTab = document.getElementById(targetId);

    navTabs.forEach((btn) => {
        btn.ariaSelected = 'false';
        btn.disabled = false;
    })

    selectedTab.ariaSelected = 'true';
    selectedTab.disabled = true;
}

function updateTabPanels(panelId) {
    const selectedPanel = document.getElementById(panelId)
    panel.forEach((page) => {
        page.hidden = true;
    })

    if (panelId !== 'homeDisplay') {
        changeMainImage('smaller')
    } else (
        changeMainImage('larger')
    )

    selectedPanel.hidden = false;
}

function changeMainImage(size) {
    if (size === 'larger') {
        mainImage.classList.remove('smaller')
    } else {
        mainImage.classList.remove('larger')
    }
    mainImage.classList.add(size)
}

function populateUponLogin() {
    setText(loginName, currentUser.travelerName)
    populateHomePage();
    populatePastPage();
    populatePlanTripPage();
}

function populateHomePage() {
    userGreeting.innerText = `Welcome back ${currentUser.findFirstName()}!`;
    createTripsTable(upComingTripTable, currentUserTrips.findByTense('upcoming'));
    updateAllTimeTripCost();
}

function populatePastPage() {
    createTripsTable(pastTripTable, currentUserTrips.findByTense('past'))
}

function populatePlanTripPage() {
    createDestinationCards(allDestinations.allDestinations)
    addBookBtnsListeners();
}

function createTripsTable(table, tripList) {
    table.innerHTML = '';
    table.innerHTML += `
        <tr>
            <th>Status</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Travelers</th>
         </tr>`;

    tripList.forEach(trip => {
        let destination = allDestinations.findById(trip.destinationID).destination;
        let city = destination.split(',')[0]
        table.innerHTML += `
            <tr>
                 <td>${trip.status}</td>
                 <td>${city}</td>
                 <td>${formatDateUser(trip.date)}</td>
                 <td>${trip.duration}</td>
                <td>${trip.travelers}</td>
            </tr>`;
    });
}

function updateAllTimeTripCost() {
    const total = currentUserTrips.calulateAllTimeCost(allDestinations);

    setText(tripAllTime, numberToDollar(total))
    // tripAllTime.innerText = `${numberToDollar(total)}`;
}

function numberToDollar(num) {
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dollars = USDollar.format(num);
    return dollars
}

function formatDateUser(apiDate) {
    const date = apiDate.split('/');
    let month = date[1];
    let day = date[2];
    let year = date[0];

    return (`${month}/${day}/${year}`);
};

function createDestinationCards(destinations) {
    destinationCardDisplay.innerHTML = '';

    destinations.forEach((destination) => {
        const destinationLocation = destination.destination.split(',');

        destinationCardDisplay.innerHTML += `
        <section class="dest-card scroll-lft-item">
            <h3>${destinationLocation[0]}</h3>
            <p class="country">${destinationLocation[1]}</p>
            <img class="destImg" src="${destination.image}" alt="${destination.alt}">
            <div class="dest-details">
            <p class="dest-detail">Lodging:\n <span class="currency"> ${numberToDollar(destination.estimatedLodgingCostPerDay)}</span> per night</p>
            <p class="dest-detail">Flight:\n <span class="currency">${numberToDollar(destination.estimatedFlightCostPerPerson)}</span> per person</p>
            </div>
            <button class="dest-book-btn" id="${destination.id}">Book Now</button>
        </section>`;
    })
}

function addBookBtnsListeners() {
    const destinationBtns = document.querySelectorAll('.dest-book-btn');

    destinationBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            displayForm(event);
        })
    })
}

function displayForm(event) {
    prePopulateForm(event);
    displayArea.classList.add('hidden');
    bookTripFormDisplay.classList.remove('hidden');
}

function cancelBookTripForm() {
    bookTripFormDisplay.classList.add('hidden');
    displayArea.classList.remove('hidden');
    clearBookTripForm();
}


function clearForm(form){
    const elements = Array.from(form.elements)

    elements.forEach((element)=> {
        if(element.tagName === 'INPUT' && element.type !== 'submit'){
            element.value = '';
        }
    })
}

function clearBookTripForm() {
    clearForm(bookTripForm)
    formSubTotal.innerText = '';
}

function prePopulateForm(event) {
    const id = Number(event.target.id);
    const chosenDestination = allDestinations.findById(id);
    formDestinationId.value = id;
    formDestination.value = chosenDestination.destination;

    createFormDestCard(chosenDestination);
    setFormMinDate();
}

function createFormDestCard(destination) {
    formDestinationCard.innerHTML = `
    <h3>${destination.destination}</h3>
    <img class="form-dest-img" src="${destination.image}" alt="${destination.alt}">
    <p class="form-dest-text">Lodging: <span class="currency">${numberToDollar(destination.estimatedLodgingCostPerDay)}</span> per night </p>
    <p class="form-dest-text">Flight: <span class="currency">${numberToDollar(destination.estimatedFlightCostPerPerson)}</span> per person</p>
    `;
}

function calculateSubtotal() {
    const id = Number(formDestinationId.value);
    const travelers = Number(formTravelers.value);
    const duration = Number(formDuration.value);
    const subTotal = allDestinations.calculateDestinationCost(id, travelers, duration);

    if (subTotal && travelers > 0 && duration > 0) {
        formSubTotal.innerText = `${numberToDollar(subTotal)}`;
    }
}

function setFormMinDate() {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset();
    const userDate = new Date(today.getTime() - (timezoneOffset * 60 * 1000));
    const userDateString = userDate.toISOString().split('T')[0];

    formDate.setAttribute('min', userDateString);
}

function submitTripForm() {
    if (validateDate() && validateDestination() && validateDuration() && validateTravelers()) {
        let trip = {
            id: Number(Date.now()),
            userID: currentUser.travelerID,
            destinationID: Number(formDestinationId.value),
            travelers: Number(formTravelers.value),
            date: formDate.value.split('-').join('/'),
            duration: Number(formDuration.value),
            status: 'pending',
            suggestedActivities: []
        }

        post('trips', trip)
            .then((json) => {
                currentUserTrips.addNewTrip(trip)
                declareTripBooked(trip);
                populateHomePage();

            })
            .catch(err => {
                if (err === 422) {
                    displayFormFeedback('allFields');
                } else {
                    displayFormFeedback('other');
                }
                clearBookTripForm();
            });
    }
}

function declareTripBooked(trip) {
    formConfirmDest.innerText = `${allDestinations.findById(trip.destinationID).destination}`;
    formConfirmDisplay.classList.remove('hidden');
    bookTripForm.classList.add('hidden');
    clearBookTripForm();
    cancelTripBtn.classList.add('hidden');
}

function confirmClose() {
    formConfirmDest.innerText = '';
    formConfirmDisplay.classList.add('hidden');
    bookTripForm.classList.remove('hidden');
    cancelTripBtn.classList.remove('hidden');
    bookTripFormDisplay.classList.add('hidden');
    displayArea.classList.remove('hidden');
}

/////////// new 
function declareInvalidLogin(){
    setFormFeedback(loginFeedback, 'invalidLogin')
    clearLoginFields();
}

function setFormFeedback(feedback, type){
    setText(feedback, formFeedbackMessage[type])
}

function setText(field, text){
    field.innerText = text;
}
///////////////////
// change tab listners to a for each


function displayFormFeedback(type) {
    formFeedback.innerText = formFeedbackMessage[type];
}

function clearFormField(field){
    field.value = '';
}

function setFormField(field, value){
    
}

function show(element){
    element.classList.remove('hidden')
}

function hide(element){
    element.classList.add('hidden')
}

function validateDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const recFormDate = formDate.value;
    const submittedDate = new Date(recFormDate + "T00:00:00Z");
    submittedDate.setMinutes(submittedDate.getMinutes() + submittedDate.getTimezoneOffset());

    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    if (submittedDate >= today && submittedDate <= maxDate) {
        return true;
    } else if (submittedDate < today) {
        displayFormFeedback('dateEarly');
    } else if (submittedDate > maxDate) {
        displayFormFeedback('dateLate');
    } else {
        displayFormFeedback('invalidDate');
    }
}

function validateDestination() {
    const destNames = allDestinations.allDestinations.map((destination) => {
        return destination.destination;
    })

    if (destNames.includes(formDestination.value)) {
        return true;
    } else {
        displayFormFeedback('invalidDestination');
    }
}

function validateDuration() {
    const duration = Number(formDuration.value);
    if (typeof duration === 'number' && duration <= 50 && duration > 0) {
        return true;
    } else {
        displayFormFeedback('invalidDuration');
    }
}

function validateTravelers() {
    ;
    const travelerCount = Number(formTravelers.value);
    if (typeof travelerCount === 'number' && travelerCount <= 20 && travelerCount > 0) {
        return true;
    } else {
        displayFormFeedback('invalidTravelers');
    }
}