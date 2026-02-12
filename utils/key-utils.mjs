import * as vscode from 'vscode';

export async function setAPIKey(context) {
    try {
        let ak = await vscode.window.showInputBox({
            prompt: "API Key",
            placeHolder: "Your api-key provided by AI provider",
            ignoreFocusOut: true,
            password: true
        });
        if (ak === undefined) {
            vscode.window.showInformationMessage("API Key input cancelled.");
            return false;
        }
        await context.secrets.store('pcpr.apiKey', ak);
        vscode.window.showInformationMessage("API Key saved successfully.");
        return true;
    } catch (err) {
        vscode.window.showErrorMessage("API Key Save Error: " + String(err));
        return false;
    }
}

export async function clearAPIKey(context) {
    try {
        await context.secrets.delete('pcpr.apiKey');
        vscode.window.showInformationMessage("API Key cleared successfully.");
        return true;
    } catch (err) {
        vscode.window.showErrorMessage("API Key Clear Error: " + String(err));
        return false;
    }
}