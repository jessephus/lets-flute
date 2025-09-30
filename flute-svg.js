// SVG Flute Component Generator
// Creates a detailed SVG representation of an orchestral flute with interactive fingering indicators

class FluteSVG {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.keyStates = {
            'A': false,
            'S': false,
            'D': false,
            'F': false,
            'G': false,
            'H': false,
            'J': false
        };
        this.createFluteSVG();
    }

    createFluteSVG() {
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 800 200');
        svg.setAttribute('id', 'flute-svg');
        svg.style.width = '100%';
        svg.style.height = 'auto';

        // Create flute body (main tube)
        const fluteBody = this.createFluteBody();
        svg.appendChild(fluteBody);

        // Create finger holes/keys representing each keyboard key
        // Flute keys from left to right: A, S, D, F, G, H, J
        const keyPositions = [
            { id: 'A', x: 150, y: 100, label: 'A' },   // Left hand index finger
            { id: 'S', x: 220, y: 100, label: 'S' },   // Left hand middle finger
            { id: 'D', x: 290, y: 100, label: 'D' },   // Left hand ring finger
            { id: 'F', x: 380, y: 100, label: 'F' },   // Right hand index finger
            { id: 'G', x: 450, y: 100, label: 'G' },   // Right hand middle finger
            { id: 'H', x: 520, y: 100, label: 'H' },   // Right hand ring finger
            { id: 'J', x: 590, y: 100, label: 'J' }    // Right hand pinky finger
        ];

        keyPositions.forEach(keyPos => {
            const keyGroup = this.createKey(keyPos);
            svg.appendChild(keyGroup);
        });

        // Add embouchure (mouthpiece) on the left
        const embouchure = this.createEmbouchure();
        svg.appendChild(embouchure);

        // Clear container and add SVG
        this.container.innerHTML = '';
        this.container.appendChild(svg);
    }

    createFluteBody() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', 'flute-body');

        // Main tube (cylindrical body)
        const tube = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        tube.setAttribute('x', '100');
        tube.setAttribute('y', '85');
        tube.setAttribute('width', '600');
        tube.setAttribute('height', '30');
        tube.setAttribute('rx', '15');
        tube.setAttribute('fill', 'url(#fluteGradient)');
        tube.setAttribute('stroke', '#999');
        tube.setAttribute('stroke-width', '2');

        // Add gradient for metallic look
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'fluteGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#e8e8e8;stop-opacity:1');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '50%');
        stop2.setAttribute('style', 'stop-color:#d4d4d4;stop-opacity:1');

        const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop3.setAttribute('offset', '100%');
        stop3.setAttribute('style', 'stop-color:#c0c0c0;stop-opacity:1');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        gradient.appendChild(stop3);
        defs.appendChild(gradient);

        g.appendChild(defs);
        g.appendChild(tube);

        // Add shine/highlight on top of tube
        const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        highlight.setAttribute('x', '100');
        highlight.setAttribute('y', '87');
        highlight.setAttribute('width', '600');
        highlight.setAttribute('height', '8');
        highlight.setAttribute('rx', '4');
        highlight.setAttribute('fill', 'rgba(255, 255, 255, 0.4)');

        g.appendChild(highlight);

        return g;
    }

    createKey(keyPos) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'flute-key-svg');
        g.setAttribute('data-key', keyPos.id);

        // Outer ring (key mechanism)
        const outerRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerRing.setAttribute('cx', keyPos.x);
        outerRing.setAttribute('cy', keyPos.y);
        outerRing.setAttribute('r', '22');
        outerRing.setAttribute('fill', '#888');
        outerRing.setAttribute('stroke', '#666');
        outerRing.setAttribute('stroke-width', '1.5');

        // Inner pad (finger hole cover)
        const innerPad = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerPad.setAttribute('cx', keyPos.x);
        innerPad.setAttribute('cy', keyPos.y);
        innerPad.setAttribute('r', '18');
        innerPad.setAttribute('fill', '#b8b8b8');
        innerPad.setAttribute('stroke', '#999');
        innerPad.setAttribute('stroke-width', '1');
        innerPad.setAttribute('class', 'key-pad');

        // Highlight overlay (shows when key is active)
        const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        highlight.setAttribute('cx', keyPos.x);
        highlight.setAttribute('cy', keyPos.y);
        highlight.setAttribute('r', '18');
        highlight.setAttribute('fill', '#667eea');
        highlight.setAttribute('opacity', '0');
        highlight.setAttribute('class', 'key-highlight');

        // Preview overlay (shows upcoming note)
        const preview = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        preview.setAttribute('cx', keyPos.x);
        preview.setAttribute('cy', keyPos.y);
        preview.setAttribute('r', '18');
        preview.setAttribute('fill', '#FFD700');
        preview.setAttribute('opacity', '0');
        preview.setAttribute('class', 'key-preview');

        // Label text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', keyPos.x);
        text.setAttribute('y', keyPos.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '16');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#333');
        text.setAttribute('class', 'key-label');
        text.textContent = keyPos.label;

        g.appendChild(outerRing);
        g.appendChild(innerPad);
        g.appendChild(highlight);
        g.appendChild(preview);
        g.appendChild(text);

        return g;
    }

    createEmbouchure() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('id', 'embouchure');

        // Head joint (wider section on left)
        const headJoint = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        headJoint.setAttribute('x', '20');
        headJoint.setAttribute('y', '82');
        headJoint.setAttribute('width', '85');
        headJoint.setAttribute('height', '36');
        headJoint.setAttribute('rx', '18');
        headJoint.setAttribute('fill', 'url(#fluteGradient)');
        headJoint.setAttribute('stroke', '#999');
        headJoint.setAttribute('stroke-width', '2');

        // Embouchure hole (blow hole)
        const embouchureHole = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        embouchureHole.setAttribute('cx', '70');
        embouchureHole.setAttribute('cy', '100');
        embouchureHole.setAttribute('rx', '12');
        embouchureHole.setAttribute('ry', '6');
        embouchureHole.setAttribute('fill', '#333');
        embouchureHole.setAttribute('stroke', '#666');
        embouchureHole.setAttribute('stroke-width', '1');

        g.appendChild(headJoint);
        g.appendChild(embouchureHole);

        return g;
    }

    // Update key states based on fingering
    updateFingering(requiredKeys) {
        // Reset all keys first
        Object.keys(this.keyStates).forEach(key => {
            this.keyStates[key] = false;
        });

        // Set required keys
        requiredKeys.forEach(key => {
            this.keyStates[key] = true;
        });

        this.renderKeyStates();
    }

    // Show preview for upcoming note
    showPreview(requiredKeys) {
        // Clear all previews first
        const allPreviews = this.container.querySelectorAll('.key-preview');
        allPreviews.forEach(preview => {
            preview.setAttribute('opacity', '0');
        });

        // Show preview for required keys
        requiredKeys.forEach(key => {
            const keyGroup = this.container.querySelector(`[data-key="${key}"]`);
            if (keyGroup) {
                const preview = keyGroup.querySelector('.key-preview');
                if (preview) {
                    preview.setAttribute('opacity', '0.7');
                }
            }
        });
    }

    // Clear all previews
    clearPreview() {
        const allPreviews = this.container.querySelectorAll('.key-preview');
        allPreviews.forEach(preview => {
            preview.setAttribute('opacity', '0');
        });
    }

    // Render current key states
    renderKeyStates() {
        Object.keys(this.keyStates).forEach(key => {
            const keyGroup = this.container.querySelector(`[data-key="${key}"]`);
            if (keyGroup) {
                const highlight = keyGroup.querySelector('.key-highlight');
                const label = keyGroup.querySelector('.key-label');
                
                if (this.keyStates[key]) {
                    // Key is active (pressed)
                    highlight.setAttribute('opacity', '0.9');
                    label.setAttribute('fill', '#fff');
                } else {
                    // Key is inactive
                    highlight.setAttribute('opacity', '0');
                    label.setAttribute('fill', '#333');
                }
            }
        });
    }

    // Trigger visual feedback animation for a note hit
    triggerHitFeedback(requiredKeys) {
        requiredKeys.forEach(key => {
            const keyGroup = this.container.querySelector(`[data-key="${key}"]`);
            if (keyGroup) {
                const highlight = keyGroup.querySelector('.key-highlight');
                
                // Create pulse animation
                highlight.setAttribute('opacity', '1');
                
                // Animate the highlight
                const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                animation.setAttribute('attributeName', 'r');
                animation.setAttribute('from', '18');
                animation.setAttribute('to', '25');
                animation.setAttribute('dur', '0.3s');
                animation.setAttribute('begin', 'indefinite');
                animation.setAttribute('fill', 'freeze');
                
                const opacityAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                opacityAnim.setAttribute('attributeName', 'opacity');
                opacityAnim.setAttribute('from', '1');
                opacityAnim.setAttribute('to', '0.9');
                opacityAnim.setAttribute('dur', '0.3s');
                opacityAnim.setAttribute('begin', 'indefinite');
                opacityAnim.setAttribute('fill', 'freeze');
                
                highlight.appendChild(animation);
                highlight.appendChild(opacityAnim);
                
                animation.beginElement();
                opacityAnim.beginElement();
                
                // Reset after animation
                setTimeout(() => {
                    highlight.setAttribute('r', '18');
                    animation.remove();
                    opacityAnim.remove();
                }, 300);
            }
        });
    }
}
