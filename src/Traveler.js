class Traveler {
constructor(travelerInfo){
    this.travelerID = travelerInfo.id;
    this.travelerName =travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
}

findFirstName(){
    const names = this.travelerName.split(' ')

    return names[0]
}
}

export default Traveler;