/** @format */

const saveCenterButton = document.getElementById("save-center");
saveCenterButton.addEventListener("click", saveCenter);

const createStationButton = document.getElementById("save-station");
createStationButton.addEventListener("click", saveStation);

const addCenterToRotationsButton = document.getElementById(
    "add-center-to-rotation-button"
);
addCenterToRotationsButton.addEventListener(
    "click",
    addCenterToRotationsHandler
);

function saveCenter() {
    const titleDiv = document.getElementById("center-title");
    const descriptionDiv = document.getElementById("center-description");
    const listTypeDiv = document.getElementById("list-type");
    const listItemsDiv = document.getElementById("list-items");

    const title = titleDiv.value;
    const description = descriptionDiv.value;
    const listType = listTypeDiv.value;
    const listItems = listItemsDiv.value.split("\n");

    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    if (!settings.centers) settings.centers = [];

    const centerData = {
        id: generateId(),
        title,
        description,
        listType,
        listItems,
    };

    settings.centers.push(centerData);

    localStorage.setItem("class-timers-settings", JSON.stringify(settings));

    titleDiv.value = "";
    descriptionDiv.value = "";
    listTypeDiv.value = "list-disc";
    listItemsDiv.value = "";
}

function populateCentersInformation(centerAndStationPairs) {
    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    const centersData = settings.centers || [];
    const stationsData = settings.stations || [];
    const centersColor = new Color(settings.defaults.centers.color);
    const centerCardColor = centersColor.lighten(0.15).toString();

    const rotationsInfoDiv = document.getElementById("rotations-info");
    rotationsInfoDiv.innerHTML = "";

    // For each pair, find the associated center and station
    for (const pair of centerAndStationPairs) {
        const center = centersData.find((c) => c.id === pair.centerId);
        const station = stationsData.find((s) => s.id === pair.stationId);

        // Only if we found a matching center, then create the div.
        // Optionally, you could display a message if a station is missing.
        if (center) {
            const div = document.createElement("div");
            div.innerHTML = createCenterInfoDiv(
                center,
                station,
                centerCardColor
            );
            rotationsInfoDiv.append(div);
        }
    }
}

function createCenterInfoDiv(center, station, centerCardColor) {
    const containerId = `center-${center.id}`;
    const titleId = `center-${center.id}-title`;
    const infoId = `center-${center.id}-info`;

    // Build the list items HTML for the center
    const listItemsHTML = center.listItems
        .map((item) => `<li>${item}</li>`)
        .join("");

    // Build station information HTML. If station is not found, leave empty.
    const stationHTML = station
        ? `<div class="text-5xl mt-2 mb-2 text-center" id="station-${station.id}-name">${station.name}</div>`
        : `<div class="text-5xl mt-2 mb-2 text-gray-500 text-center" id="station-none">Station not found</div>`;

    // Create the full HTML string including both center and station information.
    const html = `
      <div name="centers-card" class="col-span-1 rounded-2xl p-2" style="background: ${centerCardColor};" id="${containerId}">
      ${stationHTML}
      <div class="text-4xl w-full mb-2 text-center font-bold" id="${titleId}">${
        center.title
    }</div>
      <div class="text-xl italic" id="${titleId}-description">${
        center.description ?? ""
    }</div>
        <div id="${infoId}" class="pt-3 text-lg">
          <ul class="${center.listType} list-inside">
            ${listItemsHTML}
          </ul>
        </div>
      </div>
    `;

    return html;
}

function saveStation() {
    const stationNameDiv = document.getElementById("station-name");
    const stationName = stationNameDiv.value;

    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    if (!settings.stations) settings.stations = [];

    const stationData = {
        id: generateId(),
        name: stationName,
    };

    settings.stations.push(stationData);

    localStorage.setItem("class-timers-settings", JSON.stringify(settings));

    stationNameDiv.value = "";
}
function getUserCenters() {
    // Retrieve the centers from the localStorage settings
    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    return settings.centers || [];
}

function getStations() {
    // Retrieve the stations from the localStorage settings
    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    return settings.stations || [];
}

function getSelectedCenters() {
    // Gather the selected center values from any existing select elements
    const selects = document.getElementsByName("add-center-to-rotations");
    const selectedCenters = [];
    for (const element of selects) {
        selectedCenters.push(element.value);
    }
    return selectedCenters;
}

function getSelectedStations() {
    // Gather the selected station values from any existing station select elements
    const selects = document.getElementsByName("add-station-to-rotations");
    const selectedStations = [];
    for (const element of selects) {
        selectedStations.push(element.value);
    }
    return selectedStations;
}

function createCenterSelect(centerId, centers, selectedCenters) {
    // Create the <select> element for selecting a center
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

    // Populate the center dropdown with options
    for (const element of centers) {
        const option = document.createElement("option");
        // If the center id isn't already selected in another select, mark it as selected by default
        if (!selectedCenters.includes(element.id)) {
            option.selected = true;
        }
        option.value = element.id;
        option.innerHTML = element.title;
        centersSelect.appendChild(option);
    }

    return centersSelect;
}

function createStationSelect(centerId, stations, selectedStations) {
    // Create the <select> element for selecting a station
    const stationSelect = document.createElement("select");
    stationSelect.name = "add-station-to-rotations";
    stationSelect.id = `add-station-to-rotations-${centerId}`;
    stationSelect.classList.add(
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

    // Populate the station dropdown with options
    for (const station of stations) {
        const option = document.createElement("option");
        // If this station hasn't been selected already then auto-select it
        if (!selectedStations.includes(station.id)) {
            option.selected = true;
        }
        option.value = station.id;
        option.innerHTML = station.name;
        stationSelect.appendChild(option);
    }

    return stationSelect;
}

function createDeleteIcon(centerId) {
    // Create a trash icon with an event listener to delete the row
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
        if (div) {
            div.remove();
        }
    });
    return icon;
}

function createCenterDiv(centerId, centerSelect, stationSelect, deleteIcon) {
    // Create the container that holds the center select, station select, and delete icon
    const centerDiv = document.createElement("div");
    centerDiv.id = `center-${centerId}`;
    centerDiv.classList.add("flex", "flex-row", "items-center", "gap-2");

    // Append the center select first, then the station select, then the delete icon
    centerDiv.appendChild(centerSelect);
    centerDiv.appendChild(stationSelect);
    centerDiv.appendChild(deleteIcon);

    return centerDiv;
}

function addCenterToRotationsHandler(e) {
    e.preventDefault();

    // Get centers and stations from local storage
    const centers = getUserCenters();
    const stations = getStations();

    if (!centers.length) {
        return makeToast(
            `Please create at least one center by clicking the <i class="fa-solid fa-laptop-file"></i> button.`,
            "warning"
        );
    }

    if (!stations.length) {
        return makeToast(
            `Please create at least one station by clicking the <i class="fa-solid fa-store"></i> button.`,
            "warning"
        );
    }

    const centersCount = centers.length;
    const stationsCount = stations.length;
    const centersAddedDiv = document.getElementById("centers-added");
    const centersAddedQuantity = centersAddedDiv.childElementCount;

    // Ensure adding one more center row does not exceed the number of centers created
    if (centersAddedQuantity + 1 > centersCount) {
        return makeToast(
            `You cannot add more than <strong>${centersCount}</strong> center${
                centersCount >= 2 ? "s" : ""
            } because that's how many you created.`,
            "error"
        );
    }

    // Also ensure adding one more row does not exceed the number of stations available
    if (centersAddedQuantity + 1 > stationsCount) {
        return makeToast(
            `You cannot add more than <strong>${stationsCount}</strong> station${
                stationsCount >= 2 ? "s" : ""
            } because that's how many you created.`,
            "error"
        );
    }

    // Generate a unique center id for this new row and gather currently selected values
    const centerId = generateId();
    const selectedCenters = getSelectedCenters();
    const selectedStations = getSelectedStations();

    // Create select elements and delete icon from helper functions
    const centerSelect = createCenterSelect(centerId, centers, selectedCenters);
    const stationSelect = createStationSelect(
        centerId,
        stations,
        selectedStations
    );
    const deleteIcon = createDeleteIcon(centerId);

    // Build the complete row container and append it to the DOM
    const centerDiv = createCenterDiv(
        centerId,
        centerSelect,
        stationSelect,
        deleteIcon
    );
    centersAddedDiv.appendChild(centerDiv);

    // Optional: Iterate through all the added centers to handle further logic.
    const addedCenters = centersAddedDiv.children;
    for (const element of addedCenters) {
        const rowId = element.id;
        const centerValue = document.getElementById(
            `add-center-to-rotations-${rowId.replace("center-", "")}`
        )?.value;
        const stationValue = document.getElementById(
            `add-station-to-rotations-${rowId.replace("center-", "")}`
        )?.value;
        // Process centerValue and stationValue if needed
    }
}
