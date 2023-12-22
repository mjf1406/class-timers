document.addEventListener("DOMContentLoaded", function () {
    // Toggle Modal
    const toggleButtons = document.querySelectorAll("[data-modal-toggle]");
    toggleButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal-toggle");
            if (modalId === 'save-preset-modal') {
                let selectedPreset = (localStorage.getItem('clicked-preset') == 'word-search-presets') ? document.getElementById('presets-dropdown').value : document.getElementById('presets-dropdown-crossword').value
                if (selectedPreset !== 'load') {
                    let modal = document.getElementById('overwrite-preset-modal')
                    modal.classList.toggle('hidden')
                    let displayPresetName = document.getElementById('update-preset-name')
                    displayPresetName.innerText = selectedPreset
                } else {
                    const modal = document.getElementById(modalId);
                    modal.classList.toggle("hidden");
                }
            }
            else if (modalId === 'delete-preset-modal'){
                let selectedPreset = (localStorage.getItem('clicked-preset') == 'word-search-presets') ? document.getElementById('presets-dropdown').value : document.getElementById('presets-dropdown-crossword').value
                if (selectedPreset === 'load') {
                    return makeToast('Please select a preset before deleting!', 'warning')
                } else {
                    let displayPresetName = document.getElementById('delete-confirmation-preset')
                    displayPresetName.innerText = selectedPreset
                    const modal = document.getElementById(modalId);
                    modal.classList.toggle("hidden");
                }
            } else {
                const modal = document.getElementById(modalId);
                modal.classList.toggle("hidden");
            }
        });
    });
    // Show Modal
    const showButtons = document.querySelectorAll("[data-modal-show]");
    showButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal-toggle");
            if (modalId === 'save-preset-modal') {
                let selectedPreset = (localStorage.getItem('clicked-preset') == 'word-search-presets') ? document.getElementById('presets-dropdown').value : document.getElementById('presets-dropdown-crossword').value
                if (selectedPreset !== 'load') {
                    let modal = document.getElementById('overwrite-preset-modal')
                    modal.classList.toggle('hidden')
                    let displayPresetName = document.getElementById('update-preset-name')
                    displayPresetName.innerText = selectedPreset
                } else {
                    const modal = document.getElementById(modalId);
                    modal.classList.toggle("hidden");
                }
            }
            else if (modalId === 'delete-preset-modal'){
                let selectedPreset = (localStorage.getItem('clicked-preset') == 'word-search-presets') ? document.getElementById('presets-dropdown').value : document.getElementById('presets-dropdown-crossword').value
                if (selectedPreset === 'load') {
                    return makeToast('Please select a preset before deleting!', 'warning')
                } else {
                    let displayPresetName = document.getElementById('delete-confirmation-preset')
                    displayPresetName.innerText = selectedPreset
                    const modal = document.getElementById(modalId);
                    modal.classList.toggle("hidden");
                }
            } else {
                const modal = document.getElementById(modalId);
                modal.classList.toggle("hidden");
            }
        });
    });
    // Hide Modal
    const hideButtons = document.querySelectorAll("[data-modal-hide]");
    hideButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal-hide");
            const modal = document.getElementById(modalId);
            modal.classList.add("hidden");
        });
    });
});