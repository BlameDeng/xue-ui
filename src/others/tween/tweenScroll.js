import TWEEN from '@tweenjs/tween.js'

function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}
requestAnimationFrame(animate)

function tweenScroll(el, position, duration = 500) {
    let dom = null
    if (typeof el === 'string') {
        dom = document.querySelector(el)
    } else {
        dom = el
    }
    let x = 0
    let y = 0
    if (el === window) {
        x = window.scrollX
        y = window.scrollY
    } else {
        x = dom.scrollLeft
        y = dom.scrollTop
    }
    let coords = { x, y }
    new TWEEN.Tween(coords)
        .to({ x: position.x, y: position.y }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            dom.scrollTo(coords.x, coords.y)
        })
        .start()
}

export default tweenScroll