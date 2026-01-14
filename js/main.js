/* ===============================
   MAIN JS – STRUCTURED & SAFE
================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAV SCROLL + ACTIVE ================= */
  const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
  const navbar = document.querySelector(".navbar");

  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !navbar) return;

      const offset = navbar.offsetHeight;

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth"
      });
    });
  });

  // Active menu on scroll
  function handleActiveMenu() {
    let currentId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  /* ================= NAVBAR DROPDOWN + MOBILE ================= */
  const dropdown = document.getElementById("collegeDropdown");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (dropdown) {
    const dropdownBtn = dropdown.querySelector(".dropdown-btn");

    dropdownBtn.addEventListener("click", e => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* ================= STATS COUNTER ================= */
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-modern");
  let counterStarted = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const step = Math.max(1, target / 120);

      const update = () => {
        count += step;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  }

  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;

    btn.addEventListener("click", () => {
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  /* ================= SCROLL TO TOP ================= */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function handleScrollTopBtn() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ================= MASTER SCROLL HANDLER ================= */
  window.addEventListener("scroll", () => {
    handleActiveMenu();
    handleScrollTopBtn();

    if (statsSection && !counterStarted) {
      const top = statsSection.getBoundingClientRect().top;
      if (top < window.innerHeight) {
        animateCounters();
        counterStarted = true;
      }
    }
  });

});
