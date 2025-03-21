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

const addCenterToRotationsButton = document.getElementById(
    "add-center-to-rotation-button"
);
addCenterToRotationsButton.addEventListener("click", function (e) {
    e.preventDefault();

    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    const userCenters = settings.centers;
    const userCentersCount = userCenters.length;

    const centersAddedDiv = document.getElementById("centers-added");
    const centersAddedQuantity = centersAddedDiv.childElementCount;

    if (centersAddedQuantity + 1 > userCentersCount) {
        return makeToast(
            `You cannot add more than <strong>${userCentersCount}</strong> center${
                userCentersCount >= 2 ? "s" : ""
            } because that's how many you created.`,
            `error`
        );
    }

    const selects = document.getElementsByName("add-center-to-rotations");
    const selectedCenters = [];
    for (const element of selects) {
        selectedCenters.push(element.value);
    }

    const centerId = generateId();

    const centerDiv = document.createElement("div");
    centerDiv.id = `center-${centerId}`;
    centerDiv.classList.add("flex", "flex-row", "items-center", "gap-2");

    const centersSelect = document.createElement("select");
    centersSelect.name = "add-center-to-rotations";
    centersSelect.id = `add-center-to-rotations-center-${centerId}`;
    centersSelect.classList.add(
        "bg-gray-50",
        "border",
        "border-gray-300",
        "text-gray-900",
        "text-sm",
        "rounded-lg",
        "focus:ring-primary-600",
        "focus:border-primary-600",
        "block",
        "w-full",
        "p-2.5",
        "dark:bg-gray-700",
        "dark:border-gray-600",
        "dark:text-white"
    );

    for (let index = 0; index < userCenters.length; index++) {
        const element = userCenters[index];
        const title = element.title;
        const option = document.createElement("option");
        // if (selectedCenters.includes(title)) continue; // TODO: get this working so that if the user changes one, it updates all other selects. This is probably going to be hard.
        if (!selectedCenters.includes(element.id)) option.selected = true;
        option.value = element.id;
        option.innerHTML = title;
        centersSelect.appendChild(option);
    }

    centerDiv.appendChild(centersSelect);

    const icon = document.createElement("i");
    icon.id = `center-${centerId}-delete`;
    icon.classList.add(
        "text-red-600",
        "cursor-pointer",
        "fa-solid",
        "fa-trash",
        "dark:text-red-500",
        "hover:text-red-800",
        "dark:hover:text-red-700"
    );
    icon.addEventListener("click", function (e) {
        e.preventDefault();

        const div = document.getElementById(`center-${centerId}`);
        div.remove();
    });

    centerDiv.appendChild(icon);
    1;
    centersAddedDiv.appendChild(centerDiv);

    const addedCenters = centersAddedDiv.children;
    for (let index = 0; index < addedCenters.length; index++) {
        const element = addedCenters[index];
        console.log("🚀 ~ element:", element);
        const id = element.id;
        const centerId = document.getElementById(
            `add-center-to-rotations-${id}`
        ).value;
        console.log("🚀 ~ centerId:", centerId);
    }
});
