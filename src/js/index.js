import ColaGenerator from "./components/colaGenerator";
import VendingMachine from "./components/vendingMachine";

const colaGenerator = new ColaGenerator();
const vendingMachine = new VendingMachine();

await colaGenerator.setup();
vendingMachine.setup();
