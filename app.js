var timerInterval;
var clockInterval;
var transitionInterval;
var isPaused = false;
var rotationsInterval;

const SECOND = 1000;
const MINUTE = 60000;
const TEN_SECONDS = 10000;
const TRANSITION_DURATION = 30000;
const TIMER_DONE_AUDIO = 10000;
const TIMER_OFFSET = SECOND * 1;
const AUTO_CANCEL_TIMER_THRESHOLD = SECOND * 30 - SECOND;

const transitionTrack = new Audio(`data/audio/30s-jeopardy-song.mp3`);
const audioTimesUp = new Audio(`data/audio/10s-calm-alarm.mp3`);
const audioThreeMinutesLeft = new Audio(`data/audio/3-minutes-warning.mp3`);
const audioOneMinuteLeft = new Audio(`data/audio/1-minute-warning.mp3`);

const body = document.getElementById("body");

let threeMinutesPlayed = false;
let oneMinutePlayed = false;

// $("#font-awesome-picker").iconpicker();

function setTime() {
    let locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    let time = new Date()
        .toLocaleTimeString(locale, undefined)
        .replace("PM", "")
        .replace("AM", "");
    let divTime = document.getElementById("time");
    divTime.innerHTML = time;
}
function setDate() {
    let locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    let dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let date = new Date().toLocaleDateString(locale, dateOptions);
    let divDate = document.getElementById("date");
    divDate.innerHTML = date;
}
function cancelTimer(color, shape) {
    clearInterval(timerInterval);
    clearInterval(transitionInterval);

    transitionTrack.stop();
    audioTimesUp.stop();

    const endTimeDiv = document.getElementById("timer-end");
    endTimeDiv.classList.add("hidden");

    // Reveal timer adjustment buttons
    const adjustmentButtons = document.getElementById(
        "timer-adjustment-buttons"
    );
    adjustmentButtons.classList.add("hidden");

    // Reveal default timer and custom timer buttons
    const defaultTimersGroup = document.getElementById("timer-buttons");
    const customTimersGroup = document.getElementById("custom-timers");
    defaultTimersGroup.classList.remove("hidden");
    customTimersGroup.classList.remove("hidden");

    const customTimerTitle = document.getElementById("custom-timer-title");
    customTimerTitle.classList.add("hidden");
    customTimerTitle.innerHTML = "";

    setTime();
    clockInterval = setInterval(setTime, SECOND);
    localStorage.setItem("state", "clock");

    const classes = getClassesThatInclude("bg", "body");
    removeClassesFromElement(classes, "body");
    body.style.backgroundColor = color;

    color = new Color(color);

    setColors(color);
    populateShapes(shape);
    animateIcons();

    threeMinutesPlayed = false;
    oneMinutePlayed = false;
}
function pauseTimer() {
    if (isPaused) return makeToast("The timer is already paused!", "warning");

    isPaused = true;

    const timerDiv = document.getElementById("time");
    timerDiv.classList.toggle("opacity-25");

    updateAnimationState(isPaused);
}
function resumeTimer() {
    if (!isPaused) return makeToast("The timer is already running!", "warning");

    isPaused = false;

    const timerDiv = document.getElementById("time");
    const currentDuration = parseInt(timerDiv.name);
    const adjustingTimer = true;
    setEndTime(currentDuration, adjustingTimer);

    timerDiv.classList.toggle("opacity-25");

    updateAnimationState(isPaused);
}
function setTimer(durationMilliseconds, color, shape, transition) {
    if (!transition) transition = false;
    const divTimer = document.getElementById("time");
    divTimer.innerHTML = convertMsToTime(durationMilliseconds);
    divTimer.name = durationMilliseconds;

    localStorage.setItem("repeated", false);
    localStorage.setItem("duration", durationMilliseconds);

    clearInterval(timerInterval);
    clearInterval(clockInterval);

    // Hide default timer and custom timer buttons
    const defaultTimersGroup = document.getElementById("timer-buttons");
    const customTimersGroup = document.getElementById("custom-timers");
    defaultTimersGroup.classList.add("hidden");
    customTimersGroup.classList.add("hidden");

    // Reveal timer adjustment buttons
    const adjustmentButtons = document.getElementById(
        "timer-adjustment-buttons"
    );
    const modifyTimerButtonsPlus = document.getElementById(
        "timer-adjustment-buttons-plus"
    );
    const modifyTimerButtonsMinus = document.getElementById(
        "timer-adjustment-buttons-minus"
    );
    const playButton = document.getElementById("play-timer");
    const pauseButton = document.getElementById("pause-timer");

    adjustmentButtons.classList.remove("hidden");
    modifyTimerButtonsMinus.classList.remove("hidden");
    modifyTimerButtonsPlus.classList.remove("hidden");
    pauseButton.classList.remove("hidden");
    playButton.classList.remove("hidden");

    timerInterval = setInterval(timer, SECOND);

    // Adjust the background color
    if (color) {
        const classes = getClassesThatInclude("bg", "body");
        removeClassesFromElement(classes, "body");
        body.style.backgroundColor = color;
        color = new Color(color);
        setColors(color);
    }
    if (shape != undefined) {
        populateShapes(shape);
        animateIcons();
    }

    threeMinutesPlayed = false;
    oneMinutePlayed = false;
}
async function timer() {
    transitionTrack.loop = true;
    audioTimesUp.loop = true;

    let timerState = localStorage.getItem("state");
    let divTimer = document.getElementById("time");
    let milliseconds = parseInt(divTimer.name);
    if (!isPaused) {
        if (timerState != "rotations") {
            // Check for 3 minutes left
            if (!threeMinutesPlayed && milliseconds <= 3 * MINUTE && milliseconds > 2 * MINUTE) {
                playSoundMultipleTimes(audioThreeMinutesLeft);
                threeMinutesPlayed = true;
            }

            // Check for 1 minute left
            if (!oneMinutePlayed && milliseconds <= MINUTE && milliseconds > 0) {
                playSoundMultipleTimes(audioOneMinuteLeft);
                oneMinutePlayed = true;
            }
        }
        if (timerState != "rotations" && milliseconds <= SECOND * 1.5)
            audioTimesUp.play();
        if (milliseconds <= -AUTO_CANCEL_TIMER_THRESHOLD) {
            const settings = JSON.parse(
                localStorage.getItem("class-timers-settings")
            );
            const data = settings.defaults.clock;
            const color = data.color;
            const shape = data.shape;
            cancelTimer(color, shape);
        }
        milliseconds = milliseconds - SECOND;
        divTimer.innerHTML = convertMsToTime(milliseconds);
        divTimer.name = milliseconds;
    }
}
function setEndTime(timerDuration, adjustingTimer) {
    const state = localStorage.getItem("state");
    if (state == "rotations") return;
    const locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    const time = new Date();
    const newTime = new Date(time.getTime() + timerDuration); // Adds the timerDuration to the current date

    const divTimerEnd = document.getElementById("timer-end");
    if (!adjustingTimer) divTimerEnd.classList.toggle("hidden");
    divTimerEnd.innerHTML = newTime.toLocaleTimeString(locale, undefined);
}
function playSoundMultipleTimes(audio, repeatCount = 3) {
    return new Promise((resolve) => {
        let playCount = 0;
        
        // Function to play a single instance
        function playNext() {
            if (playCount >= repeatCount) {
                resolve();
                return;
            }
            
            audio.currentTime = 0;
            
            // Play the audio
            audio.play().then(() => {
                playCount++;
                
                // Wait for the current playback to finish before starting the next one
                audio.addEventListener('ended', () => {
                    // Small delay to ensure clear separation between plays
                    setTimeout(playNext, 100);
                }, { once: true }); // Use once: true to prevent memory leaks
            }).catch(error => {
                console.error(`Failed to play audio on attempt ${playCount + 1}:`, error);
                playCount++;
                playNext(); // Continue to next attempt even if there's an error
            });
        }
        
        playNext();
    });
}
