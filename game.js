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
        this.notes = [];
        this.currentSong = SAMPLE_SONG;
        this.selectedSongIndex = 0;
        this.startTime = 0;
        this.currentTime = 0;
        this.animationId = null;
        
        // Audio setup
        this.audioContext = null;
        this.backgroundMusic = null;
        this.audioInitialized = false;
        
        // Timing constants
        this.noteSpeed = 150; // pixels per second
        this.hitWindow = 0.15; // seconds tolerance for hitting notes
        this.targetY = 340; // Y position of the target line
        this.previewTime = 1.5; // seconds ahead to preview upcoming note
        
        // Initialize SVG Flute
        this.fluteSVG = null;
        
        this.initializeCanvas();
        this.setupEventListeners();
        this.createSongButtons();
        this.showScreen('main-menu');
        
        // Force initial render to make sure canvas is working
        this.render();
    }

    async initializeAudio() {
        if (this.audioInitialized) return;
        
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context if suspended (required by browser policy)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            // Create a simple metronome/background beat
            this.createBackgroundBeat();
            
            this.audioInitialized = true;
            console.log('Audio initialized successfully, state:', this.audioContext.state);
        } catch (error) {
            console.error('Failed to initialize audio:', error);
        }
    }

    createBackgroundBeat() {
        // Create a simple beat using oscillators
        this.beatGain = this.audioContext.createGain();
        this.beatGain.connect(this.audioContext.destination);
        this.beatGain.gain.value = 0.1;
    }

    playBeatSound() {
        if (!this.audioContext || this.audioContext.state !== 'running') return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
            oscillator.type = 'triangle';
            
            // Quieter metronome so it doesn't overpower the flute notes
            gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
            
            // Remove console log to reduce spam
        } catch (error) {
            console.error('Error playing beat sound:', error);
        }
    }

    playNoteSound(note) {
        if (!this.audioContext || this.audioContext.state !== 'running') return;
        
        try {
            // Flute note frequencies (C4 to C5 range)
            const frequencies = {
                'C': 261.63,
                'D': 293.66,
                'E': 329.63,
                'F': 349.23,
                'G': 392.00,
                'A': 440.00,
                'B': 493.88,
                'C2': 523.25
            };
            
            // Create multiple oscillators for a richer flute-like sound
            const fundamental = this.audioContext.createOscillator();
            const harmonic1 = this.audioContext.createOscillator();
            const harmonic2 = this.audioContext.createOscillator();
            
            const gainMain = this.audioContext.createGain();
            const gainHarm1 = this.audioContext.createGain();
            const gainHarm2 = this.audioContext.createGain();
            const masterGain = this.audioContext.createGain();
            
            // Connect oscillators to their gains
            fundamental.connect(gainMain);
            harmonic1.connect(gainHarm1);
            harmonic2.connect(gainHarm2);
            
            // Connect gains to master
            gainMain.connect(masterGain);
            gainHarm1.connect(masterGain);
            gainHarm2.connect(masterGain);
            masterGain.connect(this.audioContext.destination);
            
            const freq = frequencies[note] || 440;
            
            // Set frequencies (fundamental + harmonics for flute-like timbre)
            fundamental.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            harmonic1.frequency.setValueAtTime(freq * 2, this.audioContext.currentTime);
            harmonic2.frequency.setValueAtTime(freq * 3, this.audioContext.currentTime);
            
            // Use triangle wave for more flute-like sound
            fundamental.type = 'triangle';
            harmonic1.type = 'sine';
            harmonic2.type = 'sine';
            
            // Set harmonic levels (fundamental is strongest)
            gainMain.gain.setValueAtTime(0.6, this.audioContext.currentTime);
            gainHarm1.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainHarm2.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            
            // Flute-like envelope: quick attack, sustained tone, gentle release
            masterGain.gain.setValueAtTime(0, this.audioContext.currentTime);
            masterGain.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.05); // Quick attack
            masterGain.gain.setValueAtTime(0.25, this.audioContext.currentTime + 0.3); // Sustain
            masterGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8); // Gentle release
            
            // Start all oscillators
            fundamental.start(this.audioContext.currentTime);
            harmonic1.start(this.audioContext.currentTime);
            harmonic2.start(this.audioContext.currentTime);
            
            // Stop all oscillators
            fundamental.stop(this.audioContext.currentTime + 0.8);
            harmonic1.stop(this.audioContext.currentTime + 0.8);
            harmonic2.stop(this.audioContext.currentTime + 0.8);
            
            console.log(`Playing flute note: ${note} (${freq}Hz)`);
        } catch (error) {
            console.error('Error playing note sound:', error);
        }
    }

    playKeyPressSound() {
        if (!this.audioContext || this.audioContext.state !== 'running') return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Soft "breath" sound for key press
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (error) {
            console.error('Error playing key press sound:', error);
        }
    }

    createSongButtons() {
        const songList = document.getElementById('song-list');
        songList.innerHTML = '';
        
        SONGS.forEach((song, index) => {
            const button = document.createElement('button');
            button.className = 'song-button' + (index === this.selectedSongIndex ? ' selected' : '');
            button.textContent = song.title;
            button.addEventListener('click', () => this.selectSong(index));
            songList.appendChild(button);
        });
    }

    selectSong(index) {
        this.selectedSongIndex = index;
        this.currentSong = SONGS[index];
        
        // Update button styling
        document.querySelectorAll('.song-button').forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }

    initializeCanvas() {
        const container = document.getElementById('track-container');
        // Set canvas size
        this.canvas.width = container.clientWidth || 800;
        this.canvas.height = container.clientHeight || 400;
        
        // Set CSS size to match canvas size
        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.style.height = this.canvas.height + 'px';
        
        // Clear canvas to ensure it's ready for rendering
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        console.log(`Canvas initialized: ${this.canvas.width}x${this.canvas.height}`);
    }

    setupEventListeners() {
        // Menu buttons
        document.getElementById('start-button').addEventListener('click', async () => {
            // Test audio immediately on click
            if (!this.audioInitialized) {
                await this.initializeAudio();
                // Play a test sound to verify audio works
                setTimeout(() => this.playBeatSound(), 100);
            }
            this.startGame();
        });
        document.getElementById('pause-button').addEventListener('click', () => this.pauseGame());
        document.getElementById('resume-button').addEventListener('click', () => this.resumeGame());
        document.getElementById('quit-button').addEventListener('click', () => this.quitToMenu());
        document.getElementById('play-again-button').addEventListener('click', () => this.startGame());
        document.getElementById('menu-button').addEventListener('click', () => this.quitToMenu());

        // Window resize
        window.addEventListener('resize', () => {
            this.initializeCanvas();
            // Force a render if game is playing
            if (this.state === GameState.PLAYING) {
                this.render();
            }
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    async startGame() {
        // Initialize audio on first user interaction
        if (!this.audioInitialized) {
            await this.initializeAudio();
        }
        
        // Initialize SVG Flute if not already initialized
        if (!this.fluteSVG) {
            this.fluteSVG = new FluteSVG('flute-diagram');
        }
        
        this.state = GameState.PLAYING;
        this.notes = this.createNoteObjects(this.currentSong);
        this.startTime = Date.now();
        this.showScreen('game-screen');
        
        // Start background beat
        this.startBackgroundBeat();
        
        this.gameLoop();
    }

    startBackgroundBeat() {
        if (!this.audioContext) return;
        
        // Play a beat every second (adjust based on song BPM)
        const beatInterval = 60 / (this.currentSong.bpm || 80); // Convert BPM to seconds
        
        this.beatTimer = setInterval(() => {
            if (this.state === GameState.PLAYING) {
                this.playBeatSound();
            }
        }, beatInterval * 1000);
    }

    stopBackgroundBeat() {
        if (this.beatTimer) {
            clearInterval(this.beatTimer);
            this.beatTimer = null;
        }
    }

    createNoteObjects(song) {
        const notes = song.notes.map(noteData => ({
            note: noteData.note,
            time: noteData.time,
            duration: noteData.duration,
            y: -50, // Start above the screen
            hit: false,
            missed: false,
            played: false, // Track if note has been auto-played
            requiredKeys: FLUTE_FINGERINGS[noteData.note] || [],
            color: NOTE_COLORS[noteData.note] || '#FFFFFF'
        }));
        
        console.log(`Created ${notes.length} notes for song: ${song.title}`);
        console.log('First few notes:', notes.slice(0, 3));
        
        return notes;
    }

    pauseGame() {
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
            this.stopBackgroundBeat();
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
            this.startBackgroundBeat();
            this.gameLoop();
        }
    }

    quitToMenu() {
        this.state = GameState.MENU;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.stopBackgroundBeat();
        this.showScreen('main-menu');
    }

    gameLoop() {
        if (this.state !== GameState.PLAYING) return;

        this.currentTime = (Date.now() - this.startTime) / 1000;
        this.updateNotes();
        this.updateUpcomingNotePreview();
        this.render();

        // Check if game is over
        if (this.isGameOver()) {
            this.endGame();
        } else {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    updateUpcomingNotePreview() {
        // Find the next upcoming note within preview time
        const upcomingNote = this.notes.find(note => 
            !note.played && 
            (note.time - this.currentTime) > 0 && 
            (note.time - this.currentTime) <= this.previewTime
        );

        // Use SVG flute preview if available
        if (this.fluteSVG) {
            if (upcomingNote) {
                this.fluteSVG.showPreview(upcomingNote.requiredKeys);
            } else {
                this.fluteSVG.clearPreview();
            }
        }
    }

    showHitFeedback(note) {
        // Use SVG flute feedback if available
        if (this.fluteSVG) {
            this.fluteSVG.triggerHitFeedback(note.requiredKeys);
        }
    }

    updateNotes() {
        this.notes.forEach(note => {
            if (!note.hit && !note.missed) {
                // Calculate position based on time
                const timeUntilNote = note.time - this.currentTime;
                note.y = this.targetY - (timeUntilNote * this.noteSpeed);
                
                // Auto-play note when it reaches the target line
                if (!note.played && Math.abs(note.y - this.targetY) <= 5) {
                    note.played = true;
                    this.playNoteSound(note.note);
                    this.showHitFeedback(note);
                    console.log(`Auto-playing note: ${note.note}`);
                }
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
        // Ensure canvas context exists
        if (!this.ctx || !this.canvas) return;
        
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw track lanes
        this.drawTrackLanes();

        // Draw notes if game is playing
        if (this.state === GameState.PLAYING) {
            const visibleNotes = this.notes.filter(note => 
                !note.hit && !note.missed && note.y > -50 && note.y < this.canvas.height + 50
            );
            
            visibleNotes.forEach(note => {
                this.drawNote(note);
            });
            
            // Show current song and time info
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '18px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`♪ ${this.currentSong.title}`, 10, 30);
            this.ctx.font = '14px Arial';
            this.ctx.fillText(`Time: ${this.currentTime.toFixed(1)}s`, 10, 50);
            
            // Show play-along instructions
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('🎵 Play along on your flute! 🎵', this.canvas.width / 2, 30);
        }
        
        // Draw target line
        this.ctx.strokeStyle = '#FF6B6B';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.targetY);
        this.ctx.lineTo(this.canvas.width, this.targetY);
        this.ctx.stroke();
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

        // Enhance glow if note is currently being played
        const isAtTarget = Math.abs(note.y - this.targetY) <= 10;
        this.ctx.shadowBlur = isAtTarget ? 30 : 20;
        this.ctx.shadowColor = note.color;

        // Draw note body with enhanced brightness if at target
        this.ctx.fillStyle = isAtTarget ? note.color : note.color;
        if (isAtTarget) {
            // Make note brighter when at target line
            this.ctx.globalAlpha = 1.0;
        } else {
            this.ctx.globalAlpha = 0.8;
        }
        
        this.ctx.fillRect(startX + 5, note.y - noteHeight / 2, noteWidth - 10, noteHeight);

        // Draw note border
        this.ctx.strokeStyle = isAtTarget ? '#ffffff' : '#cccccc';
        this.ctx.lineWidth = isAtTarget ? 3 : 2;
        this.ctx.strokeRect(startX + 5, note.y - noteHeight / 2, noteWidth - 10, noteHeight);

        // Reset effects
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1.0;

        // Draw note name
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(note.note, startX + noteWidth / 2, note.y + 5);
    }

    isGameOver() {
        // Game is over when all notes have been played and enough time has passed
        const allNotesPlayed = this.notes.every(note => note.played);
        const songComplete = this.currentTime > this.currentSong.notes[this.currentSong.notes.length - 1].time + 3;
        return allNotesPlayed && songComplete;
    }

    endGame() {
        this.state = GameState.GAME_OVER;
        this.stopBackgroundBeat();
        document.getElementById('final-score').textContent = 'Song Complete!';
        this.showScreen('game-over-screen');
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new FluteGame();
});
