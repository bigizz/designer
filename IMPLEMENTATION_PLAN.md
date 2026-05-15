# Implementation Plan: Campaign Engine

## Objective
Build a CLI-driven Campaign Engine that orchestrates a multi-agent workflow (Strategist, Creative Director, Designer) to generate a unified campaign strategy, complete with visual assets and a final, beautifully formatted PDF report.

## Key Files & Context
- `GEMINI.md`: Core project instructions and data flow architecture.
- `.agents/.strategy.md`: Detailed agent execution workflow and formatting rules.
- `client_brief/`: Input directory for project descriptions and assets.
- `results/`: Output directory for intermediate markdown files and final deliverables.
- `package.json`: Project manifest for managing dependencies.

## Implementation Steps

### 1. Setup & Dependency Management
- Initialize the Node.js project environment.
- Install necessary dependencies in `package.json`:
  - `md-to-pdf`: For generating the final PDF report cleanly.
  - `remotion`: For programmatic video generation in Phase 3.
  - Any required utilities for file system operations (e.g., `fs-extra`) or markdown parsing (e.g., `marked`, if needed for advanced manipulation).

### 2. Core Orchestration Logic
- Create a main entry point script (e.g., `cli.js` or `index.js`) that handles the `/strategy` command.
- Implement a sequential execution pipeline that ensures state continuity:
  - Phase 1 must complete before Phase 2, etc.
  - Read intermediate outputs from `results/` to pass context to the next agent.
- Add error handling and validation logic: After each phase, verify that the expected output file exists and is not empty before proceeding.

### 3. Agent Phases Execution
- **Phase 1: Ingestion & Strategy (Strategist)**
  - Logic: Scan `client_brief/`. If empty, prompt user. Generate `results/benchmark_report.md` with required sections (Audit, Positioning, Gaps, Persona).
- **Phase 2: Creative Direction (Creative Director)**
  - Logic: Read `results/benchmark_report.md` + `client_brief/`. Generate `results/visual_direction.md` with Moodboards, Hex/Type, and Style Guidelines.
- **Phase 3: Asset Production (Designer)**
  - Logic: Read `results/visual_direction.md`. Generate static/motion assets in `results/assets/` using image generation tools and Remotion.
  - Implement Remotion scaffolding (`npx create-video...`) and enforce vanilla CSS/Remotion APIs (no Tailwind animations).
  - Generate `results/assets/manifest.json` cataloging all assets.
  - Generate `results/media_kit.md` detailing the visual execution.

### 4. Final Consolidation & Export
- Implement a script to merge the markdown reports (`benchmark_report.md`, `visual_direction.md`, `media_kit.md`) into `results/final_strategy.md`.
- **Path Correction:** Ensure all image references (e.g., `![Logo](./assets/logo.png)`) resolve correctly relative to `final_strategy.md`.
- **Header Injection:** Prefix each section with `# Section Name`.
- **Metadata:** Prepend a cover page section with Brand Name, Date, and Campaign Version.
- **PDF Generation:** Execute `npx --yes md-to-pdf results/final_strategy.md` to produce `results/final_strategy.pdf`. Ensure standard markdown formatting is used to guarantee a clean PDF render without raw HTML leakage.

## Verification & Testing
- Use the `results/` directory for dry runs to verify intermediate outputs.
- Test the error recovery: Force a failure in Phase 2 and ensure the engine halts or attempts a recovery.
- Validate the generated `manifest.json` against the actual files in `results/assets/`.
- Inspect the final `final_strategy.pdf` to ensure formatting, images, and fonts render correctly according to standard Markdown.
