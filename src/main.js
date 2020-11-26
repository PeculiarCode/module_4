import './style.scss'
import { createEle } from './print'
import { header } from './header'
import { txt } from './txt/str.txt'
document.body.appendChild(createEle())
document.body.appendChild(header())
console.log(txt);