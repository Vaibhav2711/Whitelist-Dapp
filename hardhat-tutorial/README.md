# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# Whitelist-Dapp

This dapp is for whitelisting the early supooorted of crypto-dev who are about to release their NFT Collection.The whitelist access is given to first 10 users. This project stores the address of the users who joined the whitelist and the app is accessed using the frontend created using Next.js.


The dapp is compiled and deployed using Hardhat.  The contract is deployed in the Goerli testnet and Quicknode was used to get the endpoint to the node of the testnet.

To replicate the project install all the dependencies and to configuire the test environment create a .env file in the hardhat-tutorial directory. The .env file must have following lines:

```shell
QUICKNODE_HTTP_URL="add-quicknode-http-provider-url-here"
PRIVATE_KEY="add-the-private-key-here"
```
To compile the solidity contract point to the hardhat-tutorial and execute following command:
```shell
npx hardhat compile
```
Save the addres where you deployed your smart contract as it will used for connecting the smart contract to the front-end.

To deploy, open up a terminal pointing at hardhat-tutorial directory and execute this command:
```shell
npx hardhat run scripts/deploy.js --network goerli
```


