class Destination {
    constructor(destinationList) {
        this.allDestinations = destinationList;
    }

    findById(id) {
        return this.allDestinations.find(destination => destination.id === id);
    }

    findByName(name){
        return this.allDestinations.find(destination => destination.destination === name)
    }

    calculateDestinationCost(destId, numTavelers, duration) {
        const destination = this.allDestinations.find(destination => destination.id === destId);

        const cost = (numTavelers * destination.estimatedFlightCostPerPerson) + (duration * destination.estimatedLodgingCostPerDay);

        const totalCost = cost * 1.1;
        
        return totalCost;
    };
}

export default Destination;