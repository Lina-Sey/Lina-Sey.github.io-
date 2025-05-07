function typeText(elementId, text, minDelay, maxDelay, callback) {
  const element = document.getElementById(elementId);
  const cursor = '<span class="typing-cursor"></span>'; 
  let currentIndex = 0;


  element.innerHTML = cursor;
  element.style.visibility = "visible";

  function typeNextCharacter() {
    if (currentIndex < text.length) {
      element.innerHTML = text.substring(0, currentIndex + 1) + cursor; 
      currentIndex++;

      const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      setTimeout(typeNextCharacter, delay);
    } else {
      element.innerHTML = text; 
      if (callback) callback(); 
    }
  }

  setTimeout(typeNextCharacter, 1000);
}

window.onload = function () {
  typeText("typing-effect-1", "Hi, I'm Lina!", 16, 70, function () {
    setTimeout(() => {
      typeText("typing-effect-2", "I love to design, code and craft immersive digital experiences.", 30, 100, function () {
        const cursor = document.createElement("span");
        cursor.classList.add("typing-cursor");
        document.getElementById("typing-effect-2").appendChild(cursor);
        document.getElementById("typing-effect-2").style.visibility = "visible"; 
      });
    }, 300);
  });
};
