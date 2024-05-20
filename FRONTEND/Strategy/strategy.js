function goToAscent(){
    window.location.href = '/Maps/Ascent'
}
function goToBind(){
    window.location.href = '/Maps/Bind'
}
function goToBreeze(){
    window.location.href = '/Maps/Breeze'
}
function goToIcebox(){
    window.location.href = '/Maps/Icebox'
}

//Drop down menu
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