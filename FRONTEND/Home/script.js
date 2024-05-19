// Button/ dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const popupMenu = document.getElementById('popupMenu');

    menuButton.addEventListener('click', (event) => {
        popupMenu.style.display = popupMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!popupMenu.contains(event.target) && event.target !== menuButton) {
            popupMenu.style.display = 'none';
        }
    });
});


// falling letters
document.addEventListener('DOMContentLoaded', function() {
    const text = document.getElementById('animatedText');
    let newHTML = '';
   
    for (let letter of text.innerText) {
        if (letter === ' ') {
            newHTML += '<span class="space"> </span>'; 
        } else {
            newHTML += '<span>' + letter + '</span>';
        }
    }
    text.innerHTML = newHTML; 

    let spans = text.querySelectorAll('span:not(.space)'); 
    let delay = 0;
    spans.forEach(span => {
        span.style.opacity = '0'; 
        span.style.display = 'inline-block';  
        span.style.animation = `fall 0.6s ${delay}s forwards`;
        delay += 0.05; 
    });
});