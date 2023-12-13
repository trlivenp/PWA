const butInstall = document.getElementById('buttonInstall');

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();
  // Store the event for later use
  let deferredPrompt = event;

  // Update UI to notify the user to install the PWA
  // You can customize this part based on your UI requirements
  butInstall.style.display = 'block';

  // TODO: Implement a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the install button after the PWA is installed
    butInstall.style.display = 'none';
  });
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log that the PWA was successfully installed
  console.log('PWA was installed');
});
