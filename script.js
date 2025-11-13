// Floating Emojis: Mix Hearts + Kisses
function createEmojis() {
    const container = document.getElementById('emoji-container');
    const emojis = ['💖', '💕', '💋'];
    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-float';
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 7 + 's';
        emoji.style.animationDuration = (Math.random() * 4 + 5) + 's';
        container.appendChild(emoji);
    }
    setInterval(() => { if (container.children.length < 15) createEmojis(); }, 6000);
}

// Floating McLarens: 10+ Tiny Rotators
function createMcLarens() {
    const container = document.getElementById('mclaren-floaters');
    const mclarenURLs = [
        'https://www.freepngimg.com/png/16090-mclaren-f1-png-picture',
        'https://www.freepngimg.com/png/16084-mclaren-f1-png-hd',
        'https://www.freepngimg.com/png/16079-mclaren-f1-high-quality-png'
    ];
    for (let i = 0; i < 12; i++) {
        const mclaren = document.createElement('img');
        mclaren.className = 'mclaren-float';
        mclaren.src = mclarenURLs[Math.floor(Math.random() * 3)];
        mclaren.style.left = Math.random() * 100 + '%';
        mclaren.style.animationDelay = Math.random() * 8 + 's';
        mclaren.style.animationDuration = (Math.random() * 5 + 6) + 's';
        container.appendChild(mclaren);
    }
}

// Parallax Scroll
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const layers = [{ selector: '.layer-far', speed: 0.15 }, { selector: '.layer-mid', speed: 0.4 }, { selector: '.layer-near', speed: 0.8 }];
    layers.forEach(layer => {
        const element = document.querySelector(layer.selector);
        if (element) {
            let currentTransform = element.style.transform || '';
            const yShift = -(scrollY * layer.speed) + 'px';
            if (!currentTransform.includes('translateY')) {
                element.style.transform = currentTransform + ` translateY(${yShift})`;
            }
        }
    });
    lastScrollY = scrollY;
});

// Progression with Transitions & Safeguards
let currentLap = 0;
const laps = document.querySelectorAll('.lap');
const totalLaps = laps.length;  // Cache for safety (7)
document.getElementById('start-race').addEventListener('click', () => {
    document.getElementById('welcome').classList.add('leaving');
    setTimeout(() => {
        document.getElementById('welcome').classList.remove('active');
        document.getElementById('welcome').classList.add('hidden');
        nextLap();
    }, 800);
});
function nextLap() {
    // Safeguard: Clamp currentLap
    currentLap = Math.max(0, Math.min(currentLap, totalLaps));
    if (currentLap < totalLaps) {
        // Clear previous active/leaving
        laps.forEach(lap => {
            lap.classList.remove('active', 'leaving');
            if (lap !== laps[currentLap]) lap.classList.add('hidden');
        });
        const currentLapElement = laps[currentLap];
        currentLapElement.classList.remove('hidden', 'leaving');
        currentLapElement.classList.add('active');
        currentLap++;  // Increment after activation
        setTimeout(() => {
            laps[Math.max(0, currentLap - 1)].scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        spawnLapCars();
        if // Play sound only after user interaction
function playSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.play().catch(() => {
            // Autoplay blocked — wait for click
            document.body.addEventListener('click', () => audio.play(), { once: true });
        });
    }
}
    } else {
        // Finish
        document.querySelectorAll('.stage.lap').forEach(lap => lap.classList.add('hidden'));
        document.getElementById('finish').classList.remove('hidden');
        document.getElementById('finish').classList.add('active');
        createFireworks();
    }
}
function skipToEnd() {
    currentLap = totalLaps;  // Force to end
    laps.forEach(lap => lap.classList.add('leaving'));
    setTimeout(nextLap, 800);
}
function jumpToLap(targetIndex) {  // New: Jump to specific lap
    if (targetIndex >= 0 && targetIndex < totalLaps && targetIndex !== currentLap - 1) {
        currentLap = targetIndex;
        laps.forEach(lap => {
            lap.classList.remove('active', 'leaving');
            lap.classList.add('hidden');
        });
        nextLap();  // Activates target
    }
}
function spawnLapCars() {
    const container = document.getElementById('background-container');
    const carTypes = ['https://pngimg.com/uploads/formula_1/formula_1_PNG47.png', 'https://pngimg.com/uploads/formula_1/formula_1_PNG1.png', 'https://pngimg.com/uploads/formula_1/formula_1_PNG2.png'];
    const animTypes = ['burst-in', 'overtake', 'swerve'];
    for (let i = 0; i < 3; i++) {
        const car = document.createElement('img');
        car.src = carTypes[Math.floor(Math.random() * carTypes.length)];
        car.className = `lap-car ${animTypes[i]}`;
        car.style.left = Math.random() * 100 + '%';
        container.appendChild(car);
        setTimeout(() => car.remove(), 10000);
    }
}

// Add Next, Skip to End, & Jump to Another Lap Buttons: In EVERY Lap
function addNextButtons() {
    // Global skip in welcome
    const welcome = document.getElementById('welcome');
    const globalSkip = document.createElement('button');
    globalSkip.textContent = 'Skip to Finish? 🚀';
    globalSkip.className = 'fancy-btn skip';
    globalSkip.style.display = 'inline-block';
    globalSkip.style.marginTop = '15px';
    globalSkip.addEventListener('click', skipToEnd);
    welcome.appendChild(globalSkip);

    // Per checkpoint: Next + Jump dropdown
    document.querySelectorAll('.checkpoint').forEach((cp, lapIndex) => {  // lapIndex 0 = Lap 1, etc.
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next Lap? 🏎️💕';
        nextBtn.className = 'fancy-btn';
        nextBtn.style.marginTop = '20px';
        nextBtn.style.display = 'none';
        nextBtn.addEventListener('click', nextLap);
        cp.appendChild(nextBtn);

        // Skip to End
        const skipBtn = document.createElement('button');
        skipBtn.textContent = 'Skip to Finish? 🚀';
        skipBtn.className = 'fancy-btn skip';
        skipBtn.style.display = 'none';
        skipBtn.style.marginLeft = '10px';
        skipBtn.addEventListener('click', skipToEnd);
        cp.appendChild(skipBtn);

        // Jump to Another Lap: Dropdown + Button
        const jumpDiv = document.createElement('div');
        jumpDiv.style.marginTop = '15px';
        jumpDiv.innerHTML = `
            <select id="jump-select-${lapIndex}" class="jump-select" style="padding: 10px; border-radius: 25px; border: 2px solid #ffb3d1; background: #fff; margin-right: 10px;">
                ${Array.from({length: totalLaps}, (_, i) => i !== lapIndex ? `<option value="${i}">Jump to Lap ${i+1} 🌟</option>` : '').join('')}
            </select>
            <button class="fancy-btn jump-btn" onclick="jumpToLap(parseInt(document.getElementById('jump-select-${lapIndex}').value))" style="padding: 10px 20px; font-size: 1em;">Go! ✨</button>
        `;
        jumpDiv.style.display = 'none';  // Hidden until story
        cp.appendChild(jumpDiv);
    });
}

// Heart Reveals: Reveal All Buttons After Drag
document.querySelectorAll('.heart-reveal').forEach(heart => {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Mouse Events
    heart.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialLeft = heart.style.left || '0';
        initialTop = heart.style.top || '0';
        startX = e.clientX;
        startY = e.clientY;
        heart.classList.add('dragging');
        e.preventDefault();
    });
    heart.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            heart.style.left = (parseFloat(initialLeft) || 0) + deltaX + 'px';
            heart.style.top = (parseFloat(initialTop) || 0) + deltaY + 'px';
        }
    });
    heart.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            heart.classList.remove('dragging');
            heart.style.left = initialLeft;
            heart.style.top = initialTop;
            const rect = heart.getBoundingClientRect();
            createConfetti(rect.left, rect.top);
            showMessage(heart.closest('.checkpoint').dataset.message);
            // Reveal ALL buttons in this lap
            const cp = heart.closest('.checkpoint');
            cp.querySelectorAll('.fancy-btn, .jump-select, .jump-btn').forEach(el => el.style.display = 'inline-block');
        }
    });

    // Touch Events for Mobile
    heart.addEventListener('touchstart', (e) => {
        isDragging = true;
        initialLeft = heart.style.left || '0';
        initialTop = heart.style.top || '0';
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        heart.classList.add('dragging');
        e.preventDefault();
    });
    heart.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            heart.style.left = (parseFloat(initialLeft) || 0) + deltaX + 'px';
            heart.style.top = (parseFloat(initialTop) || 0) + deltaY + 'px';
            e.preventDefault();
        }
    });
    heart.addEventListener('touchend', (e) => {
        if (isDragging) {
            isDragging = false;
            heart.classList.remove('dragging');
            heart.style.left = initialLeft;
            heart.style.top = initialTop;
            const rect = heart.getBoundingClientRect();
            createConfetti(rect.left, rect.top);
            showMessage(heart.closest('.checkpoint').dataset.message);
            const cp = heart.closest('.checkpoint');
            cp.querySelectorAll('.fancy-btn, .jump-select, .jump-btn').forEach(el => el.style.display = 'inline-block');
        }
    });
});
function showMessage(msg) {
    const popup = document.createElement('div');
    popup.className = 'message-popup';
    popup.innerHTML = `<h3>Memory Magic Unlocked! 💕</h3><p class="typewriter" style="width:0;">${msg}</p><button class="fancy-btn" onclick="this.parentElement.remove(); document.querySelector('.typewriter').style.animation='none';">Close & Cuddle 😘</button>`;
    document.body.appendChild(popup);
    popup.style.display = 'block';
    setTimeout(() => {
        const typewriter = popup.querySelector('.typewriter');
        typewriter.style.width = '100%';
        typewriter.style.animation = 'typing 4s steps(60, end), blink-caret .75s step-end infinite';
    }, 100);
    if (document.getElementById('heart-beat')) {
        document.getElementById('heart-beat').play();
        setTimeout(() => document.getElementById('heart-beat').pause(), 6000);
    }
}

// Photo Modals: Click Zoom
document.querySelectorAll('.square-photo').forEach(photo => {
    photo.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:20;display:flex;justify-content:center;align-items:center;cursor:pointer;';
        modal.innerHTML = `<img src="${photo.src}" style="max-width:90%;max-height:90%;border-radius:15px;"><button onclick="this.parentElement.remove();" style="position:absolute;top:20px;right:20px;color:white;font-size:2em;cursor:pointer;border:none;background:none;">×</button>`;
        modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
        document.body.appendChild(modal);
    });
    photo.addEventListener('touchstart', (e) => e.preventDefault());
});

// Choices: Branching (Fixed Indices + Validation)
function addChoices() {
    const choiceLaps = {
        3: [['Adventure Vibes! (Back to Lap 2)', () => { currentLap = 1; nextLap(); }], ['Dreamy Chats (Stay Here)', () => { /* Stay */ }]],
        5: [['Foodie Fails (To Lap 4)', () => { currentLap = 3; nextLap(); }], ['Film Fest (To Lap 6)', () => { currentLap = 5; nextLap(); }]]
    };
    Object.keys(choiceLaps).forEach(lapNumStr => {
        const lapNum = parseInt(lapNumStr) - 1;  // 0-index for laps[]
        const div = document.getElementById(`choice-${parseInt(lapNumStr)}`);
        if (div) {
            choiceLaps[lapNumStr].forEach(([text, action]) => {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.className = 'choice-btn fancy-btn';
                btn.addEventListener('click', () => {
                    action();  // Call with validation in nextLap
                });
                div.appendChild(btn);
            });
        }
    });
}

// Confetti on Drag Drop
function createConfetti(x, y) {
    for (let i = 0; i < 15; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.innerHTML = ['💖', '💕', '⭐'][Math.floor(Math.random() * 3)];
        conf.style.left = x + (Math.random() * 100 - 50) + 'px';
        conf.style.top = y + 'px';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3000);
    }
}

// Finish & Replay
document.getElementById('play-surprise').addEventListener('click', () => {
    if (document.getElementById('love-audio')) document.getElementById('love-audio').play();
    createFireworks();
});
document.getElementById('replay').addEventListener('click', () => {
    laps.forEach(lap => {
        lap.classList.remove('active');
        lap.classList.add('hidden');
    });
    currentLap = 0;
    const lapArray = Array.from(laps);
    for (let i = lapArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lapArray[i], lapArray[j]] = [lapArray[j], lapArray[i]];
    }
    const content = document.querySelector('.content');
    lapArray.forEach(lap => content.appendChild(lap));
    document.getElementById('finish').classList.remove('active');
    document.getElementById('finish').classList.add('hidden');
    nextLap();
});
function createFireworks() {
    const fireworks = document.getElementById('fireworks');
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const burst = document.createElement('div');
            burst.style.position = 'absolute';
            burst.style.left = Math.random() * 100 + '%';
            burst.style.top = '50%';
            burst.style.fontSize = '30px';
            burst.innerHTML = ['💖', '💕', '⭐'][Math.floor(Math.random() * 3)];
            burst.style.animation = 'confetti-fall 2.5s ease-out forwards';
            fireworks.appendChild(burst);
            setTimeout(() => burst.remove(), 2500);
        }, i * 80);
    }
}

// Init
window.addEventListener('load', () => {
    createEmojis();
    createMcLarens();
    addNextButtons();  // Now EVERY lap has jump/next/skip!
    addChoices();
    document.querySelectorAll('.parallax-car img').forEach(img => {
        img.style.animationDelay = `-${Math.random() * 15}s`;
    });

});
