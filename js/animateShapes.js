const FONT_SIZES = [ "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl", "text-7xl", "text-8xl", "text-9xl", ]
const NUMBER_OF_SHAPES = 30

function populateShapes(shape){
    const shapesDiv = document.getElementById('animated-icons')
    
    if (!shape) return shapesDiv.innerHTML = ''

    shapesDiv.innerHTML = ''

    for (let index = 0; index < NUMBER_OF_SHAPES; index++) {
        const i = document.createElement('i')
        i.classList.add(`fa-solid`, `fa-${shape}`)
        shapesDiv.appendChild(i)
    }
}



function randomPosition() {
    return Math.floor(Math.random() * 90) + 1 // Random position from 1% to 90%
}
function randomDuration() {
    return 5 + Math.random() * 10 // Random duration from 5 to 15 seconds
}
function animateIcon(icon) {
    const x = randomPosition()
    const y = randomPosition()
    const fontSize = FONT_SIZES.random()

    icon.style.left = x + "vw"
    icon.style.top = y + "vh"
    icon.classList.add(fontSize)
}
function randomScale() {
    return 0.5 + Math.random() * 1.5
}
// function animateIcons() {
//     const icons = document.querySelectorAll("#animated-icons i")

//     icons.forEach((icon) => {
//         const duration = randomDuration()

//         // Initial animation setup
//         animateIcon(icon)
//         icon.style.animation = `changeSize ${duration}s ease-in-out infinite`

//         // Update position at the end of each resize cycle
//         icon.addEventListener("animationiteration", () => {
//             animateIcon(icon)
//         })
//     })
// }
function animateIcons() {
    const icons = document.querySelectorAll("#animated-icons i");

    icons.forEach((icon) => {
        const duration = randomDuration();

        // Initial animation setup
        animateIcon(icon);
        icon.style.animation = `changeSize ${duration}s ease-in-out infinite`;
        icon.style.animationPlayState = isPaused ? 'paused' : 'running';

        // Update position at the end of each resize cycle
        icon.addEventListener("animationiteration", () => {
            if (!isPaused) {
                animateIcon(icon);
            }
        });
    });
}
function updateAnimationState(isPaused){
    const icons = document.querySelectorAll("#animated-icons i");

    icons.forEach((icon) => {
        icon.style.animationPlayState = isPaused ? 'paused' : 'running';
    });
}