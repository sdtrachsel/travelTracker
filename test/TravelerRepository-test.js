import chai from 'chai';
const expect = chai.expect;
import TravelerRepository from '../src/TravelerRepository';
import sampleTravelers from './data/TravelerRepository-testData';


describe('Travler Repository', function () {
    let repository;

    beforeEach('data creation', () => {
        repository = new TravelerRepository(sampleTravelers);
    });

    it('should be a function', function () {
        expect(TravelerRepository).to.be.a('function');
    });

    it('should be an instance of TravelerRepository', function () {
        expect(repository).to.be.an.instanceof(TravelerRepository);
    });

    it.skip('should store a repositories of travelers', function () {
        expect(repository.travelers).to.deep.equal(sampleTravelers)
    });

    it.skip('should find a travler by the traveler id', function () {
        expect(repository.findTravelerById(4)).to.deep.equal({
            "id": 5,
            "name": "Tiffy Grout",
            "travelerType": "thrill-seeker"
        });
        expect(repository.findTravelerById(1)).to.deep.equal({
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        });
    });

    it.skip('should let you know if a traveler is not found when searching by ID', function () {
        expect(repository.findTravelerById(14)).to.be.equal('No traveler found with that id');
        expect(repository.findTravelerById(26)).to.be.equal('No traveler found with that id');
    });

    it.skip('should find a traveler by the traveler name', function () {
        expect(repository.findTravelerByName('Rachael Vaughten')).to.deep.equal({
            "id": 2,
            "name": "Rachael Vaughten",
            "travelerType": "thrill-seeker"
        });
        expect(repository.findTravelerByName('Sibby Dawidowitsch')).to.deep.equal({
            "id": 3,
            "name": "Sibby Dawidowitsch",
            "travelerType": "shopper"
        });
    });

    it.skip('should let you know if a traveler is not found when searching by name', function () {
        expect(repository.findTravlerByName('Rocky Balboa')).to.be.equal('No traveler found by that name');
        expect(repository.findTravlerByName('Niel Armstrong')).to.be.equal('No traveler found by that name');
    });
});