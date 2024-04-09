class REGION{
    constructor(regionID, controlScore, resourceType, isCity){
        this.regionID = regionID; //8 bit binary number, stores unique region id
        this.controlScore = controlScore; //5 bit binary number, stores info on the control state of the region (controlled, contested, in battle, etc)
        this.resourceType = resourceType; //2 bit binary number, stores the resource present in region
        this.isCity = isCity; //2 bit binary number, stores whether or not the region has a city
    };
    invade(controlScoreChange){
        this.controlScore = controlScoreChange; //5 bit binary number, updates the control score after an event
    };
};

class NATION{
    constructor(nationID, color, regionControl, militaryUnits){
        this.nationID = nationID; //4 bit binary number, stores unique nation id
        this.color = color; //4 bit binary number, stores unique color id
        this.regionControl = regionControl; // not sure how to do this, list of ids?
        this.militaryUnits = militaryUnits; // not sure how to do this, list of ids?
    };
};

class UNITS{
    constructor(unitID, owner, type, level, location){
        this.unitID = unitID; //10 bit binary number, stores unique unit id
        this.owner = owner; //4 bit binary number, stores the nation id of owner
        this.type = type; //2 bit binary number, stores the type of unit
        this.level = level; //5 bit binary number, stores the level of unit
        this.location = location; //8 bit binary number, stores the region id of location
    };
};

