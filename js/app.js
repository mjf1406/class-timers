const SECOND = 1000
const MINUTE = 60000
const TEN_SECONDS = 10000
const TRANSITION_DURATION = 30000
const TIMER_DONE_AUDIO = 10000

const sleep = ms => new Promise(r => setTimeout(r, ms));

const settingsButton = document.getElementById('settings')




settingsButton.addEventListener('click', function(){

})




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