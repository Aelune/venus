document.addEventListener('DOMContentLoaded', () => {
  const DEBUG = false; // set true for debugging

  function log(...args) {
    if (DEBUG) console.log("[HomeExt]", ...args);
  }

  // ---------------- CLOCK + DATE ----------------
  function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');

    if (clock) {
      clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    if (date) {
      date.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    requestAnimationFrame(updateClock); // smoother than setInterval
  }
  updateClock();

  // ---------------- TABS FUNCTIONALITY ----------------
  const tabIndicator = document.querySelector('.tab-indicator');
  const tabButtons = document.querySelectorAll('.tab-btn');

  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelector('.tab-btn.active')?.classList.remove('active');
        btn.classList.add('active');

        // Hide all tab contents, show selected one
        document.querySelectorAll('.tab-content')
          .forEach(content => content.classList.remove('active'));
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');

        // Move indicator
        if (tabIndicator) {
          tabIndicator.style.left = `${btn.offsetLeft}px`;
          tabIndicator.style.width = `${btn.offsetWidth}px`;
        }
      });
    });

    // Initialize indicator on the active tab
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn && tabIndicator) {
      tabIndicator.style.left = `${activeBtn.offsetLeft}px`;
      tabIndicator.style.width = `${activeBtn.offsetWidth}px`;
    }
  } else {
    log("No tab buttons found");
  }

  // ---------------- HELP BUTTON ----------------
  const helpBtn = document.getElementById('help-button');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      try {
        // Works in Firefox. For Chrome, fall back to chrome.runtime.getURL
        const runtime = typeof browser !== "undefined" ? browser : chrome;
        const helpUrl = runtime.runtime.getURL('settings/help.html');
        window.open(helpUrl, '_blank');
        log("Opening help page:", helpUrl);
      } catch (err) {
        console.error("Failed to open help page:", err);
      }
    });
  } else {
    log("Help button not found");
  }
});
                                                                                                                          uyj77n        vb                                                               
