"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BREAKPOINTS = void 0;
exports.getBreakpointName = getBreakpointName;
exports.BREAKPOINTS = {
    mobile: 375,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
    wide: 1440,
};
function getBreakpointName(width) {
    if (width <= exports.BREAKPOINTS.mobile)
        return 'mobile';
    if (width <= exports.BREAKPOINTS.tablet)
        return 'tablet';
    if (width <= exports.BREAKPOINTS.laptop)
        return 'laptop';
    if (width <= exports.BREAKPOINTS.desktop)
        return 'desktop';
    return 'wide';
}
//# sourceMappingURL=breakpoints.js.map