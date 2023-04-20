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
const landingPage = document.getElementById('landingDisplay');
const upcomingPage = document.getElementById('upcomingDisplay');
const pastPage = document.getElementById('pastDisplay');
const desinationPage = document.getElementById('destinationsDisplay');
const planTripPage = document.getElementById('planTripDisplay');
const viewHomeBtn = document.getElementById('viewHomeBtn');
const viewPastBtn = document.getElementById('viewPastBtn');
const viewPlanTripBtn = document.getElementById('viewPlanTripBtn');
const loginName = document.getElementById('userName')


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
    loginName.innerText = `${currentUser.travelerName}`
}

function populateHomePage() {
    console.log('Home button clicked')
}

function populatePastPage() {
    console.log('Past button clicked')
}

function populatePlanTripPage() {
    console.log('Plan Trip button clicked')
}