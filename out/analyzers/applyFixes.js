"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFixes = applyFixes;
async function applyFixes(originalText, fixes) {
    let newText = originalText;
    const lines = newText.split('\n');
    // Sort from last to first
    const sortedFixes = [...fixes].sort((a, b) => b.line - a.line);
    for (const fix of sortedFixes) {
        const lineIndex = fix.line - 1;
        if (lineIndex >= 0 && lineIndex < lines.length) {
            const line = lines[lineIndex];
            if (fix.type === 'image-not-responsive') {
                // Add new lines after the line
                lines.splice(lineIndex + 1, 0, fix.replacement);
            }
            else if (line.includes(fix.original)) {
                // Replace existing line
                lines[lineIndex] = line.replace(fix.original, fix.replacement);
            }
            else if (fix.type === 'no-flex-wrap') {
                // Add flex-wrap at the end of the block
                lines[lineIndex] = line + '\n    flex-wrap: wrap;';
            }
            else if (fix.type === 'fixed-width') {
                // Replace width
                lines[lineIndex] = fix.replacement;
            }
            else if (fix.type === 'font-not-fluid') {
                // Replace font-size
                lines[lineIndex] = fix.replacement;
            }
        }
    }
    return lines.join('\n');
}
//# sourceMappingURL=applyFixes.js.map