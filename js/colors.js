const DARK_BUTTON_COLOR_MOD = 0.18
const LIGHT_BUTTON_COLOR_MOD = 0.21
const LIGHTNESS_THRESHOLD = 30

function setColors(color){
    if (!color) color = new Color(JSON.parse(localStorage.getItem('class-timers-settings')).defaults.clock.color)
    body.style.backgroundColor = color.toString()

    
    const darkButtonsColor = color.lighten(DARK_BUTTON_COLOR_MOD).toString()
    const lightButtonsColor = color.lighten(LIGHT_BUTTON_COLOR_MOD).toString()
    
    const fontColor = getFontColor(new Color(lightButtonsColor))
    body.classList.remove(`text-white`)
    body.classList.remove(`text-black`)
    body.classList.add(`text-${fontColor}`)

    const darkButtons = document.querySelectorAll('.dark-button')
    const lightButtons = document.querySelectorAll('.light-button')

    darkButtons.forEach(element => {
        const classes = getClassesThatInclude('bg', element.id)
        removeClassesFromElement(classes, element.id)
        element.style.backgroundColor = darkButtonsColor
    })
    lightButtons.forEach(element => {
        const classes = getClassesThatInclude('bg', element.id)
        removeClassesFromElement(classes, element.id)
        element.style.backgroundColor = lightButtonsColor
    })
}
function getFontColor(backgroundColor) {
    if (!backgroundColor instanceof Color) backgroundColor = new Color(backgroundColor)

    let black = new Color('black')
    let white = new Color('white')

    const contrastWhite = backgroundColor.contrast(white, "Lstar")
    const contrastBlack = backgroundColor.contrast(black, "Lstar")

    return contrastWhite > LIGHTNESS_THRESHOLD ? 'white' : 'black'
}