// const SHAPES = ['xmark','burst','certificate','circle','cloud','clover','crown','diamond','heart','shield','square','star']
const SHAPES = ['xmark','circle','cloud','clover','diamond','heart','square','star']
const DEFAULTS = {
    clock: {
        color: '#ba4949',
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
        color: '#74399',
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

function setupSettings(){
    let settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    if (!settings) {
        settings = {
            defaults: DEFAULTS,
            custom_timers: CUSTOM_TIMERS
        }
        localStorage.setItem('class-timers-settings', JSON.stringify(settings))
    }
}





function populateShapePickers(){
    const shapePickers = document.getElementsByName('shape-picker')
    const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    const defaults = settings.defaults

    for (let index = 0; index < shapePickers.length; index++) {
        const element = shapePickers[index]
        const elementId = (element.id).replace('-shape', '')
        const savedShape = defaults[elementId].shape

        for (let idx = 0; idx < SHAPES.length; idx++) {
            const shape = SHAPES[idx];
            const label = document.createElement('label')
            const input = document.createElement('input')
            const div = document.createElement('div')
    
            const id = `${shape}-${index}`
    
            label.for = id
            label.id = `label-${id}`
    
            input.type = 'radio'
            input.name = 'shape-radio'
            input.classList.add('hidden', 'peer')
            input.id = `input-${id}`

            if (shape == savedShape) input.checked = true
            else if (idx == 0) input.checked = true
    
            div.classList.add('px-4', 'py-2', 'text-sm', 'font-bold', 'text-gray-900', 'bg-white', 'border-t', 'border-b', 'border-gray-200', 'peer-checked:bg-blue-600', 'hover:bg-gray-100', 'hover:text-blue-700', 'focus:z-10', 'focus:ring-2', 'focus:ring-blue-700', 'focus:text-blue-700', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white', 'dark:hover:text-white', 'dark:hover:bg-gray-600', 'dark:focus:ring-blue-500', 'dark:focus:text-white')
            div.innerHTML = `<i class="fa-solid fa-${shape}"></i>`
    
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
        const data = settings.defaults[id]
        console.log("🚀 ~ file: settings.js:93 ~ setColorPickers ~ data:", data)
        element.value = data.color
    }
}