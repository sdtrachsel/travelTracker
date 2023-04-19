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

    it('should be an instance of TravlerRepository', function () {
        expect(repository).to.be.an.instanceof(TravelerRepository);
    });

    it('should store a repositories of travlers', function () {
        expect(repository.travelers).to.deep.equal(sampleTravelers)
    });

    it('should find a travler by the travler id', function () {
        expect(repository.findTravlerById(4)).to.deep.equal({
            "id": 5,
            "name": "Tiffy Grout",
            "travelerType": "thrill-seeker"
        });
        expect(repository.findTravlerById(1)).to.deep.equal({
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        });
    });

    it('should let you know if a traveler is not found when searching by ID', function () {
        expect(repository.findTravlerById(14)).to.equal('No traveler found with that id');
        expect(repository.findTravlerById(26)).to.equal('No traveler found with that id');
    });

    it('should find a traveler by the traveler name', function () {
        expect(repository.findTravlerByName('Rachael Vaughten')).to.deep.equal({
            "id": 2,
            "name": "Rachael Vaughten",
            "travelerType": "thrill-seeker"
        });
        expect(repository.findTravlerByName('Sibby Dawidowitsch')).to.deep.equal({
            "id": 3,
            "name": "Sibby Dawidowitsch",
            "travelerType": "shopper"
        });
    });

    it('should let you know if a traveler is not found when searching by name', function () {
        expect(repository.findTravlerById('Rocky Balboa')).to.equal('No traveler found by that name');
        expect(repository.findTravlerById('Niel Armstrong')).to.equal('No traveler found by that name');
    });
});