function goToAscent(){
    window.location.href = '/TeamComps/AscentComp'
}
function goToBind(){
    window.location.href = '/TeamComps/BindComp'
}
function goToBreeze(){
    window.location.href = '/TeamComps/Breeze'
}
function goToIcebox(){
    window.location.href = '/TeamComps/Icebox'
}


// document.addEventListener("DOMContentLoaded", function() {
//     const images = document.querySelectorAll(".mapImage");

//     images.forEach(image => {
//         const originalWidth = image.clientWidth;
//         const originalHeight = image.clientHeight;
//         const enlargedWidth = originalWidth * 1.05;
//         const enlargedHeight = originalHeight * 1.05;

//         image.addEventListener("mouseenter", function() {
//             image.style.width = `${enlargedWidth}px`;
//             image.style.height = `${enlargedHeight}px`;
//         });

//         image.addEventListener("mouseleave", function() {
//             image.style.width = `${originalWidth}px`;
//             image.style.height = `${originalHeight}px`;
//         });
//     });
// });


//Drop down menu
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