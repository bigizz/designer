document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const urlInput = document.getElementById('campaign-input');
    const pipeline = document.querySelector('.pipeline');
    const resultsPanel = document.getElementById('results-panel');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // UI State
    let isRunning = false;

    // Tabs logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Workflow logic
    startBtn.addEventListener('click', async () => {
        if (isRunning) return;
        
        const inputValue = urlInput.value.trim();
        if (!inputValue) {
            alert('Please provide a URL or brief input to start.');
            return;
        }

        isRunning = true;
        startBtn.classList.add('loading');
        resultsPanel.classList.add('hidden');
        
        // Reset phases
        document.querySelectorAll('.phase-card').forEach(card => {
            card.classList.remove('active', 'completed');
            card.querySelector('.status-text').textContent = 'Pending';
        });
        pipeline.className = 'pipeline';

        try {
            await runEngineWorkflow();
        } catch (error) {
            console.error(error);
            alert('An error occurred during workflow execution.');
        } finally {
            isRunning = false;
            startBtn.classList.remove('loading');
            startBtn.querySelector('.btn-text').textContent = 'Run Engine Again';
        }
    });

    async function runEngineWorkflow() {
        // --- PHASE 1: Strategist ---
        await updatePhaseState('phase-1', 'active', 'Analyzing Brief...');
        await delay(2500);
        await updatePhaseState('phase-1', 'completed', 'Completed');
        
        pipeline.classList.add('active-1-to-2');
        await delay(1000);

        // --- PHASE 2: Creative Director ---
        await updatePhaseState('phase-2', 'active', 'Developing Visuals...');
        await delay(3000);
        await updatePhaseState('phase-2', 'completed', 'Completed');

        pipeline.classList.add('active-2-to-3');
        await delay(1000);

        // --- PHASE 3: Designer ---
        await updatePhaseState('phase-3', 'active', 'Generating Assets...');
        await delay(3500);
        await updatePhaseState('phase-3', 'completed', 'Completed');

        await delay(500);
        showResults();
    }

    async function updatePhaseState(phaseId, state, text) {
        const card = document.getElementById(phaseId);
        if (state === 'active') {
            card.classList.add('active');
            card.classList.remove('completed');
        } else if (state === 'completed') {
            card.classList.remove('active');
            card.classList.add('completed');
        }
        card.querySelector('.status-text').textContent = text;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function showResults() {
        resultsPanel.classList.remove('hidden');
        
        // Populate actual content
        populateReport();
        populateVisuals();
        populateMedia();

        // Simulate fetching/rendering delay
        setTimeout(() => {
            // Hide skeletons, show actual
            ['report', 'visuals', 'media'].forEach(id => {
                document.getElementById(`${id}-skeleton`).classList.add('hidden');
                document.getElementById(`${id}-actual`).classList.remove('hidden');
            });
        }, 1000);
    }

    function populateReport() {
        const reportActual = document.getElementById('report-actual');
        reportActual.innerHTML = `
            <h2>Benchmark Report: "Grow with Joy"</h2>
            <h3>Audit</h3>
            <p>Current positioning focuses heavily on functional benefits. However, benchmark analysis reveals an industry shift towards emotional connection and modern parenthood.</p>
            <h3>Positioning</h3>
            <p><strong>Strategic Pillar:</strong> Empowering Joyful Growth.</p>
            <p><strong>Brand Essence:</strong> Nurturing, vibrant, and deeply connected to modern family moments.</p>
            <h3>Persona</h3>
            <p><strong>The Millennial Parent:</strong> Values aesthetics, authenticity, and emotional well-being over purely functional utility. Seeks products that integrate seamlessly into a dynamic, modern lifestyle.</p>
        `;
    }

    function populateVisuals() {
        const visualsActual = document.getElementById('visuals-actual');
        visualsActual.innerHTML = `
            <h2>Visual Direction Guidelines</h2>
            <h3>Color Palette</h3>
            <p>
                <span class="color-swatch" style="background-color: #FFB020"></span> #FFB020 (Joyful Yellow) - Primary<br>
                <span class="color-swatch" style="background-color: #00A651"></span> #00A651 (Nurture Green) - Secondary<br>
                <span class="color-swatch" style="background-color: #E3000F"></span> #E3000F (Energetic Red) - Accent<br>
                <span class="color-swatch" style="background-color: #F8F9FA"></span> #F8F9FA (Clean White) - Background
            </p>
            <h3>Typography System</h3>
            <ul>
                <li><strong>Headings:</strong> 'Outfit' - Bold, modern, welcoming.</li>
                <li><strong>Body text:</strong> 'Inter' - Highly legible, clean, minimal.</li>
            </ul>
            <h3>Imagery Style</h3>
            <p>Bright, candid photography capturing authentic interactions. Soft natural lighting. High contrast but warm tones to emphasize 'joy'.</p>
        `;
    }

    function populateMedia() {
        const mediaActual = document.getElementById('media-actual');
        mediaActual.innerHTML = `
            <h2>Generated Media Kit</h2>
            <p>Assets synthesized based on the "Grow with Joy" visual direction.</p>
            <div class="media-grid">
                <div class="media-item" style="background: linear-gradient(135deg, #FFB020 0%, rgba(255,176,32,0) 100%), url('assets/joyful_family.png') center/cover;"></div>
                <div class="media-item" style="background: linear-gradient(135deg, #00A651 0%, rgba(0,166,81,0) 100%), url('assets/child_laughing.png') center/cover;"></div>
                <div class="media-item" style="background: linear-gradient(135deg, #E3000F 0%, rgba(227,0,15,0) 100%), url('assets/modern_parent.png') center/cover;"></div>
                <div class="media-item">Video Asset (Placeholder)</div>
            </div>
            <p style="margin-top: 1rem;"><a href="#" style="color: var(--primary);">Download Full Kit (ZIP)</a></p>
        `;
    }
});
