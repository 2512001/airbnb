ScrollReveal().reveal('.item', { 
    delay: 100,
    origin : 'left',
    distance: '80px',
    easing: 'ease-in-out',
    interval: 400,
    opacity: 0,
    scale: 0.85,
    viewOffset: {
      top: 10,
      right: 0,
      bottom: 0,
      left: 0,
  },
  reset : true
});

ScrollReveal().reveal('.alert', {
  delay: 300,
  origin: 'right', 
  distance: '100px', 
  duration: 700, 
  interval: 500,
  opacity: 0,
  scale: 0.1,
  rotate: {
      x: 10, // Use numbers instead of strings
      y: 10, // Use numbers instead of strings
      z: 10, // Use numbers instead of strings
  },
  reset: true 
});

