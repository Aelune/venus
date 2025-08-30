browser.runtime.onStartup.addListener(() => {
  browser.tabs.create({
    url: browser.runtime.getURL("main.html")
  });
});

