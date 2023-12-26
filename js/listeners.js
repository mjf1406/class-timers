const timers = document.getElementsByName('timer-button')
timers.forEach(element => {
    element.addEventListener('click', function(){
        const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
        const data = settings.defaults.timer
        const color = data.color
        const shape = data.shape
        const durationMilliseconds = parseInt(this.id) * 1000
        setTimer(durationMilliseconds, color, shape)
        setEndTime(durationMilliseconds)
        localStorage.setItem('state', 'timer')
    })
});

const modifyTimerButtons = document.getElementsByName('modify-timer-button')
modifyTimerButtons.forEach(element => {
    element.addEventListener('click', function() {
        const id = this.id
        const seconds = (id.includes('plus')) ? parseInt(id.replace('plus-','')) : parseInt(id.replace('minus-',''))
        const milliseconds = seconds * 1000 

        const timeDiv = document.getElementById('time')
        const currentDuration = parseInt(timeDiv.name)
        if (currentDuration - milliseconds < 0 && id.includes('minus')) return makeToast(`The new duration cannot be less than zero (0)!`, `warning`)
        const duration = (id.includes('minus')) ? currentDuration - milliseconds : currentDuration + milliseconds

        setTimer(duration)
        setEndTime(duration, true)
    })
});

const cancelTimerButton = document.getElementById('cancel-timer')
cancelTimerButton.addEventListener('click', function(){ 
    const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    const data = settings.defaults.clock
    let color = data.color
    const shape = data.shape
    cancelTimer(color, shape)
    color = new Color(color)
    setColors(color)
    localStorage.setItem('state', 'canceled')
})

const pauseTimerButton = document.getElementById('pause-timer')
pauseTimerButton.addEventListener('click', pauseTimer)

const resumeTimerButton = document.getElementById('play-timer')
resumeTimerButton.addEventListener('click', resumeTimer)