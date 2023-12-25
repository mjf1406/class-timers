const startRotationsButton = document.getElementById('save-centers')
startRotationsButton.addEventListener('click', function(e){
    e.preventDefault()
})

document.addEventListener("DOMContentLoaded", function () {
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    const transitionDuration = document.getElementById('rotation-transition-duration')
    transitionDuration.value = parseInt(settingsData.defaults.transition.duration) / 1000
})