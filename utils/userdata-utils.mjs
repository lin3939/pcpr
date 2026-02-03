import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import crypto from "crypto";

// Gets system prompt.
export function getSysPrompt(extensionPath) {
    let filePath = path.join(extensionPath, "./config/system_prompt.json");
    try{
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }catch(err){
        return false;
    }
}

function _encrypt(text){
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync("sksksksksk", 'static-salt', 32);
    const iv = Buffer.alloc(16, 0); 
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function _decrypt(encryptedText){
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync("sksksksksk", 'static-salt', 32);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;   
}

// Gets current configuraion.
// Returns Object of configuration on success, fasle on error.
export function getData(extensionPath){
    let filePath = path.join(extensionPath, "./config/.user_config");
    console.log(filePath)
    try{
        return JSON.parse(_decrypt(fs.readFileSync(filePath, "utf-8"), extensionPath));
    }catch(err){
        return false;
    }
}

// Edits configuration including baseURL, api and model.
// Configuration will be saved after encryption.
// Returns true on success, fasle on error.
export async function writeData(context){
    let filePath = path.join(context.extensionPath, "./config/.user_config");
    try{
        let base = await vscode.window.showInputBox({
            prompt: "baseURL", 
            placeHolder: "Your baseURL provided by AI provider",
            ignoreFocusOut: true,
            password: false
        });
        let ak = await vscode.window.showInputBox({
            prompt: "API Key", 
            placeHolder: "Your api-key provided by AI provider", 
            ignoreFocusOut: true,
            password: true
        });
        let model = await vscode.window.showInputBox({
            prompt: "AI Model", 
            placeHolder: "The AI model your want to use",
            ignoreFocusOut: true, 
            password: false
        });
        let payload = JSON.stringify({"baseURL": base,"apiKey": ak, "model": model}, null, 4);
        let encrypted_payload = _encrypt(payload);
        fs.writeFileSync(filePath, encrypted_payload);
        vscode.window.showInformationMessage("Config saved successfully.");
        return true;
    }catch(err){
        vscode.window.showErrorMessage("Config Save Error: " + String(err));
        return false;
    }
}

// Only changes AI model in configuration.
// Returns true on success, fasle on error.
export async function changeModel(context){
    let filePath = path.join(context.extensionPath, "./config/.user_config");
    try{
        let model = await vscode.window.showInputBox({
            prompt: "", 
            placeHolder: "The AI model your want to use",
            ignoreFocusOut: true, 
            password: false
        });
        let user_data = getData(context.extensionPath);
        user_data.model = model;
        let payload = JSON.stringify(user_data, null, 4);
        let encrypted_payload = _encrypt(payload);
        fs.writeFileSync(filePath, encrypted_payload);
        vscode.window.showInformationMessage("Model changed successfully.");
        return true;
    }catch(err){
        vscode.window.showErrorMessage("Model change error: " + String(err));
        return false;
    }
}



// Secret key generating functions, for future modify and use if needed.

// async function _generateKey(extensionPath){
//     let key = crypto.generateKeySync('hmac', {
//         length: 32,
//     }).export().toString('hex');
//     await fs.promises.writeFile(path.join(extensionPath, "./config/.key"), key);
//         if (err){
//             console.log("Key generation error: " + String(err));
//         }
//     return key;
// }

// async function _getKey(extensionPath){
//     let keyPath = path.join(extensionPath, './config/.key');
//     try{
//         let key = await fs.promises.readFile(keyPath, 'utf-8');
//         return key;
//     }catch(err){
//         if (err.code === 'ENOENT'){
//             return await _generateKey(extensionPath);
//         }else{
//             throw err;
//         }
//     }
// }
