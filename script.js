// Racing Hearts v3 - FULLY FIXED (Buttons, Sound, Mobile)
document.addEventListener('DOMContentLoaded', () => {
    createEmojis();
    createMcLarens();
    addNextButtons();
    addChoices();

    // Start button
    document.getElementById('start-race')?.addEventListener('click', () => {
        document.getElementById('welcome').classList.add('leaving');
        setTimeout(() => {
            document.getElementById('welcome').classList.add('hidden');
            nextLap();
        }, 800);
    });
});

let currentLap = 0;
const laps = document.querySelectorAll('.lap');
const totalLaps = laps.length;

function nextLap() {
    currentLap = Math.max(0, Math.min(currentLap, totalLaps));
    if (currentLap < totalLaps) {
        laps.forEach((lap, i) => {
            lap.classList.remove('active', 'leaving');
            if (i !== currentLap) lap.classList.add('hidden');
        });
        const lapEl = laps[currentLap];
        lapEl.classList.remove('hidden', 'leaving');
        lapEl.classList.add('active');
        currentLap++;
        setTimeout(() => laps[Math.max(0, currentLap - 1)].scrollIntoView({ behavior: 'smooth' }), 1500);
        playSound('engine-rev');
    } else {
        document.getElementById('finish').classList.remove('hidden');
        document.getElementById('finish').classList.add('active');
        createFireworks();
    }
}

function skipToEnd() { currentLap = totalLaps; setTimeout(nextLap, 800); }
function jumpToLap(i) { if (i >= 0 && i < totalLaps) { currentLap = i; nextLap(); } }

function playSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.play().catch(() => {
            document.body.addEventListener('click', () => audio.play(), { once: true });
        });
    }
}

function addNextButtons() {
    // Welcome skip
    const welcome = document.getElementById('welcome');
    if (welcome) {
        const skip = document.createElement('button');
        skip.textContent = 'Skip to Finish?';
        skip.className = 'fancy-btn skip';
        skip.style.marginTop = '15px';
        skip.onclick = skipToEnd;
        welcome.appendChild(skip);
    }

    // Per lap
    document.querySelectorAll('.checkpoint').forEach((cp, i) => {
        // Next
        const next = document.createElement('button');
        next.textContent = 'Next Lap?';
        next.className = 'fancy-btn';
        next.style.display = 'none';
        next.onclick = nextLap;
        cp.appendChild(next);

        // Skip
        const skip = document.createElement('button');
        skip.textContent = 'Skip to Finish?';
        skip.className = 'fancy-btn skip';
        skip.style.display = 'none';
        skip.style.marginLeft = '10px';
        skip.onclick = skipToEnd;
        cp.appendChild(skip);

        // Jump
        const jump = document.createElement('div');
        jump.style.marginTop = '15px';
        jump.innerHTML = `
            <select style="padding:8px;border-radius:20px;border:2px solid #ffb3d1;margin-right:8px;">
                ${Array.from({length:totalLaps},(_,x)=>x!==i?`<option value="${x}">Lap ${x+1}</option>`:'').join('')}
            </select>
            <button class="fancy-btn" style="padding:8px 16px;font-size:0.9em;" onclick="jumpToLap(parseInt(this.previousElementSibling.value))">Go!</button>
        `;
        jump.style.display = 'none';
        cp.appendChild(jump);
    });
}

// Heart drag
document.querySelectorAll('.heart-reveal').forEach(h => {
    let dragging = false, sx, sy, ix, iy;
    const start = e => { 
        dragging = true; 
        ix = h.style.left || '0'; iy = h.style.top || '0';
        sx = e.clientX || e.touches[0].clientX;
        sy = e.clientY || e.touches[0].clientY;
        h.classList.add('dragging'); 
        e.preventDefault();
    };
    const move = e => { 
        if (dragging) {
            h.style.left = (parseFloat(ix)||0) + (e.clientX||e.touches[0].clientX) - sx + 'px';
            h.style.top = (parseFloat(iy)||0) + (e.clientY||e.touches[0].clientY) - sy + 'px';
        }
    };
    const end = () => { 
        if (dragging) {
            dragging = false; 
            h.classList.remove('dragging');
            h.style.left = ix; h.style.top = iy;
            createConfetti(h.getBoundingClientRect().left, h.getBoundingClientRect().top);
            showMessage(h.closest('.checkpoint').dataset.message);
            h.closest('.checkpoint').querySelectorAll('.fancy-btn, select, button').forEach(el => el.style.display = 'inline-block');
            playSound('heart-beat');
        }
    };
    h.addEventListener('mousedown', start); h.addEventListener('mousemove', move); h.addEventListener('mouseup', end);
    h.addEventListener('touchstart', start); h.addEventListener('touchmove', move); h.addEventListener('touchend', end);
});

function showMessage(msg) {
    const popup = document.createElement('div');
    popup.className = 'message-popup';
    popup.innerHTML = `<h3>Memory Unlocked!</h3><p class="typewriter" style="width:0;">${msg}</p><button class="fancy-btn" onclick="this.parentElement.remove()">Close</button>`;
    document.body.appendChild(popup); popup.style.display = 'block';
    setTimeout(() => popup.querySelector('.typewriter').style.width = '100%', 100);
}

// Rest of functions (emojis, cars, fireworks) — keep your existing ones
function createEmojis() { /* your code */ }
function createMcLarens() { /* your code */ }
function spawnLapCars() { /* your code */ }
function createFireworks() { /* your code */ }
function createConfetti(x, y) { /* your code */ }
function addChoices() { /* your code */ }
