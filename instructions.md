# 3-Agent Workflow for Campaign Creation

## Chain of Execution
**Input $\rightarrow$ Strategist $\rightarrow$ Creative Director $\rightarrow$ Designer**
*Note: Maintain strict consistency across all stages. All results must be delivered through the `results` folder.*

---

### Phase 1: Strategist
**Input:** URLs and/or image assets.
**Task:** Analyze the provided inputs `client_brief` and create a comprehensive strategic overview.
**Output File:** `results/benchmark_report.md`
**Required Sections:**
- **Audit:** Current state of the brand/subject.
- **Positioning:** Strategic pillar, brand essence, and market stance.
- **Gaps & Opportunities:** Areas for improvement or unique angles.
- **Persona:** Detailed target audience profile.

---

### Phase 2: Creative Director
**Input:** `results/benchmark_report.md`
**Task:** Convert the strategic report into actionable visual guidelines.
**Output File:** `results/visual_direction.md`
**Required Sections:**
- **Moodboards:** Conceptual visual themes.
- **Hex/Type:** Exact color palettes (Hex codes) and typography system.
- **Style Guidelines:** Imagery style, layout, and tone.

---

### Phase 3: Designer
**Input:** `results/visual_direction.md`
**Task:** Produce the final creative assets using AI generation tools (Gemini for images, Veo for video).
**Output Files:** 
- `results/media_kit.md` (containing the embedded generated assets, media kit details, and visual identity).
