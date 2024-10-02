require('dotenv').config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const { metamask_private_key, INFURA_API_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// Replace this private key with your Rinkeby account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts


const etherscanAPIKey = "_____etherscan____api_____key______";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${metamask_private_key}`],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/PROJECT_ID",
      accounts: [`0x${metamask_private_key}`],
    },
  },
  etherscan: {
    apiKey: etherscanAPIKey,
  },
};