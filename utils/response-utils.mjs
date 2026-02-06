import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

// Generate response string in markdown format,
// Returns a promise that resolves to the string.
// No rejection, throw errors instead.
async function _generateResponse(result) {
    if (!result) {
        throw new Error("No result provided to generateResponse");
    }
    const content = result.response;
    const model = result.model;
    const usage = result.usage;
    const date = result.date;
    const file = result.file;
    return new Promise((resolve, reject) => {
        let lines = [' ', `## Result\n`, `Date: ${date}\n`, `File: ${file}\n`,  `### Response:\n`, `${content}`, `\n`, `### Usage:\n`, `Model: ${model}\n`, `Total Tokens: ${usage}\n`];
        resolve(lines.join('\n'));
    });
}

// Write a markdown response into temporary Untitled file and open it markdown-preview mode in the editor.
// Returns true on success, false on failure.
export async function showResponse(result) {
    try{
        _generateResponse(result).then(async (data)=>{
            const doc = await vscode.workspace.openTextDocument({
                content: data,
                language: 'Markdown'
            });
            // await vscode.window.showTextDocument(doc)
            await vscode.commands.executeCommand('markdown.showPreviewToSide', doc.uri);
            return true;
        });
    }catch(err){
        vscode.window.showErrorMessage("Response Open Error: " + String(err));
        return false;
    }
}


