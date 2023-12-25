// const SHAPES = ['xmark','burst','certificate','circle','cloud','clover','crown','diamond','heart','shield','square','star']
const SHAPES = ['xmark','circle','cloud','clover','diamond','heart','square','star']
const DEFAULTS = {
    clock: {
        color: '#BA4949',
        shape:  null,
        simul_audio: null,
        end_audio: null
    },
    transition: {
        color: '#D3E000',
        shape: 'circle',
        simul_audio: '30s-jeopardy-song.mp3',
        duration: SECOND * 30,
        end_audio: null
    },
    timer: {
        color: '#397097',
        shape: 'diamond',
        simul_audio: null,
        end_audio: '10s-calm-alarm.mp3'
    },
    centers: {
        color: '#61075f',
        shape: 'star',
        simul_audio: null,
        end_audio: null
    }
}
const CUSTOM_TIMERS = [
    {
        name: "Quick Game", 
        transitions: false,
        duration: MINUTE * 2,
        color: '#3634ad',
        audio: null,
        shape: 'cloud',
    }
]




// General Settings
function setupSettings(){
    let settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    if (!settings) {
        settings = {
            defaults: DEFAULTS,
            custom_timers: CUSTOM_TIMERS
        }
        localStorage.setItem('class-timers-settings', JSON.stringify(settings))
    }

    // Set up Modal
    const transitionDuration = document.getElementById('settings-transition-duration')
    transitionDuration.value = parseInt(settings.defaults.transition.duration) / 1000
}
function populateShapePickers(){
    const shapePickers = document.getElementsByName('shape-picker')
    const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    const defaults = settings.defaults

    for (let index = 0; index < shapePickers.length; index++) {
        const element = shapePickers[index]
        const elementId = (element.id).replace('-shape', '')
        const savedShape = (elementId.includes('custom')) ? null : defaults[elementId].shape

        for (let idx = 0; idx < SHAPES.length; idx++) {
            const shape = SHAPES[idx];
            const label = document.createElement('label')
            const input = document.createElement('input')
            const div = document.createElement('div')
    
            const id = `${shape}-${index}`
    
            label.for = id
            label.id = `label-${id}`
    
            input.type = 'radio'
            input.name = `shape-radio-${elementId}`
            input.value = shape
            input.classList.add('hidden', 'peer')
            input.id = `input-${id}`

            
            div.classList.add('px-4', 'py-2', 'text-sm', 'font-bold', 'text-gray-900', 'bg-white', 'border-t', 'border-b', 'border-gray-200', 'peer-checked:bg-blue-600', 'hover:bg-gray-100', 'hover:text-blue-700', 'focus:z-10', 'focus:ring-2', 'focus:ring-blue-700', 'focus:text-blue-700', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white', 'dark:hover:text-white', 'dark:hover:bg-gray-600', 'dark:focus:ring-blue-500', 'dark:focus:text-white')
            div.innerHTML = `<i class="fa-solid fa-${shape}"></i>`
            
            if (shape == savedShape || savedShape ==  null && shape == 'xmark') input.checked = true

            label.appendChild(input)
            label.appendChild(div)
    
            element.appendChild(label)
        }
    }
}
function setColorPickers(){
    const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    const colorPickers = document.getElementsByName('color-picker')
    for (let index = 0; index < colorPickers.length; index++) {
        const element = colorPickers[index];
        const id = (element.id).replace('-color','')
        if (id.includes('custom')) continue
        const data = settings.defaults[id]
        element.value = data.color
    }
}



// Custom Timers Settings
function buildCustomTimerSettings(){
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    const customTimers = settingsData.custom_timers
    const customTimerSettingsForm = document.getElementById('timer-settings-edits')
    customTimerSettingsForm.innerHTML = ''
    for (let index = 0; index < customTimers.length; index++) {
        const element = customTimers[index]
        const name = element.name
        const duration = parseInt(element.duration)
        const color = element.color
        const savedShape = element.shape

        const div = document.createElement('div')
        
        div.innerHTML = `
        <div class="p-2 bg-gray-200 rounded-lg dark:bg-gray-500" id="${name}-settings">
            <div class="text-lg font-bold">${name}</div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="custom-timer-settings-name-${name}" class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required placeholder="Input the name" value="${name}">

            <label class="block text-sm font-medium text-gray-900 dark:text-white">Duration (s)</label>
            <div class="flex flex-row" name="number-input-group">
                <button name="custom-timer-settings-duration-${name}" data-action="decrement" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-lg text-sm px-4 py-2.5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <input type="number" name="custom-timer-settings-duration-${name}" id="custom-timer-settings-duration-${name}" class="w-12 bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="${duration / 1000} required="">
                <button name="custom-timer-settings-duration-${name}" data-action="increment" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <label class="block text-sm font-medium text-gray-900 dark:text-white">Color & Shape</label>
            <div class="flex flex-row items-center gap-1 justify-items-start">
                <input type="color" name="color-picker" class="block h-10 p-1 rounded-lg cursor-pointer w-14 disabled:opacity-50 disabled:pointer-events-none" id="custom-timer-settings-color-${name}" value="${color}" title="Choose your color">
                <div name="shape-picker" class="inline-flex rounded-md shadow-sm" role="group" id="custom-timer-settings-shape-${name}"></div>
            </div>
        </div>`

        customTimerSettingsForm.appendChild(div)
        const durationInput = document.getElementById(`custom-timer-settings-duration-${name}`)
        durationInput.value = duration / 1000
        const shapesGroup = document.getElementById(`custom-timer-settings-shape-${name}`)

        for (let idx = 0; idx < SHAPES.length; idx++) {
            const shape = SHAPES[idx];
            const label = document.createElement('label')
            const input = document.createElement('input')
            const div = document.createElement('div')
    
            const id = `${shape}-${index}`
    
            label.for = id
            label.id = `label-${id}`
    
            input.type = 'radio'
            input.name = `shape-radio-settings-${name}`
            input.value = shape
            input.classList.add('hidden', 'peer')
            input.id = `input-${id}`

            
            div.classList.add('px-4', 'py-2', 'text-sm', 'font-bold', 'text-gray-900', 'bg-white', 'border-t', 'border-b', 'border-gray-200', 'peer-checked:bg-blue-600', 'hover:bg-gray-100', 'hover:text-blue-700', 'focus:z-10', 'focus:ring-2', 'focus:ring-blue-700', 'focus:text-blue-700', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white', 'dark:hover:text-white', 'dark:hover:bg-gray-600', 'dark:focus:ring-blue-500', 'dark:focus:text-white')
            div.innerHTML = `<i class="fa-solid fa-${shape}"></i>`
            
            if (shape == savedShape || savedShape ==  null && shape == 'xmark') input.checked = true

            label.appendChild(input)
            label.appendChild(div)
    
            shapesGroup.appendChild(label)
        }

    }
}
const saveCustomTimerSettings = document.getElementById('save-custom-timer-settings')
saveCustomTimerSettings.addEventListener('click', function(){
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))
    const customTimers = settingsData.custom_timers
   
    let timersNew = []

    for (let index = 0; index < customTimers.length; index++) {
        const data = customTimers[index];
        const name = data.name

        const nameNew = document.getElementById(`custom-timer-settings-name-${name}`).value
        const durationNew = parseInt(document.getElementById(`custom-timer-settings-duration-${name}`).value) * 1000
        const colorNew = document.getElementById(`custom-timer-settings-color-${name}`).value
        const shapeNew = getSelectedValueFromRadioGroup(`shape-radio-settings-${name}`)

        timersNew.push({
            name: nameNew,
            duration: durationNew,
            color: colorNew,
            shape: shapeNew,
            transition: false,
            audio: null
        })
    }
    settingsData.custom_timers = timersNew
    localStorage.setItem('class-timers-settings', JSON.stringify(settingsData))
})



// Listeners
const colorPickers = document.getElementsByName('color-picker')
const saveSettings = document.getElementById('save-settings')
saveSettings.addEventListener('click', function(e){
    e.preventDefault()
    const settingsData = JSON.parse(localStorage.getItem('class-timers-settings'))

    const transitionDuration = document.getElementById('transition-duration')
    settings.defaults.transition.duration = transitionDuration.value

    colorPickers.forEach(element => {
        const type = element.id.replace('-color','')
        console.log("🚀 ~ file: settings.js:120 ~ saveSettings.addEventListener ~ type:", type)
        let color = element.value
        settingsData.defaults[type].color = color
        if (type == 'clock') {
            color = new Color(color)
            setColors(color)
        }
    })
    localStorage.setItem('class-timers-settings', JSON.stringify(settingsData))
})