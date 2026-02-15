import * as vscode from 'vscode';
import OpenAI from 'openai';
import * as userdataUtils from './utils/userdata-utils.mjs';
import * as userContext from './utils/get-context-utils.mjs';
import * as responseUtils from './utils/response-utils.mjs';
import * as keyUtils from './utils/key-utils.mjs';
import * as webviewUtils from './utils/webview-utils.mjs'

/**
 * @param {vscode.ExtensionContext} context
 */

// Main function to process user request through OpenAI API.
// Returns Object of necessary information of AI's response on success, false on error.
async function main(context) {
    try {
        const user_data = await userdataUtils.getData(context);
        const openai = new OpenAI({
            apiKey: user_data.apiKey,
            baseURL: user_data.baseURL
        });
        if (user_data.baseURL && user_data.apiKey && user_data.model) {
            let completion = await openai.chat.completions.create({
                model: user_data.model,
                messages: [
                    { "role": "system", "content": userdataUtils.getSysPrompt(context.extensionPath).system_prompt },
                    { "role": "user", "content": userContext.getContext().content }
                ],
                // stream: false,
                // stream_options: {include_usage: true}
            });
            return {
                "date": new Date().toLocaleString(),
                "file": userContext.getContext().fileName,
                "model": user_data.model,
                "usage": completion.usage.total_tokens,
                "response": completion.choices[0].message.content
            };
        } else {
            vscode.window.showWarningMessage("Configuration is not set properly. Please modify configuration.");
            await userdataUtils.modifyConfig(context);
            return false;
        }
    } catch (error) {
        vscode.window.showErrorMessage("Cloud Plan Error" + String(error));
        return false;
    }
}
async function web_main(context, input) {
    try {
        const user_data = await userdataUtils.getData(context);
        const openai = new OpenAI({
            apiKey: user_data.apiKey,
            baseURL: user_data.baseURL
        });
        if (user_data.baseURL && user_data.apiKey && user_data.model) {
            let completion = await openai.chat.completions.create({
                model: user_data.model,
                messages: [
                    { "role": "system", "content": userdataUtils.getSysPrompt(context.extensionPath).system_prompt },
                    { "role": "user", "content": input }
                ],
                // stream: false,
                // stream_options: {include_usage: true}
            });
            return {
                // "date": new Date().toLocaleString(),
                // "file": userContext.getContext().fileName,
                // "model": user_data.model,
                // "usage": completion.usage.total_tokens,
                "response": completion.choices[0].message.content
            };
        } else {
            vscode.window.showWarningMessage("Configuration is not set properly. Please modify configuration.");
            await userdataUtils.modifyConfig(context);
            return false;
        }
    } catch (error) {
        vscode.window.showErrorMessage("Cloud Plan Error" + String(error));
        return false;
    }
}

// Main function to process user request through ollama's OpenAI API capability.
// Returns Object of necessary information of AI's response on success, false on error.
async function ollama_main(context) {
    try {
        const user_data = userdataUtils.getLocalPlanData();
        const openai = new OpenAI({
            apiKey: "not-needed",
            baseURL: user_data.baseURL
        });
        if (user_data.baseURL && user_data.model) {
            let completion = await openai.chat.completions.create({
                model: user_data.model,
                messages: [
                    { "role": "system", "content": userdataUtils.getSysPrompt(context.extensionPath).system_prompt },
                    { "role": "user", "content": userContext.getContext().content }
                ],
                // stream: false,
                // stream_options: {include_usage: true}
            });
            return {
                "date": new Date().toLocaleString(),
                "file": userContext.getContext().fileName,
                "model": user_data.model,
                "usage": completion.usage.total_tokens,
                "response": completion.choices[0].message.content
            };
        } else {
            vscode.window.showWarningMessage("Configuration is not set properly. Please modify configuration.");
            await userdataUtils.modifyConfig(context);
            return false;
        }
    } catch (error) {
        vscode.window.showErrorMessage("Local Plan Error: " + String(error));
        return false;
    }
}



export function activate(context) {

    const checkCode = vscode.commands.registerCommand('pcpr.checkCode', async function () {
        try {
            const user_data = await userdataUtils.getData(context);
            if (user_data.baseURL && user_data.apiKey && user_data.model) {
                const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
                statusBar.text = "$(sync-spin)PCPR: Analyzing....";
                statusBar.show();

                main(context).then((result) => {
                    if (result) {
                        responseUtils.showResponse(result).then((err) => {
                            if (err) {
                                return;
                            }
                        }).catch((err) => {
                            vscode.window.showErrorMessage(`show Error: ${String(err)}`);
                        });
                    }

                    statusBar.hide();
                });

            } else {
                vscode.window.showWarningMessage("Configuration is not set properly. Please modify configuration.");
                await userdataUtils.modifyConfig(context);
            }
        } catch (err) {
            vscode.window.showErrorMessage(String(err));
        }

    })
    context.subscriptions.push(checkCode);

    const localCheck = vscode.commands.registerCommand('pcpr.localCheck', async function () {
        try {
            const user_data = userdataUtils.getLocalPlanData();
            if (user_data.baseURL && user_data.model) {
                const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
                statusBar.text = "$(sync-spin)PCPR: Local Analyzing....";
                statusBar.show();

                ollama_main(context).then((result) => {
                    if (result) {
                        responseUtils.showResponse(result).then((err) => {
                            if (err) {
                                return;
                            }
                        }).catch((err) => {
                            vscode.window.showErrorMessage(`show Error: ${String(err)}`);
                        });
                    }

                    statusBar.hide();
                });

            } else {
                vscode.window.showWarningMessage("Configuration is not set properly. Please modify configuration.");
                await userdataUtils.modifyConfig(context);
            }
        } catch (err) {
            vscode.window.showErrorMessage(String(err));
        }

    })
    context.subscriptions.push(localCheck);

    const setAPIKey = vscode.commands.registerCommand('pcpr.setAPIKey', async function () {
        await keyUtils.setAPIKey(context);
    })
    context.subscriptions.push(setAPIKey);

    const clearAPIKey = vscode.commands.registerCommand('pcpr.clearAPIKey', async function () {
        await keyUtils.clearAPIKey(context);
    })
    context.subscriptions.push(clearAPIKey);

    const webviewChat = vscode.commands.registerCommand('pcpr.webviewChat', async function () {
        const panel = vscode.window.createWebviewPanel(
            'pcprWebviewChat',
            'webviewChat',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );
        const scriptPath = vscode.Uri.joinPath(context.extensionUri, 'webview', 'scripts', 'main.js');
        const stylePath = vscode.Uri.joinPath(context.extensionUri, 'webview', 'css', 'style.css');
        const scriptUri = panel.webview.asWebviewUri(scriptPath).toString();
        const styleUri = panel.webview.asWebviewUri(stylePath).toString();

        const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${panel.webview.cspSource} https: data:; script-src ${panel.webview.cspSource}; style-src ${panel.webview.cspSource};">`;

        const html = webviewUtils.getWebPage(context.extensionPath, {
            SCRIPT_URI: scriptUri,
            STYLE_URI: styleUri,
            CSP: cspMeta
        });
        panel.webview.html = html;
        panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'chat':
                    const response = await web_main(context, message.text);
                    panel.webview.postMessage({ command: 'agentResponse', text: response.response });
                    break;
                default:
                    vscode.window.showErrorMessage("default" + message.command);
            }
        });

    });
    context.subscriptions.push(webviewChat);
}

export function deactivate() { }
