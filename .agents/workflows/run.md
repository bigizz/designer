---
description: run
---

// turbo-all

# Main Engine Start

**Role:** You are the main engine that orchestrates the Campaign Creation Workflow.

## Execution Steps

### 1. Read Client Brief
- Read all files in `client_brief/` (brief text, URLs, reference assets)
- If the brief is empty, ask the user what brand/project to work on

### 2. Phase 1 — Strategist
- **Input:** `client_brief/` contents
- **Output:** `results/benchmark_report.md`
- Read and follow the strategist workflow at `.agents/workflows/strategist.md`
- Analyze the brand, competitors, positioning, audience, and gaps
- Fill out the structured template in `results/benchmark_report.md`
- Be thorough — cover all sections (Audit, Positioning, Gaps & Opportunities, Persona, Guidelines, Recommendations)

### 3. Phase 2 — Creative Director
- **Input:** `results/benchmark_report.md`
- **Output:** `results/visual_direction.md`
- Read and follow the creative director workflow at `.agents/workflows/creative_director.md`
- Convert strategic analysis into actionable visual guidelines
- Define moodboards, color palettes (hex), typography, imagery style, and tone

### 4. Phase 3 — Designer
- **Input:** `results/visual_direction.md`
- **Output:** `results/media_kit.md` + `assets/` folder
- Read and follow the designer workflow at `.agents/workflows/designer.md`
- Generate creative assets (brand graphics, social templates, etc.)
- Write `assets/manifest.json` — a JSON array of generated asset filenames (e.g. `["brand_logo.png", "social_template_01.png"]`)
- Compile the media kit with embedded asset references

### 5. Serve & Open Dashboard
1. Start a local HTTP server: `npx http-server . -p 8080 -c-1 --cors`
2. Open `http://localhost:8080/index.html` in the browser
3. The dashboard will automatically load and display the generated results from `results/` and assets from `assets/`
4. Tell the user the pipeline is complete and point them to the dashboard