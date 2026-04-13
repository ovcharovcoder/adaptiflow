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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const autoAdapt_1 = require("./commands/autoAdapt");
const clampify_1 = require("./commands/clampify");
const fixFlexGrid_1 = require("./commands/fixFlexGrid");
const generateMedia_1 = require("./commands/generateMedia");
function activate(context) {
    console.log('✅ AdaptiFlow activated!');
    // Register Auto-Adapt command
    const autoAdapt = vscode.commands.registerCommand('adaptiflow.autoAdapt', () => {
        (0, autoAdapt_1.autoAdaptCommand)();
    });
    // Register Clampify command
    const clampify = vscode.commands.registerCommand('adaptiflow.clampify', () => {
        (0, clampify_1.clampifyCommand)();
    });
    // Register Fix Flex/Grid command
    const fixFlexGrid = vscode.commands.registerCommand('adaptiflow.fixFlexGrid', () => {
        (0, fixFlexGrid_1.fixFlexGridCommand)();
    });
    // Register Generate Media command
    const generateMedia = vscode.commands.registerCommand('adaptiflow.generateMedia', () => {
        (0, generateMedia_1.generateMediaCommand)();
    });
    // Add all commands to subscriptions
    context.subscriptions.push(autoAdapt, clampify, fixFlexGrid, generateMedia);
    // Show success notification
    vscode.window.showInformationMessage('🚀 AdaptiFlow is ready! Press Ctrl+Shift+A for Auto-Adapt');
}
function deactivate() {
    console.log('AdaptiFlow deactivated');
}
//# sourceMappingURL=extension.js.map