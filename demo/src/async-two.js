import echarts from "echarts"
import moduleA from "./moduleA"
import {block} from "./test.css"
console.log("block",block)
console.log("async two moduleA's name is changed",moduleA.name,echarts)
const div=document.createElement("div")
div.classList.add(block)
document.body.appendChild(div)
export const aysncTwo="aysncTwo"