# Class Timers
A website that is meant to be displayed on a large monitor for students to see how much time is remaining on any given timer.

## Change Log
- 2023/12/xx
    - [x] modifying a rotation now no longer destroys all rotations
        - tentatively solved by hiding the modifiy timer buttons
    - [x] pause button now works during rotations
        - tentatively solved by hiding the play and pause buttons
- 2023/12/26
    - pause button now pauses animation too
    - added a larger custom timer title when a custom timer is active
    - moved end time to between the timer and the buttons
    - added centers quantity to custom timers; this means custom timers now can act as centers
    - added transition to custom timer
    - can now delete custom timers in the custom timers settings
    - font color across the site now changes based on the background color
    - the pause button now functions: it pauses the timer
    - the resume button now functions
- 2023/12/25
    - timer adjustment buttons no longer remove animation
    - centers button now functions; it creates a centers timer
    - [Creating Rotations] the end time is not calculated and displayed when creating rotations
    - fixed: shapes now populate on start up
    - fixed: settings shape now properly saves
    - shapes now properly move around the background of all timers
    - modals now close when clicking outside
    - modals now close when pushing the escape key
    - switched all number inputs to decrement/increment triplets
- 2023/12/24
    - changed end time to custom timer name when custom timer is activated
    - added custom timers settings so they can be edited
    - default timer buttons now function
    - cancel timer button now functions when a timer is active
    - colors now change based on user settings
    - buttons to modify the timer now function properly
    - added end time when a timer is started
    - button colors now changed based on background color using [Color.js](https://colorjs.io/)
    - added icons to the toasts
    - adjusting color in settings now properly saves
    - settings modal properly loads the transition duration
    - adjusting transition duration now saves in settings
    - added all settings.defaults to the settings modal
    - Custom Timers now function
- 2023/12/22
    - custom timers now populate from localStorage
    - color pickers now have their color set based on localStorage
    - selected shape in settings is not set based on localStorage
    - created the settings group for each type which includes color and shape
    - added the footer
    - added settings button
    - added centers button
    - adding create new custom timer button

## Dependencies
- [TailwindCSS](https://tailwindcss.com/)
- [Tippy.js](https://github.com/atomiks/tippyjs)
- [Toastify.js](https://github.com/aleab/toastify)
- [Color.js](https://colorjs.io/)