/** @format */

const timers = document.getElementsByName("timer-button");
timers.forEach((element) => {
    element.addEventListener("click", function () {
        const settings = JSON.parse(
            localStorage.getItem("class-timers-settings")
        );
        const data = settings.defaults.timer;
        const color = data.color;
        const shape = data.shape;
        const durationMilliseconds = parseInt(this.id) * 1000;
        setTimer(durationMilliseconds, color, shape);
        setEndTime(durationMilliseconds);
        localStorage.setItem("state", "timer");
    });
});

const modifyTimerButtons = document.getElementsByName("modify-timer-button");
modifyTimerButtons.forEach((element) => {
    element.addEventListener("click", function () {
        const id = this.id;
        const seconds = id.includes("plus")
            ? parseInt(id.replace("plus-", ""))
            : parseInt(id.replace("minus-", ""));
        const milliseconds = seconds * 1000;

        const timeDiv = document.getElementById("time");
        const currentDuration = parseInt(timeDiv.name);
        if (currentDuration - milliseconds < 0 && id.includes("minus"))
            return makeToast(
                `The new duration cannot be less than zero (0)!`,
                `warning`
            );
        const duration = id.includes("minus")
            ? currentDuration - milliseconds
            : currentDuration + milliseconds;

        setTimer(duration);
        setEndTime(duration, true);
    });
});

const cancelTimerButton = document.getElementById("cancel-timer");
cancelTimerButton.addEventListener("click", function () {
    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    const rotationsInfoDiv = document.getElementById(
        "rotations-info-container"
    );
    rotationsInfoDiv.classList.add("hidden");

    const timeDiv = document.getElementById("time");
    timeDiv.classList.remove("text-10xl");
    timeDiv.classList.add("text-12xl");

    const data = settings.defaults.clock;
    let color = data.color;
    const shape = data.shape;
    cancelTimer(color, shape);
    color = new Color(color);
    setColors(color);
    localStorage.setItem("state", "canceled");
});

const pauseTimerButton = document.getElementById("pause-timer");
pauseTimerButton.addEventListener("click", pauseTimer);

const resumeTimerButton = document.getElementById("play-timer");
resumeTimerButton.addEventListener("click", resumeTimer);

document.body.onkeyup = function (e) {
    // Space Bar
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        const timeRemaining = parseInt(document.getElementById("time").name);
        if (timeRemaining <= 0) {
            const settings = JSON.parse(
                localStorage.getItem("class-timers-settings")
            );
            const data = settings.defaults.clock;
            let color = data.color;
            const shape = data.shape;
            cancelTimer(color, shape);
            color = new Color(color);
            setColors(color);
            localStorage.setItem("state", "canceled");
        } else if (isPaused) resumeTimer();
        else pauseTimer();
    }
};

const centerTitleInput = document.getElementById("center-title");
const stationNameInput = document.getElementById("station-name");

stationNameInput.addEventListener("input", function (e) {
    e.preventDefault();

    const charCount = countCharacters(this.id);
    console.log("🚀 ~ charCount:", charCount);

    const countDiv = document.getElementById("station-char-count");
    countDiv.innerHTML = charCount;
});

centerTitleInput.addEventListener("input", function (e) {
    e.preventDefault();

    const charCount = countCharacters(this.id);

    const countDiv = document.getElementById("center-char-count");
    countDiv.innerHTML = charCount;
});
