# PCPR — Programmer Chat Programming Robot

# English

Programmer Chat Programming Robot(PCPR in short), powered by AI, which detects logical errors in your code and provides useful advice.  

## Start
- Run `npm install` to install dependencies in the project directory, open the project directory in VSCode and then press `F5` to run the extension.

---

## Usage
- Open a workspace folder and a code file(mandatory).
- Ensure that you have the baseURL, API key, and name of the AI model provided by the AI provider, no API key is required if choosing the local plan.
- If chooseing the local plan, please ensure that the local AI service has been turned on.

### Cloud Plan
- Run **PCPR Check Code** on the command panel(`F1` or `Ctrl/CMD+Shift+P`), and modify the configuration if it is not configured.
- If you want to modify the configuration later, please run **PCPR Modify Config** and fill in the baseURL, API key, and AI model.
- If there is no need to modify the baseURL and API key, only the AI model used needs to be modified, please run **PCPR Change Model** and fill in the name of model you want to use.

### Local Plan
- Run **PCPR Local Check** on the command panel(`F1` or `Ctrl/CMD+Shift+P`), and modify the configuration if it is not configured.
- If you want to modify the configuration later, please run **PCPR Modify Local Config** and fill in the baseURL, API key, and AI model.
- The default baseURL for the local plan is the default OpenAI capability interface of ollama\-\-**http://localhost:11434/v1/**. If you want to modify it, please use a baseURL that is compatible with the OpenAI API.
- If there is no need to modify the baseURL and API key, only the AI model used needs to be modified, please run **PCPR Change Local Model** and fill in the name of model you want to use.

## Attention
- All inputs that escaped by `Esc` or are truly empty string inputs are considered as empty string inputs, and the corresponding configuration will be updated to empty \(except those with default values\).
- Currently the extension only uses OpenAI API, please ensure that your AI service supports OpenAI API.

---

## Behavior
After running **PCPR Check Code** or **PCPR Local Check**, a prompt *PCPR: Analyzing...* or *PCPR: Local Analyzing...* will appear in the bottom left corner, indicating that the AI is analyzing the code. After the analysis is completed, the AI's response will be integrated into a file named **pcpr_desult + current ISO format time.md** in the workspace you are currently opening, and a new markdown preview window will be opened to display the response.

---

## Features
- Focuses on analyzing logical errors in your code and providing solutions.
- Integrating the capabilities of external AI into the VSC development process.
- Expands the available AI models in VSC development, and almost all models that provide API keys can be integrated into the development process for use.
- Provides both local and cloud based plans, improving versatility while also considering privacy protection. 

---

# 简体中文

程序员聊天编程机器人（Programmer Chat Programming Robot），简称PCPR，由人工智能驱动，可以检测代码中的逻辑错误并提供有用的建议。  

## 开始

- 在项目目录下运行`npm install`安装依赖，在VSCode中打开项目目录并按`F5`即可运行插件。

## 使用 

- 打开一个工作区文件夹和一个代码文件（必须）。
- 确保您拥有AI提供商提供的baseURL, API key和AI模型的名称，若选择本地方案则无需API key。
- 若使用本地方案，请确保本地的AI服务已打开。

### 云端方案
- 在命令面板（`F1`或`Ctrl/Cmd+Shift+P`）运行**PCPR Check Code**，如果没有配置，则修改配置。
- 如果您之后想修改配置，请运行**PCPR Modify Config**并填写baseURL, API key和AI model。
- 如果无需修改baseURL和API key，仅需修改使用的AI model，请运行**PCPR Change Model**并填写想要使用的模型。

### 本地方案
- 在命令面板（`F1`或`Ctrl/Cmd+Shift+P`）运行**PCPR Local Check**，如果没有配置，则修改配置。
- 如果您之后想修改配置，请运行**PCPR Modify Local Config**并填写baseURL和AI model。
- 本地方案的默认baseURL是ollama的默认OpenAI capability接口 **http://localhost:11434/v1/** ，如需修改，请使用其他兼容OpenAI API的baseURL。
- 如果无需修改baseURL，仅需修改使用的AI model，请运行**PCPR Change Local Model**并填写想要使用的模型。

## 注意
- 所有`Esc`跳出的输入或真正的空字符串输入都被认为是空字符串输入，将会把对应配置更新为空（有默认值的除外）。
- 目前仅使用OpenAI API，请确保您的AI服务支持OpenAI API。

---

## 行为

运行**PCPR Check Code**或**PCPR Local Check**后，左下角会出现 *PCPR: Analyzing....* 或 *PCPR: Local Analyzing...* 的提示，表示AI正在分析代码，分析完成后，AI的回复将会被整合到您当前打开的工作区下名为**pcpr_result + 当前的ISO格式时间.md**的文件里，并打开一个新的markdown预览窗口来显示回答。

---

## 特色
- 着重分析您代码中逻辑错误并给出解决方案。
- 将外部AI的能力整合到了VSC开发过程中。
- 拓展了VSC开发中可用的AI模型，几乎所有提供API key的模型都可以整合到开发过程中来使用。
- 提供了本地和云端两种方案，提高了泛用性的同时兼顾隐私保护。

