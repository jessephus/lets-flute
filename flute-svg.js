// Professional Flute Fingering Chart SVG Generator
// Creates fingering chart diagrams matching standard flute fingering charts

class FluteSVG {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentNote = 'C';
        
        // Complete fingering chart data matching authentic flute fingering patterns
        // Based on the provided professional flute fingering chart
        this.fingeringData = {
            'C': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: true, 
                rh2: true, 
                rh3: true, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: true, 
                cSharp: true 
            },     // Middle C - thumb closed, Bb lever open, LH1-3 closed, RH1-3 closed, cRoller and cSharp closed
            'D': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: true, 
                rh2: true, 
                rh3: true, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            },  // D - thumb closed, Bb lever open, same as C but RH4 open
            'E': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: true, 
                rh2: true, 
                rh3: false, 
                rh4: true, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            }, // E - thumb closed, Bb lever open, LH1-3 closed, RH1-2 closed, RH3-4 open
            'F': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: true, 
                rh2: false, 
                rh3: false, 
                rh4: true, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false
            }, // F - thumb closed, Bb lever open, LH1-3 closed, only RH1 closed
            'G': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: true, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false
            }, // G - thumb closed, Bb lever open, LH1-3 closed, all RH open
            'A': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: false, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: true, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false
            }, // A - thumb closed, Bb lever open, LH1-2 closed, LH3 open, all RH open
            'B': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: false, 
                lh3: false, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: true, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false
            }, // B - thumb closed, Bb lever open, only LH1 closed, all others open
            'C2': { 
                thumb: false, 
                thumbBb: false, 
                lh1: true, 
                lh2: false, 
                lh3: false, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: true, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false
            }, // High C - thumb open, Bb lever open, all holes open
            
            // Additional notes for extended songs (using similar patterns)
            'C#': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: true, 
                rh2: true, 
                rh3: false, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            },
            'D#': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: true, 
                rh2: false, 
                rh3: false, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            },
            'F#': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: true, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            },
            'G#': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: true, 
                lh3: false, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            },
            'A#': { 
                thumb: true, 
                thumbBb: false, 
                lh1: true, 
                lh2: false, 
                lh3: false, 
                lh4: false, 
                rh1: false, 
                rh2: false, 
                rh3: false, 
                rh4: false, 
                trill1: false, 
                trill2: false, 
                bRoller: false, 
                cRoller: false, 
                cSharp: false 
            }
        };
        
        this.createFingeringChart();
    }
    createFingeringChart() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 650 160');
        svg.setAttribute('id', 'flute-fingering-chart');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Flute fingering chart showing finger positions');
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxHeight = '160px';
        
        // Create the fingering chart diagram exactly like the professional chart
        this.createChartElements(svg);
        
        // Add to container
        this.container.appendChild(svg);
        
        // Initialize with default note
        this.updateFingering(this.currentNote);
    }

    createChartElements(svg) {
        // Left side - Thumb and Bb lever (side-by-side horizontally)
        const thumbGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        thumbGroup.setAttribute('id', 'thumb-keys');
        
        // Bb lever (left rectangle)
        const bbLeverRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bbLeverRect.setAttribute('x', '20');
        bbLeverRect.setAttribute('y', '70');
        bbLeverRect.setAttribute('width', '25');
        bbLeverRect.setAttribute('height', '15');
        bbLeverRect.setAttribute('rx', '3');
        bbLeverRect.setAttribute('fill', 'white');
        bbLeverRect.setAttribute('stroke', '#333');
        bbLeverRect.setAttribute('stroke-width', '2');
        bbLeverRect.setAttribute('id', 'thumbBb-fill');
        
        const bbLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        bbLabel.setAttribute('x', '32');
        bbLabel.setAttribute('y', '100');
        bbLabel.setAttribute('text-anchor', 'middle');
        bbLabel.setAttribute('font-family', 'Arial, sans-serif');
        bbLabel.setAttribute('font-size', '9');
        bbLabel.setAttribute('fill', '#333');
        bbLabel.textContent = 'Bb lever';
        
        // Thumb (right rectangle, side-by-side)
        const thumbRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        thumbRect.setAttribute('x', '50');
        thumbRect.setAttribute('y', '70');
        thumbRect.setAttribute('width', '25');
        thumbRect.setAttribute('height', '15');
        thumbRect.setAttribute('rx', '3');
        thumbRect.setAttribute('fill', 'white');
        thumbRect.setAttribute('stroke', '#333');
        thumbRect.setAttribute('stroke-width', '2');
        thumbRect.setAttribute('id', 'thumb-fill');
        
        const thumbLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        thumbLabel.setAttribute('x', '62');
        thumbLabel.setAttribute('y', '100');
        thumbLabel.setAttribute('text-anchor', 'middle');
        thumbLabel.setAttribute('font-family', 'Arial, sans-serif');
        thumbLabel.setAttribute('font-size', '9');
        thumbLabel.setAttribute('fill', '#333');
        thumbLabel.textContent = 'Thumb';
        
        thumbGroup.appendChild(bbLeverRect);
        thumbGroup.appendChild(bbLabel);
        thumbGroup.appendChild(thumbRect);
        thumbGroup.appendChild(thumbLabel);
        svg.appendChild(thumbGroup);

        // Left hand holes - LH1, LH2, LH3 (circles) - moved right to accommodate thumb keys
        const leftHoles = [
            { id: 'lh1', x: 120, y: 75, r: 20, label: 'LH1' },
            { id: 'lh2', x: 180, y: 75, r: 20, label: 'LH2' },
            { id: 'lh3', x: 240, y: 75, r: 20, label: 'LH3' }
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
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#333');
            label.textContent = hole.label;
            
            holeGroup.appendChild(circle);
            holeGroup.appendChild(label);
            svg.appendChild(holeGroup);
        });

        // LH4 key - rectangular key above LH holes
        const lh4Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        lh4Group.setAttribute('id', 'lh4');
        
        const lh4Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        lh4Rect.setAttribute('x', '230');
        lh4Rect.setAttribute('y', '25');
        lh4Rect.setAttribute('width', '20');
        lh4Rect.setAttribute('height', '15');
        lh4Rect.setAttribute('rx', '3');
        lh4Rect.setAttribute('fill', 'white');
        lh4Rect.setAttribute('stroke', '#333');
        lh4Rect.setAttribute('stroke-width', '2');
        lh4Rect.setAttribute('id', 'lh4-fill');
        
        const lh4Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lh4Label.setAttribute('x', '240');
        lh4Label.setAttribute('y', '20');
        lh4Label.setAttribute('text-anchor', 'middle');
        lh4Label.setAttribute('font-family', 'Arial, sans-serif');
        lh4Label.setAttribute('font-size', '10');
        lh4Label.setAttribute('fill', '#333');
        lh4Label.textContent = 'LH4';
        
        lh4Group.appendChild(lh4Rect);
        lh4Group.appendChild(lh4Label);
        svg.appendChild(lh4Group);

        // Right side - Trill keys above (rectangles)
        const trill1Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        trill1Group.setAttribute('id', 'trill1');
        
        const trill1Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        trill1Rect.setAttribute('x', '330');
        trill1Rect.setAttribute('y', '25');
        trill1Rect.setAttribute('width', '15');
        trill1Rect.setAttribute('height', '20');
        trill1Rect.setAttribute('rx', '3');
        trill1Rect.setAttribute('fill', 'white');
        trill1Rect.setAttribute('stroke', '#333');
        trill1Rect.setAttribute('stroke-width', '2');
        trill1Rect.setAttribute('id', 'trill1-fill');
        
        const trill1Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        trill1Label.setAttribute('x', '337');
        trill1Label.setAttribute('y', '20');
        trill1Label.setAttribute('text-anchor', 'middle');
        trill1Label.setAttribute('font-family', 'Arial, sans-serif');
        trill1Label.setAttribute('font-size', '8');
        trill1Label.setAttribute('fill', '#333');
        trill1Label.textContent = '1st trill';
        
        trill1Group.appendChild(trill1Rect);
        trill1Group.appendChild(trill1Label);
        svg.appendChild(trill1Group);

        const trill2Group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        trill2Group.setAttribute('id', 'trill2');
        
        const trill2Rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        trill2Rect.setAttribute('x', '370');
        trill2Rect.setAttribute('y', '25');
        trill2Rect.setAttribute('width', '15');
        trill2Rect.setAttribute('height', '20');
        trill2Rect.setAttribute('rx', '3');
        trill2Rect.setAttribute('fill', 'white');
        trill2Rect.setAttribute('stroke', '#333');
        trill2Rect.setAttribute('stroke-width', '2');
        trill2Rect.setAttribute('id', 'trill2-fill');
        
        const trill2Label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        trill2Label.setAttribute('x', '377');
        trill2Label.setAttribute('y', '20');
        trill2Label.setAttribute('text-anchor', 'middle');
        trill2Label.setAttribute('font-family', 'Arial, sans-serif');
        trill2Label.setAttribute('font-size', '8');
        trill2Label.setAttribute('fill', '#333');
        trill2Label.textContent = '2nd trill';
        
        trill2Group.appendChild(trill2Rect);
        trill2Group.appendChild(trill2Label);
        svg.appendChild(trill2Group);

        // Right hand holes - RH1, RH2, RH3, RH4 (circles)
        const rightHoles = [
            { id: 'rh1', x: 330, y: 75, r: 20, label: 'RH1' },
            { id: 'rh2', x: 390, y: 75, r: 20, label: 'RH2' },
            { id: 'rh3', x: 450, y: 75, r: 20, label: 'RH3' },
            { id: 'rh4', x: 510, y: 75, r: 15, label: 'RH4' }  // Smaller circle
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
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#333');
            label.textContent = hole.label;
            
            holeGroup.appendChild(circle);
            holeGroup.appendChild(label);
            svg.appendChild(holeGroup);
        });

        // Far right - Roller keys (B roller, C roller, C#)
        const rollerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        rollerGroup.setAttribute('id', 'roller-keys');
        
        // B roller (oval shape)
        const bRollerPath = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        bRollerPath.setAttribute('cx', '560');
        bRollerPath.setAttribute('cy', '60');
        bRollerPath.setAttribute('rx', '15');
        bRollerPath.setAttribute('ry', '8');
        bRollerPath.setAttribute('fill', 'white');
        bRollerPath.setAttribute('stroke', '#333');
        bRollerPath.setAttribute('stroke-width', '2');
        bRollerPath.setAttribute('id', 'b-roller-fill');
        
        // C roller (oval shape)
        const cRollerPath = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        cRollerPath.setAttribute('cx', '560');
        cRollerPath.setAttribute('cy', '75');
        cRollerPath.setAttribute('rx', '15');
        cRollerPath.setAttribute('ry', '8');
        cRollerPath.setAttribute('fill', 'white');
        cRollerPath.setAttribute('stroke', '#333');
        cRollerPath.setAttribute('stroke-width', '2');
        cRollerPath.setAttribute('id', 'c-roller-fill');
        
        // C# (oval shape)
        const cSharpPath = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        cSharpPath.setAttribute('cx', '560');
        cSharpPath.setAttribute('cy', '90');
        cSharpPath.setAttribute('rx', '15');
        cSharpPath.setAttribute('ry', '8');
        cSharpPath.setAttribute('fill', 'white');
        cSharpPath.setAttribute('stroke', '#333');
        cSharpPath.setAttribute('stroke-width', '2');
        cSharpPath.setAttribute('id', 'c-sharp-fill');
        
        // Roller labels
        const rollerLabels = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rollerLabels.setAttribute('x', '560');
        rollerLabels.setAttribute('y', '115');
        rollerLabels.setAttribute('text-anchor', 'middle');
        rollerLabels.setAttribute('font-family', 'Arial, sans-serif');
        rollerLabels.setAttribute('font-size', '8');
        rollerLabels.setAttribute('fill', '#333');
        rollerLabels.textContent = 'B roller';
        
        const cRollerLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        cRollerLabel.setAttribute('x', '560');
        cRollerLabel.setAttribute('y', '125');
        cRollerLabel.setAttribute('text-anchor', 'middle');
        cRollerLabel.setAttribute('font-family', 'Arial, sans-serif');
        cRollerLabel.setAttribute('font-size', '8');
        cRollerLabel.setAttribute('fill', '#333');
        cRollerLabel.textContent = 'C roller';
        
        const cSharpLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        cSharpLabel.setAttribute('x', '560');
        cSharpLabel.setAttribute('y', '135');
        cSharpLabel.setAttribute('text-anchor', 'middle');
        cSharpLabel.setAttribute('font-family', 'Arial, sans-serif');
        cSharpLabel.setAttribute('font-size', '8');
        cSharpLabel.setAttribute('fill', '#333');
        cSharpLabel.textContent = 'C#';
        
        rollerGroup.appendChild(bRollerPath);
        rollerGroup.appendChild(cRollerPath);
        rollerGroup.appendChild(cSharpPath);
        rollerGroup.appendChild(rollerLabels);
        rollerGroup.appendChild(cRollerLabel);
        rollerGroup.appendChild(cSharpLabel);
        svg.appendChild(rollerGroup);
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

        // Update thumb keys
        this.updateKeyState('thumb-fill', fingering.thumb);
        this.updateKeyState('thumbBb-fill', fingering.thumbBb);
        
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
        
        // Update roller keys
        this.updateKeyState('b-roller-fill', fingering.bRoller);
        this.updateKeyState('c-roller-fill', fingering.cRoller);
        this.updateKeyState('c-sharp-fill', fingering.cSharp);
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

    // Show preview for upcoming note using flute fingering pattern
    showPreviewForNote(noteName) {
        const fingering = this.fingeringData[noteName];
        if (!fingering) return;

        // Add preview class or style to indicate upcoming note
        const previewColor = '#FFF3E0'; // Light orange for preview

        if (fingering.thumb) this.setPreviewState('thumb-fill', previewColor);
        if (fingering.thumbBb) this.setPreviewState('thumb-bb-fill', previewColor);
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

    // Show preview for upcoming note (yellow tint)
    showPreview(noteName) {
        const fingering = this.fingeringData[noteName];
        if (!fingering) return;

        // Add preview class or style to indicate upcoming note
        const previewColor = '#FFF3E0'; // Light orange for preview

        if (fingering.thumb) this.setPreviewState('thumb-fill', previewColor);
        if (fingering.thumbBb) this.setPreviewState('thumb-bb-fill', previewColor);
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

    // Update fingering display using note name
    updateFingeringForNote(noteName) {
        console.log(`SVG updateFingeringForNote called with: ${noteName}`);
        
        // Update the main fingering display
        this.updateFingering(noteName);
    }

    // Trigger visual feedback animation using note name
    triggerHitFeedbackForNote(noteName) {
        // Brief green flash for successful note hit
        const hitColor = '#4CAF50';
        
        const fingering = this.fingeringData[noteName];
        if (!fingering) return;

        if (fingering.thumb) this.flashKey('thumb-fill', hitColor);
        if (fingering.thumbBb) this.flashKey('thumb-bb-fill', hitColor);
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

    // Trigger visual feedback animation
    triggerHitFeedback(noteName) {
        const fingering = this.fingeringData[noteName];
        if (!fingering) return;

        // Brief green flash for successful note hit
        const hitColor = '#4CAF50';
        
        if (fingering.thumb) this.flashKey('thumb-fill', hitColor);
        if (fingering.thumbBb) this.flashKey('thumb-bb-fill', hitColor);
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