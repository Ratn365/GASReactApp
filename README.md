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
yarn logout
```
```
yarn login
```
2. Setup
```
yarn setup
yarn open
```
3. Deploy
```
yarn deploy
```

4. Build
```
yarn build
```
> [!WARNING]
> Set the ID of the spreadsheet you are using in the scriptId of .clasp.json

 