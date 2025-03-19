/** @format */

// Wait for the DOM to load before setting up rotation settings
document.addEventListener("DOMContentLoaded", function () {
    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );
    const transitionDuration = document.getElementById(
        "rotation-transition-duration"
    );
    transitionDuration.value =
        parseInt(settingsData.defaults.transition.duration) / 1000;
});

// Set up event listeners for rotation inputs
const rotationsInputs = [
    document.getElementById("rotation-duration"),
    document.getElementById("rotation-transition-duration"),
    document.getElementById("rotation-quantity"),
];
rotationsInputs.forEach((element) => {
    element.addEventListener("input", rotationsInputsListener);
    element.addEventListener("change", rotationsInputsListener);
});
const rotationsInputButtons = document.querySelectorAll(
    ".rotations-input-button"
);
rotationsInputButtons.forEach((element) => {
    element.addEventListener("click", rotationsInputsListener);
});

// When the user clicks the start rotations button...
const startRotationsButton = document.getElementById("save-centers");
startRotationsButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const centersModal = document.getElementById("centers-modal");

    const rotationDuration =
        parseInt(document.getElementById("rotation-duration").value) *
        60 *
        1000;
    const transitionDuration =
        parseInt(
            document.getElementById("rotation-transition-duration").value
        ) * 1000;
    const numberOfRotations = parseInt(
        document.getElementById("rotation-quantity").value
    );

    centersModal.classList.toggle("hidden");

    localStorage.setItem("state", "rotations");

    await setRotationsTimers(
        numberOfRotations,
        rotationDuration,
        transitionDuration
    );
});

// Calculate the total time based on user inputs
function calculateTotalTime() {
    const rotationDuration =
        parseFloat(document.getElementById("rotation-duration").value) *
        60 *
        1000;
    const transitionDuration =
        parseFloat(
            document.getElementById("rotation-transition-duration").value
        ) * 1000;
    const numberOfRotations = parseInt(
        document.getElementById("rotation-quantity").value
    );
    return (rotationDuration + transitionDuration) * numberOfRotations;
}

// Calculate end time for display purposes
function calculateEndTime(milliseconds) {
    const time = new Date();
    return new Date(time.getTime() + milliseconds);
}

// Update the UI to show the estimated end time for rotations
function rotationsInputsListener() {
    const rotationsEndTimeDiv = document.getElementById(
        "create-rotations-end-time"
    );
    const totalDuration = calculateTotalTime();
    const endTime = calculateEndTime(totalDuration);
    const locale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
    rotationsEndTimeDiv.innerHTML = `${endTime.toLocaleTimeString(
        locale,
        undefined
    )}`;
}

// Set up the rotations timers using updated audio playback via AudioManager
async function setRotationsTimers(
    numberOfRotations,
    rotationDuration,
    transitionDuration,
    color,
    shape
) {
    localStorage.setItem("state", "rotations");
    const timeDiv = document.getElementById("time");
    timeDiv.classList.remove("text-12xl");
    timeDiv.classList.add("text-10xl");

    const timerTitle = document.getElementById("custom-timer-title");
    timerTitle.classList.remove("hidden");

    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );
    const transitionColor = settingsData.defaults.transition.color;
    const transitionShape = settingsData.defaults.transition.shape;
    const rotationsColor = color ? color : settingsData.defaults.centers.color;
    const rotationsShape = shape ? shape : settingsData.defaults.centers.shape;

    for (let i = 0; i < numberOfRotations; i++) {
        timerTitle.classList.remove("hidden");
        timerTitle.innerHTML = `Rotation ${i + 1} / ${numberOfRotations}`;
        setTimer(rotationDuration, rotationsColor, rotationsShape);
        updateUI("add");
        await sleep(rotationDuration);
        await sleep(TIMER_OFFSET); // Ensure TIMER_OFFSET is defined in your app.js

        // Skip the transition after the last rotation
        if (numberOfRotations === i + 1) continue;

        setTimer(transitionDuration, transitionColor, transitionShape, true);
        // Use AudioManager to play the transition audio in loop mode
        audioManager.play("transitionTrack", { loop: true });
        updateUI("add");
        await sleep(transitionDuration);
        await sleep(TIMER_OFFSET);
        // Stop the transition audio using AudioManager
        audioManager.stop("transitionTrack");
    }

    updateUI("remove");
}

// Update the UI buttons based on the timer state
function updateUI(type) {
    const modifyTimerButtonsPlus = document.getElementById(
        "timer-adjustment-buttons-plus"
    );
    const modifyTimerButtonsMinus = document.getElementById(
        "timer-adjustment-buttons-minus"
    );
    const playButton = document.getElementById("play-timer");
    const pauseButton = document.getElementById("pause-timer");

    if (type === "add") {
        modifyTimerButtonsPlus.classList.add("hidden");
        modifyTimerButtonsMinus.classList.add("hidden");
        playButton.classList.add("hidden");
        pauseButton.classList.add("hidden");
    } else if (type === "remove") {
        modifyTimerButtonsPlus.classList.remove("hidden");
        modifyTimerButtonsMinus.classList.remove("hidden");
        playButton.classList.remove("hidden");
        pauseButton.classList.remove("hidden");
    }
}
