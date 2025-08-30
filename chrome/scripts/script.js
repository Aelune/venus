document.addEventListener('DOMContentLoaded', function () {
  // CLOCK + DATE
  function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    if (clock && date) {
      clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
      date.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // TABS FUNCTIONALITY
  const tabIndicator = document.querySelector('.tab-indicator');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabsNav = document.querySelector('.tabs-nav');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelector('.tab-btn.active')?.classList.remove('active');
      btn.classList.add('active');

      // Hide all tab contents, show selected one
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');

      if (tabIndicator) {
        // Calculate left relative to .tabs-nav container
        const left = btn.offsetLeft;
        const width = btn.offsetWidth;

        tabIndicator.style.left = `${left}px`;
        tabIndicator.style.width = `${width}px`;
      }
    });
  });

  // Also, initialize indicator on page load on active button:
  window.addEventListener('DOMContentLoaded', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn && tabIndicator) {
      tabIndicator.style.left = `${activeBtn.offsetLeft}px`;
      tabIndicator.style.width = `${activeBtn.offsetWidth}px`;
    }
  });


  // HELP BUTTON
  const helpBtn = document.getElementById('help-button');
  if (helpBtn) {
    console.log("Help button detected");
    helpBtn.addEventListener('click', () => {
      // MODIFICATION: Replaced `browser.runtime.getURL` with the Chrome equivalent `chrome.runtime.getURL`.
      // This is the standard API for getting a resource URL within a Chrome extension.
      const helpUrl = chrome.runtime.getURL('settings/help.html');
      console.log("Opening help page:", helpUrl);
      window.open(helpUrl, '_blank');
    });
  } else {
    console.log("Help button NOT found!");
  }
});