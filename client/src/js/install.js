// Get reference to the install button
const butInstall = document.getElementById("buttonInstall");

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event fired');
    console.log("Event details: " + event)

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    // Store the event so it can be triggered later.
    window.deferredPrompt = event;

    // Show the install button
    butInstall.classList.toggle('hidden', false);
});

// Add an event listener for the install button click
butInstall.addEventListener('click', async () => {
    // Retrieve the earlier saved event
    const promptEvent = window.deferredPrompt;

    // If no saved event, just return
    if (!promptEvent) {
        return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Clear the saved prompt since it can't be used again
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// Add an event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    console.log('App was installed')

    // Clear the saved prompt
    window.deferredPrompt = null;
});
