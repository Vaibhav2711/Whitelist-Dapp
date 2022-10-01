This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Whitelist-Dapp Frontend

This is a frontend for the Whitelist Dapp. To run the development server point at the my-app directory as execute. Apart from regular react libraries this frontend also has to dependencies to enable the frontend to interact with the goerli testnet.

### Web3Modal

eb3Modal is an easy to use library to help developers easily allow their users to connect to your dApps with all sorts of different wallets. By default Web3Modal Library supports injected providers like (Metamask, Dapper, Gnosis Safe, Frame, Web3 Browsers, etc) and WalletConnect, You can also easily configure the library to support Portis, Fortmatic, Squarelink, Torus, Authereum, D'CENT Wallet and Arkane.

To install the library use
```bash
npm install web3modal
```

### Ether.js

This library is used to connnect the blockchain with the frontend

```bash
npm install ethers
```
To change the styling of the website update the styling in styles/Home.modules.css. The image is stored in my-app/public folder.

Update the address and abi of your contract in constants/index.js. To get the abi of your contract go to your hardhat-tutorial/artifacts/contracts/Whitelist.sol folder and from your Whitelist.json file get the array marked under the "abi" key.

Run the development server using...

```bash
npm run dev
```
