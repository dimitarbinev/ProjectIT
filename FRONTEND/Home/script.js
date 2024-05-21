// Button/ dropdown menu
document.getElementById('menuButton').addEventListener('click', function() {
    const menu = document.getElementById('popupMenu');
    const menuItems = menu.querySelectorAll('li');
    
    if (menu.style.display === 'none' || menu.style.display === '') {
        // Show menu
        menu.style.display = 'block';
        setTimeout(() => {
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
        }, 10);
        
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 * index);
        });
    } else {
        // Hide menu
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            }, 100 * index);
        });
        
        setTimeout(() => {
            menu.style.display = 'none';
        }, 100 * menuItems.length + 300); // Wait for all items to be hidden before setting display to none
    }
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