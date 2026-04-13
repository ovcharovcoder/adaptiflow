"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pxToRem = pxToRem;
exports.pxToVw = pxToVw;
exports.parseValue = parseValue;
function pxToRem(px, base = 16) {
    return `${(px / base).toFixed(4)}rem`;
}
function pxToVw(px, viewport = 1440) {
    return `${((px / viewport) * 100).toFixed(4)}vw`;
}
function parseValue(value) {
    const match = value.match(/^(\d+(?:\.\d+)?)(px|rem|em|%|vw|vh)$/);
    if (!match)
        return null;
    return { num: parseFloat(match[1]), unit: match[2] };
}
//# sourceMappingURL=unitConverter.js.map