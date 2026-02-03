import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

// Generate response string in markdown format,
// Returns a promise that resolves to the string.
// No rejection, throw errors instead.
async function _generateResponse(result) {
    if (!result) {
        vscode.window.showErrorMessage("No result provided to generateResponse");
        throw new Error("No result provided to generateResponse");
    }
    const content = result.response;
    const model = result.model;
    const usage = result.usage;
    const date = result.date;
    const file = result.file;
    return new Promise((resolve, reject) => {
        let lines = [`## Result\n`, `Date: ${date}\n`, `File: ${file}\n`,  `### Response:\n`, `${content}`, `\n`, `### Usage:\n`, `Model: ${model}\n`, `Total Tokens: ${usage}\n`];
        resolve(lines.join('\n'));
    });
}


// Open generated markdown file in preview mode in the editor.
// Accepts a file path string.
// Returns the TextEditor on success, or null on error.
async function _openResponse(filePath) {
    if (!filePath) {
        vscode.window.showErrorMessage('openResponse Error: No file path provided');
        return false;
    }
    try {
        const uri = vscode.Uri.file(filePath);
        try {
            await vscode.commands.executeCommand('markdown.showPreviewToSide', uri);
        } catch (previewErr) {
            vscode.window.showErrorMessage('Failed to open Markdown preview: ' + String(previewErr));
        }
        return true;
    } catch (err) {
        vscode.window.showErrorMessage("Error opening response file: " + String(err));
        return false;
    }
}


// Write a markdown response file into the first workspace folder and open it in the editor.
// The response file is named with a timestamp to avoid overwriting existing files.
// Exported, so can be used in other modules.
// Returns true on success, false on failure.
export async function showResponse(result){
    const content = result.response;
    const model = result.model;
    const usage = result.usage;
    const date = result.date;
    const file = result.file;
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
        vscode.window.showErrorMessage("No workspace folder open");
        return false;
    }else{
        var filePath = path.join(workspaceFolder, `./pcpr_result_${new Date().toISOString().replace(/[:.]/g, '-')}.md`);

        // Add .gitignore entry for pcpr_results/ if there is a git repository.
        if (fs.existsSync(path.join(workspaceFolder, './.git'))) {
            const gitignorePath = path.join(workspaceFolder, './.gitignore');
            try {
                const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
                if (!gitignoreContent.includes('pcpr_result*.md')) {
                    fs.appendFileSync(gitignorePath, '\n# Ignore PCPR result files\npcpr_result*.md\n');
                }
            }catch(err){
                if (err.code === 'ENOENT') {
                    fs.appendFileSync(gitignorePath, '\n# Ignore PCPR result files\npcpr_result*.md\n');
                } else {
                    vscode.window.showErrorMessage("Error updating .gitignore: " + String(err));
                }
            }
        }

    }
    try{
        _generateResponse(result).then(async (data)=>{
            fs.promises.appendFile(filePath, data).then(() => {
                vscode.window.showInformationMessage("Result written to " + filePath);
                _openResponse(filePath);
                return true;
            })
            });
    }catch(err){
        vscode.window.showErrorMessage("showResponse error: " + String(err));
        return false;
    }
}


