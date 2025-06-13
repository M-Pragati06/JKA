// Sticky Header with improved behavior
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    navbar.classList.add("navbar-light");
    navbar.classList.remove("navbar-dark");
  } else {
    navbar.classList.remove("scrolled");
    navbar.classList.remove("navbar-light");
  }
});

// Initialize slider with autoplay
const testimonialSlider = new bootstrap.Carousel(
  document.getElementById("testimonialSlider"),
  {
    interval: 5000, // 5 seconds
    pause: "hover", // Pause on hover
    wrap: true, // Infinite loop
  }
);

// Close mobile menu when clicking a link
document.querySelectorAll(".navbar-nav .nav-link").forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Dropdown functionality for chevron icons
  document
    .querySelectorAll(".nav-item.dropdown .fa-chevron-down")
    .forEach((icon) => {
      icon.addEventListener("click", function (e) {
        e.preventDefault();

        const parentItem = this.closest(".dropdown");
        const dropdownMenu = parentItem.querySelector(".dropdown-menu");

        // Close all other dropdowns at the same level first
        const allDropdowns =
          parentItem.parentElement.querySelectorAll(".dropdown");
        allDropdowns.forEach((dropdown) => {
          if (dropdown !== parentItem) {
            dropdown.querySelector(".dropdown-menu").classList.remove("show");
            dropdown
              .querySelector(".fa-chevron-down")
              ?.classList.remove("fa-rotate-180");
          }

          e.stopPropagation();
        });

        // Toggle the current dropdown
        dropdownMenu.classList.toggle("show");
        this.classList.toggle("fa-rotate-180");

        // For submenus, we need to handle them differently
        if (parentItem.classList.contains("dropdown-submenu")) {
          const submenu = parentItem.querySelector(".dropdown-menu");
          if (submenu) {
            // Position the submenu properly
            submenu.style.position = "relative";
            submenu.style.left = "0";
            submenu.style.top = "0";
          }
        }
      });
    });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
      });
      document.querySelectorAll(".fa-chevron-down").forEach((icon) => {
        icon.classList.remove("fa-rotate-180");
      });
    }
  });

  // Handle hover for desktop and click for mobile
  function handleDropdownBehavior() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
      if (window.innerWidth >= 992) {
        // Desktop
        // Hover behavior
        dropdown.addEventListener("mouseenter", function () {
          this.querySelector(".dropdown-menu").classList.add("show");
          this.querySelector(".fa-chevron-down")?.classList.add(
            "fa-rotate-180"
          );
        });

        dropdown.addEventListener("mouseleave", function () {
          this.querySelector(".dropdown-menu").classList.remove("show");
          this.querySelector(".fa-chevron-down")?.classList.remove(
            "fa-rotate-180"
          );
        });
      } else {
        // Mobile
        // Remove hover events if they exist
        dropdown.removeEventListener("mouseenter", () => {});
        dropdown.removeEventListener("mouseleave", () => {});
      }
    });
  }

  // Initialize and update on resize
  handleDropdownBehavior();
  window.addEventListener("resize", handleDropdownBehavior);
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Skip if href is just "#"
    if (this.getAttribute("href") === "#") return;

    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update URL without adding to history
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        window.location.hash = targetId;
      }
    }
  });
});

// Update active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    if (window.scrollY >= sectionTop - navbarHeight - 50) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && href.includes(current)) {
      link.classList.add("active");
    }
  });
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

backToTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Class Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const classItems = document.querySelectorAll("[data-category]");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    classItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the faster
  const counterSection = document.querySelector(".counter-section");

  // Only run if counter section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
          } else {
            counter.innerText = target;
          }
        });
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(counterSection);
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", animateCounters);

// gallery
document.addEventListener("DOMContentLoaded", function () {
  // Gallery variables
  const galleryContainer = document.querySelector(".gallery-container");
  const galleryFilterBtns = document.querySelectorAll(".gallery-filter-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxVideo = document.querySelector(".lightbox-video");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxCategory = document.querySelector(".lightbox-category");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentImageIndex = 0;
  let mediaItems = [];
  let filteredItems = [];
  let currentPage = 1;
  const itemsPerPage = 12;
  let currentFilter = "all";

  // Fetch gallery data from JSON
  fetch("gallery-data.json")
    .then((response) => response.json())
    .then((data) => {
      mediaItems = data.galleryItems;
      filteredItems = [...mediaItems]; // Initialize with all items
      renderGallery(currentPage);
      initLightbox();
    })
    .catch((error) => console.error("Error loading gallery data:", error));

  // Render gallery with pagination
  function renderGallery(page) {
    currentPage = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    galleryContainer.innerHTML = "";

    paginatedItems.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, startIndex + index);
      galleryContainer.appendChild(galleryItem);
    });

    renderPagination();
  }

  // Create gallery item HTML
  function createGalleryItem(item, index) {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-category", item.type);

    if (item.type === "image") {
      galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" class="gallery-img">
                <div class="gallery-overlay">
                    <div class="gallery-content">
                        <h3 class="gallery-title">${item.title}</h3>
                        <p class="gallery-category">${item.category}</p>
                        <i class="fas fa-expand gallery-zoom"></i>
                    </div>
                </div>
            `;
    } else {
      galleryItem.innerHTML = `
                <video muted loop class="gallery-video">
                    <source src="${item.src}" type="video/mp4">
                </video>
                <div class="gallery-overlay">
                    <div class="gallery-content">
                        <h3 class="gallery-title">${item.title}</h3>
                        <p class="gallery-category">${item.category}</p>
                        <i class="fas fa-play gallery-play"></i>
                    </div>
                </div>
            `;
    }

    const clickElement =
      item.type === "video"
        ? galleryItem.querySelector(".gallery-play")
        : galleryItem.querySelector(".gallery-zoom") || galleryItem;

    clickElement.addEventListener("click", function (e) {
      e.preventDefault();
      // Find the global index in mediaItems for lightbox navigation
      const globalIndex = mediaItems.findIndex(
        (media) => media.src === item.src
      );
      openLightbox(globalIndex);
    });

    return galleryItem;
  }

  // Render pagination controls
  function renderPagination() {
    // Remove existing pagination if it exists
    const existingPagination = document.querySelector(".pagination-container");
    if (existingPagination) {
      existingPagination.remove();
    }

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container";

    if (totalPages > 1) {
      // Previous button
      if (currentPage > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.className = "pagination-btn";
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener("click", () => {
          renderGallery(currentPage - 1);
          scrollToGallery();
        });
        paginationContainer.appendChild(prevBtn);
      }

      // Page numbers
      const maxVisiblePages = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust if we're at the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // First page button
      if (startPage > 1) {
        const firstPageBtn = document.createElement("button");
        firstPageBtn.className = "pagination-btn";
        firstPageBtn.textContent = "1";
        firstPageBtn.addEventListener("click", () => {
          renderGallery(1);
          scrollToGallery();
        });
        paginationContainer.appendChild(firstPageBtn);

        if (startPage > 2) {
          const ellipsis = document.createElement("span");
          ellipsis.className = "pagination-ellipsis";
          ellipsis.textContent = "...";
          paginationContainer.appendChild(ellipsis);
        }
      }

      // Visible page buttons
      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `pagination-btn ${
          i === currentPage ? "active" : ""
        }`;
        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () => {
          renderGallery(i);
          scrollToGallery();
        });
        paginationContainer.appendChild(pageBtn);
      }

      // Last page button
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          const ellipsis = document.createElement("span");
          ellipsis.className = "pagination-ellipsis";
          ellipsis.textContent = "...";
          paginationContainer.appendChild(ellipsis);
        }

        const lastPageBtn = document.createElement("button");
        lastPageBtn.className = "pagination-btn";
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener("click", () => {
          renderGallery(totalPages);
          scrollToGallery();
        });
        paginationContainer.appendChild(lastPageBtn);
      }

      // Next button
      if (currentPage < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.className = "pagination-btn";
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener("click", () => {
          renderGallery(currentPage + 1);
          scrollToGallery();
        });
        paginationContainer.appendChild(nextBtn);
      }

      // Add pagination container after gallery
      galleryContainer.parentNode.insertBefore(
        paginationContainer,
        galleryContainer.nextSibling
      );
    }
  }

  // Helper function to scroll to gallery section with navbar offset
  function scrollToGallery() {
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const gallerySection = document.querySelector("#gallery");
    if (gallerySection) {
      const galleryPosition =
        gallerySection.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;
      window.scrollTo({
        top: galleryPosition,
        behavior: "smooth",
      });
    }
  }

  // Filter gallery by category
  function filterGallery(filter) {
    currentFilter = filter;
    currentPage = 1; // Reset to first page when changing filter

    if (filter === "all") {
      filteredItems = [...mediaItems];
    } else {
      filteredItems = mediaItems.filter((item) => item.type === filter);
    }

    renderGallery(1);
    scrollToGallery();

    // Add animation to items
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, index) => {
      item.classList.add("animate__animated", "animate__fadeIn");
      item.style.animationDelay = `${index * 0.1}s`;
      setTimeout(() => {
        item.classList.remove("animate__animated", "animate__fadeIn");
        item.style.animationDelay = "";
      }, 1000);
    });
  }

  // Initialize lightbox functionality
  function initLightbox() {
    // Lightbox navigation
    prevBtn.addEventListener("click", showPrevMedia);
    nextBtn.addEventListener("click", showNextMedia);

    // Close lightbox
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (lightbox.style.display === "block") {
        if (e.key === "Escape") {
          closeLightbox();
        } else if (e.key === "ArrowLeft") {
          showPrevMedia();
        } else if (e.key === "ArrowRight") {
          showNextMedia();
        }
      }
    });
  }

  // Open lightbox with specific media
  function openLightbox(index) {
    currentImageIndex = index;
    const media = mediaItems[index];

    // Hide both first
    lightboxImg.classList.remove("active");
    lightboxVideo.classList.remove("active");

    if (media.type === "image") {
      lightboxImg.src = media.src;
      lightboxImg.alt = media.title;
      lightboxImg.classList.add("active");
      lightboxVideo.pause();
    } else {
      lightboxVideo.querySelector("source").src = media.src;
      lightboxVideo.load();
      lightboxVideo.classList.add("active");
      lightboxVideo.play();
    }

    lightboxTitle.textContent = media.title;
    lightboxCategory.textContent = media.category;
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
    lightboxVideo.pause();
  }

  // Show previous media in lightbox
  function showPrevMedia() {
    currentImageIndex =
      (currentImageIndex - 1 + mediaItems.length) % mediaItems.length;
    openLightbox(currentImageIndex);
  }

  // Show next media in lightbox
  function showNextMedia() {
    currentImageIndex = (currentImageIndex + 1) % mediaItems.length;
    openLightbox(currentImageIndex);
  }

  // Add event listeners to filter buttons
  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      galleryFilterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      filterGallery(filter);
    });
  });
});

// Initialize carousel
const testimonialCarousel = new bootstrap.Carousel(
  document.getElementById("testimonialCarousel"),
  {
    interval: 5000,
    pause: "hover",
  }
);

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("animate__animated", "animate__fadeInUp");
    }
  });
}

// Add animate-on-scroll class to elements you want to animate
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.add("animate-on-scroll");
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load
});
