# Rule: Portfolio Storytelling & Visual Clarity Over High-Tech Overcomplication

When designing, refactoring, or recommending layouts, typography, and visual concepts for the portfolio:

## 1. The Core Law: The 60-to-120 Second Story
- Portfolio visitors (recruiters, engineering leaders, founders, clients) spend **1 to 2 minutes** viewing a portfolio, not hours reading manuals.
- Every section must tell a clear, human story at a glance.
- If a section requires the user to study complex UI controls, decipher dense metadata, or read multiple redundant panels just to understand what was accomplished, **the design has failed**.

## 2. Anti-Patterns: Never Default to Cockpit / Telemetry Clutter
- **NO Fake Document / Telemetry Metadata**: Do NOT invent fake document IDs (`Doc: REF-2025-01`), status codes, or synthetic database hashes. They add cognitive clutter and look contrived.
- **NO Over-Complicated Split Ledgers**: Avoid multi-pane master-detail setups that repeat titles and split user attention across redundant panels.
- **NO Dense Data Matrices for Personal Stories**: Do not turn hackathons, championships, or milestones into multi-cell diagnostic dashboards (*"DEMONSTRATED LIVE" / "PANEL & JURY" / "VERIFIED OUTCOME"*).
- **NO Dark Enterprise Console Aesthetic**: Avoid turning portfolio sections into dark, uninviting CloudWatch/Jira-style consoles with walls of tiny monospace labels.

## 3. Principles of Great Portfolio Storytelling
- **Glanceable Hierarchy**: One dominant visual focal point (a genuine photograph, clean badge, or hero metric) + one strong headline + one crisp sentence explaining the human/technical impact.
- **Editorial Cleanliness & Breathing Room**: Prioritize generous whitespace, legible typography, and calm visual pacing over cramming every conceivable data point into the screen.
- **Story Over Spec**: Celebrate the accomplishment as a real human milestone (e.g. *1st Place Champion at SparkLAB Hackathon for UNITE*) rather than a dry system audit.

## 4. Case Study & Deep Dive Architecture (The Bento Canvas Law — Inspired by AW Media)
When designing case study pages (`/detail/*`, `/case-study/*`, project deep dives):

1. **Brand & Topbar Continuity is Mandatory:**
   - Case studies must NEVER feel like a disconnected sub-template.
   - Always mount or match the site's signature `.topbar` with the primary brand mark (`PATRICK`), section context, and a prominent, tactile back button (`btn` with animated arrow).
   - Retain the atmospheric ambient background aura and interactive `CursorGridCanvas` for immediate tactile immersion.

2. **Ban Sterile Single-Column Centered Text (The 40% Waste Anti-Pattern):**
   - Do NOT center all content in a narrow 65ch reading column that leaves 40%+ of desktop viewports as empty white deserts.
   - Use **Asymmetric Bento Grids** across the 1320px `.wrap`:
     - **Hero Bento:** Colossal display typography on the left; interactive architecture snapshot and live status pill on the right.
     - **Telemetry Metric Bento:** Interconnected 4-column cards with large numeric values, hover micro-elevation, and active status indicators.
     - **Narrative Bento Units:** Split layout pairing story text (60%) with interactive code snippets, component diagrams, or context cards (40%).

3. **Sticky Scrollytelling Pacing:**
   - Split complex engineering processes into two columns: a sticky left header ("Our approach.", live rolling step reel `01`–`06`, and synced progress bar) and a scrolling right feed of narrative problem-solving steps.
   - This provides spatial grounding so the reader never gets lost in long text.

4. **Natural Aspect Ratio & Device Switchers:**
   - Never crop ultra-wide web application screenshots with arbitrary fixed heights (e.g. `h-[450px] object-cover`).
   - Frame visual evidence in natural aspect ratio containers (`aspect-[21/10]`, `h-auto object-contain`) with dark borders, subtle elevation, and annotated caption bars.
   - Provide interactive `[Desktop] [Mobile]` view switchers with authentic macOS/iOS frames so recruiters can inspect multi-platform engineering versatility.
