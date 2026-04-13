"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestFixes = suggestFixes;
async function suggestFixes(problems, css) {
    const fixes = [];
    for (const problem of problems) {
        let replacement = '';
        switch (problem.type) {
            case 'fixed-width':
                const widthMatch = problem.code.match(/(\d+)px/);
                if (widthMatch) {
                    replacement = `width: 100%; max-width: ${widthMatch[1]}px;`;
                }
                break;
            case 'no-flex-wrap':
                replacement = problem.code + '\n    flex-wrap: wrap;';
                break;
            case 'image-not-responsive':
                replacement = '  max-width: 100%;\n  height: auto;';
                break;
            case 'font-not-fluid':
                const pxMatch = problem.code.match(/(\d+)px/);
                if (pxMatch) {
                    const fontSize = parseInt(pxMatch[1]);
                    replacement = `font-size: clamp(${Math.floor(fontSize * 0.6)}px, 4vw, ${fontSize}px);`;
                }
                break;
            default:
                replacement = problem.suggestion;
        }
        if (replacement) {
            fixes.push({
                original: problem.code,
                replacement: replacement,
                line: problem.line,
                column: problem.column,
                type: problem.type,
            });
        }
    }
    return fixes;
}
//# sourceMappingURL=fixSuggester.js.map