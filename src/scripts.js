// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getLoadData, get, post, remove } from './apiCalls'
import TravelerRepository from './TravelerRepository'
import Traveler from './Traveler'
import Trip from './Trip'
import Destination from './Destination';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/user-profile.png'



// Selectors
const homePage = document.getElementById('homeDisplay');
const pastPage = document.getElementById('pastDisplay');
const desinationPage = document.getElementById('destinationsDisplay');
const planTripPage = document.getElementById('planTripDisplay');
const viewHomeBtn = document.getElementById('viewHomeBtn');
const viewPastBtn = document.getElementById('viewPastBtn');
const viewPlanTripBtn = document.getElementById('viewPlanTripBtn');
const loginName = document.getElementById('userName')
const upComingTripTable = document.getElementById('upcomingTrps')
const pastTripTable = document.getElementById('pastTrps')
const userGreeting = document.getElementById('greeting')
const tripAllTime = document.getElementById('totalSpent')
const destinationCardDisplay = document.getElementById('destinationCards')

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

viewHomeBtn.addEventListener('click', populateHomePage)
viewPastBtn.addEventListener('click', populatePastPage)
viewPlanTripBtn.addEventListener('click', populatePlanTripPage)


function populateUponLoad() {
    loginName.innerText = `${currentUser.travelerName}`;
    populateHomePage()
    populatePastPage()
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
    console.log('Plan Trip button clicked')
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

function updateAllTimeTripCost(){
    const total = currentUserTrips.calulateAllTimeCost(allDestinations)

    tripAllTime.innerText = `You have spent ${numberToDollar(total)} on all your trips.`
}

function numberToDollar(num){
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dollars = USDollar.format(num);

    return dollars 
}

function createDestinationCards(destinations){
    destinationCardDisplay.innerHTML = '';

    destinations.forEach((destination)=> {
        const destinationLocation = destination.split(',')

        destinationCardDisplay.innerHTML += `
        <section class="dest-card">
            <h3>${destinationLocation[0]}</h3>
            <p>${destinationLocation[1]}</p>
        </section>
        `
        
    })

}