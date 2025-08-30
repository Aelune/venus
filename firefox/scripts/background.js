// background.js
// Open main.html when the extension starts
browser.runtime.onStartup.addListener(async () => {
  await openOrFocusMainPage();
});

// (Optional) Also open main.html on first install
// browser.runtime.onInstalled.addListener(async (details) => {
//   if (details.reason === "install") {
//     await openOrFocusMainPage();
//   }
// });

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") {
    await openOrFocusMainPage();
  }
});

async function openOrFocusMainPage() {
  const url = browser.runtime.getURL("main.html");

  // Check if it's already open
  const tabs = await browser.tabs.query({ url });

  if (tabs.length > 0) {
    // Focus the first existing tab
    await browser.tabs.update(tabs[0].id, { active: true });
    await browser.windows.update(tabs[0].windowId, { focused: true });
  } else {
    // Otherwise open a new tab
    await browser.tabs.create({ url });
  }
}
