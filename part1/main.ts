// part 1 of pizza deliverable problem
import * as fs from 'fs';
import * as path from 'path';

// read file
const file = fs.readFileSync(path.join(__dirname + '/test/', 'PizzaDeliveryInput.txt'), 'utf8');
// get the string of movements
const movements = file.toString();

// define location interface
interface ILocation {
    x: number;
    y: number;
};

// this guarantees a unique mapping from a pair of coordinates
// JSON.stringify(...) has decent performance for small objects
// not recommended for large objects
const hashCodeString = (location: ILocation): string => {
    return JSON.stringify(location);
}

// class definition
class DeliveryObject {
    pizzaCounterMap: Map<number | string, number>;
    hashFunction: Function;
    currentLocation: ILocation;
    constructor(pizzaCounter: Map<number | string, number>, hash: Function) {
        this.pizzaCounterMap = pizzaCounter;
        this.hashFunction = hash;
        // initial location
        this.currentLocation = {x: 0, y: 0};
        // one pizza delivered at initial location
        this.updatePizzaCount();
    }
    move(movement: string) {
        switch(movement) {
            case '<': // to the west
                this.currentLocation.x -= 1;
                break;
            case '>': // to the east
                this.currentLocation.x += 1;
                break;
            case '^': // to the north
                this.currentLocation.y += 1;
                break;
            case 'v': // to the south
                this.currentLocation.y -= 1;
                break;
            default:
                throw new Error('Invalid movement!')
        }
        // one pizza delivered at final location
        this.updatePizzaCount();
    }
    protected updatePizzaCount() {
        // get key for current location
        const key = this.hashFunction(this.currentLocation);
        // have we not been already here ?
        if (!this.pizzaCounterMap.has(key)) {
            // initialize by delivering a single pizza there
            this.pizzaCounterMap.set(key, 1)
        } else {
            // get current count of delivered pizzas
            const currentCount = this.pizzaCounterMap.get(key) as number;
            // update count: one more pizza delivered
            this.pizzaCounterMap.set(key, currentCount + 1);
        }
    }
    numberOfLocations(): number {
        return this.pizzaCounterMap.size;
    }
    printCurrentLocation(): void {
        console.log(this.currentLocation);
    }
}

// defines the location and counter repo
const pizzaCounterMap = new Map<number, number>();

// a new delivery guy, injects map repo and hash function
const deliveryPerson = new DeliveryObject(pizzaCounterMap, hashCodeString);

// iterate through movements
for(let k=0; k<movements.length; k++) {
    // move and deliver to that location
    deliveryPerson.move(movements[k]);
}

// report time!
console.log('Part1 - Pizza delivery problem')
console.log('------------------------------')
console.log('how many houses receive at least one pizza?');
const answer = deliveryPerson.numberOfLocations();
console.log(`answer: ${answer}`);