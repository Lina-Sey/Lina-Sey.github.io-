const customCursor = document.querySelector('.custom-cursor');

// Mausbewegung
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  customCursor.style.transform = `translate(${x}px, ${y}px)`;
});

const interactiveElements = document.querySelectorAll('a, button');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    customCursor.classList.add('hovered');
  });

  element.addEventListener('mouseleave', () => {
    customCursor.classList.remove('hovered');
  });
});
