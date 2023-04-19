class Destination {
    constructor(destinationList) {
        this.allDestinations = destinationList;
    }

    findById(id) {
        return this.allDestinations.find(destination => destination.id === id);
    }

    calculateDestinationCost(id, numTavelers, duration) {
        const destination = this.allDestinations.find(destination => destination.id === id);

        const cost = (numTavelers * destination.estimatedFlightCostPerPerson) + (duration * destination.estimatedLodgingCostPerDay);

        const totalCost = cost * 1.1;

        return totalCost;
    };
}

export default Destination;