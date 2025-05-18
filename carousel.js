document.addEventListener('DOMContentLoaded', () => {
  // Find every carousel on the page
  document.querySelectorAll('.carousel').forEach(carousel => {
    const container = carousel.querySelector('.ProductCon');
    const prevBtn   = carousel.querySelector('.carousel-btn.prev');
    const nextBtn   = carousel.querySelector('.carousel-btn.next');
    const card      = container.querySelector('.Product');
    const gap       = parseInt(getComputedStyle(container).gap) || 10;
    let cardWidth, maxScroll;
    
    function updateMetrics() {
      cardWidth = card.offsetWidth;
      maxScroll = container.scrollWidth - container.clientWidth;
    }
    
    function updateButtons() {
      prevBtn.disabled = container.scrollLeft <= 0;
      nextBtn.disabled = container.scrollLeft >= maxScroll;
    }
    
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left:  (cardWidth + gap), behavior: 'smooth' });
    });
    
    container.addEventListener('scroll', () => requestAnimationFrame(updateButtons));
    window.addEventListener('resize', () => {
      updateMetrics();
      updateButtons();
    });
    
    // basic swipe support
    let startX = 0;
    container.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    container.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 40) nextBtn.click();
      if (diff < -40) prevBtn.click();
    });
    
    // initialize for this carousel
    updateMetrics();
    updateButtons();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const heroCon = document.querySelector('.heroCon');
  const slides = document.querySelectorAll('.slideA, .slide');
  const dots = document.querySelectorAll('.dot, .dotA');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentSlide = 0;
  let slideInterval;
  const slideCount = slides.length;
  
  // Initialize slider
  function initSlider() {
    updateSlider();
    startAutoSlide();
  }
  
  // Update slider position
  function updateSlider() {
    heroCon.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('dotA');
        dot.classList.remove('dot');
      } else {
        dot.classList.add('dot');
        dot.classList.remove('dotA');
      }
    });
  }
  
  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = (slideIndex + slideCount) % slideCount;
    updateSlider();
    resetAutoSlide();
  }
  
  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Auto slide
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      goToSlide(slideIndex);
    });
  });
  
  // Pause on hover
  heroCon.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  heroCon.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
  
  // Initialize
  initSlider();
});
