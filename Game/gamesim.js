class REGION{
    constructor(controlScores, resourceType, isCity){
        this.regionID = (0o1); //8 bit binary number, stores unique region id
        this.controlScores = controlScores; //Dict of 3 bit binary numbers for each nation, stores info on the control state of the region (controlled, contested, in battle, etc)
        this.resourceType = resourceType; //2 bit binary number, stores the resource present in region
        this.isCity = isCity; //2 bit binary number, stores whether or not the region has a city
    };
    
    invade(controlScoreChange){
        this.controlScores = controlScoreChange; //5 bit binary number, updates the control score after an event
    };
};

class NATION{
    constructor(color){
        this.nationID = (0o0); //4 bit binary number, stores unique nation id
        this.color = color; //4 bit binary number, stores unique color id
        this.units = {}
    };

    createUnit(type, level, location){
        let unit = new UNITS(this.nationID, type, level, location);
        this.units[unit.unitID] += unit;
    };
};

class UNITS{
    constructor(owner, type, level, location){
        this.unitID = (0o0); //10 bit binary number, stores unique unit id
        this.owner = owner; //4 bit binary number, stores the nation id of owner
        this.type = type; //2 bit binary number, stores the type of unit
        this.level = level; //5 bit binary number, stores the level of unit
        this.location = location; //8 bit binary number, stores the region id of location
    };
};


let Japan = new NATION(("red"))
Japan.createUnit(("infantry"), (3), ("Shanghai"))
let dict = {}
dict[Japan.nationID] = 1
let Shanghai = new REGION((dict), ("farm"), (false))
console.log(Shanghai.controlScores)