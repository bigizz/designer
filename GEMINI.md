# Project Instructions: Campaign Engine

This project is a CLI-driven campaign creation engine that uses a unified strategy workflow.

## /strategy Agent

When the user invokes the `/strategy` command or asks to run the strategy/campaign workflow:

1.  **Ingestion:** Scan the root directory and `client_brief/` for inputs (text, URLs, images). If none are found, prompt the user for a brand or project description.
2.  **Execution Phase:** Follow the orchestration logic defined in `.agents/.strategy.md`.
    -   **Phase 1 (Strategist):** Generate `results/benchmark_report.md`.
    -   **Phase 2 (Creative Director):** Generate `results/visual_direction.md`.
    -   **Phase 3 (Designer):** Generate `results/media_kit.md` and any requested visual assets (images/Remotion videos) in `results/assets/`.
3.  **Consolidation:** 
    -   Merge the three markdown reports into `results/final_strategy.md`.
    -   Ensure all relative image paths and asset links are correct.
    -   Add a clear header and table of contents to the final document.
4.  **Completion:** Tell the user the process is finished and point them to `results/final_strategy.md`. Remind them they can use their `vscode-pdf` extension to export it to a final PDF.

## Detailed Implementation Plan

### 1. Data Flow Architecture
- **State Management:** Each phase MUST read the output of the previous phase(s) to maintain context.
  - `Strategist` reads `client_brief/`.
  - `Creative Director` reads `results/benchmark_report.md` + `client_brief/`.
  - `Designer` reads `results/visual_direction.md` + `results/benchmark_report.md`.
- **Persistence:** All intermediate files are saved in `results/` to allow for manual inspection and debugging between phases.

### 2. Asset Management Strategy
- **Image Generation:** The `Designer` agent uses tools to generate or source images based on the `Visual Direction`.
- **Storage:** All generated assets MUST be stored in `results/assets/`.
- **Manifest:** The `Designer` creates `results/assets/manifest.json` containing metadata for all generated files (filename, alt text, purpose).
- **Referencing:** All markdown reports MUST use relative paths to reference assets (e.g., `![Logo](./assets/logo.png)`).

### 3. Workflow Orchestration (`.agents/.strategy.md`)
- The main engine uses a sequential chain. If a phase fails, the engine should attempt to fix the error based on tool output before proceeding.
- **Validation Step:** After each phase, the engine should verify that the expected output file exists and is not empty.

### 4. Consolidation Logic
- **Header Injection:** Each section in `final_strategy.md` should be prefixed with a `# Section Name` header.
- **Path Correction:** During consolidation, the script must ensure that asset paths remain valid relative to the location of `final_strategy.md`.
- **Metadata:** Add a cover page section to `final_strategy.md` with the Brand Name, Date, and Campaign Version.

## Standards
- All outputs MUST be placed in the `results/` folder.
- Maintain consistency in brand identity (colors, fonts, tone) across all phases.
- Use explicit composition and delegation for complex tasks.
- **Dry Runs:** When testing, use the `results/` folder to verify outputs without overwriting previous successful runs unless intended.
