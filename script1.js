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
});
// zone-story.js

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    
    // อ่านข้อมูลจาก localStorage
    const musicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicTime = parseFloat(localStorage.getItem('musicTime')) || 0;

    // ตั้งเวลาเพลงที่ถูกเก็บใน localStorage
    music.currentTime = musicTime;

    // ถ้าเพลงกำลังเล่นจากหน้าแรก ให้เล่นต่อ
    if (musicPlaying) {
        music.play();
    }
});

// Check visibility on scroll and on page load
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
