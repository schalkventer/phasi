import './components/prototype-viz/index.js'
import { handleTab, handleChange } from './helpers/index.js'

const input = document.querySelector("[data-phasi-input]");
const output = document.querySelector("[data-phasi-output]");
const viz = document.querySelector("[data-phasi-viz]");

handleChange(input.value, viz, output)
input.addEventListener("keydown", handleTab);
input.addEventListener("input", (event) => handleChange(event.target.value, viz, output));
