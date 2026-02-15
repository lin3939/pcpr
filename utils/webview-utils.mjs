import fs from 'fs';
import path from 'path';

export function getWebPage(extensionPath, replacements = {}) {
    const filePath = path.join(extensionPath, './webview/page/main.html');
    let pageContent = fs.readFileSync(filePath, 'utf-8');
    for (const [key, value] of Object.entries(replacements)) {
        const placeholder = `%${key}%`;
        pageContent = pageContent.split(placeholder).join(String(value));
    }
    return pageContent;
}