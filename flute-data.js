// Flute fingering data and note mappings
const FLUTE_FINGERINGS = {
    'C': ['A', 'S', 'D', 'F', 'G', 'H', 'J'],  // All keys down
    'D': ['A', 'S', 'D', 'F', 'G', 'H'],        // All except J
    'E': ['A', 'S', 'D', 'F', 'G'],              // First 5 keys
    'F': ['A', 'S', 'D', 'F'],                   // First 4 keys
    'G': ['A', 'S', 'D'],                        // First 3 keys
    'A': ['A', 'S'],                             // First 2 keys
    'B': ['A'],                                  // Only first key
    'C2': []                                     // No keys (octave higher)
};

// Note colors for visual variety
const NOTE_COLORS = {
    'C': '#FF6B6B',   // Red
    'D': '#FF8E53',   // Orange
    'E': '#FFA500',   // Light Orange
    'F': '#FFD93D',   // Yellow
    'G': '#6BCB77',   // Green
    'A': '#4D96FF',   // Blue
    'B': '#9D4EDD',   // Purple
    'C2': '#FF6B9D'   // Pink
};

// Song 1: C Major Scale - Perfect for beginners
const C_MAJOR_SCALE = {
    title: "C Major Scale",
    bpm: 80,
    notes: [
        { note: 'C', time: 0, duration: 1 },
        { note: 'D', time: 1, duration: 1 },
        { note: 'E', time: 2, duration: 1 },
        { note: 'F', time: 3, duration: 1 },
        { note: 'G', time: 4, duration: 1 },
        { note: 'A', time: 5, duration: 1 },
        { note: 'B', time: 6, duration: 1 },
        { note: 'C2', time: 7, duration: 2 },
        
        // Going back down
        { note: 'B', time: 9, duration: 1 },
        { note: 'A', time: 10, duration: 1 },
        { note: 'G', time: 11, duration: 1 },
        { note: 'F', time: 12, duration: 1 },
        { note: 'E', time: 13, duration: 1 },
        { note: 'D', time: 14, duration: 1 },
        { note: 'C', time: 15, duration: 2 }
    ]
};

// Song 2: Simple Flute Melody - Beginner-friendly tune
const SIMPLE_MELODY = {
    title: "Simple Flute Melody",
    bpm: 90,
    notes: [
        { note: 'G', time: 0, duration: 1 },
        { note: 'A', time: 1, duration: 1 },
        { note: 'B', time: 2, duration: 1 },
        { note: 'C2', time: 3, duration: 1 },
        
        { note: 'B', time: 4, duration: 1 },
        { note: 'A', time: 5, duration: 1 },
        { note: 'G', time: 6, duration: 2 },
        
        { note: 'E', time: 8, duration: 1 },
        { note: 'F', time: 9, duration: 1 },
        { note: 'G', time: 10, duration: 1 },
        { note: 'A', time: 11, duration: 1 },
        
        { note: 'G', time: 12, duration: 1 },
        { note: 'F', time: 13, duration: 1 },
        { note: 'E', time: 14, duration: 2 },
        
        { note: 'G', time: 16, duration: 0.5 },
        { note: 'A', time: 16.5, duration: 0.5 },
        { note: 'B', time: 17, duration: 0.5 },
        { note: 'C2', time: 17.5, duration: 0.5 },
        { note: 'B', time: 18, duration: 0.5 },
        { note: 'A', time: 18.5, duration: 0.5 },
        { note: 'G', time: 19, duration: 1 },
        
        { note: 'C2', time: 20, duration: 4 }
    ]
};

// Available songs for Phase 1 MVP
const SONGS = [C_MAJOR_SCALE, SIMPLE_MELODY];

// Default song
const SAMPLE_SONG = C_MAJOR_SCALE;
