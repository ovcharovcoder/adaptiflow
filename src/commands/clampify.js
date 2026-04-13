"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.clampifyCommand = clampifyCommand;
const vscode = __importStar(require("vscode"));
async function clampifyCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor)
        return;
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    if (!text) {
        vscode.window.showWarningMessage('Please select values to convert (e.g., 16, 32)');
        return;
    }
    // Find numbers
    const numbers = text.match(/(\d+(?:\.\d+)?)/g);
    if (!numbers || numbers.length < 2) {
        vscode.window.showWarningMessage('Need to select two numbers (min and max)');
        return;
    }
    const minVal = parseFloat(numbers[0]);
    const maxVal = parseFloat(numbers[1]);
    // Generate clamp
    const clampValue = `clamp(${minVal}px, ${((minVal / maxVal) * 100).toFixed(2)}vw, ${maxVal}px)`;
    // Replace selected text
    await editor.edit(editBuilder => {
        editBuilder.replace(selection, clampValue);
    });
    vscode.window.showInformationMessage(`✅ Clampify: ${minVal}px → ${maxVal}px converted!`);
}
//# sourceMappingURL=clampify.js.map