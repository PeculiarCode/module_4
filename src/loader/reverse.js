module.exports = function (src) {
    if (src) {
        src = src.split('').reverse().join('')
        console.log('--- reverse-loader output:' + src)
    }
    return src
}
