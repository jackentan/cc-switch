# Jackentan 上游同步流程

`jackentan/cc-switch` 是唯一的构建和发布仓库。

- `farion1231/cc-switch:main` 是主上游。
- `kongkongyo/cc-switch:main` 只提供需要人工审核的候选功能。
- 上游同步只生成 Pull Request，不会绕过 CI 直接改写 `main`。

## Farion 主上游

`.github/workflows/sync-farion.yml` 每小时检查一次 Farion。发现新提交后，它会：

1. 合并 Farion 的 `main`。
2. 重新写入 Jackentan 的仓库链接、Tauri 更新公钥和更新地址。
3. 创建 `chore(sync): merge Farion upstream` Pull Request。

如果两边历史发生分叉，工作流会失败并要求人工处理，避免静默丢失本仓库改动。

## Kong 功能

`.github/workflows/sync-kong.yml` 每天生成一次候选列表，只报告 Kong 独有的 `feat`、`fix`、`perf` 和 `refactor` 提交。候选列表会显示在 Actions 运行摘要，并作为构件下载；本仓库关闭了 Issues，因此不会创建 Issue。

在 Actions 页面手动运行 `Review Kong features`，把要尝试的完整提交 SHA 填入 `commit`，工作流会创建候选 Pull Request。冲突、回归和产品取舍必须在合并前人工确认。

## 发布版本

1. 合并同步 PR 并确认 CI 通过。
2. 需要在源码中保留版本号时，运行 `node scripts/set-version.mjs v3.18.0-jack.1` 并提交；发布工作流也会从标签自动设置构建版本。
3. 推送标签，例如 `v3.18.0-jack.1`。
4. `Release` 工作流会从 `jackentan` 构建并上传安装包。

如果 Apple 签名、公证 Secrets 尚未完整配置，Release 会自动跳过 macOS，只发布 Windows 和 Linux；补齐全部 Apple Secrets 后，macOS 会自动加入后续发布。

带连字符的标签会发布为预发布版本；不带连字符的 `v3.19.0` 会作为正式版本发布。

## GitHub 设置

在 `jackentan/cc-switch` 的 Settings → Secrets and variables → Actions 中配置：

- `TAURI_SIGNING_PRIVATE_KEY`
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`（如使用密码）
- `APPLE_CERTIFICATE`
- `APPLE_CERTIFICATE_PASSWORD`
- `KEYCHAIN_PASSWORD`
- `APPLE_ID`
- `APPLE_PASSWORD`
- `APPLE_TEAM_ID`

Tauri 公钥写在 `src-tauri/tauri.conf.json`，必须与 Jackentan 的私钥匹配；不要复用 Farion 的签名密钥。
