<div align="center">

# CC Switch (Fork)

[farion1231/cc-switch](https://github.com/farion1231/cc-switch) をベースにした Fork で、現在は upstream `v3.14.1` に同期しています。

**個人向けの実用 Fork 版です。** 追加・変更した機能は十分に検証されていないため、**不具合や upstream との非互換**が含まれる可能性があります。安定性を重視する場合は[公式版](https://github.com/farion1231/cc-switch)を使用してください。

[![Version](https://img.shields.io/badge/version-3.14.1--fork.1-blue.svg)](https://github.com/kongkongyo/cc-switch/releases)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/kongkongyo/cc-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)
[![Downloads](https://img.shields.io/github/downloads/kongkongyo/cc-switch/total)](https://github.com/kongkongyo/cc-switch/releases/latest)

[中文首页](README.md) | [English](README_EN.md) | [内置中文文档](README_ZH.md) | 日本語 | [Changelog](CHANGELOG.md)

</div>

## Upstream との違い

| 項目 | 公式版 | この Fork |
|------|--------|-----------|
| プロバイダカード | 名前のみ表示 | 名前の横に現在モデル名を表示 |
| モデル選択 | 手入力中心 | 検索付きドロップダウン、マッチ順ソート、ハイライト対応 |
| モデル一覧取得後 | 主に入力補助 | 取得後にそのまま検索可能 |
| 新規プロバイダ位置 | 末尾に追加 | 2 番目に挿入 |
| 右クリックメニュー | 先頭/末尾移動なし | 右クリックで先頭 / 末尾へ移動可能 |
| トレイ左クリック | メニュー表示 | メインウィンドウの表示 / 非表示を切替 |
| モデルテスト | 入口が弱い | テストボタン復活、高度なテスト設定も利用可能 |
| テストプロンプト | 単一または柔軟性が低い | 18 個の内蔵プロンプトプールから毎回ランダムで 1 つ選択。複数行のユーザー定義にも対応 |
| 更新方式 | upstream の自動更新チェーン | このリポジトリの Releases を検出して手動更新を案内 |
| 配布元 | upstream Releases | この Fork 独自の Releases |

---

## 主な特徴

### 現在のバージョン: v3.14.1-fork.1

- **対応ツール**: Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw
- **プロバイダ管理**: インポート、切替、並び替え、複製、エクスポート / インポート
- **MCP / Prompts / Skills / Sessions**: 複数アプリを 1 か所で管理
- **ローカルプロキシ / フェイルオーバー**: ヘルスチェック、ルーティング、フォーマット変換
- **クラウド同期**: カスタム設定ディレクトリと WebDAV に対応

### この Fork の追加改善

- **現在モデル名の直接表示**
- **モデル一覧取得後の検索**
- **新規プロバイダを 2 番目に追加**
- **右クリックで先頭 / 末尾へ移動**
- **トレイ左クリックでウィンドウ表示切替**
- **モデルテストの強化**
  - テスト入口を復活
  - 高度なテスト設定を保持
  - 18 個のデフォルトテストプロンプトを内蔵
  - テスト時は毎回ランダムで 1 つ選択
  - 複数行のカスタムプロンプトプールにも対応
- **手動更新案内**
  - この Fork の Releases をチェック
  - 新バージョン検出時は Releases ページへ案内
  - Tauri の自動ダウンロード更新は使わない

## スクリーンショット

|                  メイン画面                   |                  プロバイダ追加                  |
| :-------------------------------------------: | :----------------------------------------------: |
| ![メイン画面](assets/screenshots/main-ja.png) | ![プロバイダ追加](assets/screenshots/add-ja.png) |

## ダウンロード

### 動作環境

- **Windows**: Windows 10 以上
- **macOS**: macOS 12 (Monterey) 以上
- **Linux**: Ubuntu 22.04+ / Debian 11+ / Fedora 34+ など主要ディストリビューション

### 配布物

この Fork で現在配布しているファイルは次の通りです。

- **Windows**: `CC-Switch-v{version}-Windows-Portable.zip`
- **macOS**: `CC-Switch-v{version}-macOS.zip`
- **Linux**: `CC-Switch-v{version}-Linux-x86_64.deb`

ダウンロード先:

- [Fork Releases](https://github.com/kongkongyo/cc-switch/releases)

## 更新方式

- アプリはこの Fork リポジトリの Releases を確認します
- 新しいバージョンがあれば、Release ページを開いて手動更新する方式です
- `TAURI_SIGNING_PRIVATE_KEY` を使う自動アップデートチェーンは使っていません

## クイックスタート

1. **プロバイダ追加**: 「追加」をクリックし、プリセットまたはカスタム設定を作成
2. **プロバイダ切替**:
   - メイン画面で選択して「有効化」
   - システムトレイから直接切替
3. **反映**: ターミナルまたは対象 CLI を再起動
4. **公式ログインへ戻す**: 公式プリセットを追加し、各 CLI のログイン / OAuth フローを実行

## データ保存先

- **データベース**: `~/.cc-switch/cc-switch.db`
- **ローカル設定**: `~/.cc-switch/settings.json`
- **バックアップ**: `~/.cc-switch/backups/`
- **Skills**: `~/.cc-switch/skills/`
- **Skill バックアップ**: `~/.cc-switch/skill-backups/`

## 開発

### 必要環境

- Node.js 18+
- pnpm 8+
- Rust 1.85+
- Tauri CLI 2.8+

### よく使うコマンド

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm format
pnpm format:check
pnpm test:unit
pnpm build
pnpm tauri build --debug
```

### Rust 側

```bash
cd src-tauri
cargo fmt
cargo clippy
cargo test
cargo test --features test-hooks
```

## 技術スタック

- **Frontend**: React 18、TypeScript、Vite、TailwindCSS、TanStack Query
- **Backend**: Tauri 2、Rust、serde、tokio、thiserror
- **Testing**: vitest、MSW、@testing-library/react

## プロジェクト構成

```text
├── src/                      # フロントエンド
├── src-tauri/                # Rust バックエンド
├── tests/                    # フロントエンドテスト
└── assets/                   # 画像・素材
```

## 貢献

Issue や提案は歓迎です。

PR の前に以下を確認してください。

- `pnpm typecheck`
- `pnpm format:check`
- `pnpm test:unit`

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=farion1231/cc-switch&type=Date)](https://www.star-history.com/#farion1231/cc-switch&Date)

## ライセンス

MIT © Jason Young
