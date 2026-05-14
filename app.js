document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const input = document.getElementById('campaign-input');
  const resultsPanel = document.getElementById('results-panel');

  const delay = ms => new Promise(r => setTimeout(r, ms));

  const setPhase = (id, state, text) => {
    const el = document.getElementById(id);
    if (el) el.className = 'pipeline-phase ' + state;
    const statusEl = document.getElementById('status-' + id.split('-')[1]);
    if (statusEl) statusEl.textContent = text;
  };

  const resetPipeline = () => {
    ['phase-1', 'phase-2', 'phase-3'].forEach(id => setPhase(id, '', 'Pending'));
    ['arrow-1', 'arrow-2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('lit');
    });
    if (resultsPanel) resultsPanel.style.display = 'none';
  };

  const runPipelineAnimation = async () => {
    resetPipeline();
    setPhase('phase-1', 'active', 'Analyzing...');
    await delay(2000);
    setPhase('phase-1', 'completed', 'Done');
    const a1 = document.getElementById('arrow-1');
    if (a1) a1.classList.add('lit');
    await delay(600);

    setPhase('phase-2', 'active', 'Designing...');
    await delay(2000);
    setPhase('phase-2', 'completed', 'Done');
    const a2 = document.getElementById('arrow-2');
    if (a2) a2.classList.add('lit');
    await delay(600);

    setPhase('phase-3', 'active', 'Generating...');
    await delay(2500);
    setPhase('phase-3', 'completed', 'Done');
    await delay(400);

    if (resultsPanel) resultsPanel.style.display = 'block';
  };

  // Show skeletons while loading
  const showSkeletons = () => {
    ['report', 'visuals', 'media'].forEach(id => {
      const content = document.getElementById(id + '-content');
      const skeleton = document.getElementById(id + '-skeleton');
      if (content) content.innerHTML = '';
      if (skeleton) skeleton.style.display = 'block';
    });
  };

  const hideSkeletons = () => {
    ['report', 'visuals', 'media'].forEach(id => {
      const skeleton = document.getElementById(id + '-skeleton');
      if (skeleton) skeleton.style.display = 'none';
    });
  };

  // Fetch and render markdown into a container
  const loadMarkdown = async (url, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Not found');
      const md = await res.text();
      if (typeof marked !== 'undefined') {
        container.innerHTML = marked.parse(md);
      } else {
        container.innerHTML = '<pre>' + md.replace(/</g, '&lt;') + '</pre>';
      }
    } catch {
      container.innerHTML =
        '<div class="xp-infobox">' + url + ' not yet generated. Run the pipeline first.</div>';
    }
  };

  // Load assets from manifest.json
  const loadAssets = async () => {
    const grid = document.getElementById('assets-grid');
    if (!grid) return;
    try {
      const res = await fetch('assets/manifest.json');
      if (!res.ok) throw new Error('No manifest');
      const files = await res.json();
      if (!Array.isArray(files) || files.length === 0) {
        grid.innerHTML = '<div class="no-assets">No assets generated yet.</div>';
        return;
      }
      grid.innerHTML = files.map(f =>
        '<div class="asset-card">' +
          '<img src="assets/' + encodeURIComponent(f) +
            '" alt="' + f + '" loading="lazy" onerror="this.parentElement.innerHTML=\'<div style=aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;background:#0e0e0e;color:#555;font-size:11px>Failed to load</div>\'">' +
          '<div class="asset-name">' + f + '</div>' +
        '</div>'
      ).join('');
    } catch {
      grid.innerHTML = '<div class="no-assets">No manifest found. Run the Designer phase to generate assets.</div>';
    }
  };

  // Load everything after pipeline
  const loadResults = async () => {
    showSkeletons();
    await Promise.all([
      loadMarkdown('results/benchmark_report.md', 'report-content'),
      loadMarkdown('results/visual_direction.md', 'visuals-content'),
      loadMarkdown('results/media_kit.md', 'media-content'),
    ]);
    hideSkeletons();
    loadAssets();
  };

  const refreshResults = async () => {
    const pipeline = document.querySelector('.pipeline-container');
    if (pipeline) pipeline.style.opacity = '0.5';
    await runPipelineAnimation();
    if (pipeline) pipeline.style.opacity = '1';
    await loadResults();
  };

  // --- Event handlers ---

  if (startBtn) {
    startBtn.addEventListener('click', async () => {
      if (!input.value.trim()) {
        return alert('Please enter a brief or URL to start.');
      }
      startBtn.disabled = true;
      startBtn.textContent = 'Running...';
      try {
        await refreshResults();
      } catch (err) {
        console.error(err);
      } finally {
        startBtn.disabled = false;
        startBtn.textContent = 'Run';
      }
    });
  }

  // --- Init: try to load existing results on page load ---
  setTimeout(async () => {
    await loadResults();
  }, 300);
});
