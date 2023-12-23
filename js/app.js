const SECOND = 1000
const MINUTE = 60000
const TEN_SECONDS = 10000
const TRANSITION_DURATION = 30000
const TIMER_DONE_AUDIO = 10000

const sleep = ms => new Promise(r => setTimeout(r, ms));

function setTime(){
    let locale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    let time = new Date().toLocaleTimeString(locale, undefined).replace("PM","").replace("AM","")
    let divTime = document.getElementById('time')
    divTime.innerHTML = time
}
function setDate(){
    let locale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    let dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    let date = new Date().toLocaleDateString(locale, dateOptions)
    let divDate = document.getElementById('date')
    divDate.innerHTML = date
}

function populateCustomTimers(){
    const customTimersDiv = document.getElementById('custom-timers')
    const settings = JSON.parse(localStorage.getItem('class-timers-settings'))
    const customTimers = settings.custom_timers
    
    customTimersDiv.innerHTML = ``

    for (let index = 0; index < customTimers.length; index++) {
        const element = customTimers[index]
        const name = element.name
        const button = document.createElement('button')
        button.classList.add('p-2','rounded-md','bg-slate-400','dark:bg-slate-500','h-fit', 'dark:hover:bg-slate-700')   
        button.innerText = name
        button.id = `${name}-custom-timer`   
        customTimersDiv.appendChild(button)  
    }
}

function addListenerToTimers(){
    const timers = document.getElementsByName('timer-button')
    for (let index = 0; index < timers.length; index++) {
        const element = timers[index];
        element.addEventListener('click', function(){
            const duration = parseInt(this.id) * 1000

        })
    }
}

function timer(){
    
}