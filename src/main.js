import './style.scss'
import { createEle } from './print'
import { header } from './header'
document.body.appendChild(createEle())
document.body.appendChild(header())

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         document.body.removeChild(element)
//         element = createEle() // 重新渲染页面后，component 更新 click 事件处理
//         document.body.appendChild(element)
//     })
// }
