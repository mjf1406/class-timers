function populateCustomTimers(){
    const customTimersDiv = document.getElementById('custom-timers')
    const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    const customTimers = settings.custom_timers
    
    customTimersDiv.innerHTML = ``

    for (let index = 0; index < customTimers.length; index++) {
        const element = customTimers[index]
        const name = element.name
        const button = document.createElement('button')
        button.classList.add('p-2','rounded-md','bg-slate-400','dark:bg-slate-500','h-fit', 'dark:hover:bg-slate-700','dark-button')   
        button.innerText = name
        button.id = `${name}-custom-timer`  
        button.name = 'custom-timer' 
        customTimersDiv.appendChild(button)  
        button.addEventListener('click', function(){
            let data = JSON.parse(localStorage.getItem('class-timers-settings'))
            data = data.custom_timers
            data = data.find(i => i.name == name)
            const duration = parseInt(data.duration)
            const shape = data.shape
            const color = new Color(data.color)
            setTimer(duration, color, shape)
            setEndTime(duration)
            setColors(color, shape)
        })
    }
}

const saveCustomTimer = document.getElementById('save-create-custom-timer')
saveCustomTimer.addEventListener('click', function(e){
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    
    const name = document.getElementById('new-custom-timer-name')
    const duration = document.getElementById('new-custom-timer-duration')
    const color = document.getElementById('new-custom-timer-color')
    const shape = getSelectedValueFromRadioGroup('shape-radio-new-custom-timer')
    const transition = false
    const audio = null
    
    settingsData.custom_timers.push({
        name: name.value,
        transition: transition,
        duration: duration.value * 1000,
        color: color.value,
        audio: audio,
        shape: shape
    })
    localStorage.setItem('class-timers-settings', JSON.stringify(settingsData))

    e.preventDefault()
    document.getElementById('create-custom-timer-modal').classList.toggle('hidden')
    
    populateCustomTimers()

    name.value = ''
    duration.value = ''
    color.value = '#000'
    // transition.value = ''
    // audio.value = ''


    setColors()
})