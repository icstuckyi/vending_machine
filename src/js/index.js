import ColaGenerator from "./components/colaGenerator.js";
import VendingMachine from "./components/vendingMachine.js";

const colaGenerator = new ColaGenerator();
const vendingMachine = new VendingMachine();

await colaGenerator.setup();
vendingMachine.setup();
