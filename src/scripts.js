// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getLoadData, get, post, remove } from './apiCalls'
import TravelerRepository from './TravelerRepository'
import Traveler from './Traveler'
import Trip from './Trip'
import Destination from './Destination';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


let allTravelers;
let allDestinations;
let currentUser;
let currentUserTrips;

window.addEventListener('load', () => {
    getLoadData()
        .then(data => {
            allTravelers = new TravelerRepository (data[0].travelers);
            allDestinations= new Destination (data[1].destinations);
            currentUser = new Traveler (allTravelers.findTravelerById(14));
            currentUserTrips = new Trip (allTravelers.findTravelerById(14), data[2].trips)
        })
        .catch(err => console.log(err))

    

});
