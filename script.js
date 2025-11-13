// Racing Hearts v3 - FULLY FIXED (Buttons, Sound, Mobile, Animations)
document.addEventListener('DOMContentLoaded', () => {
    createEmojis();
    createMcLarens();
    addNextButtons();
    addChoices();

    // Start button
    document.getElementById('start-race')?.addEventListener('click', () => {
        const welcome = document.getElementById('welcome');
        welcome.classList.add('leaving');
        setTimeout(() => {
            welcome.classList.remove('active');
            welcome.classList.add('hidden');
            nextLap();
        }, 800);
    });
});

let currentLap = 0;
const laps = document.querySelectorAll('.lap');
const totalLaps = laps.length;

function nextLap() {
    if (currentLap < totalLaps) {
        laps.forEach((lap, i) => {
            lap.classList.remove('active', 'leaving');
            if (i !== currentLap) lap.classList.add('hidden');
        });
        const lapEl = laps[currentLap];
        lapEl.classList.remove('hidden', 'leaving');
        lapEl.classList.add('active');
        currentLap++;
        setTimeout(() => {
            const prevLap = laps[Math.max(0, currentLap - 1)];
            if (prevLap) prevLap.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        spawnLapCars();
        playSound('engine-rev');
    } else {
        const finish = document.getElementById('finish');
        finish.classList.remove('hidden');
        finish.classList.add('active');
        createFireworks();
    }
}

function skipToEnd() {
    currentLap = totalLaps;
    setTimeout(nextLap, 800);
}

function jumpToLap(i) {
    if (i >= 0 && i < totalLaps && i !== currentLap - 1) {
        currentLap = i;
       
