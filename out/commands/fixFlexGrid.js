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
exports.fixFlexGridCommand = fixFlexGridCommand;
const vscode = __importStar(require("vscode"));
async function fixFlexGridCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor)
        return;
    const document = editor.document;
    const text = document.getText();
    let newText = text;
    let fixes = 0;
    // Add flex-wrap to flex containers
    const flexRegex = /(display\s*:\s*flex\s*;)([^}]*)(\})/gi;
    newText = newText.replace(flexRegex, (match, display, content, closing) => {
        if (!content.includes('flex-wrap')) {
            fixes++;
            return `${display}\n  flex-wrap: wrap;${content}${closing}`;
        }
        return match;
    });
    if (fixes > 0) {
        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        await editor.edit(editBuilder => {
            editBuilder.replace(fullRange, newText);
        });
        vscode.window.showInformationMessage(`✅ Added flex-wrap to ${fixes} containers!`);
    }
    else {
        vscode.window.showInformationMessage('No flex containers without wrap found');
    }
}
//# sourceMappingURL=fixFlexGrid.js.map