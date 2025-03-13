/** @format */

const SHAPES = [
    "xmark",
    "circle",
    "cloud",
    "clover",
    "diamond",
    "heart",
    "square",
    "star",
    "certificate",
    "burst",
    "hippo",
    "otter",
    "paw",
    "dog",
    "cow",
    "feather",
    "fish",
    "dragon",
    "shrimp",
    "horse",
    "frog",
    "dove",
    "cat",
    "award",
    "medal",
    "crown",
    "trophy",
    "biohazard",
    "satellite-dish",
    "satellite",
    "meteor",
    "shuttle-space",
    "user-astronaut",
    "robot",
    "snowman",
    "mitten",
    "ice-cream",
    "cookie",
    "bucket",
    "apple-whole",
    "cake-candles",
    "cookie-bite",
    "puzzle-piece",
    "gamepad",
    "microscope",
    "book-open",
    "music",
    "bell",
    "bolt",
    "fire",
    "sun",
    "water",
    "leaf",
    "seedling",
    "plug",
    "wind",
    "radiation",
    "lightbulb",
    "poop",
    "fan",
    "atom",
    "carrot",
    "lemon",
    "pepper-hot",
    "flask",
    "pizza-slice",
    "hotdog",
    "egg",
    "drumstick-bite",
    "drum",
    "cheese",
    "cloud-meatball",
    "burger",
    "bowl-rice",
    "bone",
    "bacon",
    "stroopwafel",
    "football",
    "palette",
    "paintbrush",
    "piggy-bank",
    "face-smile",
    "face-tired",
    "face-surprise",
    "face-smile-wink",
    "face-smile-beam",
    "face-sad-tear",
    "face-sad-cry",
    "face-rolling-eyes",
    "face-meh-blank",
    "face-meh",
    "face-laugh-wink",
    "face-laugh-squint",
    "face-laugh-beam",
    "face-laugh",
    "face-kiss-wink-heart",
    "face-kiss-beam",
    "face-kiss",
    "face-grin-wink",
    "face-grin-wide",
    "face-grin-tongue-wink",
    "face-grin-tongue-squint",
    "face-grin-tongue",
    "face-grin-tears",
    "face-grin-stars",
    "face-grin-squint-tears",
    "face-grin-squint",
    "face-grin-hearts",
    "face-grin-beam-sweat",
    "face-grin-beam",
    "face-grin",
    "face-grimace",
    "face-frown-open",
    "face-frown",
    "face-flushed",
    "face-dizzy",
    "face-angry",
];
const DEFAULTS = {
    clock: {
        color: "#BA4949",
        shape: null,
        simultaneous_audio: null,
        end_audio: null,
    },
    transition: {
        color: "#D3E000",
        shape: "circle",
        simultaneous_audio: "30s-jeopardy-song.mp3",
        duration: SECOND * 30,
        end_audio: null,
    },
    timer: {
        color: "#397097",
        shape: "diamond",
        simultaneous_audio: null,
        end_audio: "10s-calm-alarm.mp3",
    },
    "1-min-warn": {
        end_audio: "1-minute-warning.mp3",
    },
    "3-min-warn": {
        end_audio: "3-minutes-warning.mp3",
    },
    centers: {
        color: "#61075f",
        shape: "star",
        simultaneous_audio: null,
        end_audio: null,
    },
};
const CUSTOM_TIMERS = [
    {
        id: "og772p9ygefszo1n",
        name: "Quick Game",
        transitions: false,
        duration: MINUTE * 2,
        color: "#3634ad",
        audio: null,
        shape: "cloud",
    },
];
const AUDIO_OPTIONS = [
    "timer-audio",
    "transition-audio",
    "1-min-warn-audio",
    "3-min-warn-audio",
];

// General Settings
function setupSettings() {
    let settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    if (!settings) {
        settings = {
            defaults: DEFAULTS,
            custom_timers: CUSTOM_TIMERS,
        };
        localStorage.setItem("class-timers-settings", JSON.stringify(settings));
    }

    // Set up Modal
    const transitionDuration = document.getElementById(
        "settings-transition-duration"
    );
    transitionDuration.value =
        parseInt(settings.defaults.transition.duration) / 1000;

    populateAudioSelects(settings.defaults);
}
function populateShapePickers() {
    const shapePickers = document.getElementsByName("shape-picker");
    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    const defaults = settings.defaults;

    for (let index = 0; index < shapePickers.length; index++) {
        const element = shapePickers[index];

        // Set grid layout with auto-fit for responsive columns
        element.style.display = "grid";
        element.style.gridTemplateColumns =
            "repeat(auto-fit, minmax(40px, 1fr))";
        element.style.gap = "8px";
        element.style.maxHeight = "200px";
        element.style.overflowY = "auto";
        element.style.padding = "12px";
        element.style.width = "100%"; // Ensure it uses available width

        const elementId = element.id.replace("-shape", "");
        const savedShape = elementId.includes("custom")
            ? null
            : defaults[elementId].shape;

        for (let idx = 0; idx < SHAPES.length; idx++) {
            const shape = SHAPES[idx];
            const label = document.createElement("label");
            const input = document.createElement("input");
            const div = document.createElement("div");

            const id = `${shape}-${index}`;

            label.id = `label-${id}`;
            label.classList.add("w-fit", "m-auto");

            input.type = "radio";
            input.name = `shape-radio-${elementId}`;
            input.value = shape;
            input.classList.add("hidden", "peer");
            input.id = `input-${id}`;

            div.classList.add(
                "flex",
                "items-center",
                "justify-center",
                // "w-full",
                "h-full",
                "h-10",
                "w-10",
                "aspect-square",
                "text-xl",
                "font-bold",
                "text-gray-900",
                "bg-white",
                "border",
                "border-gray-200",
                "rounded-md",
                "peer-checked:bg-blue-600",
                "peer-checked:text-white",
                "hover:bg-gray-100",
                "focus:ring-2",
                "focus:ring-blue-700",
                "dark:bg-gray-700",
                "dark:border-gray-600",
                "dark:text-white",
                "dark:hover:bg-gray-600",
                "dark:focus:ring-blue-500"
            );
            div.innerHTML = `<i class="fa-solid fa-${shape}"></i>`;

            if (
                shape === savedShape ||
                (savedShape === null && shape === "xmark")
            )
                input.checked = true;

            label.appendChild(input);
            label.appendChild(div);

            element.appendChild(label);
        }
    }
}

function setColorPickers() {
    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    const colorPickers = document.getElementsByName("color-picker");
    for (let index = 0; index < colorPickers.length; index++) {
        const element = colorPickers[index];
        const id = element.id.replace("-color", "");
        if (id.includes("custom")) continue;
        const data = settings.defaults[id];
        element.value = data.color;
    }
}
async function populateAudioSelects(settings) {
    const audioFiles = await db.audio.toArray();
    for (const element of AUDIO_OPTIONS) {
        const settingsKey = element.replace("-audio", "");
        const html = document.getElementById(element);
        html.innerHTML = "";
        for (const file of audioFiles) {
            const option = document.createElement("option");
            const filename = file.name;
            option.value = filename;
            option.innerHTML = filename;
            html.appendChild(option);
            if (
                settings[settingsKey]["end_audio"] === filename ||
                settings[settingsKey]["simultaneous_audio"] === filename
            ) {
                option.selected = true;
            }
        }
    }
}

// Custom Timers Settings
function buildCustomTimerSettings() {
    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );
    const customTimers = settingsData.custom_timers;
    const customTimerSettingsForm = document.getElementById(
        "timer-settings-edits"
    );
    customTimerSettingsForm.innerHTML = "";
    for (let index = 0; index < customTimers.length; index++) {
        const element = customTimers[index];
        const timerId = element.id;
        const name = element.name;
        const duration = parseInt(element.duration);
        const color = element.color;
        const savedShape = element.shape;

        const div = document.createElement("div");

        div.innerHTML = `
        <div class="p-2 bg-gray-200 rounded-lg dark:bg-gray-500" id="${timerId}-settings">
            <div class="text-lg font-bold flex flex-row items-stretch w-full justify-items-center gap-2">
                <div class="justify-self-start">${name}</div>
                <button id="custom-timer-delete-${timerId}" class="justify-self-end p-2 px-3 rounded-md bg-red-500 h-fit dark:hover:bg-slate-700">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="custom-timer-settings-name-${timerId}" class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required placeholder="Input the name" value="${name}">

            <label class="block text-sm font-medium text-gray-900 dark:text-white">Duration (s)</label>
            <div class="flex flex-row" name="number-input-group">
                <button name="custom-timer-settings-duration-${timerId}" data-action="decrement" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-lg text-sm px-4 py-2.5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <input type="number" name="custom-timer-settings-duration-${timerId}" id="custom-timer-settings-duration-${timerId}" class="w-12 bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="${
            duration / 1000
        }" required="">
                <button name="custom-timer-settings-duration-${timerId}" data-action="increment" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <label class="block text-sm font-medium text-gray-900 dark:text-white">Color & Shape</label>
            <div class="flex flex-row items-center gap-1 justify-items-start">
                <input type="color" name="color-picker" class="block h-10 p-1 rounded-lg cursor-pointer w-14 disabled:opacity-50 disabled:pointer-events-none" id="custom-timer-settings-color-${timerId}" value="${color}" title="Choose your color">
                <div id="custom-timer-settings-shape-${timerId}" name="shape-picker" class="inline-flex rounded-md shadow-sm" role="group"></div>
            </div>
        </div>`;

        customTimerSettingsForm.appendChild(div);

        const durationInput = document.getElementById(
            `custom-timer-settings-duration-${timerId}`
        );
        durationInput.value = duration / 1000;
        const shapesGroup = document.getElementById(
            `custom-timer-settings-shape-${timerId}`
        );

        // Set grid layout with auto-fit for responsive columns
        shapesGroup.style.display = "grid";
        shapesGroup.style.gridTemplateColumns =
            "repeat(auto-fit, minmax(40px, 1fr))";
        shapesGroup.style.gap = "8px";
        shapesGroup.style.maxHeight = "200px";
        shapesGroup.style.overflowY = "auto";
        shapesGroup.style.padding = "12px";
        shapesGroup.style.width = "100%"; // Ensure it uses available width

        // const elementId = element.id.replace("-shape", "");
        // const savedShapeTwo = elementId.includes("custom")
        //     ? null
        //     : defaults[elementId].shape;

        for (let idx = 0; idx < SHAPES.length; idx++) {
            const shape = SHAPES[idx];
            const label = document.createElement("label");
            const input = document.createElement("input");
            const div = document.createElement("div");

            const id = `${shape}-${index}`;

            label.id = `label-${id}`;
            label.classList.add("w-fit", "m-auto");

            input.type = "radio";
            input.name = `shape-radio-settings-${timerId}`;
            input.value = shape;
            input.classList.add("hidden", "peer");
            input.id = `input-${id}`;

            div.classList.add(
                "flex",
                "items-center",
                "justify-center",
                // "w-full",
                "h-full",
                "h-10",
                "w-10",
                "aspect-square",
                "text-xl",
                "font-bold",
                "text-gray-900",
                "bg-white",
                "border",
                "border-gray-200",
                "rounded-md",
                "peer-checked:bg-blue-600",
                "peer-checked:text-white",
                "hover:bg-gray-100",
                "focus:ring-2",
                "focus:ring-blue-700",
                "dark:bg-gray-700",
                "dark:border-gray-600",
                "dark:text-white",
                "dark:hover:bg-gray-600",
                "dark:focus:ring-blue-500"
            );
            div.innerHTML = `<i class="fa-solid fa-${shape}"></i>`;

            if (
                shape === savedShape ||
                (savedShape === null && shape === "xmark")
            )
                input.checked = true;

            label.appendChild(input);
            label.appendChild(div);

            shapesGroup.appendChild(label);
        }

        const deleteButton = document.getElementById(
            `custom-timer-delete-${timerId}`
        );
        deleteButton.addEventListener("click", async function (e) {
            e.preventDefault();
            deleteCustomTimerById(timerId);
            populateCustomTimers();
            buildCustomTimerSettings();
            setColors();
            makeToast(`<b>${name}</b> deleted successfully!`, "success");
        });
    }
}
const saveCustomTimerSettings = document.getElementById(
    "save-custom-timer-settings"
);
saveCustomTimerSettings.addEventListener("click", function () {
    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );
    const customTimers = settingsData.custom_timers;

    let timersNew = [];

    for (let index = 0; index < customTimers.length; index++) {
        const data = customTimers[index];
        const name = data.name;
        const id = data.id;

        const nameNew = document.getElementById(
            `custom-timer-settings-name-${id}`
        ).value;
        const durationNew =
            parseInt(
                document.getElementById(`custom-timer-settings-duration-${id}`)
                    .value
            ) * 1000;
        const colorNew = document.getElementById(
            `custom-timer-settings-color-${id}`
        ).value;
        const shapeNew = getSelectedValueFromRadioGroup(
            `shape-radio-settings-${id}`
        );

        timersNew.push({
            id: id,
            name: nameNew,
            duration: durationNew,
            color: colorNew,
            shape: shapeNew,
            transition: false,
            audio: null,
        });
    }
    settingsData.custom_timers = timersNew;
    localStorage.setItem("class-timers-settings", JSON.stringify(settingsData));

    populateCustomTimers();
    setColors();
});

// Listeners
const colorPickers = document.getElementsByName("color-picker");
const saveSettings = document.getElementById("save-settings");
saveSettings.addEventListener("click", function (e) {
    e.preventDefault();
    const settingsData = JSON.parse(
        localStorage.getItem("class-timers-settings")
    );

    // Save transition duration
    const transitionDuration = document.getElementById(
        "settings-transition-duration"
    );
    settingsData.defaults.transition.duration = transitionDuration.value;

    // Save Colors and Shapes
    for (let index = 0; index < colorPickers.length; index++) {
        const element = colorPickers[index];
        const type = element.id.replace("-color", "");
        if (type.includes("custom-timer")) continue;
        let color = element.value;
        let shape = getSelectedValueFromRadioGroup(`shape-radio-${type}`);
        if (shape == "xmark") shape = null;
        settingsData.defaults[type].color = color;
        settingsData.defaults[type].shape = shape;
        if (type == "clock") {
            color = new Color(color);
            setColors(color);
            populateShapes(shape);
            animateIcons();
        }
    }

    AUDIO_OPTIONS.forEach((optionId) => {
        const audioSelect = document.getElementById(optionId);
        const audioValue = audioSelect.value;
        const key = optionId.replace("-audio", ""); // maps to "timer", "transition", etc.
        const currentDefault = settingsData.defaults[key];

        // If the default has only one of the audio properties set, update that one.
        if (
            currentDefault.simultaneous_audio === null &&
            currentDefault.end_audio !== null
        ) {
            currentDefault.end_audio = audioValue;
        } else if (
            currentDefault.simultaneous_audio !== null &&
            currentDefault.end_audio === null
        ) {
            currentDefault.simultaneous_audio = audioValue;
        } else {
            // If both exist or both are null, default to updating end_audio.
            currentDefault.end_audio = audioValue;
        }
    });

    (async function initAudio() {
        await audioManager.loadAllAudio(settingsData);
    })();
    localStorage.setItem("class-timers-settings", JSON.stringify(settingsData));
});
