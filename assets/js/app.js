// ===============================
// Student Portal – App Logic (JS)
// ===============================

// Demo credentials (simple front-end only authentication)
const DEMO_USERNAME = "student";
const DEMO_PASSWORD = "12345";

// -------------------------------
// DOMContentLoaded – main setup
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
  protectPrivatePages();
  initGradesChart();
  initCourseGradesChart();
  initProgressRing();
  initHeroDate();

  const currentTheme = applySavedTheme();
  initThemeToggle(currentTheme);

  initPageTransitions();
  animateCounters();
});

// ===============================
// 1. LOGIN & SESSION
// ===============================

// Setup login form behaviour on login.html
function initLogin() {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  // Only run on login page
  if (!loginForm) return;

  // If user is already logged in, go straight to dashboard
  const alreadyLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  if (alreadyLoggedIn) {
    window.location.href = "dashboard.html";
    return;
  }

  loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const enteredUsername = document.getElementById("username").value.trim();
    const enteredPassword = document.getElementById("password").value.trim();

    const isValidUser =
      enteredUsername === DEMO_USERNAME && enteredPassword === DEMO_PASSWORD;

    if (isValidUser) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", enteredUsername);
      window.location.href = "dashboard.html";
    } else if (loginError) {
      loginError.classList.remove("d-none");
    }
  });
}

// Redirect users who try to access internal pages without logging in
function protectPrivatePages() {
  const isLoginPage = window.location.pathname.endsWith("index.html");

  if (isLoginPage) return; // login page is always allowed

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}

// Called by Logout button in navbar
function handleLogout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// ===============================
// 2. DASHBOARD CHART (Chart.js)
// ===============================
function initGradesChart() {
  const gradesChartCanvas = document.getElementById("gradesChart");

  // Only run on dashboard and if Chart.js exists
  if (!gradesChartCanvas || !window.Chart) return;

  const ctx = gradesChartCanvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      datasets: [
        {
          label: "GPA",
          data: [3.2, 3.45, 3.6, 3.58],
          borderColor: "#ffca28",
          backgroundColor: "rgba(255, 202, 40, 0.18)",
          borderWidth: 3,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffca28",
          fill: "start"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false
        },
        title: { display: false }
      },
      interaction: { intersect: false },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: false,
          suggestedMin: 2.5,
          suggestedMax: 4.0,
          ticks: { stepSize: 0.2 }
        }
      }
    }
  });
}

// ===============================
// 3. DASHBOARD HERO DATE
// ===============================
function initHeroDate() {
  const heroDateEl = document.getElementById("heroDate");
  if (!heroDateEl) return;

  const today = new Date();
  heroDateEl.textContent = today.toLocaleDateString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

// ===============================
// 4. THEME (LIGHT / DARK)
// ===============================

// Apply saved theme when page loads (works for all pages)
function applySavedTheme() {
  let savedTheme = localStorage.getItem("theme");

  // Fallback for local file testing (file://) using window.name
  if (!savedTheme) {
    if (window.name === "theme-dark") savedTheme = "dark";
    if (window.name === "theme-light") savedTheme = "light";
  }

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  return savedTheme || "light";
}

// Setup toggle button on pages that have it (navbar)
function initThemeToggle(currentTheme) {
  const toggleBtn = document.getElementById("themeToggle");
  const toggleIcon = document.getElementById("themeToggleIcon");

  // Some pages (e.g. login) don't have the button; just apply theme
  if (!toggleBtn || !toggleIcon) return;

  // Helper: set icon based on theme
  const setIconForTheme = theme => {
    if (theme === "dark") {
      toggleIcon.classList.remove("bi-moon-stars-fill");
      toggleIcon.classList.add("bi-sun-fill");
    } else {
      toggleIcon.classList.remove("bi-sun-fill");
      toggleIcon.classList.add("bi-moon-stars-fill");
    }
  };

  setIconForTheme(
    document.body.classList.contains("dark-theme") ? "dark" : currentTheme
  );

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    const newTheme = isDark ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    window.name = newTheme === "dark" ? "theme-dark" : "theme-light";

    setIconForTheme(newTheme);
  });
}

// ===============================
// 5. PAGE TRANSITIONS
// ===============================

function initPageTransitions() {
  const links = document.querySelectorAll("a:not([target])");

  links.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      // Ignore anchors and JS pseudo-links
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
        return;
      }

      event.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300); // match fadeOut CSS duration
    });
  });
}

// ===============================
// DASHBOARD KPI COUNTERS
// ===============================
function animateCounters() {
  const coursesEl = document.getElementById("countCourses");
  const creditsEl = document.getElementById("countCredits");
  const cgpaEl = document.getElementById("countCgpa");

  // Only run on dashboard (elements must exist) and CountUp must be loaded
  if (!coursesEl || !creditsEl || !cgpaEl || !window.CountUp) return;

  try {
    const coursesCounter = new CountUp.CountUp("countCourses", 4);
    const creditsCounter = new CountUp.CountUp("countCredits", 72);
    const cgpaCounter = new CountUp.CountUp("countCgpa", 3.58, {
      decimalPlaces: 2
    });

    coursesCounter.start();
    creditsCounter.start();
    cgpaCounter.start();
  } catch (e) {
    console.error("Counter error:", e);
  }
}

// ===============================
// GRADES PAGE – COURSE GRADES BAR CHART
// ===============================
function initCourseGradesChart() {
  const canvas = document.getElementById("courseGradesChart");
  if (!canvas || !window.Chart) return; // only run on grades.html

  const isDark = document.body.classList.contains("dark-theme");

  const gridColor = isDark
    ? "rgba(148,163,184,0.28)"
    : "rgba(148,163,184,0.2)";
  const tickColor = isDark ? "#e5e7eb" : "#4b5563";

  const ctx = canvas.getContext("2d");

  // Example subjects – change to match your table if you like
  const courseCodes = ["IMS566", "IMC501", "IMS564", "IMR531"];
  const courseGrades = [3.58, 3.60, 3.50, 3.40]; // GPA by course (sample values)

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: courseCodes,
      datasets: [
        {
          label: "Grade Point",
          data: courseGrades,
          backgroundColor: isDark
            ? "rgba(248, 250, 252, 0.45)"
            : "rgba(59, 130, 246, 0.7)",
          borderRadius: 8,
          maxBarThickness: 48
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `GPA: ${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: tickColor }
        },
        y: {
          beginAtZero: false,
          suggestedMin: 2.5,
          suggestedMax: 4.0,
          ticks: { stepSize: 0.25, color: tickColor },
          grid: { color: gridColor }
        }
      }
    }
  });
}


// ===============================
// SEMESTER PROGRESS RING
// ===============================
function initProgressRing() {
  const canvas = document.getElementById("progressRing");
  if (!canvas || !window.Chart) return;

  // Example: Week 7 of 14
  const completed = 7;
  const totalWeeks = 14;
  const percent = (completed / totalWeeks) * 100;

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [percent, 100 - percent],
          backgroundColor: ["#4f46e5", "#e0e7ff"],
          borderWidth: 0
        }
      ]
    },
    options: {
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}
