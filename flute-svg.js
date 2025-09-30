// Professional Flute Fingering Chart SVG Generator
// Creates fingering chart diagrams matching standard flute fingering charts

class FluteSVG {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentNote = 'C';
        
        // Complete fingering chart data matching the game's note names
        this.fingeringData = {
            'C': { thumb: true, lh1: true, lh2: true, lh3: true, lh4: false, rh1: true, rh2: true, rh3: true, rh4: false, trill1: false, trill2: false },
            'D': { thumb: true, lh1: true, lh2: true, lh3: true, lh4: false, rh1: true, rh2: true, rh3: false, rh4: false, trill1: false, trill2: false },
            'E': { thumb: true, lh1: true, lh2: true, lh3: true, lh4: false, rh1: true, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'F': { thumb: true, lh1: true, lh2: true, lh3: true, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'G': { thumb: true, lh1: true, lh2: true, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'A': { thumb: true, lh1: true, lh2: false, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'B': { thumb: true, lh1: false, lh2: false, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'C2': { thumb: false, lh1: false, lh2: false, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            
            // Additional notes for extended songs
            'C#': { thumb: true, lh1: true, lh2: true, lh3: true, lh4: false, rh1: true, rh2: true, rh3: false, rh4: false, trill1: false, trill2: false },
            'D#': { thumb: true, lh1: true, lh2: true, lh3: true, lh4: false, rh1: true, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'F#': { thumb: true, lh1: true, lh2: true, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'G#': { thumb: true, lh1: true, lh2: false, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false },
            'A#': { thumb: true, lh1: false, lh2: false, lh3: false, lh4: false, rh1: false, rh2: false, rh3: false, rh4: false, trill1: false, trill2: false }
        };
        
        this.createFingeringChart();
    }
    createFingeringChart() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 550 150');
        svg.setAttribute('id', 'flute-fingering-chart');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Flute fingering chart showing finger positions');
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxHeight = '150px';
        
        // Create the fingering chart diagram exactly like the professional chart
        this.createChartElements(svg);
        
        // Add to container
        this.container.appendChild(svg);
        
        // Initialize with default note
        this.updateFingering(this.currentNote);
    }

    createChartElements(svg) {
        // Left side - Thumb Bb key (rectangular with rounded bottom)
        const thumbGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        thumbGroup.setAttribute('id', 'thumb-key');
        
        // Thumb Bb shape - like in the diagram
        const thumbPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        thumbPath.setAttribute('d', 'M20 50 L20 40 Q20 35 25 35 L35 35 Q40 35 40 40 L40 90 Q40 95 35 95 L25 95 Q20 95 20 90 Z');
        thumbPath.setAttribute('fill', 'white');
        thumbPath.setAttribute('stroke', '#333');
        thumbPath.setAttribute('stroke-width', '2');
        thumbPath.setAttribute('id', 'thumb-fill');
        
        // Thumb label
        const thumbLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        thumbLabel.setAttribute('x', '30');
        thumbLabel.setAttribute('y', '110');
        thumbLabel.setAttribute('text-anchor', 'middle');
        thumbLabel.setAttribute('font-family', 'Arial, sans-serif');
        thumbLabel.setAttribute('font-size', '10');
        thumbLabel.setAttribute('fill', '#666');
        thumbLabel.textContent = 'Thumb Bb';
        
        thumbGroup.appendChild(thumbPath);
        thumbGroup.appendChild(thumbLabel);
        svg.appendChild(thumbGroup);

        // Main tone holes - Left hand (LH1, LH2, LH3) with different sizes
        const leftHoles = [
            { id: 'lh1', x: 80, y: 70, r: 12, label: 'LH1' },   // Smallest
            { id: 'lh2', x: 130, y: 70, r: 16, label: 'LH2' },  // Medium
            { id: 'lh3', x: 180, y: 70, r: 16, label: 'LH3' }   // Medium
        ];

        leftHoles.forEach(hole => {
            const holeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            holeGroup.setAttribute('id', hole.id);
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', hole.x);
            circle.setAttribute('cy', hole.y);
            circle.setAttribute('r', hole.r);
            circle.setAttribute('fill', 'white');
            circle.setAttribute('stroke', '#333');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('id', hole.id + '-fill');
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', hole.x);
            label.setAttribute('y', hole.y + hole.r + 15);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-family', 'Arial, sans-serif');
            label.setAttribute('font-size', '10');
            label.setAttribute('fill', '#666');
            label.textContent = hole.label;
            
            holeGroup.appendChild(circle);
            holeGroup.appendChild(label);
            svg.appendChild(holeGroup);
        });

        // LH4 key - curved shape like in diagram
        const lh4Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        lh4Group.setAttribute('id', 'lh4');
        
        const lh4Path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        lh4Path.setAttribute('d', 'M210 45 Q215 40 220 45 L220 55 Q215 60 210 55 Z');
        lh4Path.setAttribute('fill', 'white');
        lh4Path.setAttribute('stroke', '#333');
        lh4Path.setAttribute('stroke-width', '2');
        lh4Path.setAttribute('id', 'lh4-fill');
        
        const lh4Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lh4Label.setAttribute('x', '215');
        lh4Label.setAttribute('y', '35');
        lh4Label.setAttribute('text-anchor', 'middle');
        lh4Label.setAttribute('font-family', 'Arial, sans-serif');
        lh4Label.setAttribute('font-size', '10');
        lh4Label.setAttribute('fill', '#666');
        lh4Label.textContent = 'LH4';
        
        lh4Group.appendChild(lh4Path);
        lh4Group.appendChild(lh4Label);
        svg.appendChild(lh4Group);

        // Connector rod between hands
        const connector = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        connector.setAttribute('d', 'M200 70 Q240 65 250 70');
        connector.setAttribute('fill', 'none');
        connector.setAttribute('stroke', '#666');
        connector.setAttribute('stroke-width', '3');
        svg.appendChild(connector);

        // Right hand holes (RH1, RH2, RH3) with uniform size
        const rightHoles = [
            { id: 'rh1', x: 280, y: 70, r: 15, label: 'RH1' },
            { id: 'rh2', x: 330, y: 70, r: 15, label: 'RH2' },
            { id: 'rh3', x: 380, y: 70, r: 15, label: 'RH3' }
        ];

        rightHoles.forEach(hole => {
            const holeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            holeGroup.setAttribute('id', hole.id);
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', hole.x);
            circle.setAttribute('cy', hole.y);
            circle.setAttribute('r', hole.r);
            circle.setAttribute('fill', 'white');
            circle.setAttribute('stroke', '#333');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('id', hole.id + '-fill');
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', hole.x);
            label.setAttribute('y', hole.y + hole.r + 15);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-family', 'Arial, sans-serif');
            label.setAttribute('font-size', '10');
            label.setAttribute('fill', '#666');
            label.textContent = hole.label;
            
            holeGroup.appendChild(circle);
            holeGroup.appendChild(label);
            svg.appendChild(holeGroup);
        });

        // Trill keys above RH1 and RH2
        const trill1Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        trill1Group.setAttribute('id', 'trill1');
        
        const trill1Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        trill1Rect.setAttribute('x', '275');
        trill1Rect.setAttribute('y', '35');
        trill1Rect.setAttribute('width', '10');
        trill1Rect.setAttribute('height', '20');
        trill1Rect.setAttribute('rx', '2');
        trill1Rect.setAttribute('fill', 'white');
        trill1Rect.setAttribute('stroke', '#333');
        trill1Rect.setAttribute('stroke-width', '2');
        trill1Rect.setAttribute('id', 'trill1-fill');
        
        const trill1Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        trill1Label.setAttribute('x', '280');
        trill1Label.setAttribute('y', '30');
        trill1Label.setAttribute('text-anchor', 'middle');
        trill1Label.setAttribute('font-family', 'Arial, sans-serif');
        trill1Label.setAttribute('font-size', '8');
        trill1Label.setAttribute('fill', '#666');
        trill1Label.textContent = '1st trill';
        
        // Connector line from trill to RH1
        const trill1Connector = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        trill1Connector.setAttribute('x1', '280');
        trill1Connector.setAttribute('y1', '55');
        trill1Connector.setAttribute('x2', '280');
        trill1Connector.setAttribute('y2', '55');
        trill1Connector.setAttribute('stroke', '#666');
        trill1Connector.setAttribute('stroke-width', '1');
        
        trill1Group.appendChild(trill1Rect);
        trill1Group.appendChild(trill1Label);
        trill1Group.appendChild(trill1Connector);
        svg.appendChild(trill1Group);

        // Second trill key
        const trill2Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        trill2Group.setAttribute('id', 'trill2');
        
        const trill2Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        trill2Rect.setAttribute('x', '325');
        trill2Rect.setAttribute('y', '35');
        trill2Rect.setAttribute('width', '10');
        trill2Rect.setAttribute('height', '20');
        trill2Rect.setAttribute('rx', '2');
        trill2Rect.setAttribute('fill', 'white');
        trill2Rect.setAttribute('stroke', '#333');
        trill2Rect.setAttribute('stroke-width', '2');
        trill2Rect.setAttribute('id', 'trill2-fill');
        
        const trill2Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        trill2Label.setAttribute('x', '330');
        trill2Label.setAttribute('y', '30');
        trill2Label.setAttribute('text-anchor', 'middle');
        trill2Label.setAttribute('font-family', 'Arial, sans-serif');
        trill2Label.setAttribute('font-size', '8');
        trill2Label.setAttribute('fill', '#666');
        trill2Label.textContent = '2nd trill';
        
        trill2Group.appendChild(trill2Rect);
        trill2Group.appendChild(trill2Label);
        svg.appendChild(trill2Group);

        // RH4 key stack (right side like the diagram)
        const rh4Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        rh4Group.setAttribute('id', 'rh4');
        
        const rh4Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rh4Rect.setAttribute('x', '410');
        rh4Rect.setAttribute('y', '60');
        rh4Rect.setAttribute('width', '12');
        rh4Rect.setAttribute('height', '20');
        rh4Rect.setAttribute('rx', '2');
        rh4Rect.setAttribute('fill', 'white');
        rh4Rect.setAttribute('stroke', '#333');
        rh4Rect.setAttribute('stroke-width', '2');
        rh4Rect.setAttribute('id', 'rh4-fill');
        
        const rh4Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rh4Label.setAttribute('x', '416');
        rh4Label.setAttribute('y', '95');
        rh4Label.setAttribute('text-anchor', 'middle');
        rh4Label.setAttribute('font-family', 'Arial, sans-serif');
        rh4Label.setAttribute('font-size', '10');
        rh4Label.setAttribute('fill', '#666');
        rh4Label.textContent = 'RH4';
        
        rh4Group.appendChild(rh4Rect);
        rh4Group.appendChild(rh4Label);
        svg.appendChild(rh4Group);

        // Pinky roller keys on far right (like diagram)
        const rollerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        rollerGroup.setAttribute('id', 'roller-keys');
        
        // G roller
        const gRoller = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        gRoller.setAttribute('x', '450');
        gRoller.setAttribute('y', '45');
        gRoller.setAttribute('width', '15');
        gRoller.setAttribute('height', '8');
        gRoller.setAttribute('rx', '4');
        gRoller.setAttribute('fill', 'white');
        gRoller.setAttribute('stroke', '#333');
        gRoller.setAttribute('stroke-width', '2');
        gRoller.setAttribute('id', 'g-roller-fill');
        
        // C roller
        const cRoller = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        cRoller.setAttribute('x', '450');
        cRoller.setAttribute('y', '55');
        cRoller.setAttribute('width', '15');
        cRoller.setAttribute('height', '8');
        cRoller.setAttribute('rx', '4');
        cRoller.setAttribute('fill', 'white');
        cRoller.setAttribute('stroke', '#333');
        cRoller.setAttribute('stroke-width', '2');
        cRoller.setAttribute('id', 'c-roller-fill');
        
        // Gizmo key
        const gizmo = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        gizmo.setAttribute('x', '450');
        gizmo.setAttribute('y', '65');
        gizmo.setAttribute('width', '15');
        gizmo.setAttribute('height', '8');
        gizmo.setAttribute('rx', '4');
        gizmo.setAttribute('fill', 'white');
        gizmo.setAttribute('stroke', '#333');
        gizmo.setAttribute('stroke-width', '2');
        gizmo.setAttribute('id', 'gizmo-fill');
        
        // Roller labels
        const rollerLabels = [
            { x: 475, y: 50, text: 'G-roller' },
            { x: 475, y: 60, text: 'C-roller' },
            { x: 475, y: 70, text: 'gizmo key' }
        ];
        
        rollerLabels.forEach(label => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', label.x);
            text.setAttribute('y', label.y);
            text.setAttribute('font-family', 'Arial, sans-serif');
            text.setAttribute('font-size', '8');
            text.setAttribute('fill', '#666');
            text.textContent = label.text;
            rollerGroup.appendChild(text);
        });
        
        rollerGroup.appendChild(gRoller);
        rollerGroup.appendChild(cRoller);
        rollerGroup.appendChild(gizmo);
        svg.appendChild(rollerGroup);

        // Current note display
        const noteDisplay = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        noteDisplay.setAttribute('x', '250');
        noteDisplay.setAttribute('y', '20');
        noteDisplay.setAttribute('text-anchor', 'middle');
        noteDisplay.setAttribute('font-family', 'Arial, sans-serif');
        noteDisplay.setAttribute('font-size', '16');
        noteDisplay.setAttribute('font-weight', 'bold');
        noteDisplay.setAttribute('fill', '#333');
        noteDisplay.setAttribute('id', 'current-note-display');
        noteDisplay.textContent = this.currentNote;
        svg.appendChild(noteDisplay);
    }
    
    // Update fingering display for a specific note
    updateFingering(noteName) {
        console.log(`SVG updateFingering called with: ${noteName}`);
        this.currentNote = noteName;
        const fingering = this.fingeringData[noteName];
        
        if (!fingering) {
            console.warn(`No fingering data found for note: ${noteName}`);
            console.log('Available notes:', Object.keys(this.fingeringData));
            return;
        }

        console.log(`Updating fingering for ${noteName}:`, fingering);

        // Update note display
        const noteDisplay = this.container.querySelector('#current-note-display');
        if (noteDisplay) {
            noteDisplay.textContent = noteName;
        }

        // Update thumb key
        this.updateKeyState('thumb-fill', fingering.thumb);
        
        // Update main holes
        this.updateKeyState('lh1-fill', fingering.lh1);
        this.updateKeyState('lh2-fill', fingering.lh2);
        this.updateKeyState('lh3-fill', fingering.lh3);
        this.updateKeyState('lh4-fill', fingering.lh4);
        this.updateKeyState('rh1-fill', fingering.rh1);
        this.updateKeyState('rh2-fill', fingering.rh2);
        this.updateKeyState('rh3-fill', fingering.rh3);
        this.updateKeyState('rh4-fill', fingering.rh4);
        
        // Update trill keys
        this.updateKeyState('trill1-fill', fingering.trill1);
        this.updateKeyState('trill2-fill', fingering.trill2);
        
        // Update roller keys (usually not used in basic fingerings)
        this.updateKeyState('g-roller-fill', false);
        this.updateKeyState('c-roller-fill', false);
        this.updateKeyState('gizmo-fill', false);
    }

    updateKeyState(elementId, isPressed) {
        const element = this.container.querySelector('#' + elementId);
        if (element) {
            if (isPressed) {
                element.setAttribute('fill', '#333'); // Dark fill for pressed keys
            } else {
                element.setAttribute('fill', 'white'); // White fill for open keys
            }
        }
    }

    // Show preview for upcoming note (yellow tint)
    showPreview(noteName) {
        const fingering = this.fingeringData[noteName];
        if (!fingering) return;

        // Add preview class or style to indicate upcoming note
        const previewColor = '#FFF3E0'; // Light orange for preview

        if (fingering.thumb) this.setPreviewState('thumb-fill', previewColor);
        if (fingering.lh1) this.setPreviewState('lh1-fill', previewColor);
        if (fingering.lh2) this.setPreviewState('lh2-fill', previewColor);
        if (fingering.lh3) this.setPreviewState('lh3-fill', previewColor);
        if (fingering.lh4) this.setPreviewState('lh4-fill', previewColor);
        if (fingering.rh1) this.setPreviewState('rh1-fill', previewColor);
        if (fingering.rh2) this.setPreviewState('rh2-fill', previewColor);
        if (fingering.rh3) this.setPreviewState('rh3-fill', previewColor);
        if (fingering.rh4) this.setPreviewState('rh4-fill', previewColor);
        if (fingering.trill1) this.setPreviewState('trill1-fill', previewColor);
        if (fingering.trill2) this.setPreviewState('trill2-fill', previewColor);
    }

    setPreviewState(elementId, color) {
        const element = this.container.querySelector('#' + elementId);
        if (element) {
            element.setAttribute('fill', color);
        }
    }

    // Clear all previews
    clearPreview() {
        // Reset all keys to their proper states based on current note
        this.updateFingering(this.currentNote);
    }

    // Convert keyboard keys to note names for compatibility
    updateFingeringFromKeys(requiredKeys) {
        // This method provides compatibility with the existing game system
        // Map keyboard keys to fingering positions for display
        const keyMap = {
            'A': 'lh1',
            'S': 'lh2', 
            'D': 'lh3',
            'F': 'rh1',
            'G': 'rh2',
            'H': 'rh3',
            'J': 'rh4' // Note: rh4 doesn't exist in standard flute
        };

        // Reset all keys
        this.updateKeyState('thumb-fill', false);
        this.updateKeyState('lh1-fill', false);
        this.updateKeyState('lh2-fill', false);
        this.updateKeyState('lh3-fill', false);
        this.updateKeyState('lh4-fill', false);
        this.updateKeyState('rh1-fill', false);
        this.updateKeyState('rh2-fill', false);
        this.updateKeyState('rh3-fill', false);
        this.updateKeyState('rh4-fill', false);
        this.updateKeyState('trill1-fill', false);
        this.updateKeyState('trill2-fill', false);

        // Set keys based on required keys
        requiredKeys.forEach(key => {
            const fingerPos = keyMap[key];
            if (fingerPos) {
                this.updateKeyState(fingerPos + '-fill', true);
            }
        });
    }

    // Trigger visual feedback animation
    triggerHitFeedback(noteName) {
        const fingering = this.fingeringData[noteName];
        if (!fingering) return;

        // Brief green flash for successful note hit
        const hitColor = '#4CAF50';
        
        if (fingering.thumb) this.flashKey('thumb-fill', hitColor);
        if (fingering.lh1) this.flashKey('lh1-fill', hitColor);
        if (fingering.lh2) this.flashKey('lh2-fill', hitColor);
        if (fingering.lh3) this.flashKey('lh3-fill', hitColor);
        if (fingering.lh4) this.flashKey('lh4-fill', hitColor);
        if (fingering.rh1) this.flashKey('rh1-fill', hitColor);
        if (fingering.rh2) this.flashKey('rh2-fill', hitColor);
        if (fingering.rh3) this.flashKey('rh3-fill', hitColor);
        if (fingering.rh4) this.flashKey('rh4-fill', hitColor);
        if (fingering.trill1) this.flashKey('trill1-fill', hitColor);
        if (fingering.trill2) this.flashKey('trill2-fill', hitColor);
    }

    flashKey(elementId, color) {
        const element = this.container.querySelector('#' + elementId);
        if (element) {
            const originalColor = element.getAttribute('fill');
            element.setAttribute('fill', color);
            
            setTimeout(() => {
                element.setAttribute('fill', originalColor);
            }, 200);
        }
    }
}

// Initialize the flute SVG when the page loads
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('flute-diagram')) {
        window.fluteSVG = new FluteSVG('flute-diagram');
    }
});