<!-- @format -->

# Class Timers

A website that is meant to be displayed on a large monitor for students to see how much time is remaining on any given timer.

## To-do List

-   added centers rotation content
-   created modal to add a center and its info
-   created a UI element in the rotations modal to add created centers to. This allows for centers to be easily repeated if needed.
-   can easily update the title when adding a center to the rotations to do
-   when adding a center, the user is informed that the title can exceed 15 characters, but best if it does not in order to fit on one line

## Change Log

2025/03/22

-   centers cards transition color according to the background color of the timer
-   centers select list is cleared when starting rotations
-   selected centers data now populates the display div when rotations are active
-   added description to center
-   station name and center title have their lengths displayed to the user now
-   added a station input so the user can assign centers to different stations

2025/03/21

-   the toast is now a proper flexbox
-   can now add centers to the rotations modal UI
-   rotations info div now becomes visible when starting rotations
-   rotations info div now becomes hidden when cancelling rotations

2025/03/13

-   audio now works correctly
-   fixed: there was a missing closing double quotations causing a console warning
-   fixed: rotations now function again. They broke due to custom audio changes
-   fixed: custom timer settings now render the icon grid correctly
-   fixed: custom timers can now be saved properly

2025/03/08

-   added a heap load more icons to choose from
-   switched the icon picker to a grid
-   added two new shapes to the settings
-   added audio selects to the settings that change the audio
-   fixed: warning tracks no longer play if the time is below the warning. The window is now +6 seconds from the warning and exactly the warning time.
-   audio files are now loaded from indexedDb instead of the file system

2025/03/05

-   getting things ready to add custom audio uploads

-   2024/1/xx
    -   [ ] modifying a rotation now no longer destroys all rotations
        -   tentatively solved by hiding the modify timer buttons
    -   [ ] pause button now works during rotations
        -   tentatively solved by hiding the play and pause buttons
    -   the current time now displays on all timers
    -   add an icon picker for more icon choices
-   2024/04/02
    -   fixed a spontaneous rotations end time calculation bug
    -   the end time text for rotations is now no longer white when light theme is active
-   2024/3/15
    -   fixed: end timer sound constantly play after first rotation
    -   fixed: cannot delete custom timers
-   2024/2/23
    -   space bar now pauses, resumes, or cancels a timer. Cancels the timer if time remaining is <= 0
-   2024/2/9
    -   custom timers now properly save on edit
-   2024/2/1
    -   removed the sound when timer ends
    -   changed the end timer sound to be the nice sounding track: 10s-calm-alarm.mp3
    -   timer continues into the negative for 30 seconds and the audio loops for this duration, then auto cancels. The timer can be manually canceled by hitting the Cancel button during this time.
    -   made it so that only value greater than 0 will show up in the timer, i.e. if only seconds remain, then only the seconds will show, etc.
-   2024/1/14
    -   shapes now no longer extend the viewport
    -   Rotations counter now is now properly displayed in every rotation
    -   the last transition is skipped in Rotations
    -   transition audio now properly plays
    -   fine-tuned 10s warning audio and times up audio
-   2024/1/10
    -   cancel button now stops audio playback
    -   animated shapes now no longer get smaller and smaller over time
    -   reduced the number of shapes to 10 as they are now bigger on average
-   2024/1/6
    -   info modal text is not black for light theme
    -   info modal buttons text is now always white
-   2024/1/4
    -   added rotation counter to rotations
    -   fixed a bug that would sometime show adjustment buttons during rotations
    -   adjusted light theme button colors of play, pause, and cancel
    -   fixed audio not playing
-   2023/12/26
    -   fixed: custom timer title was not displaying on second play
    -   pause button now pauses animation too
    -   added a larger custom timer title when a custom timer is active
    -   moved end time to between the timer and the buttons
    -   added centers quantity to custom timers; this means custom timers now can act as centers
    -   added transition to custom timer
    -   can now delete custom timers in the custom timers settings
    -   font color across the site now changes based on the background color
    -   the pause button now functions: it pauses the timer
    -   the resume button now functions
-   2023/12/25
    -   timer adjustment buttons no longer remove animation
    -   centers button now functions; it creates a centers timer
    -   [Creating Rotations] the end time is not calculated and displayed when creating rotations
    -   fixed: shapes now populate on start up
    -   fixed: settings shape now properly saves
    -   shapes now properly move around the background of all timers
    -   modals now close when clicking outside
    -   modals now close when pushing the escape key
    -   switched all number inputs to decrement/increment triplets
-   2023/12/24
    -   changed end time to custom timer name when custom timer is activated
    -   added custom timers settings so they can be edited
    -   default timer buttons now function
    -   cancel timer button now functions when a timer is active
    -   colors now change based on user settings
    -   buttons to modify the timer now function properly
    -   added end time when a timer is started
    -   button colors now changed based on background color using [Color.js](https://colorjs.io/)
    -   added icons to the toasts
    -   adjusting color in settings now properly saves
    -   settings modal properly loads the transition duration
    -   adjusting transition duration now saves in settings
    -   added all settings.defaults to the settings modal
    -   Custom Timers now function
-   2023/12/22
    -   custom timers now populate from localStorage
    -   color pickers now have their color set based on localStorage
    -   selected shape in settings is not set based on localStorage
    -   created the settings group for each type which includes color and shape
    -   added the footer
    -   added settings button
    -   added centers button
    -   adding create new custom timer button

## Dependencies

-   [TailwindCSS](https://tailwindcss.com/)
-   [Tippy.js](https://github.com/atomiks/tippyjs)
-   [Toastify.js](https://github.com/aleab/toastify)
-   [Color.js](https://colorjs.io/)
