import * as vscode from 'vscode';
import {
  generateFontClamp,
  generateSpacingClamp,
  generateContainerClamp,
} from '../utils/clampGenerator';

export async function autoAdaptCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  const document = editor.document;
  const text = document.getText();

  if (document.languageId !== 'css' && document.languageId !== 'scss') {
    vscode.window.showWarningMessage(
      'AdaptiFlow: Works only with CSS/SCSS files',
    );
    return;
  }

  let newText = text;
  let fixes = 0;

  // ========== 1. ALL IMAGES (img) ==========
  if (text.match(/img\s*\{/) && !text.includes('max-width: 100%')) {
    newText = newText.replace(
      /(img\s*\{[^}]*)(\})/gi,
      (match, content, closing) => {
        fixes++;
        return `${content}\n  max-width: 100%;\n  height: auto;${closing}`;
      },
    );
  }

  // ========== 2. ALL FLEX - add wrap ==========
  if (text.match(/display\s*:\s*flex/) && !text.includes('flex-wrap: wrap')) {
    newText = newText.replace(
      /(display\s*:\s*flex\s*;)([^}]*)(\})/gi,
      (match, display, content, closing) => {
        if (!content.includes('flex-wrap')) {
          fixes++;
          return `${display}\n  flex-wrap: wrap;${content}${closing}`;
        }
        return match;
      },
    );
  }

  // ========== 3. GAP - make responsive ==========
  const gapMatches = text.match(/gap\s*:\s*(\d+)px\s*;/gi);
  if (gapMatches) {
    gapMatches.forEach(match => {
      const pxMatch = match.match(/(\d+)/);
      if (pxMatch) {
        const px = parseInt(pxMatch[0]);
        if (px > 20 && !text.includes('clamp') && !text.includes('gap-clamp')) {
          const minGap = Math.max(Math.floor(px * 0.5), 8);
          const clampValue = `gap: clamp(${minGap}px, 3vw, ${px}px);`;
          newText = newText.replace(match, clampValue);
          fixes++;
        }
      }
    });
  }

  // ========== 4. WIDTHS larger than 300px ==========
  const widthMatches = text.match(/width\s*:\s*(\d+)px\s*;/g);
  if (widthMatches) {
    widthMatches.forEach(match => {
      const pxMatch = match.match(/(\d+)/);
      if (pxMatch) {
        const px = parseInt(pxMatch[0]);
        if (
          px > 300 &&
          !text.includes('max-width') &&
          !text.includes('clamp')
        ) {
          const clampValue = generateContainerClamp(px);
          newText = newText.replace(match, `width: ${clampValue};`);
          fixes++;
        } else if (px > 300 && !text.includes('max-width')) {
          newText = newText.replace(match, `width: 100%; max-width: ${px}px;`);
          fixes++;
        }
      }
    });
  }

  // ========== 5. GRID - make responsive ==========
  const gridMatch = text.match(/grid-template-columns\s*:\s*([^;]+);/);
  if (gridMatch && gridMatch[1].match(/\d+px/g)) {
    const pxValues = gridMatch[1].match(/(\d+)px/g);
    if (pxValues && pxValues.length >= 2) {
      const minWidths = pxValues.map((v: string) => parseInt(v));
      const minWidth = Math.min(...minWidths);
      if (!text.includes('auto-fit')) {
        newText = newText.replace(
          gridMatch[0],
          `grid-template-columns: repeat(auto-fit, minmax(${minWidth}px, 1fr));`,
        );
        fixes++;
      }
    }
  }

  // ========== 6. FONTS (h1, h2, h3) ==========
  const headings = ['h1', 'h2', 'h3'];
  headings.forEach(heading => {
    const headingRegex = new RegExp(
      `(${heading}\\s*\\{[^}]*)font-size\\s*:\\s*(\\d+)px\\s*;`,
      'gi',
    );
    newText = newText.replace(headingRegex, (match, before, px) => {
      const numPx = parseInt(px);
      if (numPx > 32 && !match.includes('clamp')) {
        fixes++;
        const clampValue = generateFontClamp(numPx);
        return `${before}font-size: ${clampValue};`;
      }
      return match;
    });
  });

  // ========== 7. TABLES ==========
  if (text.match(/table/) || text.match(/\.data-table/)) {
    if (text.match(/\.table-wrapper/) && !text.includes('overflow-x: auto')) {
      newText = newText.replace(
        /(\.table-wrapper\s*\{[^}]*)(\})/gi,
        (match, content, closing) => {
          if (!content.includes('overflow-x')) {
            fixes++;
            return `${content}\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;${closing}`;
          }
          return match;
        },
      );
    }

    if (!text.includes('table-responsive')) {
      newText += `

/* Table responsiveness */
@media (max-width: 768px) {
  .data-table th,
  .data-table td {
    padding: 8px;
    font-size: 12px;
  }
}`;
      fixes++;
    }
  }

  // ========== 8. SIDEBAR ==========
  if (text.match(/\.sidebar/) && text.match(/width\s*:\s*\d+px/)) {
    newText = newText.replace(
      /(\.sidebar\s*\{[^}]*width\s*:\s*)(\d+)px\s*;/i,
      (match, before, px) => {
        fixes++;
        return `${before}100%; max-width: ${px}px;`;
      },
    );
  }

  // ========== 9. TWO COLUMN LAYOUTS ==========
  if (text.match(/\.two-columns/) && !text.includes('two-columns-responsive')) {
    newText += `

/* Two column layout responsiveness */
@media (max-width: 768px) {
  .two-columns {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    margin-top: 20px;
  }
}`;
    fixes++;
  }

  // ========== 10. BUTTONS ==========
  if (text.match(/\.btn/) && !text.includes('btn-responsive')) {
    newText += `

/* Button responsiveness */
@media (max-width: 640px) {
  .btn {
    width: 100%;
    text-align: center;
    padding: 12px;
  }
}`;
    fixes++;
  }

  // ========== 11. FORMS ==========
  if (
    (text.match(/input/) || text.match(/textarea/)) &&
    !text.includes('form-responsive')
  ) {
    newText = newText.replace(
      /(input|select|textarea)\s*\{([^}]*)\}/gi,
      (match, element, content) => {
        if (content.includes('width:') && !content.includes('max-width')) {
          fixes++;
          return `${element} {\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;${content.replace(/width\s*:\s*[^;]+;/, '')}\n}`;
        }
        return match;
      },
    );
    fixes++;
  }

  // ========== 12. NAVIGATION ==========
  if (
    (text.match(/\.main-nav/) ||
      text.match(/\.nav/) ||
      text.match(/\.navbar/) ||
      text.match(/\.menu/)) &&
    !text.includes('nav-responsive')
  ) {
    newText += `

/* Navigation responsiveness */
@media (max-width: 768px) {
  .main-nav,
  .nav,
  .navbar,
  .menu {
    flex-direction: column !important;
    align-items: center !important;
    gap: 10px !important;
  }
  
  .main-nav a,
  .nav a,
  .navbar a,
  .menu a {
    width: 100% !important;
    text-align: center !important;
    padding: 12px !important;
  }
}`;
    fixes++;
  }

  // ========== 13. CARDS GRID ==========
  if (
    (text.match(/\.cards-grid/) || text.match(/\.card/)) &&
    !text.includes('cards-responsive')
  ) {
    newText += `

/* Cards Grid responsiveness */
@media (max-width: 768px) {
  .cards-grid {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .card {
    width: 100% !important;
    max-width: 100% !important;
  }
}`;
    fixes++;
  }

  // ========== 14. BASE MEDIA QUERY ==========
  if (!text.includes('@media')) {
    newText += `

/* Base responsive styles */
@media (max-width: 640px) {
  body {
    padding: 10px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .container {
    padding: 15px;
  }
}`;
    fixes++;
  }

  // ========== 15. CONTAINERS ==========
  if (text.match(/\.container/) && !text.includes('container-responsive')) {
    newText = newText.replace(
      /(\.container\s*\{[^}]*)(\})/gi,
      (match, content, closing) => {
        if (!content.includes('max-width') && content.includes('width:')) {
          fixes++;
          return `${content}\n  max-width: 1200px;\n  margin: 0 auto;${closing}`;
        }
        return match;
      },
    );
  }

  // ========== SUMMARY ==========
  if (fixes > 0) {
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length),
    );

    await editor.edit(editBuilder => {
      editBuilder.replace(fullRange, newText);
    });

    vscode.window.showInformationMessage(
      `✅ AdaptiFlow: Made ${fixes} improvements! Gap is now responsive too!`,
    );
  } else {
    vscode.window.showInformationMessage(
      '✅ AdaptiFlow: Your CSS is already responsive!',
    );
  }
}
