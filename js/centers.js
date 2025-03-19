/** @format */

const saveCenterButton = document.getElementById("save-center");
saveCenterButton.addEventListener("click", saveCenter);

function saveCenter() {
    const titleDiv = document.getElementById("center-title");
    const listTypeDiv = document.getElementById("list-type");
    const listItemsDiv = document.getElementById("list-items");

    const title = titleDiv.value;
    const listType = listTypeDiv.value;
    const listItems = listItemsDiv.value.split("\n");

    const settings = JSON.parse(localStorage.getItem("class-timers-settings"));
    if (!settings.centers) settings.centers = [];

    const centerData = {
        title: title,
        listType: listType,
        listItems: listItems,
    };

    settings.centers.push(centerData);

    localStorage.setItem("class-timers-settings", JSON.stringify(settings));

    titleDiv.value = "";
    listTypeDiv.value = "list-disc";
    listItemsDiv.value = "";
}
