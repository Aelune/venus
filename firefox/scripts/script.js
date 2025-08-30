document.addEventListener('DOMContentLoaded', () => {
  const DEBUG = false;
  function log(...args) { if (DEBUG) console.log("[Venus]", ...args); }

  const themeContainer = document.getElementById("theme-container");
  const themeDropdown = document.getElementById("theme-dropdown");
  const themeToggle = document.getElementById("theme-toggle");
  const themeOptions = document.getElementById("theme-options");
  const body = document.body;

  // Theme configuration
  const themes = {
    spacemen: {
      name: "SpaceMen",
      file: "themes/spaceMen.html",
      icon: "fas fa-rocket"
    },
    dashboard: {
      name: "Dashboard",
      file: "themes/dashboard.html",
      icon: "fas fa-chart-line"
    },
    minimal: {
      name: "Minimal",
      file: "themes/minimal.html",
      icon: "fas fa-circle"
    }
  };

  const defaultTheme = "spacemen";

  // Clock functionality (will work for loaded themes)
  function startClock() {
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
    }

    // Start the clock and update every second
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Tab functionality (will work for loaded themes)
  function initTabs() {
    const tabIndicator = document.querySelector('.tab-indicator');
    const tabButtons = document.querySelectorAll('.tab-btn');

    if (tabButtons.length) {
      log("Initializing tabs:", tabButtons.length);

      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons and contents
          document.querySelector('.tab-btn.active')?.classList.remove('active');
          btn.classList.add('active');

          document.querySelectorAll('.tab-content')
            .forEach(content => content.classList.remove('active'));

          // Show target content
          const target = document.getElementById(btn.dataset.tab);
          if (target) target.classList.add('active');

          // Update indicator position
          if (tabIndicator) {
            updateTabIndicator(btn, tabIndicator);
          }
        });
      });

      // Set initial indicator position
      const activeBtn = document.querySelector('.tab-btn.active');
      if (activeBtn && tabIndicator) {
        setTimeout(() => {
          updateTabIndicator(activeBtn, tabIndicator);
        }, 100);
      }
    } else {
      log("No tab buttons found in this theme");
    }
  }

  function updateTabIndicator(button, indicator) {
    indicator.style.left = `${button.offsetLeft}px`;
    indicator.style.width = `${button.offsetWidth}px`;
  }

  // Particles animation (for spacemen theme)
  function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create floating particles for space theme
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 3 + 2 + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // Theme loading
  async function loadTheme(themeKey) {
    try {
      const theme = themes[themeKey];
      if (!theme) {
        console.error("Theme not found:", themeKey);
        return;
      }

      log("Loading theme:", theme.name, "from", theme.file);

      // Fetch theme HTML
      const response = await fetch(theme.file);
      if (!response.ok) {
        throw new Error(`Failed to load theme: ${response.status}`);
      }

      const html = await response.text();

      // Create a temporary container to parse the HTML
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = html;

      // Extract the body content (everything inside <body>)
      const bodyContent = tempContainer.querySelector('body');
      if (bodyContent) {
        // Load the theme content without the scripts (we'll handle those separately)
        const scripts = bodyContent.querySelectorAll('script');
        scripts.forEach(script => script.remove());

        themeContainer.innerHTML = bodyContent.innerHTML;
      } else {
        // Fallback: use the entire HTML if no body tag found
        themeContainer.innerHTML = html;
      }

      // Set theme data attribute for styling
      body.setAttribute('data-theme', themeKey);

      // Initialize theme functionality
      setTimeout(() => {
        startClock();
        initTabs();
        initParticles();
        initThemeSpecificFeatures(themeKey);
      }, 100);

      // Save theme preference
      localStorage.setItem("selectedTheme", themeKey);
      log("Theme loaded successfully:", theme.name);

    } catch (err) {
      console.error("Error loading theme:", err);
      // Fallback to default theme if current theme fails
      if (themeKey !== defaultTheme) {
        log("Falling back to default theme");
        loadTheme(defaultTheme);
      }
    }
  }

  // Theme-specific initialization
  function initThemeSpecificFeatures(themeKey) {
    switch(themeKey) {
      case 'spacemen':
        // Initialize space theme specific features
        log("Initializing SpaceMen theme features");
        break;
      case 'dashboard':
        // Initialize dashboard theme specific features
        log("Initializing Dashboard theme features");
        break;
      case 'minimal':
        // Initialize minimal theme specific features
        log("Initializing Minimal theme features");
        break;
    }
  }

  // Populate theme dropdown
  function populateThemeDropdown() {
    themeOptions.innerHTML = '';

    Object.entries(themes).forEach(([key, theme]) => {
      const button = document.createElement('button');
      button.dataset.theme = key;
      button.innerHTML = `<i class="${theme.icon}"></i> ${theme.name}`;
      themeOptions.appendChild(button);
    });
  }

  // Help button functionality
  const helpBtn = document.getElementById('help-button');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      try {
        const runtime = typeof browser !== "undefined" ? browser : chrome;
        const helpUrl = runtime.runtime.getURL('settings/help.html');
        window.open(helpUrl, '_blank');
        log("Opening help page:", helpUrl);
      } catch (err) {
        console.error("Failed to open help page:", err);
      }
    });
  }

  // Edit mode toggle
  const editToggle = document.getElementById('edit-toggle');
  if (editToggle) {
    editToggle.addEventListener('click', () => {
      body.classList.toggle('editing-mode');
      const isEditing = body.classList.contains('editing-mode');
      editToggle.innerHTML = isEditing
        ? '<i class="fas fa-check"></i>'
        : '<i class="fas fa-edit"></i>';
      editToggle.title = isEditing ? 'Exit Edit Mode' : 'Edit Mode';
      log("Edit mode:", isEditing ? "ON" : "OFF");
    });
  }

  // Theme dropdown functionality
  if (themeToggle && themeOptions) {
    themeToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle("show");
    });

    // Event delegation for dynamically created buttons
    themeOptions.addEventListener("click", (e) => {
      const button = e.target.closest('button');
      if (button) {
        e.stopPropagation();
        const themeKey = button.dataset.theme;
        loadTheme(themeKey);
        themeDropdown.classList.remove("show");
      }
    });
  }

  // Close dropdown when clicking outside
  window.addEventListener("click", (e) => {
    if (themeDropdown && !themeDropdown.contains(e.target)) {
      themeDropdown.classList.remove("show");
    }
  });

  // Initialize extension
  populateThemeDropdown();

  // Load saved or default theme
  const savedTheme = localStorage.getItem("selectedTheme") || defaultTheme;
  loadTheme(savedTheme);

  log("Venus extension initialized");
});
