function isMobile() {
    return window.innerWidth <= 800;
}

window.addEventListener('load', () => {

    const windowEl = document.querySelector('.window');
    const container = document.querySelector('.window-container');
    const containerRect = container.getBoundingClientRect();
    const winRect = windowEl.getBoundingClientRect();

    const centerX = (containerRect.width - winRect.width) / 2;
    const centerY = (containerRect.height - winRect.height) / 2;

    /* if on mobile, position the window div on the very top, otherwise
    position it in the center of the screen */

    if (isMobile()) {
        windowEl.style.position = 'absolute';
        windowEl.style.left = '0px';
        windowEl.style.top = '0px';
    } else {
        windowEl.style.position = 'absolute';
        windowEl.style.left = centerX + 'px';
        windowEl.style.top = centerY + 'px';
    }

});

// drag only if not mobile
if (!isMobile()) {
    const windowEl = document.querySelector('.window');
    const container = document.querySelector('.window-container');
    const topBar = document.querySelector('.top-bar');

    let isDragging = false;
    let offset = { x: 0, y: 0 };

    topBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = windowEl.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = '';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();
        const windowRect = windowEl.getBoundingClientRect();
        const newX = e.clientX - offset.x - containerRect.left;
        const newY = e.clientY - offset.y - containerRect.top;

        const maxX = containerRect.width - windowRect.width;
        const maxY = containerRect.height - windowRect.height;
        const clampedX = Math.max(0, Math.min(newX, maxX));
        const clampedY = Math.max(0, Math.min(newY, maxY));

        windowEl.style.left = clampedX + 'px';
        windowEl.style.top = clampedY + 'px';
    });

    // on resize
    window.addEventListener('resize', () => {
        if (isMobile()) {
            windowEl.style.position = 'absolute';
            windowEl.style.left = '0px';
            windowEl.style.top = '0px';
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const windowRect = windowEl.getBoundingClientRect();

        let currentLeft = parseFloat(windowEl.style.left) || 0;
        let currentTop = parseFloat(windowEl.style.top) || 0;

        const maxX = containerRect.width - windowRect.width;
        const maxY = containerRect.height - windowRect.height;

        const clampedLeft = Math.max(0, Math.min(currentLeft, maxX));
        const clampedTop = Math.max(0, Math.min(currentTop, maxY));

        windowEl.style.left = clampedLeft + 'px';
        windowEl.style.top = clampedTop + 'px';
    });
}

// clicking sound when buttons are clicked

const audio = new Audio('mouse-click.mp3');
audio.volume = 0.1;

function playClickSound() {
    audio.currentTime = 0;
    audio.play();
}


function mobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".jump-to");

    if (hamburger.classList.contains("closed")) {
        menu.classList.remove("hidden");
        hamburger.classList.remove("closed");
    } else {
        menu.classList.add("hidden");
        hamburger.classList.add("closed");
    }
}

