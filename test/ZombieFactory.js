const { expect } = require("chai");

  let myContract;
  let owner;
  let alice;
  let bob;
  const zombieNames = ["Zombie 1", "Zombie 2"];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const MyContract = await ethers.getContractFactory("ZombieFactory");
    const [owner, alice, bob] = await ethers.getSigners();

    // Deploy a new MyContract contract for each test
    myContract = await MyContract.deploy(owner.address);
    await myContract.deployed(); // Ensure the contract is deployed
  });

  describe("Creating Zombies", function () {
    
    it("Should be able to create a new zombie", async function () {

      const tx = await myContract.createRandomZombie(zombieNames[0], {from : alice});
     
      // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Check the status of the transaction
    expect(receipt.status).to.equal(1);

    // Check the event logs
    const event = receipt.events?.find(event => event.event === "NewZombie");
    expect(event.args.name).to.equal(zombieNames[0]);
    });

    it("should not allow two zombies", async function () {

      await myContract.createRandomZombie(zombieNames[0], {from : alice});

      // Attempt to create a second zombie and expect it to revert
      try {
        await myContract.createRandomZombie(zombieNames[1], {from : alice});
        expect.fail("The transaction should have reverted");
    } catch (error) {
        expect(error.message).to.include("revert");
    }
    });
  });

 