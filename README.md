# AdaptiFlow

**AdaptiFlow** — Automatic responsive for CSS/SCSS in one second. Press `Ctrl+Shift+A` and your website becomes adaptive to any screen.

## Features

- **Auto-Adapt:** One click — and your CSS becomes fully responsive. Analyzes the entire file and fixes all problems automatically.
- **Clampify:** Converts fixed values to smooth `clamp()` for fluid typography and spacing.
- **Fix Flex/Grid:** Adds `flex-wrap: wrap` to flex containers and converts fixed grid columns to `repeat(auto-fit, minmax(...))`.
- **Generate Media Queries:** Creates media queries for any breakpoints (mobile, tablet, desktop, wide).
- **20+ Fixes:** Images, video, iframes, buttons, forms, tables, cards, sidebars, navigation, and more.
- **Lightning Fast:** All adaptivity takes less than a second.
- **SCSS Support:** Fully works with SCSS syntax.
- **Safe:** Only adds necessary properties, never deletes your original code. `Ctrl+Z` works.

## How It Works

### Installing the application

1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
3. Search for `AdaptiFlow`
4. Click **Install**

### Quick start

1. Go to the .css file with your styles
2. Launch AdaptiFlow: press Ctrl+Shift+A (or Cmd+Shift+A on Mac).
3. You will see the changes in the css file.

## Example: Clampify in action

Before:

```bash
css
.title {
    font-size: 32px;
}
```

After:

```bash
css
.title {
    font-size: clamp(16px, 2.00vw, 32px);
}
```

### CSS Classes Cheat Sheet

AdaptiFlow recognizes and optimizes these class names automatically:

| Class                     | Description           | What AdaptiFlow Does                                   |
| ------------------------- | --------------------- | ------------------------------------------------------ |
| **LAYOUT & CONTAINERS**   |
| `.container`              | Main content wrapper  | Adds `max-width: 1200px; margin: 0 auto`               |
| `.wrapper`                | Alternative container | Adds `max-width: 1200px; margin: 0 auto`               |
| `.main`                   | Primary content area  | Makes width responsive                                 |
| `.content`                | Content section       | Full width on mobile                                   |
| **GRID & CARDS**          |
| `.cards-grid`             | Card grid layout      | Adds `flex-wrap: wrap` or `auto-fit`                   |
| `.grid`                   | Generic grid          | Converts to responsive grid                            |
| `.row`                    | Flexbox row           | Adds `flex-wrap: wrap`                                 |
| `.card`                   | Individual card       | `width: 100%; max-width: original`                     |
| **NAVIGATION**            |
| `.main-nav`               | Primary navigation    | Vertical on mobile (`flex-direction: column`)          |
| `.nav`                    | Navigation container  | Adds `flex-wrap: wrap`                                 |
| `.menu`                   | Menu wrapper          | Responsive navigation                                  |
| **SIDEBARS**              |
| `.sidebar`                | Side panel            | `width: 100%; max-width: 300px` on mobile              |
| `.two-columns`            | Two column layout     | Changes to `flex-direction: column` on mobile          |
| **GALLERY**               |
| `.gallery`                | Image gallery         | `grid-template-columns: repeat(auto-fit, minmax(...))` |
| `.gallery-item`           | Gallery element       | Responsive images inside                               |
| **TABLES**                |
| `.data-table`             | Data table            | Adds horizontal scroll on mobile                       |
| `.table-wrapper`          | Table container       | `overflow-x: auto`                                     |
| **FORMS**                 |
| `.contact-form`           | Contact form          | Full width inputs on mobile                            |
| `input, textarea, select` | Form elements         | `width: 100%; max-width: 100%`                         |
| **BUTTONS**               |
| `.btn`                    | Button                | `width: 100%` on mobile                                |
| **TYPOGRAPHY**            |
| `h1, h2, h3`              | Headings              | `font-size: clamp()`                                   |
| `img, video, iframe`      | Media                 | `max-width: 100%; height: auto`                        |
| **HELPERS**               |
| `.hide-on-mobile`         | Hidden on mobile      | `display: none` on screens < 768px                     |
| `.show-on-mobile`         | Visible on mobile     | `display: block` on screens < 768px                    |

## Settings

Create a .vscode/settings.json file in your project:

```bash
{
    "adaptiflow.mobileBreakpoint": 768,
    "adaptiflow.tabletBreakpoint": 1024,
    "adaptiflow.desktopBreakpoint": 1200,
    "adaptiflow.wideBreakpoint": 1440,
    "adaptiflow.useClamp": true,
    "adaptiflow.autoFixOnSave": false,
    "adaptiflow.clampMinRatio": 0.5,
    "adaptiflow.previewEnabled": true
}
```

## Author

<img src="https://raw.githubusercontent.com/ovcharovcoder/adaptiflow/main/images/avatar.png" alt="Andrii Ovcharov" width="60px">

**Andrii Ovcharov**
📧 ovcharovcoder@gmail.com

---

## Support

If you enjoy Serene Focus, consider buying me a coffee:
[Donate via PayPal](https://www.paypal.com/donate/?business=datoshcode@gmail.com)

---

## License

Released under the [MIT License](https://raw.githubusercontent.com/ovcharovcoder/adaptiflow/main/LICENSE)

Built with calm precision and futuristic soul. ✨

---

# Install dependencies
npm install
# After installation, run compilation
npm run compile
# Then package
npm run package
