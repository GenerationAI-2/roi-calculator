# AI ROI Calculator - GenerationAI

A standalone, embeddable web application for calculating the ROI of AI adoption in document processing.

## Features

- **Simple 5-Question Flow**: Guides users through a clean, progressive disclosure interface
- **Conservative Calculations**: Based on 2025 research from McKinsey, PwC, and NZ AI Forum
- **GenerationAI Branding**: Follows your brand design system with proper colors, spacing, and typography
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Embeddable**: Can be embedded on any website via iframe
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no frameworks required

## Quick Start

### Local Testing

1. Open `index.html` directly in your browser
2. Or use a simple local server:
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Embedding on Your Website

Add this iframe code to any page:

```html
<iframe
  src="https://your-domain.com/roi-calculator/index.html"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>
```

**Responsive Embedding:**

```html
<div style="position: relative; padding-bottom: 100%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe
    src="https://your-domain.com/roi-calculator/index.html"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 12px;"
    allow="fullscreen">
  </iframe>
</div>
```

## Calculation Formulas

The calculator uses these formulas based on your specification:

```
annual_manual_cost = people × (time_percent/100) × salary
annual_savings = annual_manual_cost × (savings_percent/100)
annual_ai_cost = monthly_ai_cost × 12
net_benefit = annual_savings - annual_ai_cost
payback_months = annual_ai_cost / (annual_savings/12)
roi_multiple = net_benefit / annual_ai_cost
```

### Display Rules

**Payback Period:**
- If net_benefit < 0: "No positive ROI with current inputs"
- If payback ≤ 3 months: "X months - Excellent ROI!"
- If payback ≤ 12 months: "X months - Strong ROI"
- If payback ≤ 36 months: "X months"
- If payback > 36 months: "3+ years"

**ROI Multiple:**
- If roi_multiple > 10: "10×+"
- If roi_multiple < 0: "No ROI"
- Otherwise: Display actual multiple (e.g., "2.5×")

## Test Scenarios

### Scenario 1 - Small Business
**Inputs:**
- 2 people
- 50% time allocation
- $60,000 salary
- 20% efficiency gain
- $500/month AI cost

**Expected Results:**
- Current Annual Cost: $60,000
- Annual Savings: $12,000
- Net Benefit Year 1: $6,000
- Payback Period: 6 months
- ROI Multiple: 1×

### Scenario 2 - Mid-Market
**Inputs:**
- 10 people
- 30% time allocation
- $80,000 salary
- 25% efficiency gain
- $2,000/month AI cost

**Expected Results:**
- Current Annual Cost: $240,000
- Annual Savings: $60,000
- Net Benefit Year 1: $36,000
- Payback Period: 5 months
- ROI Multiple: 1.5×

### Scenario 3 - No ROI Case
**Inputs:**
- 1 person
- 10% time allocation
- $50,000 salary
- 10% efficiency gain
- $2,000/month AI cost

**Expected Results:**
- Current Annual Cost: $5,000
- Annual Savings: $500
- Net Benefit Year 1: -$23,500
- Payback Period: "No positive ROI with current inputs"
- ROI Multiple: "No ROI"

## File Structure

```
roi-calculator/
├── index.html          # Main HTML structure
├── styles.css          # GenerationAI branded styles
├── script.js           # Calculator logic
└── README.md           # This file
```

## Customization

### Update the "Check Your Readiness" Link

In `index.html`, find this line (around line 129):

```html
<button class="btn-primary" onclick="window.location.href='#readiness-diagnostic'">
```

Replace `#readiness-diagnostic` with your actual diagnostic URL:

```html
<button class="btn-primary" onclick="window.location.href='https://your-domain.com/readiness-diagnostic'">
```

### Modify Brand Colors

In `styles.css`, update the CSS variables in the `:root` section:

```css
:root {
    --primary-blue: #2563EB;
    --dark-navy: #0F172A;
    --lime-accent: #D4FF00;
    /* ... other variables */
}
```

### Add Logo

Add your logo image to the welcome screen in `index.html`:

```html
<div class="welcome-content">
    <img src="your-logo.png" alt="GenerationAI" style="height: 60px; margin-bottom: 24px;">
    <h1>Calculate Your AI ROI in 2 Minutes</h1>
    <!-- ... -->
</div>
```

## Analytics & Tracking

To track calculator usage, add Google Analytics or similar tracking code to `index.html`:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

Track specific events by adding to `script.js`:

```javascript
// Track calculator start
function startCalculator() {
    gtag('event', 'calculator_started');
    // ... existing code
}

// Track results view
function calculateResults() {
    // ... existing calculation code
    gtag('event', 'calculator_completed', {
        'net_benefit': netBenefit,
        'roi_multiple': roiMultiple
    });
}
```

## Hosting Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Your calculator will be at: `https://username.github.io/repo-name/`

### Option 2: Netlify (Free)
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get instant hosting with HTTPS
3. Optional: Connect custom domain

### Option 3: Your Existing Website
1. Upload files to your web server
2. Place in a subdirectory (e.g., `/roi-calculator/`)
3. Link from your main site

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## Future Enhancements (Phase 2)

As per your development plan:

- [ ] Add email gating for detailed PDF reports
- [ ] Create conservative/moderate/optimistic toggle
- [ ] Clone for additional use cases (customer service, data entry, meetings)
- [ ] Multi-selection ROI Suite
- [ ] Integration with readiness diagnostics

## Support

For questions or issues, contact Generation AI or refer to the original specification document.

## License

© 2025 Generation AI Ltd. All rights reserved.