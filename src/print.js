import { cube } from './math.js'
import _ from 'lodash'

export const createEle = () => {
    var element = document.createElement('button')
    element.innerHTML = _.join(['webpack build'], cube(5))
    element.onclick = () => {
        console.log('this123')
    }
    element.classList.add('hello')
    return element
}
