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
// To get unique Value from two numbers, you can use bijective algorithm described in
// https://www.lsi.upc.edu/~alvarez/calculabilitat/enumerabilitat.pdf
const hashCode = (location: ILocation): number => {
    const tmp = ( location.y +  ((location.x + 1)/2));
    return location.x +  ( tmp * tmp);
}
// define a class
class DeliveryPerson {
    pizzaCount: Map<number, number> = new Map<number, number>();
    currentLocation: ILocation;
    constructor() {
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
        if (!this.pizzaCount.has(hashCode(this.currentLocation))) {
            // initialize by delivering a single pizza there
            this.pizzaCount.set(hashCode(this.currentLocation), 1)
        } else {
            const currentCount = this.pizzaCount.get(hashCode(this.currentLocation)) as number;
            // add one more pizza delivered
            this.pizzaCount.set(hashCode(this.currentLocation), currentCount + 1);
        }
    }
    numberOfLocations(): number {
        return this.pizzaCount.size;
    }
    printCurrentLocation(): void {
        console.log(this.currentLocation);
    }
}
// a new delivery guy
const deliveryPerson = new DeliveryPerson();

// iterate through movements
deliveryPerson.printCurrentLocation();
for(let k=0; k<movements.length; k++) {
    deliveryPerson.move(movements[k]);
    deliveryPerson.printCurrentLocation();

}

console.log('how many houses receive at least one pizza?');
const answer = deliveryPerson.numberOfLocations();
console.log(`answer: ${answer}`);