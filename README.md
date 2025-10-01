# Let's Flute 🎵

![Let's Flute Logo](lets-flute-logo.png)

A **visual and audio guide** for flute players to learn and practice with beautiful falling notes and realistic flute sounds. Watch, listen, and play along on your real flute!

## ✨ What Makes It Special

� **Passive Learning Experience** - No keyboard required! Just watch and play along on your real flute  
� **Beautiful Flute Sounds** - Multi-harmonic synthesis creates realistic flute tones  
� **Visual Fingering Guide** - See exactly which flute keys to press for each note  
� **Works Anywhere** - Pure web technology, no installation needed  
� **Perfect Practice Companion** - Built for real flute students and teachers  

## 🎯 How It Works

1. **Select a Song** - Choose from C Major Scale or Simple Flute Melody
2. **Click Play** - Watch notes fall down the screen with note names
3. **Follow the Guide** - See which flute keys to press on the visual diagram
4. **Listen & Play** - Notes automatically play when they reach the target line
5. **Practice Along** - Use your real flute to play along with the audio guide

## 🎹 Features

### 🎵 **Audio Experience**
- **Realistic flute tones** using multi-harmonic synthesis
- **Automatic note playback** when notes reach the target line
- **Soft background metronome** to keep tempo
- **High-quality sound** with proper flute-like envelopes

### 👀 **Visual Learning**
- **Falling note animation** with note names (C, D, E, F, G, A, B)
- **Color-coded notes** for easy identification
- **Flute fingering diagram** showing which keys to press
- **Preview highlights** for upcoming notes
- **Smooth 60fps animations** using Canvas API

### 🎓 **Educational**
- **Authentic flute fingerings** - based on professional orchestral flute fingering charts
- **Progressive songs** from simple scales to melodies
- **Visual timing guides** to help with rhythm
- **Perfect for beginners** and experienced players

## 🚀 Quick Start

### Option 1: Run Locally (Recommended)
```bash
# Clone the repository
git clone https://github.com/jessephus/lets-flute.git
cd lets-flute

# Start the development server
npm install
npm run dev
```

Then open `http://localhost:8080` in your browser.

### Option 2: Direct File Access
Simply open `index.html` in a modern web browser.

**Note**: For best audio experience, use the development server method.

## 🎼 Flute Fingering Reference

The visual guide shows these authentic flute fingerings based on professional fingering charts:

| Note | Fingering Pattern | Description |
|------|------------------|-------------|
| **C** | Thumb + All holes closed | Low C - all fingers down |
| **D** | All holes except thumb & RH4 | Standard D fingering |
| **E** | LH1,2,3 + RH1,2 closed | Standard E fingering |
| **F** | LH1,2,3 + RH1 closed | Standard F fingering |
| **G** | LH1,2,3 closed only | Standard G fingering |
| **A** | LH1,2 closed only | Standard A fingering |
| **B** | LH1 closed only | Standard B fingering |
| **C2** | All holes open | High C - open embouchure |

*Fingerings match standard orchestral flute technique used by professional musicians*

## 🎵 Available Songs

### 📚 **Beginner Songs**
- **C Major Scale** - Perfect for learning basic fingerings (15 notes)
- **Simple Flute Melody** - A gentle tune for practicing (22 notes)

### 🔧 **Adding Your Own Songs**

Create new songs in `flute-data.js`:

```javascript
const MY_SONG = {
    title: "My Practice Song",
    bpm: 100,
    notes: [
        { note: 'G', time: 0, duration: 1 },
        { note: 'A', time: 1, duration: 1 },
        { note: 'B', time: 2, duration: 1 },
        // Add more notes...
    ]
};

// Add to the SONGS array
const SONGS = [C_MAJOR_SCALE, SIMPLE_MELODY, MY_SONG];
```

## 🎨 Project Structure

```
lets-flute/
├── index.html              # Main interface with play controls
├── styles.css              # Beautiful styling and animations  
├── game.js                 # Core audio/visual engine
├── flute-data.js           # Fingering mappings and song library
├── lets-flute-logo.png     # Project logo
├── package.json            # Dependencies and scripts
└── README.md               # This guide
```

## 🔧 Technical Details

- **🎵 Audio System**: Web Audio API with multi-oscillator synthesis
- **🎨 Visual Engine**: HTML5 Canvas with requestAnimationFrame
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🚀 Zero Dependencies**: Pure vanilla JavaScript
- **⚡ High Performance**: 60fps smooth animations

## 🎓 For Music Teachers

**Let's Flute** is perfect for:
- **Beginner flute lessons** - students can see and hear correct fingerings
- **Practice motivation** - makes scales and exercises more engaging
- **Remote learning** - students can practice independently with guidance
- **Visual learners** - combines audio and visual teaching methods

## 🌐 Browser Support

✅ **Chrome/Edge** (Recommended)  
✅ **Firefox**  
✅ **Safari**  
✅ **Any modern browser** with Web Audio API support

## 🤝 Contributing

We welcome contributions! Ideas for enhancements:

- 🎵 **More songs** - Add your favorite beginner flute pieces
- 🎨 **Visual improvements** - Better animations or themes
- 🔊 **Audio enhancements** - Even more realistic flute sounds
- 📚 **Educational features** - Music theory integration
- 🌍 **Accessibility** - Screen reader support, colorblind-friendly colors

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 👨‍💻 Credits

**Created by Jesse Geraci**

Designed to make flute learning accessible, engaging, and fun for students of all ages. Special thanks to music educators who inspired this visual learning approach.

---

*🎵 Happy practicing! Remember: the best way to learn flute is with a real instrument in your hands.* 🎵
