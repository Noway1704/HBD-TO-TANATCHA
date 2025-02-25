// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add the "visible" class to elements in the viewport
const checkVisibility = () => {
    document.querySelectorAll('.story').forEach(story => {
        if (isInViewport(story)) {
            story.classList.add('visible');
        }
    });
};

// Function to navigate to another page while keeping music playing
function navigateToZoneStory() {
    // เก็บสถานะการเล่นเพลงและตำแหน่งเวลาของเพลง
    const music = document.getElementById('background-music');
    const isPlaying = !music.paused && !music.ended && music.currentTime > 0;
    const currentTime = music.currentTime;

    // เก็บข้อมูล
    localStorage.setItem('musicPlaying', isPlaying);
    localStorage.setItem('musicTime', currentTime);

    // ไปยังหน้าใหม่
    window.location.href = 'zone-story.html';
}

// Check if music is playing when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    
    // อ่านค่าจาก localStorage
    const musicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicTime = parseFloat(localStorage.getItem('musicTime')) || 0;

    // รีเซ็ตสถานะเพลงและตำแหน่ง
    if (musicPlaying) {
        music.currentTime = musicTime;
        music.play();
    }
    
    // เรียกใช้ checkVisibility ทันทีเมื่อหน้าโหลด
    checkVisibility();
});

// Check visibility on scroll and on page load
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
