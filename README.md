## Overview
Development environment for GAS with React + TypeScript + Vite + Clasp (node v20.1.0)

### Local Environment
1. Install packages
```
npm i 
```

2. Start dev server
```
npm run dev
```
> [!WARNING]
> The server side won't work locally without being converted to GAS, so only the client side can be tested in the local environment.

### Deployment Method
1. Log in with your Google account
```
clasp login
```
2. Build
```
npm run build
```
3. Deploy
```
npm run deploy
```
> [!WARNING]
> Set the ID of the spreadsheet you are using in the scriptId of .clasp.json


## 概要
React + TypeScript + Vite + ClaspでGASの開発環境(node v20.1.0)

### ローカル環境
1. パッケージのインストール
```
npm i 
```

2. devサーバー立ち上げ
```
npm run dev
```
> [!WARNING]
> server側はgasに変換しないと動かないため、ローカル環境ではクライアント側しか動作確認は行えません

### デプロイ方法
1. Googleアカウントでログイン
```
clasp login
```
2. ビルド
```
npm run build
```
3. デプロイ
```
npm run deploy
```
> [!WARNING]
> 使用するスプレッドシートのIDは.clasp.jsonのscriptIdに設定してください

