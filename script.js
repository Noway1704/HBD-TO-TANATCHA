function navigateToZoneStory() {
    window.location.href = 'zone-story.html';
}
// ฟังก์ชั่นแสดงป็อปอัพ
function showSurprise() {
    var popup = document.getElementById('password-popup');
    popup.style.display = 'flex'; // ใช้ flex เพื่อให้อยู่กึ่งกลาง
}

// ฟังก์ชั่นเลื่อนโฟกัสไปยังช่องถัดไป
function moveFocus(current, nextId) {
    if (document.getElementById('char' + current).value.length == 1) {
        if (nextId <= 4) {
            document.getElementById('char' + nextId).focus();
        } else {
            checkPassword(); // ตรวจสอบรหัสเมื่อใส่ครบทุกช่อง
        }
    }
}

// ฟังก์ชั่นเลื่อนโฟกัสไปยังช่องก่อนหน้า
function moveFocusBack(current, prevId) {
    if (document.getElementById('char' + current).value.length == 0) {
        if (prevId >= 1) {
            document.getElementById('char' + prevId).focus();
        }
    }
}

function checkPassword() {
    var password = '';
    for (var i = 1; i <= 4; i++) {
        password += document.getElementById('char' + i).value;
    }

    var errorMessage = document.getElementById('error-message');
    if (password.toLowerCase() === 'open') {
        var popup = document.getElementById('password-popup');
        popup.style.display = 'none';

        // ลบรูปภาพ birthday-image
        var birthdayImage = document.getElementById('birthday-image');
        if (birthdayImage) {
            birthdayImage.style.display = 'none';
        }

        // ลบปุ่ม Surprise
        var surpriseButton = document.querySelector('button[onclick="showSurprise()"]');
        if (surpriseButton) {
            surpriseButton.style.display = 'none';
        }

        // ลบข้อความ Happy Birthday! และ มีความสุขมากนะอ้วนนนน!
        var message = document.getElementById('message');
        var additionalMessage = message.nextElementSibling;
        if (message) {
            message.style.display = 'none';
        }
        if (additionalMessage) {
            additionalMessage.style.display = 'none';
        }

        // แสดงวิดีโอจาก YouTube และเริ่มเล่นอัตโนมัติ
        var youtubeVideoContainer = document.getElementById('youtube-video-container');
        youtubeVideoContainer.querySelector('iframe').src += "?autoplay=1";
        fadeIn(youtubeVideoContainer);

        // แสดงเนื้อหาเพิ่มเติม
        var additionalContent = document.getElementById('additional-content');
        fadeIn(additionalContent);

        // แสดงกล่องของขวัญ
        var giftContainer = document.getElementById('gift-container');
        fadeIn(giftContainer);

        // แสดงป็อปอัปเพลง
        var musicPopup = document.getElementById('music-popup');
        fadeIn(musicPopup);

        // เพิ่มการเคลื่อนไหวให้ข้อความเซอร์ไพรส์
        document.styleSheets[0].insertRule(`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `, document.styleSheets[0].cssRules.length);

        // หยุดหัวใจ
        stopHearts = true;

        // เรียกใช้สไลด์โชว์
        showSlides(slideIndex = 1);

        // แสดงปุ่ม Zone Story
        var zoneStoryButton = document.getElementById('zone-story-button');
        zoneStoryButton.style.display = 'block';
    } else {
        errorMessage.style.display = 'block';
    }
}


// ฟังก์ชั่นเฟดอินเนื้อหาเพิ่มเติม
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';

    var last = +new Date();
    var tick = function() {
        element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+element.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

// ฟังก์ชั่นเปิด/ปิดเพลง
function toggleMusic() {
    const music = document.getElementById('background-music');
    const isPlaying = !music.paused && !music.ended && music.currentTime > 0;

    if (!isPlaying) {
        music.play();
    } else {
        music.pause();
    }
}

function skipBackward() {
    const music = document.getElementById('background-music');
    music.currentTime -= 10;
}

function skipForward() {
    const music = document.getElementById('background-music');
    music.currentTime += 10;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const music = document.getElementById('background-music');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.getElementById('total-time');
const musicCover = document.getElementById('music-cover');
const musicTitle = document.getElementById('music-title');

music.addEventListener('loadedmetadata', () => {
    progressBar.max = music.duration;
    totalTimeElement.textContent = formatTime(music.duration);
    updateMusicInfo();
});

music.addEventListener('timeupdate', () => {
    progressBar.value = music.currentTime;
    currentTimeElement.textContent = formatTime(music.currentTime);
});

progressBar.addEventListener('input', () => {
    music.currentTime = progressBar.value;
});

function updateMusicInfo() {
    // เปลี่ยนข้อมูลเพลงตรงนี้ตามที่ต้องการ
    musicCover.style.backgroundImage = 'url("url-to-your-cover-image.jpg")';
    musicTitle.textContent = 'ชื่อเพลงของคุณ';
}

updateMusicInfo();

// ฟังก์ชั่นจัดการเหตุการณ์ keydown
function handleKeyDown(e) {
    var currentElement = document.activeElement;
    var id = currentElement.id.replace('char', '');

    if (e.key === 'Backspace') {
        moveFocusBack(parseInt(id), parseInt(id) - 1);
    } else if (e.key === 'Enter') {
        checkPassword();
    }
}

// เพิ่มเหตุการณ์ keydown
document.addEventListener('keydown', handleKeyDown);

// ตัวแปรสำหรับสไลด์โชว์และการเลื่อน
var slideIndex = 1;
var xDown = null;
var yDown = null;

// ฟังก์ชั่นเปลี่ยนสไลด์
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// ฟังก์ชั่นเลือกสไลด์
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// ฟังก์ชั่นแสดงสไลด์
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// ฟังก์ชั่นเปิดกล่องของขวัญ
function openGift() {
    var giftBox = document.getElementById('gift-box');
    giftBox.classList.add('shake');

    setTimeout(function() {
        giftBox.classList.remove('shake');
        var giftContent = document.getElementById('gift-content');
        giftBox.style.display = 'none';
        giftContent.style.display = 'block';

        // แสดงการ์ดอวยพรเมื่อเปิดกล่องของขวัญ
        showGreetingCard();
    }, 1000); // ระยะเวลาการสั่น 1 วินาที
}

// ฟังก์ชั่นแสดงการ์ดอวยพร
function showGreetingCard() {
    var greetingCardPopup = document.getElementById('greeting-card-popup');
    greetingCardPopup.style.display = 'flex';
}

// ฟังก์ชั่นปิดการ์ดอวยพร
function closeGreetingCard() {
    var greetingCardPopup = document.getElementById('greeting-card-popup');
    greetingCardPopup.style.display = 'none';

    // รีเซ็ตสถานะของกล่องของขวัญและจัดให้อยู่ตรงกลาง
    var giftBox = document.getElementById('gift-box');
    var giftContent = document.getElementById('gift-content');
    giftBox.style.display = 'block';
    giftBox.style.margin = 'auto'; // จัดให้อยู่ตรงกลาง
    giftContent.style.display = 'none';
}

// ฟังก์ชั่นจับเหตุการณ์แตะหน้าจอ
function handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

// ฟังก์ชั่นจับเหตุการณ์ปัดหน้าจอ
function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            changeSlide(1); // ปัดซ้าย - ไปสไลด์ถัดไป
        } else {
            changeSlide(-1); // ปัดขวา - ไปสไลด์ก่อนหน้า
        }
    }

    xDown = null;
    yDown = null;
}

// เพิ่มเหตุการณ์ touchstart และ touchmove
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// ฟังก์ชั่นหัวใจ
let stopHearts = false; // ตัวแปรควบคุมการหยุดแสดงหัวใจ

function startHearts() {
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    const hearts = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Heart(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 1 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    Heart.prototype.update = function () {
        this.y -= this.speedY;
        if (this.y < -this.size) {
            this.y = canvas.height + this.size;
        }
    };

    Heart.prototype.draw = function () {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 3, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fillStyle = '#ff69b4';
        ctx.fill();
        ctx.globalAlpha = 1;
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!stopHearts) {
            if (Math.random() < 0.1) {
                hearts.push(new Heart(Math.random() * canvas.width, canvas.height));
            }

            hearts.forEach((heart, index) => {
                heart.update();
                heart.draw();

                if (heart.y < -heart.size) {
                    hearts.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        }
    }

    animate();
}

// ฟังก์ชั่นเปิด/ปิดเพลง
function toggleMusic() {
    const music = document.getElementById('background-music');
    const isPlaying = !music.paused && !music.ended && music.currentTime > 0;

    if (!isPlaying) {
        music.play();
    } else {
        music.pause();
    }
}

function skipBackward() {
    const music = document.getElementById('background-music');
    music.currentTime -= 10;
}

function skipForward() {
    const music = document.getElementById('background-music');
    music.currentTime += 10;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');
    const musicCover = document.getElementById('music-cover');
    const musicTitle = document.getElementById('music-title');

    music.addEventListener('loadedmetadata', () => {
        progressBar.max = music.duration;
        totalTimeElement.textContent = formatTime(music.duration);
        updateMusicInfo();
    });

    music.addEventListener('timeupdate', () => {
        progressBar.value = music.currentTime;
        currentTimeElement.textContent = formatTime(music.currentTime);
    });

    progressBar.addEventListener('input', () => {
        music.currentTime = progressBar.value;
    });

    function updateMusicInfo() {
        // เปลี่ยนข้อมูลเพลงตรงนี้ตามที่ต้องการ
        musicCover.style.backgroundImage = 'url("/img/Papang/agagagag.png")';
        musicTitle.textContent = 'ของขวัญ - Musketeers';
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    updateMusicInfo();
});

function toggleMusic() {
    const music = document.getElementById('background-music');
    const isPlaying = !music.paused && !music.ended && music.currentTime > 0;

    if (!isPlaying) {
        music.play();
    } else {
        music.pause();
    }
}

function skipBackward() {
    const music = document.getElementById('background-music');
    music.currentTime -= 10;
}

function skipForward() {
    const music = document.getElementById('background-music');
    music.currentTime += 10;
}


updateMusicInfo();

