const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();  
    
    const targetId = link.getAttribute('href').substring(1);  
    const targetSection = document.getElementById(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'  
    });
  });
});