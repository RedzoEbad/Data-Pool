// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.mobile-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// Lazy Load & Auto Pause YouTube Video
(function() {
  const videoSection = document.getElementById('video-demo');
  const placeholder = document.getElementById('video-placeholder');
  const playBtn = document.getElementById('video-play-btn');
  const iframeContainer = document.getElementById('video-iframe-container');
  let videoLoaded = false;
  let ytIframe = null;

  function loadVideo() {
    if (videoLoaded) return;
    videoLoaded = true;
    placeholder.style.display = 'none';
    iframeContainer.style.display = 'block';
    iframeContainer.innerHTML = '<iframe id="yt-demo-iframe" width="100%" height="100%" src="https://www.youtube.com/embed/xgnNMF9DPz0?autoplay=1&rel=0&showinfo=0&enablejsapi=1" title="YouTube video player" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    ytIframe = document.getElementById('yt-demo-iframe');
  }

  function playVideo() {
    if (ytIframe) {
      ytIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }

  function pauseVideo() {
    if (ytIframe) {
      ytIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', function() {
      loadVideo();
      setTimeout(playVideo, 500);
    });
  }

  if ('IntersectionObserver' in window && videoSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && videoLoaded) {
          pauseVideo();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(videoSection);
  }
})();

// Hero Background Video Carousel
(function() {
  const carousel = document.getElementById('hero-bg-carousel');
  if (!carousel) return;
  const videos = Array.from(carousel.querySelectorAll('.hero-bg-video'));
  let current = 0;

  function showVideo(idx) {
    videos.forEach((vid, i) => {
      if (i === idx) {
        vid.style.display = 'block';
        vid.style.opacity = '1';
        vid.currentTime = 0;
        vid.play();
        vid.setAttribute('aria-hidden', 'false');
      } else {
        vid.pause();
        vid.style.display = 'none';
        vid.style.opacity = '0';
        vid.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function next() {
    current = (current + 1) % videos.length;
    showVideo(current);
  }

  showVideo(current);
  setInterval(next, 5000);
})();
  
  // Portfolio.js
document.querySelector(".contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };
  
    // Create URL with query parameters
    const url = new URL(e.target.action);
    url.searchParams.append('name', formData.name);
    url.searchParams.append('email', formData.email);
    url.searchParams.append('message', formData.message);
  
    try {
      // Use JSONP technique to bypass CORS
      const script = document.createElement('script');
      script.src = url + '&callback=handleFormResponse';
      document.body.appendChild(script);
      
      // Show loading state
      e.target.querySelector('button').disabled = true;
      e.target.querySelector('button').textContent = 'Sending...';
      
      // Immediately reset form and button for instant UI feedback
      e.target.reset();
      resetFormButton(e.target);
    } catch (error) {
      alert("Error: " + error.message);
      resetFormButton(e.target);
    }
  });
  
  // Handle JSONP response
  window.handleFormResponse = function(response) {
    const form = document.querySelector('.contact-form');
    resetFormButton(form);
    if (response.status === 'success') {
      alert("Message sent successfully!");
      form.reset();
      showDataSentPopup();
    } else {
      alert("Error: " + (response.message || 'Failed to send message'));
    }
  };
  
  function resetFormButton(form) {
    const btn = form.querySelector('button');
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }

  // Show a popup that says 'Data sent'
  function showDataSentPopup() {
    const popup = document.createElement('div');
    popup.textContent = 'Data sent';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.background = '#4caf50';
    popup.style.color = '#fff';
    popup.style.padding = '12px 24px';
    popup.style.borderRadius = '6px';
    popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    popup.style.zIndex = '9999';
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove();
    }, 2000);
  }