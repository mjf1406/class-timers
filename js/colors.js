const DARK_BUTTON_COLOR_MOD = 0.18
const LIGHT_BUTTON_COLOR_MOD = 0.21

function setColors(color){
    body.style.backgroundColor = color.toString()

    const darkButtonsColor = color.lighten(DARK_BUTTON_COLOR_MOD).toString()
    const lightButtonsColor = color.lighten(LIGHT_BUTTON_COLOR_MOD).toString()

    const darkButtons = document.querySelectorAll('.dark-button')
    const lightButtons = document.querySelectorAll('.light-button')

    darkButtons.forEach(element => {
        const classes = getClassesThatInclude('bg', element.id)
        removeClassesFromElement(classes, element.id)
        element.style.backgroundColor = darkButtonsColor
    });
    lightButtons.forEach(element => {
        const classes = getClassesThatInclude('bg', element.id)
        removeClassesFromElement(classes, element.id)
        element.style.backgroundColor = lightButtonsColor
    });
}

// #5f69a4
// #525c96