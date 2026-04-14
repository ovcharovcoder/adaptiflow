# Changelog

All notable changes to the AdaptiFlow VS Code extension will be documented in this file.  

---

## [1.0.1] - 2026-04-14

### Added
- **Responsive `gap` support** — automatically converts fixed `gap` values to `clamp()` with `calc()` for adaptive spacing between elements
- **`calc()` + `clamp()` integration** — more precise fluid values using `calc()` inside `clamp()` for better responsiveness
- **Navigation responsiveness** — `.main-nav`, `.nav`, `.navbar`, `.menu` now become vertical on mobile devices
- **Cards grid responsiveness** — `.cards-grid` and `.card` now stretch to full width on mobile screens
- **Two columns layout responsiveness** — `.two-columns` automatically switches to column layout on mobile
- **Sidebar responsiveness** — `.sidebar` becomes full width with `max-width` limit on mobile
- **Table responsiveness** — horizontal scroll with `overflow-x: auto` for `.data-table` on mobile
- **Button responsiveness** — `.btn` becomes full width on screens smaller than 640px
- **Form responsiveness** — `input`, `select`, `textarea` become full width on mobile
- **Base media queries** — automatic addition of responsive styles if none exist

### Changed
- **Improved font scaling** — headings (`h1`, `h2`, `h3`) now use `clamp()` with `calc()` for smoother typography
- **Improved width handling** — fixed widths larger than 300px are converted to `width: 100%; max-width: original`
- **Better grid support** — fixed grid columns now convert to `repeat(auto-fit, minmax(...))` for responsive layouts
- **Enhanced image handling** — all images now get `max-width: 100%; height: auto`
- **Flex containers** — automatically receive `flex-wrap: wrap` where missing

### Fixed
- Navigation menu not wrapping on mobile devices
- Cards not stretching to full width on small screens
- Large gaps between elements causing layout issues on mobile
- Tables overflowing on mobile screens
- Sidebar not adapting to mobile viewport

---

## [1.0.0] - 2026-04-13

### Added
- Initial release of AdaptiFlow — a VS Code extension that makes CSS/SCSS responsive in one second
- **Auto-Adapt command** (`Ctrl+Shift+A`) — analyzes entire CSS/SCSS file and automatically fixes all responsiveness issues
- **Clampify command** (`Ctrl+Shift+C`) — converts fixed values to smooth `clamp()` for fluid typography and spacing
- **Fix Flex/Grid command** (`Ctrl+Shift+F`) — adds `flex-wrap: wrap` to flex containers and converts fixed grid columns
- **Generate Media Query command** (`Ctrl+Shift+M`) — creates media queries for any breakpoint
- Support for CSS and SCSS file formats
- Automatic detection of common responsiveness issues:
  - Fixed widths (>300px)
  - Flex containers without `flex-wrap`
  - Images without `max-width: 100%`
  - Fixed font sizes (>20px)
- Built-in keyboard shortcuts for all commands
- Configuration options via VS Code settings:
  - `mobileBreakpoint` (default: 768px)
  - `tabletBreakpoint` (default: 1024px)
  - `desktopBreakpoint` (default: 1200px)
  - `useClamp` (default: true)
  - `autoFixOnSave` (default: false)
  - `clampMinRatio` (default: 0.5)

### Supported CSS Classes (Auto-detected)
- Layout: `.container`, `.wrapper`, `.main`, `.content`
- Grid & Cards: `.cards-grid`, `.grid`, `.row`, `.card`
- Navigation: `.main-nav`, `.nav`, `.menu`, `.navbar`
- Sidebars: `.sidebar`, `.two-columns`
- Gallery: `.gallery`, `.gallery-item`
- Tables: `.data-table`, `.table-wrapper`
- Forms: `.contact-form`, `.form`, `input`, `textarea`, `select`
- Buttons: `.btn`, `.button`, `.cta-button`
- Helpers: `.hide-on-mobile`, `.show-on-mobile`

---

## [Unreleased]

### Planned
- Support for `container queries`
- Responsive `border-radius` adaptation
- `aspect-ratio` support for images
- Hamburger menu generation for mobile navigation
- Custom breakpoints per project
- Live preview panel with device emulation

---

**Built with calm precision and futuristic soul. Press `Ctrl+Shift+A` and watch the magic happen! ✨**
