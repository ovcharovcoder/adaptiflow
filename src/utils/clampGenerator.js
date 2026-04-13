"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClamp = generateClamp;
exports.clampifyValues = clampifyValues;
exports.generateFontClamp = generateFontClamp;
exports.generateSpacingClamp = generateSpacingClamp;
exports.generateContainerClamp = generateContainerClamp;
exports.generateGapClamp = generateGapClamp;
exports.generateRadiusClamp = generateRadiusClamp;
function generateClamp(options) {
    const { minSize, maxSize, minViewport = 375, maxViewport = 1440, unit = 'px', useCalc = true, } = options;
    // Calculate coefficient for vw
    const slope = (maxSize - minSize) / (maxViewport - minViewport);
    const intercept = minSize - slope * minViewport;
    const vwValue = `${(slope * 100).toFixed(4)}vw`;
    const pxValue = `${intercept.toFixed(4)}px`;
    let middleValue;
    if (useCalc) {
        // Use calc() for more precise values
        middleValue = `calc(${pxValue} + ${vwValue})`;
    }
    else {
        // Simple version without calc
        middleValue = `${vwValue} + ${pxValue}`;
    }
    return `clamp(${minSize}${unit}, ${middleValue}, ${maxSize}${unit})`;
}
function clampifyValues(minValue, maxValue, useCalc = true) {
    const minMatch = minValue.match(/([\d.]+)(px|rem|em)?/);
    const maxMatch = maxValue.match(/([\d.]+)(px|rem|em)?/);
    if (!minMatch || !maxMatch)
        return `${minValue} → ${maxValue}`;
    const minNum = parseFloat(minMatch[1]);
    const maxNum = parseFloat(maxMatch[1]);
    const unit = minMatch[2] || 'px';
    return generateClamp({ minSize: minNum, maxSize: maxNum, unit, useCalc });
}
// Generate clamp for font-size with intelligent defaults
function generateFontClamp(desktopSize, mobileSize, unit = 'px') {
    const min = mobileSize || Math.max(desktopSize * 0.5, 14);
    const max = desktopSize;
    return generateClamp({ minSize: min, maxSize: max, unit, useCalc: true });
}
// Generate clamp for spacing (padding, margin, gap)
function generateSpacingClamp(desktopSpacing, mobileRatio = 0.6, unit = 'px') {
    const min = Math.max(desktopSpacing * mobileRatio, 8);
    const max = desktopSpacing;
    return generateClamp({ minSize: min, maxSize: max, unit, useCalc: true });
}
// Generate clamp for container width
function generateContainerClamp(maxWidth, minWidth = 320, unit = 'px') {
    return generateClamp({
        minSize: minWidth,
        maxSize: maxWidth,
        minViewport: 375,
        maxViewport: 1440,
        unit,
        useCalc: true,
    });
}
// Generate clamp for gap
function generateGapClamp(desktopGap, mobileRatio = 0.5, unit = 'px') {
    const min = Math.max(desktopGap * mobileRatio, 8);
    const max = desktopGap;
    return generateClamp({ minSize: min, maxSize: max, unit, useCalc: true });
}
// Generate clamp for border radius
function generateRadiusClamp(desktopRadius, mobileRatio = 0.6, unit = 'px') {
    const min = Math.max(desktopRadius * mobileRatio, 4);
    const max = desktopRadius;
    return generateClamp({ minSize: min, maxSize: max, unit, useCalc: true });
}
//# sourceMappingURL=clampGenerator.js.map