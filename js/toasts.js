let lastToastTime = 0;
const toastDebounceDelay = 3000; // 2 seconds, adjust as needed

function makeToast(content, type) {
    const now = Date.now();

    if (now - lastToastTime > toastDebounceDelay || lastToastTime === 0) {
        // If it's the first toast or enough time has passed since the last toast
        lastToastTime = now;
        showToast(content, type);
    } else {
        // If the toast is triggered too soon, delay it
        clearTimeout(toastDebounceTimer);
        toastDebounceTimer = setTimeout(() => {
            lastToastTime = Date.now();
            showToast(content, type);
        }, toastDebounceDelay - (now - lastToastTime));
    }
}

function showToast(content, type) {
    let backgroundColor;
    if (type === 'success') backgroundColor = '#166534';
    else if (type === 'warning') backgroundColor = '#fde047';
    else if (type === 'error') backgroundColor = '#b91c1c';
    const bgColor = new Color(backgroundColor)

    let color;
    if (type === 'success') color = '#fff';
    else if (type === 'warning') color = '#000';
    else if (type === 'error') color = '#fff';

    let icon;
    if (type === 'success') icon = '<i class="fa-solid fa-check"></i>';
    else if (type === 'warning') icon = '<i class="fa-solid fa-exclamation"></i>';
    else if (type === 'error') icon = '<i class="fa-solid fa-xmark"></i>';

    Toastify({
        text: `<span class="p-2 px-4 rounded-md" style="background-color: ${bgColor.darken(0.2)};">${icon}</span> ${content}`,
        offset: {
            x: 10,
            y: 10
        },
        gravity: "bottom",
        position: "left",
        style: {
            background: backgroundColor,
            color: color,
            zIndex: 1000
        },
        escapeMarkup: false,
    }).showToast();
}