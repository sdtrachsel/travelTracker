import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip'
import { sampleTrips, traveler44Trips, traveler44Pending, traveler44Approved, traveler44AfterAdd, traveler19Trips, traveler19Pending, traveler19Approved } from './Trip-testData';

describe('Trip', function () {
    let tiffyTravelerInfo, tiffyTrip, hamTravelerInfo, hamTrip;


    beforeEach('data creation', () => {
        tiffyTravelerInfo = {
            "id": 44,
            "name": "Tiffy Grout",
            "travelerType": "thrill-seeker"
        };

        hamTravelerInfo = {
            "id": 19,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        };

        tiffyTrip = new Trip(tiffyTravelerInfo, sampleTrips)
        hamTrip = new Trip(hamTravelerInfo, sampleTrips)
    });

    it('should be a function', function () {
        expect(Trip).to.be.a('function');
    });

    it('should be an instance of Traveler', function () {
        expect(tiffyTrip).to.be.an.instanceof(Trip);
        expect(hamTrip).to.be.an.instanceof(Trip);
    });

    it.skip('should store a travlers info', function () {
        expect(tiffyTrip.traveler).to.deep.equal(tiffyTravelerInfo);
        expect(hamTrip.traveler).to.deep.equal(hamTravelerInfo);
    });

    it.skip('should store a travlers trips', function () {
        expect(tiffyTrip.allTrips).to.deep.equal(traveler44Trips);
        expect(hamTrip.allTrips).to.deep.equal(traveler19Trips);
    });

    it.skip('should find trips by status', function () {
        expect(tiffyTrip.findByStatus('pending')).to.deep.equal(traveler44Pending);
        expect(tiffyTrip.findByStatus('approved')).to.deep.equal(traveler44Approved);
        expect(hamTrip.findByStatus('pending')).to.deep.equal(traveler19Pending);
        expect(hamTrip.findByStatus('approved')).to.deep.equal(traveler19Approved);
    });

    it.skip('should be able to add a new trip', function () {
        const funTrip = {
            "id": 701,
            "userID": 44,
            "destinationID": 41,
            "travelers": 1,
            "date": "2023/08/23",
            "duration": 6,
            "status": "pending",
            "suggestedActivities": []
        }

        tiffyTrip.addNewTrip(funTrip)

        expect(tiffyTrip.trips).to.deep.equal(traveler44AfterAdd);
    });

    it.skip('should be able calculate the all time costs of trips', function () {

        expect(tiffyTrip.calulateAllTimeCost()).to.equal(36190);
        expect(hamTrip.calulateAllTimeCost()).to.equal(11605);
    });

});