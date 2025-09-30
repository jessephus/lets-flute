// Game state management
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

// Valid flute key mappings
const VALID_FLUTE_KEYS = ['A', 'S', 'D', 'F', 'G', 'H', 'J'];

class FluteGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = GameState.MENU;
        this.score = 0;
        this.combo = 0;
        this.notes = [];
        this.activeKeys = new Set();
        this.currentSong = SAMPLE_SONG;
        this.startTime = 0;
        this.currentTime = 0;
        this.animationId = null;
        
        // Timing constants
        this.noteSpeed = 150; // pixels per second
        this.hitWindow = 0.15; // seconds tolerance for hitting notes
        this.targetY = 340; // Y position of the target line
        
        this.initializeCanvas();
        this.setupEventListeners();
        this.showScreen('main-menu');
    }

    initializeCanvas() {
        const container = document.getElementById('track-container');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    setupEventListeners() {
        // Menu buttons
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        document.getElementById('pause-button').addEventListener('click', () => this.pauseGame());
        document.getElementById('resume-button').addEventListener('click', () => this.resumeGame());
        document.getElementById('quit-button').addEventListener('click', () => this.quitToMenu());
        document.getElementById('play-again-button').addEventListener('click', () => this.startGame());
        document.getElementById('menu-button').addEventListener('click', () => this.quitToMenu());

        // Keyboard input
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Window resize
        window.addEventListener('resize', () => this.initializeCanvas());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    startGame() {
        this.state = GameState.PLAYING;
        this.score = 0;
        this.combo = 0;
        this.updateScore();
        this.notes = this.createNoteObjects(this.currentSong);
        this.startTime = Date.now();
        this.showScreen('game-screen');
        this.gameLoop();
    }

    createNoteObjects(song) {
        return song.notes.map(noteData => ({
            note: noteData.note,
            time: noteData.time,
            duration: noteData.duration,
            y: -50, // Start above the screen
            hit: false,
            missed: false,
            requiredKeys: FLUTE_FINGERINGS[noteData.note] || [],
            color: NOTE_COLORS[noteData.note] || '#FFFFFF'
        }));
    }

    pauseGame() {
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
            this.showScreen('pause-menu');
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }

    resumeGame() {
        if (this.state === GameState.PAUSED) {
            this.state = GameState.PLAYING;
            this.showScreen('game-screen');
            // Adjust start time to account for pause
            const pauseDuration = Date.now() - (this.startTime + this.currentTime * 1000);
            this.startTime += pauseDuration;
            this.gameLoop();
        }
    }

    quitToMenu() {
        this.state = GameState.MENU;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.clearActiveKeys();
        this.showScreen('main-menu');
    }

    handleKeyDown(e) {
        if (this.state !== GameState.PLAYING) return;

        const key = e.key.toUpperCase();
        if (this.isValidKey(key)) {
            e.preventDefault();
            this.activeKeys.add(key);
            this.activateKeyVisual(key);
            this.checkNoteHit();
        }
    }

    handleKeyUp(e) {
        const key = e.key.toUpperCase();
        if (this.isValidKey(key)) {
            e.preventDefault();
            this.activeKeys.delete(key);
            this.deactivateKeyVisual(key);
        }
    }

    isValidKey(key) {
        return VALID_FLUTE_KEYS.includes(key);
    }

    activateKeyVisual(key) {
        const keyElement = document.getElementById(`key-${key.toLowerCase()}`);
        if (keyElement) {
            keyElement.classList.add('active');
        }
    }

    deactivateKeyVisual(key) {
        const keyElement = document.getElementById(`key-${key.toLowerCase()}`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    }

    clearActiveKeys() {
        this.activeKeys.forEach(key => {
            this.deactivateKeyVisual(key);
        });
        this.activeKeys.clear();
    }

    checkNoteHit() {
        const activeNotes = this.notes.filter(note => 
            !note.hit && !note.missed && this.isNoteInHitWindow(note)
        );

        for (let note of activeNotes) {
            if (this.keysMatch(note.requiredKeys)) {
                note.hit = true;
                this.addScore(100, true);
                this.showHitFeedback(note);
                break; // Only hit one note at a time
            }
        }
    }

    isNoteInHitWindow(note) {
        const distance = Math.abs(note.y - this.targetY);
        const timeWindow = this.hitWindow * this.noteSpeed;
        return distance <= timeWindow;
    }

    keysMatch(requiredKeys) {
        if (requiredKeys.length !== this.activeKeys.size) return false;
        return requiredKeys.every(key => this.activeKeys.has(key));
    }

    showHitFeedback(note) {
        // Visual feedback is handled through CSS animations
        note.requiredKeys.forEach(key => {
            const keyElement = document.getElementById(`key-${key.toLowerCase()}`);
            if (keyElement) {
                const indicator = keyElement.querySelector('.key-indicator');
                if (indicator) {
                    // Trigger animation by removing and re-adding
                    indicator.style.animation = 'none';
                    setTimeout(() => {
                        indicator.style.animation = 'pulse 0.5s';
                    }, 10);
                }
            }
        });
    }

    addScore(points, increaseCombo) {
        if (increaseCombo) {
            this.combo++;
            this.score += points * Math.min(this.combo, 10);
        } else {
            this.combo = 0;
            this.score += points;
        }
        this.updateScore();
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }

    gameLoop() {
        if (this.state !== GameState.PLAYING) return;

        this.currentTime = (Date.now() - this.startTime) / 1000;
        this.updateNotes();
        this.checkMissedNotes();
        this.render();

        // Check if game is over
        if (this.isGameOver()) {
            this.endGame();
        } else {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    updateNotes() {
        this.notes.forEach(note => {
            if (!note.hit && !note.missed) {
                // Calculate position based on time
                const timeUntilNote = note.time - this.currentTime;
                note.y = this.targetY - (timeUntilNote * this.noteSpeed);
            }
        });
    }

    checkMissedNotes() {
        this.notes.forEach(note => {
            if (!note.hit && !note.missed && note.y > this.targetY + 50) {
                note.missed = true;
                this.combo = 0;
            }
        });
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw track lanes
        this.drawTrackLanes();

        // Draw notes
        this.notes.forEach(note => {
            if (!note.hit && !note.missed && note.y > -50 && note.y < this.canvas.height) {
                this.drawNote(note);
            }
        });

        // Draw combo counter
        if (this.combo > 1) {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`Combo: ${this.combo}x`, this.canvas.width - 20, 40);
        }
    }

    drawTrackLanes() {
        const laneWidth = this.canvas.width / 7;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;

        for (let i = 1; i < 7; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * laneWidth, 0);
            this.ctx.lineTo(i * laneWidth, this.canvas.height);
            this.ctx.stroke();
        }
    }

    drawNote(note) {
        const keysPressed = note.requiredKeys.length;
        const laneWidth = this.canvas.width / 7;
        const noteWidth = laneWidth * keysPressed;
        const noteHeight = 30;
        
        // Center the note based on which keys are required
        let startX = 0;
        if (keysPressed > 0) {
            const firstKeyIndex = VALID_FLUTE_KEYS.indexOf(note.requiredKeys[0]);
            startX = firstKeyIndex * laneWidth;
        }

        // Draw note glow
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = note.color;

        // Draw note body
        this.ctx.fillStyle = note.color;
        this.ctx.fillRect(startX + 5, note.y - noteHeight / 2, noteWidth - 10, noteHeight);

        // Draw note border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(startX + 5, note.y - noteHeight / 2, noteWidth - 10, noteHeight);

        // Reset shadow
        this.ctx.shadowBlur = 0;

        // Draw note name
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(note.note, startX + noteWidth / 2, note.y + 5);
    }

    isGameOver() {
        // Game is over when all notes have been processed
        return this.notes.every(note => note.hit || note.missed) && this.currentTime > this.currentSong.notes[this.currentSong.notes.length - 1].time + 2;
    }

    endGame() {
        this.state = GameState.GAME_OVER;
        document.getElementById('final-score').textContent = this.score;
        this.clearActiveKeys();
        this.showScreen('game-over-screen');
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new FluteGame();
});
