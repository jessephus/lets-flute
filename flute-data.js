// Professional flute fingering patterns based on standard orchestral flute technique
// Each fingering specifies which holes and keys need to be covered
const FLUTE_FINGERINGS = {
    // First octave (low register)
    'C': ['K', 'A', 'S', 'D', 'F', 'G', 'H', 'J'],    // Thumb + all fingers
    'C#': ['K', 'A', 'S', 'D', 'F', 'G', 'H'],        // Thumb + all except RH4
    'Db': ['K', 'A', 'S', 'D', 'F', 'G', 'H'],        // Same as C#
    'D': ['K', 'A', 'S', 'D', 'F', 'G', 'H'],         // Thumb + all except RH4
    'D#': ['K', 'A', 'S', 'D', 'F', 'G'],             // Thumb + first 5
    'Eb': ['K', 'A', 'S', 'D', 'F', 'G'],             // Same as D#
    'E': ['K', 'A', 'S', 'D', 'F', 'G'],              // Thumb + first 5
    'F': ['K', 'A', 'S', 'D', 'F'],                   // Thumb + first 4
    'F#': ['K', 'A', 'S', 'D'],                       // Thumb + first 3
    'Gb': ['K', 'A', 'S', 'D'],                       // Same as F#
    'G': ['K', 'A', 'S', 'D'],                        // Thumb + first 3
    'G#': ['K', 'A', 'S'],                            // Thumb + first 2
    'Ab': ['K', 'A', 'S'],                            // Same as G#
    'A': ['K', 'A', 'S'],                             // Thumb + first 2
    'A#': ['K', 'A', 'L'],                            // Thumb + LH1 + Bb lever
    'Bb': ['K', 'A', 'L'],                            // Same as A#
    'B': ['K', 'A'],                                  // Thumb + LH1
    
    // Second octave (middle register)
    'C2': ['K'],                                       // Thumb only
    'C#2': ['A', 'S', 'D', 'F', 'G', 'H'],           // All fingers, no thumb
    'Db2': ['A', 'S', 'D', 'F', 'G', 'H'],           // Same as C#2
    'D2': ['A', 'S', 'D', 'F', 'G', 'H'],            // All fingers, no thumb
    'D#2': ['A', 'S', 'D', 'F', 'G'],                // First 5, no thumb
    'Eb2': ['A', 'S', 'D', 'F', 'G'],                // Same as D#2
    'E2': ['A', 'S', 'D', 'F', 'G'],                 // First 5, no thumb
    'F2': ['A', 'S', 'D', 'F'],                      // First 4, no thumb
    'F#2': ['A', 'S', 'D'],                          // First 3, no thumb
    'Gb2': ['A', 'S', 'D'],                          // Same as F#2
    'G2': ['A', 'S', 'D'],                           // First 3, no thumb
    'G#2': ['A', 'S'],                               // First 2, no thumb
    'Ab2': ['A', 'S'],                               // Same as G#2
    'A2': ['A', 'S'],                                // First 2, no thumb
    'A#2': ['A', 'L'],                               // LH1 + Bb lever, no thumb
    'Bb2': ['A', 'L'],                               // Same as A#2
    'B2': ['A'],                                     // LH1 only, no thumb
    
    // Third octave (high register)
    'C3': [],                                        // Open (no keys)
    'C#3': ['S', 'D', 'F', 'G', 'H'],               // All except LH1 and thumb
    'Db3': ['S', 'D', 'F', 'G', 'H'],               // Same as C#3
    'D3': ['S', 'D', 'F', 'G', 'H'],                // All except LH1 and thumb
    'D#3': ['S', 'D', 'F', 'G'],                    // First 4 except LH1, no thumb
    'Eb3': ['S', 'D', 'F', 'G'],                    // Same as D#3
    'E3': ['S', 'D', 'F', 'G'],                     // First 4 except LH1, no thumb
    'F3': ['S', 'D', 'F'],                          // First 3 except LH1, no thumb
    'F#3': ['S', 'D'],                              // First 2 except LH1, no thumb
    'Gb3': ['S', 'D'],                              // Same as F#3
    'G3': ['S', 'D'],                               // First 2 except LH1, no thumb
    'G#3': ['S'],                                   // LH2 only
    'Ab3': ['S'],                                   // Same as G#3
    'A3': ['S'],                                    // LH2 only
    'A#3': ['L'],                                   // Bb lever only
    'Bb3': ['L'],                                   // Same as A#3
    'B3': [],                                       // Open (no keys)
};

// Standard flute fingerings for basic learning (used in current songs)
// Based on authentic flute fingering chart - matches professional patterns exactly
const BASIC_FINGERINGS = {
    'C': { thumb: true, lh1: true, lh2: true, lh3: true, rh1: true, rh2: true, rh3: true, rh4: true },     // Low C - all holes closed
    'D': { thumb: false, lh1: true, lh2: true, lh3: true, rh1: true, rh2: true, rh3: true, rh4: false },  // D - thumb open, RH4 open
    'E': { thumb: false, lh1: true, lh2: true, lh3: true, rh1: true, rh2: true, rh3: false, rh4: false }, // E - thumb open, RH3&4 open
    'F': { thumb: false, lh1: true, lh2: true, lh3: true, rh1: true, rh2: false, rh3: false, rh4: false }, // F - thumb open, RH2,3,4 open
    'G': { thumb: false, lh1: true, lh2: true, lh3: true, rh1: false, rh2: false, rh3: false, rh4: false }, // G - thumb open, only LH closed
    'A': { thumb: false, lh1: true, lh2: true, lh3: false, rh1: false, rh2: false, rh3: false, rh4: false }, // A - thumb open, LH1&2 closed
    'B': { thumb: false, lh1: true, lh2: false, lh3: false, rh1: false, rh2: false, rh3: false, rh4: false }, // B - thumb open, only LH1 closed
    'C2': { thumb: false, lh1: false, lh2: false, lh3: false, rh1: false, rh2: false, rh3: false, rh4: false } // High C - all open
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
