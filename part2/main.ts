// part 2 of pizza deliverable problem
import * as fs from 'fs';
import * as path from 'path';

const file = fs.readFileSync(path.join(__dirname + '/test/', 'PizzaDeliveryInput.txt'), 'utf8');
const string = file.toString();
console.log(string.length);
