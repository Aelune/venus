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
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const tabIndicator = document.querySelector('.tab-indicator');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.tab-btn.active')?.classList.remove('active');
      btn.classList.add('active');

      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');

      if (tabIndicator) {
        tabIndicator.style.width = `${btn.offsetWidth}px`;
        tabIndicator.style.left = `${btn.offsetLeft}px`;
      }
    });
  });

  // HELP BUTTON
  const helpBtn = document.getElementById('help-button');
  if (helpBtn) {
    console.log("Help button detected");
    helpBtn.addEventListener('click', () => {
      const helpUrl = browser.runtime.getURL('settings/help.html');
      console.log("Opening help page:", helpUrl);
      window.open(helpUrl, '_blank');
    });
  } else {
    console.log("Help button NOT found!");
  }
});
