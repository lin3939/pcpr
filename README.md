# This version is still in development.

# PCPR — Programmer Chat Programming Robot

# English

Programmer Chat Programming Robot(PCPR in short), powered by AI, which detects logical errors in your code and provides useful advice. 

## Install
This extension isn't available on VSCode plugin market yet, you can download VSIX package from our **release**. Then you can install the extension by following the steps below.   
1. Open VSCode.
2. Go to the **Extensions** view by clicking the Extensions icon in the Activity Bar on the side, or pressing `Ctrl+Shift+X`.
3. Click the **ellipsis (`…`)** menu at the top of the Extensions view.
4. Select **Install from VSIX…**.
5. In the file dialog, navigate to the `.vsix` file and select it. 

## Get Ready
PCPR supports both cloud plan and local plan. If you want to use more powerful AI model for more precise analysis, choose cloud plan. If you have local AI service and attach importance to privacy, choose local plan. **The quality of analysis mostly depends on the AI model you choose**.  
- For cloud plan, ensure that you have baseURL, API Key, the name of AI model for cloud AI service. The baseURL must support OpenAI API. 
- For local plan, ensure that you have local AI service running, right baseURL supporting OpenAI API and right name of AI model. 

## Settings
Enter the settings interface of VSCode then search for "PCPR", you will see **PCPR Configuration**, which includes: 
1. **Pcpr: Api Key**: Set your API Key for cloud plan. You can get your API Key from your cloud AI service provider. 
2. **Pcpr: Cloud Base URL**: BaseURL for cloud plan. You can get it from your cloud AI service provider. Ensure that the baseURL supports OpenAI API. 
3. **Pcpr: Cloud Model**: The model you want to use. Ensure that the model corresponds to baseURL and API Key, and spell the name of model correctly. 
4. **Pcpr: Local Base URL**: BaseURL for local plan. Its default value is default interface of OpenAI capability of ollama ( http://localhost:11434/v1/ ). If you want to modify it, please use other baseURL that supports OpenAI API, too.
5. **Pcpr: Local Model**: The name of model for local plan. Ensure that this model exists and is running when you use local plan. 
It will jump to settings automatically when the configuration isn't all set. 

## Use
Press `F1` or `CMD/Ctrl+Shift+P`, type **PCPR** then you can see relative commands. Run them to use corresponding functions. 
### Commands
1. **PCPR Check Code**: Check your current code file using your configured **Cloud AI**. If the configuration isn't all set yet, it will jump to **Settings**. After running the command, a prompt *PCPR: Analyzing...* will appear in the bottom left corner, indicating that the AI is analyzing the code. The result will be displayed in a **temporary markdown document** , you can save it or close it. 
2. **PCPR Local Check**: Same as **PCPR Check Code** but uses your local AI and the prompt will be *PCPR: Local Analyzing...*  Ensure that **your needed local AI service** is running. 
3. **PCPR Set API Key**: Shortcut to set your API Key for cloud plan. Same as 
4. **PCPR Clear API Key**: Shortcut to clear your API Key for cloud plan. 
5. **PCPR Web Chat**: It will open a webview UI in which you can communicate with your AI set in both cloud plan and local plan. It's just like chat with AI on a web page. The AI knows every file you have opened since the last time you opened VSCode. However, **we don't recommend you chat with your cloud AI too much on the webview page** because this may consume many tokens and may generate a lot of expenses. 
### Shortcuts
**PCPR provides right-click menu as shortcuts for some functions**. Right-click your opened code file, you can see **PCPR Check Code**, **PCPR Local Check** and **PCPR Web Chat**. They all have the function same as corresponding commands mentioned above. 

## Attention
This extension is still in development and may contain unexpected shortcomings and bugs. 

## Features
- Focuses on analyzing logical errors in your code and providing solutions.
- Integrating the capabilities of external AI into the VSCode development process.
- Expands the available AI models in VSCode development, and almost all models that provide API Keys or local plan can be integrated into the development process for use.
- Provides both local and cloud based plans, improving versatility while also considering privacy protection. 
- Provides Webview UI for chat to understand user's demands more accurately. 
- Unlike ordinary web-based AI, the AI here can gain a deep understanding of the project being developed, thereby saving the step of copying code to a web page while also enabling the AI to analyze the project more accurately.

## Development
For developers, just ensure that you have installed Node.js, run `npm install` in the project directory to install dependencies, open the project directory using VSCode, then press `F5` to debug the extension. 

# 简体中文

程序员聊天编程机器人（简称 PCPR），由人工智能驱动，能够检测代码中的逻辑错误并提供有用的建议。

## 安装
该扩展尚未在 VSCode 插件市场上线，您可以从我们的 **release** 中下载 VSIX 包。然后您可以按照以下步骤安装该扩展。
1. 打开 VSCode。
2. 点击侧边活动栏中的扩展图标或按 `Ctrl+Shift+X` 进入**扩展**视图。
3. 点击扩展视图顶部的 **省略号（`…`）** 菜单。
4. 选择**从 VSIX 安装…**。
5. 在文件对话框中，浏览并选中 `.vsix` 文件。

## 准备工作
PCPR 同时支持云端方案和本地方案。如果您希望使用更强大的 AI 模型以获得更精确的分析，请选择云端方案。如果您拥有本地 AI 服务且注重隐私，请选择本地方案。**分析质量主要取决于您选择的 AI 模型**。
- 对于云端方案，请确保您拥有云端 AI 服务的 baseURL、API Key 以及 AI 模型的名称。该 baseURL 必须支持 OpenAI API。
- 对于本地方案，请确保您有正在运行的本地 AI 服务、正确的支持 OpenAI API 的 baseURL 以及正确的 AI 模型名称。

## 设置

进入 VSCode 的设置界面，搜索“PCPR”，您将看到**PCPR Configuration**，包括：

1. **Pcpr: Api Key**：设置您的云端方案 API Key。您可以从您的云端 AI 服务提供商处获取 API Key。
2. **Pcpr: Cloud Base URL**：云端方案的 baseURL。您可以从云端 AI 服务提供商处获取。请确保该 baseURL 支持 OpenAI API。 
3. **Pcpr: Cloud Model**：您要使用的模型名称。请确保该模型与 baseURL 和 API Key 对应，并且模型名称拼写正确。
4. **Pcpr: Local Base URL**：本地方案的 baseURL。默认值为 ollama 的 OpenAI capability 默认接口（ [http://localhost:11434/v1/](http://localhost:11434/v1/) ）。如需修改，请使用同样支持 OpenAI API 的其他 baseURL。
5. **Pcpr: Local Model**：本地方案的模型名称。使用本地方案时，请确保该模型存在且正在运行。  
如果配置尚未全部设置，系统会自动跳转到设置界面。

## 使用

按 `F1` 或 `CMD/Ctrl+Shift+P`，输入 **PCPR** 即可看到相关命令。运行它们以使用相应功能。
### 命令
1. **PCPR Check Code**：使用您配置的**云端 AI** 检查当前代码文件。如果配置尚未全部设置，则会跳转到**设置**。运行命令后，左下角会出现提示 _PCPR: Analyzing..._，表示 AI 正在分析代码。结果将显示在一个**临时的 Markdown 文档**中，您可以保存或关闭它。
2. **PCPR Local Check**：与 **PCPR Check Code** 相同，但使用本地 AI，提示信息为 _PCPR: Local Analyzing..._。请确保**您所需的本地 AI 服务**正在运行。
3. **PCPR Set API Key**：快速设置云端方案 API Key 的快捷方式。
4. **PCPR Clear API Key**：快速清除云端方案 API Key 的快捷方式。
5. **PCPR Web Chat**：打开一个 Webview 界面，您可以在其中与云端方案和本地方案中设置的 AI 进行交流。就像在网页上与 AI 聊天一样。AI 了解您自上次打开 VSCode 以来打开过的所有文件。不过，**我们不建议您在 Webview 页面上过多地与云端 AI 聊天**，因为这可能会消耗大量 tokens 并产生较多费用。

### 快捷方式
**PCPR 为部分功能提供了右键菜单快捷方式**。右键单击您打开的代码文件，您将看到 **PCPR Check Code**, **PCPR Local Check** 和 **PCPR Web Chat**。它们分别对应上述命令的功能。

## 注意
该扩展仍在开发中，可能存在意料之外的缺陷和错误。

## 特色
- 专注于分析代码中的逻辑错误并提供解决方案。
- 将外部 AI 的能力集成到 VSCode 开发流程中。
- 扩展了 VSCode 开发中可用的 AI 模型，几乎所有提供 API Key 或本地方案的模型都可集成到开发流程中使用。
- 提供云端和本地方案，在提升通用性的同时兼顾隐私保护。
- 提供用于聊天的 Webview UI，以更准确地理解用户需求。
- 不同于普通的网页端 AI ，这里的 AI 可以很大程度上了解正在开发的项目内容，省去了往网页端复制代码的步骤的同时也让 AI 更准确地分析项目。 

## 开发
对于开发者，只需确保已安装 Node.js，在项目目录中运行 `npm install` 安装依赖项，使用 VSCode 打开项目目录，然后按 `F5` 即可调试该扩展。