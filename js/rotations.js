document.addEventListener("DOMContentLoaded", function () {
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    const transitionDuration = document.getElementById('rotation-transition-duration')
    transitionDuration.value = parseInt(settingsData.defaults.transition.duration) / 1000
})
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
startRotationsButton.addEventListener('click', async function(e){
    e.preventDefault()

    const centersModal = document.getElementById('centers-modal')

    const rotationDuration = parseInt(document.getElementById('rotation-duration').value) * 60 * 1000
    const transitionDuration = parseInt(document.getElementById('rotation-transition-duration').value) * 1000
    const numberOfRotations = parseInt(document.getElementById('rotation-quantity').value)

    centersModal.classList.toggle('hidden')

    localStorage.setItem('state', 'rotations')
    
    await setRotationsTimers(numberOfRotations, rotationDuration, transitionDuration)
})

function calculateTotalTime(){
    const rotationDuration = parseInt(document.getElementById('rotation-duration').value) * 60 * 1000
    const transitionDuration = parseInt(document.getElementById('rotation-transition-duration').value) * 1000
    const numberOfRotations = parseInt(document.getElementById('rotation-quantity').value)

    // return ( ( rotationDuration + transitionDuration) * numberOfRotations - transitionDuration ) // Subtracts one transition if there is no transition at the end
    return ( rotationDuration + transitionDuration) * numberOfRotations 
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

async function setRotationsTimers(numberOfRotations, rotationDuration, transitionDuration, color, shape){
    localStorage.setItem('state','rotations')
    const timerTitle = document.getElementById('custom-timer-title')
    timerTitle.classList.remove('hidden')
    
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    
    const transitionColor = settingsData.defaults.transition.color
    const transitionShape = settingsData.defaults.transition.shape
    const rotationsColor = (color) ? color : settingsData.defaults.centers.color
    const rotationsShape = (shape) ? shape : settingsData.defaults.centers.shape
    
    
    for (let i = 0; i < numberOfRotations; i++) {
        timerTitle.innerHTML = `Rotation ${i + 1} / ${numberOfRotations}`
        setTimer(rotationDuration, rotationsColor, rotationsShape)
        updateUI('add')
        await sleep(rotationDuration)
        await sleep(TIMER_OFFSET)
        
        setTimer(transitionDuration, transitionColor, transitionShape)
        updateUI('add')
        await sleep(transitionDuration)
        await sleep(TIMER_OFFSET)
    }
    
    updateUI('remove')
}
function updateUI(type) {
    const modifyTimerButtonsPlus = document.getElementById('timer-adjustment-buttons-plus')
    const modifyTimerButtonsMinus = document.getElementById('timer-adjustment-buttons-minus')
    const playButton = document.getElementById('play-timer')
    const pauseButton = document.getElementById('pause-timer')

    if (type == 'add') {
        modifyTimerButtonsPlus.classList.add('hidden')
        modifyTimerButtonsMinus.classList.add('hidden')
        playButton.classList.add('hidden')
        pauseButton.classList.add('hidden')
    }
    else if (type == 'remove') {
        modifyTimerButtonsPlus.classList.remove('hidden')
        modifyTimerButtonsMinus.classList.remove('hidden')
        playButton.classList.remove('hidden')
        pauseButton.classList.remove('hidden')
    }
}