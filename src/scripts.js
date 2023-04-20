// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getLoadData, get, post, remove } from './apiCalls'
import TravelerRepository from './TravelerRepository'
import Traveler from './Traveler'
import Trip from './Trip'
import Destination from './Destination';

import './images/user-profile.png'



// Selectors
const displayArea = document.getElementById('displayArea')
const bookTripFormDisplay = document.getElementById('bookTripFormDisplay')
const pages = document.querySelectorAll('.page')


const cancelTripBtn = document.getElementById('cancelTripBook')
const viewHomeBtn = document.getElementById('viewHomeBtn');
const viewPastBtn = document.getElementById('viewPastBtn');
const viewPlanTripBtn = document.getElementById('viewPlanTripBtn');
const loginName = document.getElementById('userName')
const upComingTripTable = document.getElementById('upcomingTrps')
const pastTripTable = document.getElementById('pastTrps')
const userGreeting = document.getElementById('greeting')
const tripAllTime = document.getElementById('totalSpent')
const destinationCardDisplay = document.getElementById('destinationCards')

const bookTripForm = document.getElementById('bookTripForm')
const formDestinationDisplay = document.getElementById('formDestDisplay')
const formDestination = document.getElementById('formDestination')
const formDate = document.getElementById('formDate')
const formDuration = document.getElementById('formDuration')
const formTravelers = document.getElementById('formTravelers')
const formFeedback = document.getElementById('formFeedback')

let allTravelers;
let allDestinations;
let currentUser;
let currentUserTrips;

// Eventlisteners
window.addEventListener('load', () => {
    getLoadData()
        .then(data => {
            allTravelers = new TravelerRepository(data[0].travelers);
            allDestinations = new Destination(data[1].destinations);
            currentUser = new Traveler(allTravelers.findTravelerById(14));
            currentUserTrips = new Trip(allTravelers.findTravelerById(14), data[2].trips)
            populateUponLoad()
        })
        .catch(err => console.log(err))
});

viewHomeBtn.addEventListener('click', () => { changePage('homeDisplay') })
viewPastBtn.addEventListener('click', () => { changePage('pastDisplay') })
viewPlanTripBtn.addEventListener('click', () => { changePage('planTripDisplay') })
cancelTripBtn.addEventListener('click', cancelBookTripForm)

bookTripForm.addEventListener('submit', () => {
    event.preventDefault();
    submitTripForm()
})


function changePage(pageId) {
    pages.forEach((page) => {
        page.classList.add('hidden');
    })
    document.getElementById(pageId).classList.remove('hidden')
}

function populateUponLoad() {
    loginName.innerText = `${currentUser.travelerName}`;
    populateHomePage()
    populatePastPage()
    populatePlanTripPage()
}

function populateHomePage() {
    userGreeting.innerText = `Welcome back, ${currentUser.travelerName}.`;
    createTripsTable(upComingTripTable, currentUserTrips.findByTense('upcoming'));
    updateAllTimeTripCost();
}

function populatePastPage() {
    createTripsTable(pastTripTable, currentUserTrips.findByTense('past'))
}

function populatePlanTripPage() {
    createDestinationCards(allDestinations.allDestinations)
    addBookBtnsListeners()
}

function createTripsTable(table, tripList) {
    table.innerHTML = ''

    table.innerHTML += `
        <tr>
            <th>Status</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Travelers</th>
         </tr>`;

    tripList.forEach(trip => {
        table.innerHTML += `
            <tr>
                 <td>${trip.status}</td>
                 <td>${trip.destinationID}</td>
                 <td>${trip.date}</td>
                 <td>${trip.duration}</td>
                <td>${trip.travelers}</td>
            </tr>`;
    });
}

function updateAllTimeTripCost() {
    const total = currentUserTrips.calulateAllTimeCost(allDestinations)

    tripAllTime.innerText = `You have spent ${numberToDollar(total)} on all your trips.`
}

function numberToDollar(num) {
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dollars = USDollar.format(num);

    return dollars
}

function createDestinationCards(destinations) {
    destinationCardDisplay.innerHTML = '';

    destinations.forEach((destination) => {
        const destinationLocation = destination.destination.split(',')

        destinationCardDisplay.innerHTML += `
        <section class="dest-card">
            <h3>${destinationLocation[0]}</h3>
            <p>${destinationLocation[1]}</p>
            <img class="destImg" src="${destination.image}" alt="${destination.alt}">
            <p>Lodging: ${numberToDollar(destination.estimatedLodgingCostPerDay)} per night </p>
            <p>Flight: ${numberToDollar(destination.estimatedFlightCostPerPerson)} per person</p>
            <button class="dest-book-btn" id="${destination.id}">Book Now</button>
        </section>`;
    })
}

function addBookBtnsListeners() {
    const destinationBtns = document.querySelectorAll('.dest-book-btn')

    destinationBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            displayForm(event)
        })
    })
}

function displayForm(event) {
    prePopulateForm(event)
    displayArea.classList.add('hidden')
    bookTripFormDisplay.classList.remove('hidden')
}

function cancelBookTripForm() {
    bookTripFormDisplay.classList.add('hidden')
    displayArea.classList.remove('hidden')
}

// function clearBookTripForm(){

// }

function prePopulateForm(event) {
    const id = Number(event.target.id);

    const chosenDestination = allDestinations.findById(id)

    document.getElementById('formDestination').value = `${chosenDestination.destination}`

    createFormDestCard(chosenDestination)
    setFormMinDate()
}

function createFormDestCard(destination) {
    formDestinationDisplay.innerHTML = '';
    formDestinationDisplay.innerHTML = `
    <h3>${destination.destination}</h3>
    <img class="form-dest-img" src="${destination.image}" alt="${destination.alt}">
    <p>Lodging: ${numberToDollar(destination.estimatedLodgingCostPerDay)} per night </p>
    <p>Flight: ${numberToDollar(destination.estimatedFlightCostPerPerson)} per person</p>
    `
}

function setFormMinDate() {
    const today = new Date();
    const formatToday = today.toISOString().slice(0, 10)

    formDate.min = formatToday
}

function submitTripForm() {
    if (validateDate() && validateDestination() && validateDuration() && validateTravelers()){
       let trip ={
        id: Number(Date.now()), 
        userID: currentUser.travelerID, 
        destinationID: allDestinations.findByName(formDestination.value).id, 
        travelers: Number(formTravelers.value), 
        date: formDate.value, 
        duration: Number(formDuration.value), 
        status: 'pending', 
        suggestedActivities: []
       }

       console.log(trip)
    } 
}


function validateDate() {
    const today = new Date();
    const maxDate = new Date(today)
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const submittedDate = new Date(formDate.value)

    if (submittedDate >= today && submittedDate <= maxDate) {
        return true
    } else {

        formFeedback.innerText = 'Please enter a valid date that is within the coming year'
    }

}

function validateDestination() {
    const destNames = allDestinations.allDestinations.map((destination) => {
        return destination.destination
    })

    if (destNames.includes(formDestination.value)) {
        return true
    } else {
        formFeedback.innerText = 'Please enter a valid destination'
    }
}

function validateDuration() {
    const duration = Number(formDuration.value)
    if (typeof duration === 'number' && duration <= 50 && duration > 0) {
        return true
    } else {
        formFeedback.innerText = 'Please enter a duration between 0 and 50'
    }
}

function validateTravelers() {
    const travelerCount = Number(formTravelers.value)
    if (typeof travelerCount === 'number' && travelerCount <= 50 && travelerCount > 0) {
        return true
    } else {
        formFeedback.innerText = 'Please enter a number of travelers between 0 and 50'
    }
}