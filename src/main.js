import _ from 'lodash'
import './style.scss'
import MyIcon from './assets/img/basketball.png'
function component() {
    var element = document.createElement('div')
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('hello')
    var myIcon = new Image()
    myIcon.src = MyIcon
    element.appendChild(myIcon)
    return element
}
document.body.appendChild(component())
