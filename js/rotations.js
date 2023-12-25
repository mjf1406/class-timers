const rotationsInputs = [
    document.getElementById('rotation-duration'),
    document.getElementById('rotation-transition-duration'),
    document.getElementById('rotation-quantity')
]
rotationsInputs.forEach(element => {
    element.addEventListener('input', rotationsInputsListener)
    element.addEventListener('change', rotationsInputsListener)
});
const rotationsInputButtons = document.querySelectorAll('.rotations-input-button')
rotationsInputButtons.forEach(element => {
    element.addEventListener('click', rotationsInputsListener)
});


const startRotationsButton = document.getElementById('save-centers')
startRotationsButton.addEventListener('click', function(e){
    e.preventDefault()
})

document.addEventListener("DOMContentLoaded", function () {
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    const transitionDuration = document.getElementById('rotation-transition-duration')
    transitionDuration.value = parseInt(settingsData.defaults.transition.duration) / 1000
})


function calculateTotalTime(){
    const rotationDuration = parseInt(document.getElementById('rotation-duration').value)
    const transitionDuration = parseInt(document.getElementById('rotation-transition-duration').value)
    const numberOfRotations = parseInt(document.getElementById('rotation-quantity').value)

    return ( ( ( rotationDuration * 60 ) + transitionDuration) * numberOfRotations - transitionDuration ) * 1000
}
function calculateEndTime(milliseconds){
    const time = new Date();
    return new Date(time.getTime() + milliseconds); 
}

function rotationsInputsListener(){
    const rotationsEndTimeDiv = document.getElementById('create-rotations-end-time')

    const totalDuration = calculateTotalTime()
    const endTime = calculateEndTime(totalDuration)

    const locale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    rotationsEndTimeDiv.innerHTML = `${endTime.toLocaleTimeString(locale, undefined)}`
}