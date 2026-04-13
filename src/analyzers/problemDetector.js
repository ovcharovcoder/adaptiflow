"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectProblems = detectProblems;
async function detectProblems(css, language) {
    const problems = [];
    const lines = css.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // 1. Check for fixed width
        if (line.includes('width:') &&
            line.match(/\d+px/) &&
            !line.includes('max-width')) {
            const match = line.match(/(\d+)px/);
            if (match && parseInt(match[1]) > 200) {
                problems.push({
                    type: 'fixed-width',
                    description: `Fixed width ${match[1]}px may break on mobile devices`,
                    line: i + 1,
                    column: 0,
                    code: line.trim(),
                    suggestion: `width: 100%; max-width: ${match[1]}px;`,
                });
            }
        }
        // 2. Check for flex without wrap
        if (line.includes('display: flex') || line.includes('display:flex')) {
            let hasWrap = false;
            for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
                if (lines[j].includes('flex-wrap')) {
                    hasWrap = true;
                    break;
                }
                if (lines[j].includes('}'))
                    break;
            }
            if (!hasWrap) {
                problems.push({
                    type: 'no-flex-wrap',
                    description: 'Flex container without flex-wrap may cause horizontal scroll',
                    line: i + 1,
                    column: 0,
                    code: line.trim(),
                    suggestion: 'Add flex-wrap: wrap;',
                });
            }
        }
        // 3. Check for images
        if (line.includes('img') && line.includes('{')) {
            let hasMaxWidth = false;
            for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
                if (lines[j].includes('max-width')) {
                    hasMaxWidth = true;
                    break;
                }
                if (lines[j].includes('}'))
                    break;
            }
            if (!hasMaxWidth) {
                problems.push({
                    type: 'image-not-responsive',
                    description: 'Image without max-width: 100%',
                    line: i + 1,
                    column: 0,
                    code: line.trim(),
                    suggestion: 'max-width: 100%; height: auto;',
                });
            }
        }
        // 4. Check for fonts
        if (line.includes('font-size:') &&
            line.match(/\d+px/) &&
            !line.includes('clamp')) {
            const match = line.match(/(\d+)px/);
            if (match && parseInt(match[1]) > 20) {
                const fontSize = parseInt(match[1]);
                problems.push({
                    type: 'font-not-fluid',
                    description: `Fixed font size ${fontSize}px does not scale`,
                    line: i + 1,
                    column: 0,
                    code: line.trim(),
                    suggestion: `font-size: clamp(${Math.floor(fontSize * 0.6)}px, 4vw, ${fontSize}px;`,
                });
            }
        }
    }
    return problems;
}
//# sourceMappingURL=problemDetector.js.map