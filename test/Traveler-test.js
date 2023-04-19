import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler'
import TravelerRepository from '../src/TravelerRepository';
import sampleTravelers from './TravelerRepository-testData'

describe('Traveler', function () {
    let testRepository;
    let testTraveler;
    

    beforeEach('data creation', () => {
        // testRepository = new TravelerRepository(sampleTravelers);
        // testTraveler = new Traveler(testRepository.findTravelerById(4))
    });

    it.skip('should be a function', function () {
        expect(Traveler).to.be.a('function');
    });

    it.skip('should be an instance of Traveler', function () {
        expect(testTraveler).to.be.an.instanceof(Traveler);
    });

    it.skip('should store store a travlers information', function () {
        expect(testTraveler.travelerID).to.be.equal(4);
        expect(testTraveler.travelerName).to.be.equal('Leila Thebeaud');
        expect(testTraveler.travelerType).to.be.equal('photographer');
    });

    it.skip('should be able to find the first name of the travler', function () {
        expect(testTraveler.findFirstName()).to.be.equal('Leila');

        let testTraveler2 = new Traveler(repository.findTravelerById(2));

        expect(testTraveler2.findFirstName()).to.be.equal('Rachael');

    });
});