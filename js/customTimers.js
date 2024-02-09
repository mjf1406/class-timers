function populateCustomTimers(settings) {
    const customTimersDiv = document.getElementById("custom-timers");
    if (!settings)
        settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    const customTimers = settings.custom_timers;

    customTimersDiv.innerHTML = ``;

    for (let index = 0; index < customTimers.length; index++) {
        const element = customTimers[index];
        const name = element.name;
        const button = document.createElement("button");
        button.classList.add(
            "p-2",
            "rounded-md",
            "h-fit",
            "dark:hover:bg-slate-700",
            "dark-button"
        );
        button.innerText = name;
        button.id = `${name}-custom-timer`;
        button.name = "custom-timer";
        customTimersDiv.appendChild(button);
        button.addEventListener("click", async function () {
            let data = JSON.parse(
                localStorage.getItem("class-timers-settings")
            );
            data = data.custom_timers;
            data = data.find((i) => i.name == name);

            const customTimerTitle =
                document.getElementById("custom-timer-title");
            customTimerTitle.classList.remove("hidden");
            customTimerTitle.innerHTML = name;

            const duration = parseInt(data.duration);
            const shape = data.shape;
            const color = new Color(data.color);
            const transitionDuration = data.transition;
            const rotationsQuantity = data.rotationsQuantity;

            if (rotationsQuantity >= 1)
                await setRotationsTimers(
                    rotationsQuantity,
                    duration,
                    transitionDuration,
                    color,
                    shape
                );
            else setTimer(duration, color, shape);
            setColors(color, shape);

            localStorage.setItem("state", "custom-timer");
            setEndTime(duration);
        });
    }
}

const saveCustomTimer = document.getElementById("save-create-custom-timer");
saveCustomTimer.addEventListener("click", function (e) {
    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );

    const name = document.getElementById("new-custom-timer-name");
    const duration = document.getElementById("create-custom-timer-duration");
    let color = document.getElementById("new-custom-timer-color");
    const shape = getSelectedValueFromRadioGroup(
        "shape-radio-new-custom-timer"
    );
    const rotationsQuantity = document.getElementById(
        "create-custom-timer-rotations-quantity"
    );
    const transition = document.getElementById(
        "create-custom-timer-transition-duration"
    );
    const audio = null;

    if (name.value == "" || duration.value == "")
        return makeToast("Please input a name/duration!", "warning");

    settingsData.custom_timers.push({
        id: generateId(),
        name: name.value,
        transition: transition.value * 1000,
        duration: duration.value * 1000,
        color: color.value,
        audio: audio,
        shape: shape == "xmark" ? null : shape,
        rotationsQuantity: rotationsQuantity.value,
    });
    localStorage.setItem("class-timers-settings", JSON.stringify(settingsData));

    e.preventDefault();
    document
        .getElementById("create-custom-timer-modal")
        .classList.toggle("hidden");

    populateCustomTimers();
    buildCustomTimerSettings();
    setColors();

    name.value = "";
    duration.value = 60;
    color.value = "#000";
    transition.value = 60;
    // audio.value = ''
    rotationsQuantity.value = 0;
});
function deleteCustomTimerById(timerId) {
    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );
    if (settingsData && settingsData.custom_timers) {
        settingsData.custom_timers = settingsData.custom_timers.filter(
            (timer) => timer.id !== timerId
        );
    }
    localStorage.setItem("class-timers-settings", JSON.stringify(settingsData));
    return settingsData;
}
