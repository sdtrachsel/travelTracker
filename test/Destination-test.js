import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination'
import sampleDestinations from './Destination-testData';

describe('Destination', function () {
    let testDestinations;


    beforeEach('data creation', () => {
        testDestinations = new Destination(sampleDestinations)
    });

    it('should be a function', function () {
        expect(Destination).to.be.a('function');
    });

    it('should be an instance of Destination', function () {
        expect(testDestinations).to.be.an.instanceof(Destination);
    });

    it('should store a list of destinations', function () {
        expect(testDestinations.allDestinations).to.deep.equal(sampleDestinations);       
    });

    it('should find a destination by id', function () {
        expect(testDestinations.findById(19)).to.deep.equal({
            "id": 19,
            "destination": "Quito, Ecuador",
            "estimatedLodgingCostPerDay": 60,
            "estimatedFlightCostPerPerson": 500,
            "image": "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            "alt": "a city at night with cloudy, snowy mountains in the distance"
        });
        
        expect(testDestinations.findById(35)).to.deep.equal({
            "id": 35,
            "destination": "Anchorage, Alaska",
            "estimatedLodgingCostPerDay": 200,
            "estimatedFlightCostPerPerson": 100,
            "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "man riding on kayak surrounded by mountains"
        });       
    });

    it('should find a destination by name', function () {
        expect(testDestinations.findByName('Anchorage, Alaska')).to.deep.equal({
            "id": 35,
            "destination": "Anchorage, Alaska",
            "estimatedLodgingCostPerDay": 200,
            "estimatedFlightCostPerPerson": 100,
            "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "man riding on kayak surrounded by mountains"
        });
        
        expect(testDestinations.findByName('Quito, Ecuador')).to.deep.equal({
            "id": 19,
            "destination": "Quito, Ecuador",
            "estimatedLodgingCostPerDay": 60,
            "estimatedFlightCostPerPerson": 500,
            "image": "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            "alt": "a city at night with cloudy, snowy mountains in the distance"
        });   
    })

    it('should calculate the cost of visiting a destination', function () {
        expect(testDestinations.calculateDestinationCost(35, 1, 10)).to.be.equal(2310);  
        expect(testDestinations.calculateDestinationCost(25, 5, 18)).to.be.equal(4565);          
    });
});
