const TIMER_OFFSET = SECOND * 1.8

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

async function setRotationsTimers(numberOfRotations, rotationDuration, transitionDuration){
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    
    const transitionColor = settingsData.defaults.transition.color
    const transitionShape = settingsData.defaults.transition.shape
    const rotationsColor = settingsData.defaults.centers.color
    const rotationsShape = settingsData.defaults.centers.shape

    for (let i = 0; i < numberOfRotations; i++) {
        updateUIForRotation()
        setTimer(rotationDuration, rotationsColor, rotationsShape)
        await sleep(rotationDuration)
        await sleep(TIMER_OFFSET)
        
        updateUIForTransition()
        setTimer(transitionDuration, transitionColor, transitionShape)
        await sleep(transitionDuration)
        await sleep(TIMER_OFFSET)
    }
    // Final UI update after rotations
}
function updateUIForTransition() {
    // UI updates for transition
}
function updateUIForRotation() {
    // UI updates for counting
}
function startTransitionCountdown(duration) {
    // TODO: Play the transition audio throughout the transition duration
    return new Promise(resolve => {
        const interval = setInterval(() => {
            // Update transition UI
            if (TODO) { /* condition to end transition */
                clearInterval(interval);
                resolve();
            }
        }, duration);
    });
}
function startRotationCountdown(duration) {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            // Update timer UI
            if (TODO) { /* condition to end timer */
                clearInterval(interval);
                resolve();
            }
        }, duration);
    });
}