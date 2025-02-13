function loadAudioElements() {
    audioFiles.forEach(src => {
        const audio = new Audio(src);
        audio.load(); // Загружаем в кэш
        audioElements.push(audio);
    });
}
//
// // Функция для воспроизведения музыки
// function playAudio(audioElement, startTime = 0) {
//     if (isFading) return; // Не запускаем, если уже идет анимация
//
//     console.log("playAudio");
//     isFading = true;
//
//     if (audioElement.readyState >= 2) {
//         audioElement.currentTime = startTime;
//         fadeIn(audioElement); // Плавное увеличение громкости
//         audioElement.play();
//     } else {
//         audioElement.addEventListener('loadedmetadata', () => {
//             audioElement.currentTime = startTime;
//             fadeIn(audioElement); // Плавное увеличение громкости
//             audioElement.play();
//         }, { once: true });
//     }
// }
//
// function stopAudio(audioElement) {
//     if (isFading) return; // Не запускаем, если уже идет анимация
//
//     isFading = true;
//     fadeOut(audioElement, 1000, () => {
//         audioElement.pause();
//         audioElement.currentTime = 0; // Сбросить на начало
//     });
// }
//
// // Функция для плавного увеличения громкости
// function fadeIn(audioElement, duration = 1000) {
//     audioElement.volume = 0;
//     let step = 1 / (duration / 50); // Разбиваем на 50ms шаги
//     let interval = setInterval(() => {
//         if (audioElement.volume < 1) {
//             audioElement.volume = Math.min(audioElement.volume + step, 1);
//         } else {
//             clearInterval(interval);
//         }
//     }, 50);
//     isFading = false;
// }
//
// // Функция для плавного уменьшения громкости и паузы
// function fadeOut(audioElement, duration = 1000, callback) {
//     let step = 1 / (duration / 50);
//     let interval = setInterval(() => {
//         if (audioElement.volume > 0) {
//             audioElement.volume = Math.max(audioElement.volume - step, 0);
//         } else {
//             clearInterval(interval);
//             if (callback) callback(); // Только после fadeOut() вызываем паузу
//         }
//     }, 50);
//     isFading = false;
// }
//
// let isFading = false;
//
// const audioPlayer = document.getElementById("audio-player");



// const audioFiles = ["assets/dora.mp3", "assets/PHARAOH.mp3"];
// const audioElements = [];
// // Получаем элементы
// loadAudioElements();
// const audio = audioElements[0] // Убедись, что путь правильный
// const trigger = document.getElementById("dora");
//
// // Навешиваем обработчики событий
// trigger.addEventListener("mouseenter", function() { playAudio(audio, 30)}); // Старт с 30-й секунды
// trigger.addEventListener("mouseleave", function() { stopAudio(audio)}); // Остановка

function toggleText() {
    let texts = [document.getElementById("secret"), document.getElementById("secret2")];

    texts.forEach(text => {
        if (text) {
            text.style.display = (text.style.display === "none" || text.style.display === "") ? "block" : "none";
        }
    });
}

const audioContainer = document.getElementById("secret2");
let audioPlayer = new Audio();
let isFading = false;

// Навешиваем обработчики событий на div
document.querySelectorAll(".music-trigger").forEach(trigger => {
    trigger.addEventListener("mouseenter", function () {
        let audioSrc = this.getAttribute("data-audio");
        let startTime = parseFloat(this.getAttribute("data-start")) || 0;
        playAudio(audioSrc, startTime);
    });

    trigger.addEventListener("mouseleave", fadeOut);
});

function playAudio(src, startTime = 0) {
    if (isFading) return; // Не запускаем, если идет анимация

    console.log("playAudio");
    isFading = true;

    if (audioPlayer.src !== location.origin + "/" + src) {
        audioPlayer.src = src;
    }

    if (audioPlayer.readyState >= 2) {
        audioPlayer.currentTime = startTime;
        fadeIn();
        audioPlayer.play();
    } else {
        audioPlayer.addEventListener('loadedmetadata', () => {
            audioPlayer.currentTime = startTime;
            fadeIn();
            audioPlayer.play();
        }, { once: true });
    }
}

// Плавное увеличение громкости
function fadeIn() {
    audioPlayer.volume = 0;
    let vol = 0;
    let fadeInterval = setInterval(() => {
        if (vol < 1) {
            vol += 0.2;
            audioPlayer.volume = vol;
        } else {
            clearInterval(fadeInterval);
            isFading = false;
        }
    }, 100);
}

// Плавное уменьшение громкости
function fadeOut() {
    let vol = audioPlayer.volume;
    let fadeInterval = setInterval(() => {
        if (vol > 0) {
            vol -= 0.2;
            audioPlayer.volume = vol;
        } else {
            clearInterval(fadeInterval);
            audioPlayer.pause();
            isFading = false;
        }
    }, 100);
}
