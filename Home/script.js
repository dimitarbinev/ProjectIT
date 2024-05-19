document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const popupMenu = document.getElementById('popupMenu');

    menuButton.addEventListener('click', function(event) {
        popupMenu.style.display = popupMenu.style.display === 'block' ? 'none' : 'block';
        popupMenu.style.left = event.clientX + 'px';
        popupMenu.style.top = event.clientY + 'px';
    });

    document.addEventListener('click', function(event) {
        if (!popupMenu.contains(event.target) && event.target !== menuButton) {
            popupMenu.style.display = 'none';
        }
    });
});