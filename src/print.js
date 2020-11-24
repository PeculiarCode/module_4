import _ from 'lodash'
import './style.scss'
const printMe = () => {
    console.log('haha123')
}

function component() {
    var btn = document.createElement('button')
    btn.innerHTML = 'Click me and check the console!'
    btn.onclick = printMe
    return btn
}
document.body.appendChild(component())
