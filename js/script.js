// ===== ENHANCED PROFESSIONAL JAVASCRIPT ===== //

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Enhanced Dark Mode Toggle
const darkBtn = document.getElementById("darkBtn");
if (darkBtn) {
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    
    // Update button icon and save preference
    if (document.body.classList.contains('dark')) {
      darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
}

// Enhanced Lightbox with keyboard support
function openImg(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (lightbox && img) {
    lightbox.style.display = "block";
    img.src = src;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add keyboard support
    document.addEventListener('keydown', closeLightboxOnEscape);
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = 'auto'; // Restore scrolling
    document.removeEventListener('keydown', closeLightboxOnEscape);
  }
}

function closeLightboxOnEscape(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
}

// Close lightbox when clicking outside the image
document.getElementById("lightbox")?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = document.body.classList.contains('dark') 
        ? 'rgba(17, 24, 39, 0.98)' 
        : 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = document.body.classList.contains('dark') 
        ? 'rgba(17, 24, 39, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    }
  }
});

// Animated counter for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // Animation speed

  counters.forEach(counter => {
    const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
    const increment = target / speed;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = counter.innerText.replace(/\d+/, target);
        clearInterval(timer);
      } else {
        counter.innerText = counter.innerText.replace(/\d+/, Math.ceil(current));
      }
    }, 1);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Trigger counter animation for stats section
      if (entry.target.classList.contains('stats-section')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.section, .card, .feature-card, .review');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Mobile menu close on link click
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (menuToggle) {
        menuToggle.checked = false;
      }
    });
  });
});

// Loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Scroll to top functionality
function createScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2563eb, #f59e0b);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide scroll button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Form validation (if forms exist)
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      input.style.borderColor = '#d1d5db';
    }
  });
  
  return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});
// ===== DESTINATIONS PAGE FUNCTIONALITY ===== //

// Filter functionality for destinations
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');
  
  if (filterBtns.length > 0 && destinationCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        destinationCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            const categories = card.getAttribute('data-category').split(' ');
            if (categories.includes(filter)) {
              card.style.display = 'block';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 100);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          }
        });
      });
    });
  }
});

// URL parameter handling for destination booking
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const destination = urlParams.get('destination');
  
  if (destination) {
    // Highlight the specific destination if coming from a direct link
    const targetCard = document.querySelector(`[data-category*="${destination}"]`);
    if (targetCard) {
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
        setTimeout(() => {
          targetCard.style.boxShadow = '';
        }, 3000);
      }, 500);
    }
  }
});
// ===== BOOKING PAGE FUNCTIONALITY ===== //

document.addEventListener('DOMContentLoaded', function() {
  // Booking form elements
  const bookingForm = document.getElementById('bookingForm');
  const destinationSelect = document.getElementById('destination');
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const adultsSelect = document.getElementById('adults');
  const childrenSelect = document.getElementById('children');
  const packageSelect = document.getElementById('package');

  // Summary elements
  const summaryDestination = document.getElementById('summary-destination');
  const summaryDates = document.getElementById('summary-dates');
  const summaryGuests = document.getElementById('summary-guests');
  const summaryPackage = document.getElementById('summary-package');
  const summaryTotal = document.getElementById('summary-total');

  // Pricing data
  const destinationPrices = {
    'goa': { budget: 299, standard: 449, luxury: 699 },
    'manali': { budget: 399, standard: 599, luxury: 899 },
    'jaipur': { budget: 249, standard: 399, luxury: 649 },
    'paris': { budget: 799, standard: 1199, luxury: 1899 },
    'bali': { budget: 599, standard: 899, luxury: 1399 }
  };

  // Set minimum date to today
  if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    checkoutInput.min = today;

    // Update checkout min date when checkin changes
    checkinInput.addEventListener('change', function() {
      const checkinDate = new Date(this.value);
      checkinDate.setDate(checkinDate.getDate() + 1);
      checkoutInput.min = checkinDate.toISOString().split('T')[0];
      updateSummary();
    });

    checkoutInput.addEventListener('change', updateSummary);
  }

  // Update summary when form changes
  if (destinationSelect) destinationSelect.addEventListener('change', updateSummary);
  if (adultsSelect) adultsSelect.addEventListener('change', updateSummary);
  if (childrenSelect) childrenSelect.addEventListener('change', updateSummary);
  if (packageSelect) packageSelect.addEventListener('change', updateSummary);

  // Pre-fill destination from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlDestination = urlParams.get('destination');
  if (urlDestination && destinationSelect) {
    destinationSelect.value = urlDestination;
    updateSummary();
  }

  function updateSummary() {
    // Update destination
    if (destinationSelect && summaryDestination) {
      const selectedOption = destinationSelect.options[destinationSelect.selectedIndex];
      summaryDestination.textContent = selectedOption.text || 'Not selected';
    }

    // Update dates
    if (checkinInput && checkoutInput && summaryDates) {
      if (checkinInput.value && checkoutInput.value) {
        const checkin = new Date(checkinInput.value).toLocaleDateString();
        const checkout = new Date(checkoutInput.value).toLocaleDateString();
        summaryDates.textContent = `${checkin} - ${checkout}`;
      } else {
        summaryDates.textContent = 'Not selected';
      }
    }

    // Update guests
    if (adultsSelect && childrenSelect && summaryGuests) {
      const adults = parseInt(adultsSelect.value) || 1;
      const children = parseInt(childrenSelect.value) || 0;
      let guestText = `${adults} Adult${adults > 1 ? 's' : ''}`;
      if (children > 0) {
        guestText += `, ${children} Child${children > 1 ? 'ren' : ''}`;
      }
      summaryGuests.textContent = guestText;
    }

    // Update package
    if (packageSelect && summaryPackage) {
      const selectedOption = packageSelect.options[packageSelect.selectedIndex];
      summaryPackage.textContent = selectedOption.text || 'Not selected';
    }

    // Calculate and update total
    calculateTotal();
  }

  function calculateTotal() {
    if (!destinationSelect || !packageSelect || !adultsSelect || !checkinInput || !checkoutInput || !summaryTotal) {
      return;
    }

    const destination = destinationSelect.value;
    const packageType = packageSelect.value;
    const adults = parseInt(adultsSelect.value) || 1;
    const children = parseInt(childrenSelect.value) || 0;

    if (!destination || !packageType || !checkinInput.value || !checkoutInput.value) {
      summaryTotal.textContent = '$0';
      return;
    }

    // Calculate number of nights
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      summaryTotal.textContent = '$0';
      return;
    }

    // Get base price
    const basePrice = destinationPrices[destination]?.[packageType] || 0;
    
    // Calculate total (adults pay full price, children 50% discount)
    const adultTotal = adults * basePrice * nights;
    const childTotal = children * basePrice * 0.5 * nights;
    const total = adultTotal + childTotal;

    summaryTotal.textContent = `$${total.toLocaleString()}`;
  }

  // Form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        } else {
          field.style.borderColor = '#e5e7eb';
        }
      });

      // Date validation
      if (checkinInput.value && checkoutInput.value) {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        
        if (checkout <= checkin) {
          checkoutInput.style.borderColor = '#ef4444';
          alert('Check-out date must be after check-in date.');
          isValid = false;
        }
      }

      if (isValid) {
        // Show success message (in a real app, this would process payment)
        alert('Thank you for your booking! You will be redirected to our secure payment gateway.');
        
        // In a real application, you would:
        // 1. Send form data to server
        // 2. Process payment
        // 3. Send confirmation email
        // 4. Redirect to confirmation page
        
        console.log('Booking data:', new FormData(this));
      } else {
        alert('Please fill in all required fields correctly.');
      }
    });
  }

  // Initialize summary on page load
  updateSummary();
});