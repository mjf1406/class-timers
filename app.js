/** @format */
// app.js

// Global error handler
let errorDisplayed = false;
window.addEventListener("error", (e) => {
    if (!errorDisplayed) {
        errorDisplayed = true;
        alert(
            "An error occurred that prevented the page from loading properly. Please reload the page."
        );
    }
});

// Global variables and timer intervals
let timerInterval, clockInterval, transitionInterval, rotationsInterval;
let isPaused = false;
const SECOND = 1000;
const MINUTE = 60000;
const TEN_SECONDS = 10000;
const TRANSITION_DURATION = 30000;
const TIMER_DONE_AUDIO = 10000;
const TIMER_OFFSET = SECOND * 1;
const AUTO_CANCEL_TIMER_THRESHOLD = SECOND * 30 - SECOND;

let threeMinutesPlayed = false;
let oneMinutePlayed = false;

// Retrieve or initialize user settings
let userSettings = JSON.parse(localStorage.getItem("class-timers-settings"));
if (!userSettings) {
    userSettings = {
        defaults: DEFAULTS,
        custom_timers: CUSTOM_TIMERS,
    };
    localStorage.setItem("class-timers-settings", JSON.stringify(userSettings));
}

/**
 * AudioManager class handles all audio operations and tracks playing states.
 */
class AudioManager {
    constructor() {
        this.audio = {};
        this.playing = {}; // Track playing status for each audio
    }

    async loadAudio(name, bufferSource) {
        try {
            const audioEl = await createAudioFromBuffer(bufferSource);
            this.audio[name] = audioEl;
            this.playing[name] = false;
            // Update playing status when audio naturally ends (if not looping)
            audioEl.addEventListener("ended", () => {
                if (!audioEl.loop) {
                    this.playing[name] = false;
                }
            });
        } catch (error) {
            console.error(`Error loading audio "${name}":`, error);
        }
    }

    async loadAllAudio(settings) {
        await Promise.all([
            this.loadAudio(
                "transitionTrack",
                settings.defaults.transition.simultaneous_audio
            ),
            this.loadAudio("timesUp", settings.defaults.timer.end_audio),
            this.loadAudio(
                "threeMinutes",
                settings.defaults["3-min-warn"].end_audio
            ),
            this.loadAudio(
                "oneMinute",
                settings.defaults["1-min-warn"].end_audio
            ),
        ]);
        console.log("Audio loaded!");
    }

    play(name, { loop = false } = {}) {
        const audio = this.audio[name];
        if (!audio) {
            console.error(`Audio "${name}" not found.`);
            return;
        }
        // If already playing, do not trigger another play request
        if (!audio.paused && this.playing[name]) return;
        audio.loop = loop;
        audio.currentTime = 0;
        this.playing[name] = true;
        audio.play().catch((error) => {
            console.error(`Failed to play audio "${name}":`, error);
            this.playing[name] = false;
        });
    }

    stop(name) {
        const audio = this.audio[name];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            this.playing[name] = false;
        }
    }

    async playMultipleTimes(name, times = 3, delay = 100) {
        const audio = this.audio[name];
        if (!audio) {
            console.error(`Audio "${name}" not found.`);
            return;
        }
        for (let i = 0; i < times; i++) {
            try {
                audio.currentTime = 0;
                await audio.play();
                await new Promise((resolve) => {
                    audio.addEventListener("ended", resolve, { once: true });
                });
            } catch (error) {
                console.error(
                    `Error playing "${name}" on attempt ${i + 1}:`,
                    error
                );
            }
            // Delay between plays
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}

var audioManager = new AudioManager();
(async function initAudio() {
    await audioManager.loadAllAudio(userSettings);
})();

// Utility functions for time and date display
function setTime() {
    const locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    const time = new Date()
        .toLocaleTimeString(locale)
        .replace("PM", "")
        .replace("AM", "");
    document.getElementById("time").innerHTML = time;
}

function setDate() {
    const locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date = new Date().toLocaleDateString(locale, dateOptions);
    document.getElementById("date").innerHTML = date;
}

// Timer and UI functions
function cancelTimer(color, shape) {
    clearInterval(timerInterval);
    clearInterval(transitionInterval);
    audioManager.stop("transitionTrack");
    audioManager.stop("timesUp");

    const endTimeDiv = document.getElementById("timer-end");
    endTimeDiv.classList.add("hidden");

    // Restore UI buttons
    document.getElementById("timer-adjustment-buttons").classList.add("hidden");
    document.getElementById("timer-buttons").classList.remove("hidden");
    document.getElementById("custom-timers").classList.remove("hidden");

    const customTimerTitle = document.getElementById("custom-timer-title");
    customTimerTitle.classList.add("hidden");
    customTimerTitle.innerHTML = "";

    setTime();
    clockInterval = setInterval(setTime, SECOND);
    localStorage.setItem("state", "clock");

    const classes = getClassesThatInclude("bg", "body");
    removeClassesFromElement(classes, "body");
    const body = document.getElementById("body");
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
    document.getElementById("time").classList.toggle("opacity-25");
    updateAnimationState(isPaused);
    // Stop times-up audio if playing
    audioManager.stop("timesUp");
}

function resumeTimer() {
    if (!isPaused) return makeToast("The timer is already running!", "warning");
    isPaused = false;
    const timerDiv = document.getElementById("time");
    const currentDuration = parseInt(timerDiv.name, 10);
    setEndTime(currentDuration, true);
    timerDiv.classList.toggle("opacity-25");
    updateAnimationState(isPaused);
}

function setTimer(durationMilliseconds, color, shape, transition = false) {
    const timerDiv = document.getElementById("time");
    timerDiv.innerHTML = convertMsToTime(durationMilliseconds);
    timerDiv.name = durationMilliseconds;

    localStorage.setItem("repeated", false);
    localStorage.setItem("duration", durationMilliseconds);

    clearInterval(timerInterval);
    clearInterval(clockInterval);

    // Hide default/custom buttons; show adjustment buttons
    document.getElementById("timer-buttons").classList.add("hidden");
    document.getElementById("custom-timers").classList.add("hidden");
    document
        .getElementById("timer-adjustment-buttons")
        .classList.remove("hidden");
    document
        .getElementById("timer-adjustment-buttons-plus")
        .classList.remove("hidden");
    document
        .getElementById("timer-adjustment-buttons-minus")
        .classList.remove("hidden");
    document.getElementById("pause-timer").classList.remove("hidden");
    document.getElementById("play-timer").classList.remove("hidden");

    timerInterval = setInterval(timer, SECOND);

    if (color) {
        const classes = getClassesThatInclude("bg", "body");
        removeClassesFromElement(classes, "body");
        const body = document.getElementById("body");
        body.style.backgroundColor = color;
        color = new Color(color);
        setColors(color);
    }
    if (shape !== undefined) {
        populateShapes(shape);
        animateIcons();
    }

    threeMinutesPlayed = false;
    oneMinutePlayed = false;
}

function timer() {
    const timerState = localStorage.getItem("state");
    const timerDiv = document.getElementById("time");
    let milliseconds = parseInt(timerDiv.name, 10);

    if (!isPaused) {
        // Play warning sounds if not in "rotations" state
        if (timerState !== "rotations") {
            if (
                !threeMinutesPlayed &&
                milliseconds <= 3 * MINUTE + 6 * SECOND &&
                milliseconds >= 2 * MINUTE + 54 * SECOND
            ) {
                audioManager.playMultipleTimes("threeMinutes", 3);
                threeMinutesPlayed = true;
            }
            if (
                !oneMinutePlayed &&
                milliseconds <= MINUTE + 6 * SECOND &&
                milliseconds >= 54 * SECOND
            ) {
                audioManager.playMultipleTimes("oneMinute", 3);
                oneMinutePlayed = true;
            }
        }

        // Start times-up sound when near zero, but only trigger once per run.
        if (timerState !== "rotations" && milliseconds <= 1.5 * SECOND) {
            audioManager.play("timesUp", { loop: true });
        }

        // Auto-cancel timer if it runs too long
        if (milliseconds <= -AUTO_CANCEL_TIMER_THRESHOLD) {
            const settings = JSON.parse(
                localStorage.getItem("class-timers-settings")
            );
            const data = settings.defaults.clock;
            cancelTimer(data.color, data.shape);
        }

        milliseconds -= SECOND;
        timerDiv.innerHTML = convertMsToTime(milliseconds);
        timerDiv.name = milliseconds;
    }
}

function setEndTime(timerDuration, adjustingTimer) {
    if (localStorage.getItem("state") === "rotations") return;
    const locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    const newTime = new Date(Date.now() + timerDuration);
    const divTimerEnd = document.getElementById("timer-end");
    if (!adjustingTimer) divTimerEnd.classList.toggle("hidden");
    divTimerEnd.innerHTML = newTime.toLocaleTimeString(locale);
}

// File upload handling for audio files
document.getElementById("upload-modal").addEventListener("click", () => {
    document.getElementById("upload-audio-modal").classList.remove("hidden");
});

document.getElementById("upload-audio-cancel").addEventListener("click", () => {
    document.getElementById("upload-audio-modal").classList.add("hidden");
});

document
    .getElementById("upload-audio-confirm")
    .addEventListener("click", async () => {
        const fileInput = document.getElementById("audio-file-input");
        const file = fileInput.files[0];

        if (!file) {
            alert("Please select an audio file.");
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            await db.audio.put({ name: file.name, data: arrayBuffer });
            console.log(`Uploaded ${file.name} to database.`);
            alert(`Uploaded ${file.name} successfully.`);
            fileInput.value = "";
            document
                .getElementById("upload-audio-modal")
                .classList.add("hidden");
        } catch (error) {
            console.error("Error uploading audio file:", error);
            alert("There was an error uploading the file.");
        }
        const settings = JSON.parse(
            localStorage.getItem("class-timers-settings")
        );
        populateAudioSelects(settings.defaults);
    });
