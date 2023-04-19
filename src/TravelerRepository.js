class TravelerRepository {
    constructor(travelerList) {
        this.travelers = travelerList;
    }

    findTravelerById(id) {
        const traveler = this.travelers.find(traveler => traveler.id === id);

        if (traveler) {
            return traveler;
        } else {
            return 'No traveler found with that id';
        }
    }

    findTravelerByName(name){
        const traveler = this.travelers.find(traveler => traveler.name === name);

        if (traveler) {
            return traveler
        } else {
            return 'No traveler found by that name'
        }

    }
}

export default TravelerRepository;