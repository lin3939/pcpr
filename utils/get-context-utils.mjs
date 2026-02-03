import * as vscode from "vscode";

// Get information of file that user is editing.(active text editor)
export function getContext(){
    let activated_editor = vscode.window.activeTextEditor;
    if (activated_editor){
        let fileName = activated_editor.document.fileName.split(/[\\/]/).pop();
        let content = activated_editor.document.getText();
        return {
            fileName, 
            content
        }
    }
}
