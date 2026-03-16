import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// Get information of file that user is editing.(active text editor)
export function getContext() {
    let activated_editor = vscode.window.activeTextEditor;
    if (activated_editor) {
        let fileName = activated_editor.document.fileName.split(/[\\/]/).pop();
        let content = activated_editor.document.getText();
        return {
            fileName,
            content
        }
    }
}

// Get information of file that user is editing.(active text editor)
export function getCurrentFile() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        return {
            filePath: editor.document.uri.fsPath,
            content: editor.document.getText()
        };
    }
    return null;
}


function generateDirectoryStructureString(structureObj) {
    let result = "";
    for (const item of structureObj) {
        result += "-".repeat(item.depth) + item.name + "\n";
        if (item.type === "directory" && item.children) {
            result += generateDirectoryStructureString(item.children);
        }
    }
    return result;
}

async function generateDirectoryStructureObject(rootPath, depth) {
    let structureObj = [];
    const items = await fs.promises.readdir(rootPath, { withFileTypes: true });
    for (const item of items) {
        const itemPath = path.join(rootPath, item.name);
        if (item.isDirectory()) {
            structureObj.push({
                name: item.name,
                type: "directory",
                depth: depth,
                children: await generateDirectoryStructureObject(itemPath, depth + 1)
            });
        } else {
            structureObj.push({
                name: item.name,
                type: "file",
                depth: depth
            });
        }
    }
    return structureObj;
}

async function generateDirectoryStructure(rootPath, depth) {
    const structureObj = await generateDirectoryStructureObject(rootPath, depth);
    return generateDirectoryStructureString(structureObj);
}

// Get workspace structure.
export async function getWorkspaceStructure(workspaceFolders) {

    if (workspaceFolders) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        const structure = await generateDirectoryStructure(rootPath, 1);
        return structure;
    }
    return [];
}   