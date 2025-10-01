// Treble Staff Component for Interactive Fingering Learning
// Creates a clickable treble staff where users can select notes to learn fingerings

class TrebleStaff {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedNote = null;
        this.onNoteClick = null; // Callback function for note clicks
        
        // Note positions on treble staff (Y coordinates from top)
        this.notePositions = {
            'C': { y: 160, name: 'C (Middle C)' },      // Below staff (ledger line)
            'D': { y: 150, name: 'D' },                 // Below staff (space)
            'E': { y: 140, name: 'E' },                 // First line (bottom staff line)
            'F': { y: 130, name: 'F' },                 // First space
            'G': { y: 120, name: 'G' },                 // Second line
            'A': { y: 110, name: 'A' },                 // Second space
            'B': { y: 100, name: 'B' },                 // Third line (middle)
            'C2': { y: 90, name: 'C (High C)' }         // Third space
        };
        
        this.createStaff();
    }
    
    createStaff() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create SVG element for the staff
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 500 240');
        svg.setAttribute('id', 'treble-staff-svg');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Interactive treble staff for note selection');
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxHeight = '240px';
        
        this.createStaffElements(svg);
        this.container.appendChild(svg);
    }
    
    createStaffElements(svg) {
        // Draw the five staff lines (from bottom to top: E, G, B, D, F)
        const staffLinePositions = [140, 120, 100, 80, 60]; // Bottom to top, moved up
        staffLinePositions.forEach((y, i) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '80');
            line.setAttribute('y1', y);
            line.setAttribute('x2', '450');
            line.setAttribute('y2', y);
            line.setAttribute('class', 'staff-line');
            svg.appendChild(line);
        });
        
        // Add treble clef symbol (simplified)
        const clef = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        clef.setAttribute('x', '40');
        clef.setAttribute('y', '100');
        clef.setAttribute('class', 'clef');
        clef.textContent = '𝄞';
        svg.appendChild(clef);
        
        // Add ledger lines for C (below staff)
        const ledgerLineC = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ledgerLineC.setAttribute('x1', '110');
        ledgerLineC.setAttribute('y1', '160');
        ledgerLineC.setAttribute('x2', '150');
        ledgerLineC.setAttribute('y2', '160');
        ledgerLineC.setAttribute('class', 'staff-line');
        svg.appendChild(ledgerLineC);
        
        // Create clickable note positions
        Object.keys(this.notePositions).forEach((noteName, index) => {
            this.createNoteElement(svg, noteName, index);
        });
        
        // Add instruction text
        const instruction = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        instruction.setAttribute('x', '250');
        instruction.setAttribute('y', '25');
        instruction.setAttribute('text-anchor', 'middle');
        instruction.setAttribute('font-family', 'Arial, sans-serif');
        instruction.setAttribute('font-size', '14');
        instruction.setAttribute('fill', '#666');
        instruction.textContent = 'Click on any note to learn its fingering';
        svg.appendChild(instruction);
    }
    
    createNoteElement(svg, noteName, index) {
        const position = this.notePositions[noteName];
        const x = 130 + (index * 40); // Spread notes across the staff
        const y = position.y;
        
        // Create note group
        const noteGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        noteGroup.setAttribute('id', `note-${noteName}`);
        noteGroup.setAttribute('class', 'staff-note');
        noteGroup.style.cursor = 'pointer';
        
        // Create note head (filled circle)
        const noteHead = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        noteHead.setAttribute('cx', x);
        noteHead.setAttribute('cy', y);
        noteHead.setAttribute('rx', '8');
        noteHead.setAttribute('ry', '6');
        noteHead.setAttribute('fill', '#333');
        noteHead.setAttribute('stroke', '#333');
        noteHead.setAttribute('stroke-width', '1');
        
        // Create note stem
        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        stem.setAttribute('x1', x + 8);
        stem.setAttribute('y1', y);
        stem.setAttribute('x2', x + 8);
        stem.setAttribute('y2', y - 30);
        stem.setAttribute('stroke', '#333');
        stem.setAttribute('stroke-width', '2');
        
        // Create note label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y + 35);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-family', 'Arial, sans-serif');
        label.setAttribute('font-size', '12');
        label.setAttribute('font-weight', 'bold');
        label.setAttribute('fill', '#667eea');
        label.textContent = noteName;
        
        noteGroup.appendChild(noteHead);
        noteGroup.appendChild(stem);
        noteGroup.appendChild(label);
        
        // Add click event listener
        noteGroup.addEventListener('click', () => this.selectNote(noteName));
        
        svg.appendChild(noteGroup);
    }
    
    selectNote(noteName) {
        // Clear previous selection
        if (this.selectedNote) {
            const prevNote = this.container.querySelector(`#note-${this.selectedNote}`);
            if (prevNote) {
                prevNote.classList.remove('selected');
            }
        }
        
        // Select new note
        this.selectedNote = noteName;
        const noteElement = this.container.querySelector(`#note-${noteName}`);
        if (noteElement) {
            noteElement.classList.add('selected');
        }
        
        // Update note info display
        const noteDisplay = document.getElementById('current-note-display');
        
        if (noteDisplay) {
            noteDisplay.textContent = `${noteName} - ${this.notePositions[noteName].name}`;
        }
        
        // Call callback function if provided
        if (this.onNoteClick) {
            this.onNoteClick(noteName);
        }
        
        console.log(`Selected note: ${noteName}`);
    }
    
    // Method to set callback for note selection
    setNoteClickCallback(callback) {
        this.onNoteClick = callback;
    }
    
    // Method to get currently selected note
    getSelectedNote() {
        return this.selectedNote;
    }
    
    // Method to clear selection
    clearSelection() {
        if (this.selectedNote) {
            const noteElement = this.container.querySelector(`#note-${this.selectedNote}`);
            if (noteElement) {
                noteElement.classList.remove('selected');
            }
        }
        this.selectedNote = null;
        
        // Clear display
        const noteDisplay = document.getElementById('current-note-display');
        
        if (noteDisplay) {
            noteDisplay.textContent = 'Select a note above';
        }
    }
}

// Initialize the treble staff when the page loads
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('treble-staff')) {
        window.trebleStaff = new TrebleStaff('treble-staff');
    }
});