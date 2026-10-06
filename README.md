# PCPR · Programmer Chat Programming Robot

一个 Copilot 风格的 VS Code 编程助手扩展，由你自己配置的 OpenAI 兼容大模型驱动。以下是使用方法。

## 🚀 安装

在 VS Code 中打开 **扩展** 面板 → 右上角 `...` → **从 VSIX 安装...**，选择打包好的 `.vsix` 文件。

## ⚙️ 配置 API

1. 按 `Ctrl/Cmd + Shift + P` 打开命令面板，运行 **`PCPR: Add API`**。
2. 依次填写：
   - **Provider name**：给这套配置起个名字，例如 `OpenAI` 或 `Local Ollama`。
   - **Base URL**：接口地址，例如 `https://api.openai.com/v1` 或 `http://localhost:11434/v1`。
   - **API Key**：云端服务填写密钥；本地端点直接回车留空。
   - **Model names**：模型名，多个用逗号分隔，例如 `gpt-4o-mini,gpt-4o`。

## 🎮 使用方法

- **内联补全**：打开任意代码文件，停顿一下即可看到灰色补全建议，按 `Tab` 接受；也可运行 **`PCPR: Trigger Inline Completion Now`** 立即触发一次。
- **AI 聊天**：点击活动栏的 **PCPR** 图标打开聊天面板，输入消息后按 `Enter` 发送（`Shift + Enter` 换行），可新建、切换、重命名、删除会话，也可用 **停止** 按钮中断回答。
- **代码逻辑检查**：在编辑器中右键选择 **PCPR Check Code**，结果会以 Markdown 预览打开在编辑器侧边。

### 常用命令

可在命令面板（`Ctrl/Cmd + Shift + P`）中运行：

| 命令 | 说明 |
| --- | --- |
| `PCPR Check Code` | 检查当前文件的逻辑错误，结果以 Markdown 预览打开 |
| `PCPR Web Chat` | 聚焦 / 打开 PCPR 聊天面板 |
| `PCPR: Add API` | 新增一套 API 配置 |
| `PCPR: Switch API` | 在已保存的配置之间切换 |
| `PCPR: Manage APIs` | 集中管理配置（新增 / 编辑 / 切换模型 / 删除） |
| `PCPR: Edit API` | 编辑指定配置（名称、Base URL、Key、模型列表、默认模型） |
| `PCPR: Delete API` | 删除指定配置 |
| `PCPR: Toggle Inline Completion` | 开关内联补全 |
| `PCPR: Trigger Inline Completion Now` | 立即触发一次内联补全 |
| `PCPR: Inline Completion Troubleshooting` | 诊断内联补全为何不生效 |

编辑器右键菜单还提供了 **PCPR Web Chat**、**PCPR Manage APIs**、**PCPR: Trigger Inline Completion Now**，以及内联补全的开关项。

## 🧩 设置项

所有设置位于 `pcpr.inlineCompletion.*`：

| 设置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `pcpr.inlineCompletion.enabled` | `boolean` | `true` | 是否启用内联（ghost text）补全 |
| `pcpr.inlineCompletion.debounceMs` | `number` | `250` | 输入停顿多少毫秒后发起自动补全请求，值越大请求越少 |
| `pcpr.inlineCompletion.maxPrefixCharacters` | `number` | `6000` | 发送光标**前**上下文的最大字符数 |
| `pcpr.inlineCompletion.maxSuffixCharacters` | `number` | `2000` | 发送光标**后**上下文的最大字符数 |
| `pcpr.inlineCompletion.maxCompletionLines` | `number` | `20` | 单次补全最多插入的行数 |
| `pcpr.inlineCompletion.maxTokens` | `number` | `1024` | 单次补全请求的最大 token 数（推理模型需要更大的值） |
| `pcpr.inlineCompletion.includeProjectStructure` | `boolean` | `true` | 是否把工作区目录结构作为额外上下文发送 |
| `pcpr.inlineCompletion.disabledLanguages` | `array` | 见下 | 不接收内联补全的语言 id 列表 |
