# Let's Flute 🎵

A web-based rhythm game designed to teach children how to play the orchestral flute. Inspired by popular rhythm games like Guitar Hero and Dance Dance Revolution, it visually guides players through flute fingerings and rhythms using animated tracks and mirrored flute key diagrams.

![Main Menu](https://github.com/user-attachments/assets/8bb0e01d-8d71-4029-b74b-0d4d90745179)

![Gameplay](https://github.com/user-attachments/assets/1884815f-2722-4163-a605-d9e5af1bd658)

## Features

- 🎮 **Rhythm Game Mechanics**: Notes fall down the track toward a target line, just like Guitar Hero
- 🎹 **Flute Key Diagram**: Visual representation of 7 flute keys with real-time feedback
- 🎵 **Musical Learning**: Learn actual flute fingerings for different notes (C, D, E, F, G, A, B, C2)
- 📊 **Scoring System**: Track your performance with score and combo multipliers
- 🎨 **Beautiful UI**: Gradient backgrounds, smooth animations, and color-coded notes
- 📱 **Responsive Design**: Works on desktop and mobile devices

## How to Play

1. Press the **Start Game** button
2. Watch the colored notes fall down the track
3. Press the keyboard keys (A, S, D, F, G, H, J) that match the flute fingering when notes reach the red target line
4. Each note shows which keys you need to press simultaneously
5. Build combos by hitting notes accurately to maximize your score!

### Keyboard Controls

- **A, S, D, F, G, H, J**: Flute keys (left hand to right hand position)
- Notes require different combinations of keys based on actual flute fingerings

## Installation & Running

### Quick Start (No Installation)

Simply open `index.html` in a modern web browser - that's it! The game runs entirely in the browser with no build step required.

### Development Server

For a better development experience with auto-reload:

```bash
npm install
npm run dev
```

Then open your browser to `http://localhost:8080`

## Project Structure

```
lets-flute/
├── index.html          # Main HTML file with game structure
├── styles.css          # All styling and animations
├── game.js             # Core game engine and logic
├── flute-data.js       # Flute fingering mappings and song data
├── package.json        # Project metadata and dependencies
└── README.md           # This file
```

## Technical Details

- **Pure JavaScript**: No frameworks required - vanilla JS for maximum compatibility
- **Canvas API**: Smooth 60fps animations using requestAnimationFrame
- **CSS3**: Modern gradients, shadows, and animations
- **Responsive**: Adapts to different screen sizes

## Flute Fingering System

The game uses realistic flute fingerings:

- **C**: All 7 keys pressed (A, S, D, F, G, H, J)
- **D**: First 6 keys (A, S, D, F, G, H)
- **E**: First 5 keys (A, S, D, F, G)
- **F**: First 4 keys (A, S, D, F)
- **G**: First 3 keys (A, S, D)
- **A**: First 2 keys (A, S)
- **B**: First key only (A)
- **C2**: No keys (open - octave higher)

## Customization

### Adding Your Own Songs

Edit `flute-data.js` to add new songs:

```javascript
const MY_SONG = {
    title: "My Song Title",
    bpm: 120,
    notes: [
        { note: 'G', time: 0, duration: 1 },
        { note: 'A', time: 1, duration: 1 },
        // Add more notes...
    ]
};
```

Then update `game.js` to use your song:
```javascript
this.currentSong = MY_SONG;
```

### Adjusting Difficulty

In `game.js`, modify these values:

- `noteSpeed`: Higher = faster falling notes (default: 150)
- `hitWindow`: Smaller = more precise timing required (default: 0.15)

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select the main branch as the source
4. Your game will be available at `https://yourusername.github.io/lets-flute`

### Other Static Hosts

The game consists of static files only, so it can be deployed to:
- Netlify
- Vercel
- Any web server (Apache, Nginx, etc.)

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with Canvas API support

## Contributing

Contributions are welcome! Feel free to:
- Add new songs
- Improve the UI/UX
- Add new features (sound effects, more difficulty levels, etc.)
- Fix bugs

## License

MIT License - See [LICENSE](LICENSE) file for details

## Credits

Created by Jesse Geraci

Inspired by rhythm games like Guitar Hero and Dance Dance Revolution, designed to make learning the flute fun and interactive for children.
