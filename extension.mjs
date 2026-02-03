import * as vscode from 'vscode';
import OpenAI from 'openai';
import * as userdataUtils from './utils/userdata-utils.mjs';
import * as userContext from './utils/get-context-utils.mjs';
import * as responseUtils from './utils/response-utils.mjs'

/**
 * @param {vscode.ExtensionContext} context
 */

// Main function to process user request through OpenAI API.
// Returns Object of necessary information of AI's response on success, false on error.
async function main(context) {
    try {
        const user_data = userdataUtils.getData(context.extensionPath);
        const openai = new OpenAI({apiKey: user_data.apiKey,
            baseURL: user_data.baseURL
        });
        if (user_data.baseURL && user_data.apiKey && user_data.model){
            let completion = await openai.chat.completions.create({
                model: user_data.model,
                messages: [
                    {"role": "system", "content": userdataUtils.getSysPrompt(context.extensionPath).system_prompt},
                    {"role": "user", "content": userContext.getContext().content}
                ], 
                // Temporarily disable streaming to fix token usage issue in case of unsupported models.
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
        }else{
            await userdataUtils.writeData(context);
            return false;
        }
    } catch (error) {
        vscode.window.showErrorMessage("No file opened." + String(error));
        return false;
    }
}

//  Registers the following commands:
//  'pcpr.checkCode': Checks code that user is editing for logical errors using AI.Modify configuration if configration is not usable.
//  'pcpr.modifyConfig': Allows the user to modify configuration.
//  'pcpr.changeModel': Allows the user to change the model used by the extension.
export function activate(context) {

	const checkCode = vscode.commands.registerCommand('pcpr.checkCode', async function(){
        try{
            const user_data = userdataUtils.getData(context.extensionPath);
            if (user_data.baseURL && user_data.apiKey && user_data.model){
                const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
                statusBar.text = "$(sync-spin)PCPR: Analying....";
                statusBar.show();

                main(context).then((result)=>{
                    if (result){
                        responseUtils.showResponse(result).then((err) => {
                            if (err) {
                                return;
                            }   
                        }).catch((err)=>{
                            vscode.window.showErrorMessage(`show Error: ${String(err)}`);
                        });
                    }else{
                        vscode.window.showErrorMessage("Something went wrong, check your config or status.");
                    }
                    statusBar.hide();
                });

            }else{
                await userdataUtils.writeData(context);
            }
        }catch(err){
            vscode.window.showErrorMessage(String(err));
        }

	})
	context.subscriptions.push(checkCode);


    const modifyConfig = vscode.commands.registerCommand('pcpr.modifyConfig', async function(){
        userdataUtils.writeData(context);
    })
    context.subscriptions.push(modifyConfig);


    const changeModel = vscode.commands.registerCommand('pcpr.changeModel', async function(){
        userdataUtils.changeModel(context);
    })
    context.subscriptions.push(changeModel);
}

export function deactivate() {}
