// Open main.html when the extension starts
chrome.runtime.onStartup.addListener(async () => {
  await openOrFocusMainPage();
});

// Open main.html on first install or update
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") {
    await openOrFocusMainPage();
  }
});

async function openOrFocusMainPage() {
  const url = chrome.runtime.getURL("main.html");

  try {
    // Check if it's already open
    const tabs = await chrome.tabs.query({ url });

    if (tabs.length > 0) {
      // Focus the first existing tab
      await chrome.tabs.update(tabs[0].id, { active: true });
      await chrome.windows.update(tabs[0].windowId, { focused: true });
    } else {
      // Otherwise open a new tab
      await chrome.tabs.create({ url });
    }
  } catch (error) {
    console.error("Failed to open/focus main page:", error);
  }
}
