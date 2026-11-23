# Kinetic Stippled Particle Grid & Scatter Scrollytelling: Master Guide

This guide documents the exact design requirements, mathematical models, and implementation techniques for the award-winning **Kinetic Stippled Grid with Gravitational Lens & Particle Scatter-Morph** design pattern (referenced from Awwwards Site of the Year / Nominee portfolios such as Pedro Duarte).

---

## 🎯 1. Architectural Philosophy & The Core Problem It Solves

### The Spatial Trap:
On wide screens (1440px–1920px+), traditional editorial content (headlines + 2-line descriptions) requires narrow column widths (~500px–600px) for optimal readability. 
- Centering a narrow card leaves awkward empty flanking gutters.
- Widening the card creates an empty, unreadable billboard.
- Adding arbitrary widgets or explanatory cards to "fill the gap" commits the rookie anti-pattern (**horror vacui**), producing visual clutter.

### The Kinetic Solution:
This pattern solves spatial balance through **visual duality**:
1. **Left Column (40–45% width)**: Pure, disciplined typography (Oversized title, 2-line thesis, zero clutter).
2. **Right Column (55–60% width)**: A living, tactile, interactive canvas. It acts as an artistic, interactive representation of the craft.
3. **Bottom Rail**: An integrated horizontal progress/timeline rail that connects all steps across the full viewport width.

```
+--------------------------------------------------------------------------------------------------+
| (02) WHAT I DO                                                            Usually on the same... |
+--------------------------------------------------------------------------------------------------+
|                                              |                                                   |
| From the first mock-up to the last API call. |   . . . + - - - - - - - - - - - - - - - - - + .   |
|                                              |   .     |       .       .       .       .   |     |
| # Design                                     |   . - - + - - - - - - - - - - - - - - - - - + - . |
|                                              |   .     |       (Gravitational Lens)        |     |
| Figma layouts and design systems that        |   . - - + - - - - - (●) - - - - - - - - - - + - . |
| already know how they'll be built.           |   .     |        /     \        .       .   |     |
|                                              |   . - - + - - - / - - - \ - - - - - - - - - + - . |
|                                              |   .     + - - - - - - - - - - - - - - - - - +     |
|                                              |                                                   |
+--------------------------------------------------------------------------------------------------+
| [01 Shopify Plus]  [02 Frontend]  [03 Integrations]  [04 Architecture]  [05 Performance]  [06 Design] |
+--------------------------------------------------------------------------------------------------+
```

---

## 🔬 2. Visual & Kinetic States

The right-hand canvas exhibits **three distinct physical states**:

### State 1: The Formed / Solid State (Resting)
- **Visual Texture**: An architectural grid coordinate plane overlaid with a technical Bezier curve and control handles.
- **Rendering Style**: **Stippled / Charcoal Texture**. The lines are NOT smooth vector SVG strokes; they are procedurally composed of micro-particles and jittered stipples, evoking physical drafting paper, lithography, or mechanical plotter art.
- **Palette**: Warm sand/paper canvas (`#eeece8` or `#f7f5f0`), dark graphite lines (`rgba(10,18,42,0.7)`), and a signature royal/cobalt blue curve (`#5b5fe0` or `#2e4fc7`).

### State 2: Interactive Gravitational Warp (Physics Interaction)
- **Trigger**: Mouse hover, pointer move, or touch drag over the canvas.
- **Behavior**: The pointer creates a **gravitational singularity (black dot)** with a radial distortion field:
  - Grid lines warp tangentially around the cursor (spacetime curvature).
  - The Bezier curve bends elastically toward/around the center.
  - A subtle repulsion clearing (event horizon) pushes nearby particles outward, creating concentric rings of tension.
  - Spring physics ensure the distortion smoothly glides to the cursor and snaps back to rest with organic damping when the pointer leaves.

### State 3: Scatter-Morph Disintegration (Scroll / Step Transition)
- **Trigger**: User scrolls between steps (or clicks a tab).
- **Behavior**:
  - The solid grid and Bezier curve **dissolve into thousands of fine stippled dust particles**.
  - At mid-transition ($t = 0.5$), the particles explode outward in an organic Brownian dispersion cloud.
  - As the transition completes ($t \to 1.0$), the scattered particles re-coalesce and magnetically snap into the geometry of the next discipline.

---

## 📐 3. Mathematical & Algorithmic Formulation

### A. Procedural Stippled Line Rendering
To achieve the textured charcoal/pencil feel rather than flat vector strokes:
For any line segment from $\mathbf{A} = (x_1, y_1)$ to $\mathbf{B} = (x_2, y_2)$ with length $L$:
1. Sample $N = \lfloor L / \Delta s \rfloor$ points along the line, where step size $\Delta s \approx 1.5\text{px}$.
2. At each sample point $s \in [0, L]$, compute base coordinate $\mathbf{P}(s) = \mathbf{A} + s \cdot \frac{\mathbf{B}-\mathbf{A}}{L}$.
3. Calculate normal vector $\mathbf{n} = \left(-\frac{y_2-y_1}{L}, \frac{x_2-x_1}{L}\right)$.
4. Apply orthogonal Gaussian jitter:
   $$\mathbf{P}_{\text{stipple}} = \mathbf{P}(s) + \mathbf{n} \cdot \delta, \quad \delta \sim \mathcal{N}(0, \sigma^2) \quad (\sigma \approx 0.5 - 0.8\text{px})$$
5. Render a micro-circle of radius $r \in [0.4, 0.9]\text{px}$ with varying opacity $\alpha \in [0.35, 0.85]$.

---

### B. Gravitational Lens & Spacetime Curvature
Let the cursor position be $\mathbf{M} = (m_x, m_y)$ with influence radius $R_{\text{field}} \approx 140\text{px}$ and core clearing radius $r_{\text{core}} \approx 28\text{px}$.

For any sample point $\mathbf{P} = (x, y)$:
1. Vector from singularity to point: $\mathbf{v} = \mathbf{P} - \mathbf{M}$, distance $d = \|\mathbf{v}\|$.
2. If $d \ge R_{\text{field}}$, displacement $\Delta \mathbf{P} = \mathbf{0}$.
3. If $d < R_{\text{field}}$:
   - Normalized distance ratio: $u = d / R_{\text{field}} \in [0, 1]$.
   - Clearing repulsion: If $d < r_{\text{core}}$, push point outward toward boundary:
     $$d_{\text{effective}} = r_{\text{core}} + (d / r_{\text{core}})^2 \cdot (R_{\text{field}} - r_{\text{core}}) \cdot 0.1$$
   - Tangential curvature & lensing displacement:
     $$\mathbf{P}_{\text{warped}} = \mathbf{M} + \frac{\mathbf{v}}{d} \cdot \left[ d + (1 - u)^2 \cdot \kappa \right]$$
     where $\kappa \approx 35 - 50\text{px}$ is the lensing coefficient.

---

### C. Scatter-Morph Particle State Machine
Each particle $i \in \{0, \dots, N-1\}$ (with $N \approx 3,000 - 4,500$) is parameterized with:
- Position on Shape $A$: $\mathbf{P}_A(i)$
- Position on Shape $B$: $\mathbf{P}_B(i)$
- Unique radial scatter vector: $\mathbf{S}_i = (r_i \cos \theta_i, r_i \sin \theta_i)$ with $r_i \sim \mathcal{U}(80, 220)\text{px}$
- Scatter phase offset: $\phi_i \in [-0.15, 0.15]$

Given transition progress $t \in [0, 1]$:
1. Local particle progress: $t_i = \text{clamp}\left(\frac{t - \phi_i}{1 - 2|\phi_i|}, 0, 1\right)$.
2. Smooth easing: $e_i = t_i^2 (3 - 2t_i)$ (smoothstep).
3. Dispersion bell curve:
   $$D(t_i) = \sin(\pi \cdot t_i)^{1.6}$$
4. Instantaneous particle position:
   $$\mathbf{P}_i(t) = (1 - e_i)\mathbf{P}_A(i) + e_i \mathbf{P}_B(i) + \mathbf{S}_i \cdot D(t_i)$$
