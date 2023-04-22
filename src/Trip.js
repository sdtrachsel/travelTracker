import Destination from './Destination'

class Trip {
    constructor(traveler, tripList) {
        this.traveler = traveler
        this.allTrips = tripList.filter(trip => trip.userID === traveler.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    findByStatus(status) {
        return this.allTrips.filter(trip => trip.status === status)
    }
    
    // paramenters: upcoming or past
    findByTense(tense){
        const now = new Date ()
        now.setHours(0, 0, 0, 0)
        let trips =[];

        if(tense === 'past'){
            trips = this.allTrips.filter(trip => new Date(trip.date) < now)
        } else if(tense === 'upcoming'){
            const upTrips = this.allTrips.filter(trip => new Date(trip.date) >= now)
            trips = [... upTrips];
            trips.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
        
        if(trips){
            return trips
        }         
    }

    addNewTrip(trip) {
        this.allTrips.push(trip)
        this.allTrips.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    calulateAllTimeCost(destinationList) {
        const totalCost = this.allTrips.reduce((acc, cV) => {
            const tripCost = destinationList.calculateDestinationCost(cV.destinationID, cV.travelers, cV.duration)
            acc += tripCost
            return acc
        }, 0)

        return totalCost

    }
}

export default Trip;

