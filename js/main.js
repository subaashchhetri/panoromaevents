document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Menu ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuBars = document.querySelectorAll('.bar');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger bars to 'X'
      menuBars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
      menuBars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      menuBars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
    });
  }

  // --- Lightbox for Gallery ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4')?.textContent || '';
        const desc = item.querySelector('p')?.textContent || '';
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery image';
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<h4>${title}</h4><p>${desc}</p>`;
        }
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = ''; // Enable page scrolling
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }

  // --- Testimonials / Featured Events Slider ---
  const slideContainer = document.getElementById('slide-container');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  if (slideContainer && slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    
    const updateSlider = (index) => {
      currentSlide = index;
      slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
    };
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateSlider(index);
      });
    });
    
    // Auto-slide every 5 seconds
    setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      updateSlider(nextSlide);
    }, 5000);
  }
});
