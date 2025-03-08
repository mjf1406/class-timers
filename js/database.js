/** @format */

// Define the Dexie instance once
const db = new Dexie("class-timers");
db.version(1).stores({
    audio: "++id, name, data",
});

async function initializeDb() {
    // List of audio files to load
    const audioFiles = [
        "1-minute-warning.mp3",
        "10s-calm-alarm.mp3",
        "3-minutes-warning.mp3",
        "30s-jeopardy-song.mp3",
        "4s-magical-surprise.mp3",
    ];

    // Function to load audio file as ArrayBuffer
    async function loadAudioFile(filename) {
        try {
            const response = await fetch(`data/audio/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filename}`);
            }
            const blob = await response.blob();
            // Convert Blob to ArrayBuffer
            const arrayBuffer = await blob.arrayBuffer();
            return arrayBuffer;
        } catch (error) {
            console.error(`Error loading audio file ${filename}:`, error);
            return null;
        }
    }

    // Process each audio file sequentially
    for (const filename of audioFiles) {
        try {
            // Check if the audio file already exists in the db by querying the "name" field
            const existingEntry = await db.audio
                .where("name")
                .equals(filename)
                .first();
            if (existingEntry) {
                console.log(
                    `Audio file ${filename} already exists in the database.`
                );
                continue;
            }
            // Load the audio file if not in the database
            const data = await loadAudioFile(filename);
            if (data) {
                await db.audio.put({ name: filename, data });
                console.log(`Added ${filename} to the database.`);
            } else {
                console.warn(
                    `Skipped adding ${filename} due to loading issues.`
                );
            }
        } catch (error) {
            console.error(`Error processing ${filename}:`, error);
        }
    }

    console.log("🕜 Class Timers | Audio initialized!");
    setupSettings();
    console.log("🕜 Class Timers | Settings initialized!");
}

// Function to retrieve an audio file from IndexedDB using the single Dexie instance
async function getAudioFromDb(filename) {
    try {
        const audioEntry = await db.audio
            .where("name")
            .equals(filename)
            .first();
        if (audioEntry) {
            return audioEntry.data;
        } else {
            console.warn(`Audio file ${filename} not found in IndexedDB`);
            return null;
        }
    } catch (error) {
        console.error("Error retrieving audio file:", error);
        return null;
    }
}

// Function to create an Audio object from ArrayBuffer (reconstruct Blob)
async function createAudioFromBuffer(filename) {
    const bufferData = await getAudioFromDb(filename);
    if (bufferData) {
        // Reconstruct the Blob from the ArrayBuffer
        const blob = new Blob([bufferData], { type: "audio/mpeg" });
        const objectUrl = URL.createObjectURL(blob);
        return new Promise((resolve, reject) => {
            const audioElement = new Audio(objectUrl);
            audioElement.oncanplaythrough = () => {
                resolve(audioElement);
                // Optionally revoke the URL after loading
                URL.revokeObjectURL(objectUrl);
            };
            audioElement.onerror = () =>
                reject(new Error("Failed to load audio"));
        });
    }
    return null;
}

// Replicate the playSoundMultipleTimes function from the original code
function playSoundMultipleTimes(audio, repeatCount = 3) {
    return new Promise((resolve) => {
        let playCount = 0;

        function playNext() {
            if (playCount >= repeatCount) {
                resolve();
                return;
            }

            audio.currentTime = 0;
            audio
                .play()
                .then(() => {
                    playCount++;
                    audio.addEventListener(
                        "ended",
                        () => {
                            setTimeout(playNext, 100);
                        },
                        { once: true }
                    );
                })
                .catch((error) => {
                    console.error(
                        `Failed to play audio on attempt ${playCount + 1}:`,
                        error
                    );
                    playCount++;
                    playNext();
                });
        }
        playNext();
    });
}

// Async function to create all audio objects
async function initializeAudioObjects() {
    try {
        const audioTimesUp = await createAudioFromBuffer("10s-calm-alarm.mp3");
        const audioThreeMinutesLeft = await createAudioFromBuffer(
            "3-minutes-warning.mp3"
        );
        const audioOneMinuteLeft = await createAudioFromBuffer(
            "1-minute-warning.mp3"
        );
        const transitionTrack = await createAudioFromBuffer(
            "30s-jeopardy-song.mp3"
        );

        return {
            audioTimesUp,
            audioThreeMinutesLeft,
            audioOneMinuteLeft,
            transitionTrack,
        };
    } catch (error) {
        console.error("Error initializing audio objects:", error);
        return null;
    }
}

// Example usage
async function setupAudioAndDatabase() {
    await initializeDb();
}

async function playTestAudioFromDb() {
    const audioObjects = await initializeAudioObjects();

    if (audioObjects) {
        await playSoundMultipleTimes(audioObjects.audioOneMinuteLeft);
    }
}

// Call this function when your app starts
setupAudioAndDatabase();
