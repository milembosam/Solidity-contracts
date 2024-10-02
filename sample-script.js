const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  // Deploying the context contract
  const Context = await hre.ethers.getContractFactory("Context");
  const context = await Context.deploy();

  await context.deployed();
  console.log("Context deployed to:", context.address);

   // Deploying the ownable contract
   const Ownable = await hre.ethers.getContractFactory("Ownable");
   const ownable = await Ownable.deploy(deployer.address);
 
   await ownable.deployed();
   console.log("Ownable deployed to:", ownable.address);

   // Deploying the ERC721 contract
   //const ERC721 = await hre.ethers.getContractFactory("ERC721");
   //const eRC721 = await ERC721.deploy(deployer.address);
 
   //await eRC721.deployed();
   //console.log("ERC721 deployed to:", eRC721.address);

   // Deploying the ZombieFactory contract
   const ZombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
   const zombieFactory = await ZombieFactory.deploy(deployer.address);
 
   await zombieFactory.deployed();
   console.log("ZombieFactory deployed to:", zombieFactory.address);

   // Deploying the ZombieFeeding contract
   const ZombieFeeding = await hre.ethers.getContractFactory("ZombieFeeding");
   const zombieFeeding = await ZombieFeeding.deploy(deployer.address);
 
   await zombieFeeding.deployed();
   console.log("ZombieFeeding deployed to:", zombieFeeding.address);

   // Deploying the ZombieHelper contract
   const ZombieHelper = await hre.ethers.getContractFactory("ZombieHelper");
   const zombieHelper = await ZombieHelper.deploy(deployer.address);
 
   await zombieHelper.deployed();
   console.log("ZombieHelper deployed to:", zombieHelper.address);

   // Deploying the ZombieAttack contract
   const ZombieAttack = await hre.ethers.getContractFactory("ZombieAttack");
   const zombieAttack = await ZombieAttack.deploy(deployer.address);
 
   await zombieAttack.deployed();
   console.log("ZombieAttack deployed to:", zombieAttack.address);

   // Deploying the ZombieOwnership contract
   const ZombieOwnership = await hre.ethers.getContractFactory("ZombieOwnership");
   const zombieOwnership = await Ownable.deploy(deployer.address);
 
   await zombieOwnership.deployed();
   console.log("ZombieOwnership deployed to:", zombieOwnership.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });