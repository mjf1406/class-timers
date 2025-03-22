/** @format */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    if (hours > 0)
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
            seconds
        )}`;
    else if (minutes > 0)
        return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    else return `${padTo2Digits(seconds)}`;
}
function getClassesThatInclude(stringToSearch, elementId) {
    const elem = document.getElementById(elementId);
    return Array.from(elem.classList).filter((i) => i.includes(stringToSearch));
}
function removeClassesFromElement(classesToRemove, elementId) {
    const elem = document.getElementById(elementId);
    for (let index = 0; index < classesToRemove.length; index++) {
        const element = classesToRemove[index];
        elem.classList.remove(element);
    }
}
function getSelectedValueFromRadioGroup(radioGroupName) {
    try {
        return document.querySelector(`input[name="${radioGroupName}"]:checked`)
            .value;
    } catch (error) {
        console.log(
            "🚀 ~ file: global.js:545 ~ getSelectedValueFromRadioGroup ~ radioGroupName:",
            radioGroupName
        );
        console.error(
            "🚀 ~ file: global.js:547 ~ getSelectedValueFromRadioGroup ~ error:",
            error
        );
    }
}
function generateId() {
    // Function to generate a random ID
    // Source: https://stackoverflow.com/a/44622300
    return Array.from(Array(16), () =>
        Math.floor(Math.random() * 36).toString(36)
    ).join("");
}

Array.prototype.random = function () {
    if (this.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.length);
    return this[randomIndex];
};
Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
};
function countCharacters(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found.`);
        return 0;
    }

    // Use value if available (for input and textarea), otherwise fall back to textContent
    const text =
        element.value !== undefined ? element.value : element.textContent;
    return text.length;
}
