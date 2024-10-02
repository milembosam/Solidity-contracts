const { expect } = require("chai");

  let myFactoryContract;
  let myOwnershipContract;
  let owner;
  let alice;
  let bob;
  const zombieNames = ["Zombie 1", "Zombie 2"];

  beforeEach(async function () {
    // Get the ZombieOwnership and Signers here.
    const MyOwnershipContract = await ethers.getContractFactory("ZombieOwnership");
    [alice, bob] = await ethers.getSigners();
   
    // console log the addresses
    //console.log("Alice address:", alice.address);
    //console.log("Bob address:", bob.address);
 
    // Deploy a new MyOwnershipContract contract for each test
    myOwnershipContract = await MyOwnershipContract.deploy(alice.address);
    await myOwnershipContract.deployed(); // Ensure the contract is deployed

});


describe("Transferring zombies with the single-step", function () {
    it("should transfer a zombie", async () => {
        const tx = await myOwnershipContract.connect(alice).createRandomZombie(zombieNames[0]);
        const receipt = await tx.wait();
        const event = receipt.events?.find(event => event.event === "NewZombie");
        const zombieId = event.args.zombieId.toNumber();
        //console.log("Created Zombie ID:", zombieId);

        // Check Initial ownership of the Zombie
        const initialOwner = await myOwnershipContract.zombieToOwner(zombieId);
        expect(initialOwner).to.equal(alice.address);

         //Transfer the token to bob and check that he is the owner
       await myOwnershipContract.connect(alice).transferFrom(alice.address, bob.address, zombieId);
        const currentOwner = await myOwnershipContract.connect(alice).ownerOf(zombieId);
        expect(currentOwner).to.equal(bob.address);
      
       const bobZombies = (await myOwnershipContract.ownerZombieCount(bob.address)).toNumber();
       const aliceZombies = (await myOwnershipContract.ownerZombieCount(alice.address)).toNumber();
       expect(bobZombies).to.equal(1);
       expect(aliceZombies).to.equal(0);
      });
    });

describe("Transferring zombies with the two-step", () => {
    it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
      // TODO: Test the two-step scenario.  The approved address calls transferFrom
      const tx = await myOwnershipContract.connect(alice).createRandomZombie(zombieNames[0]);
        const receipt = await tx.wait();
        const event = receipt.events?.find(event => event.event === "NewZombie");
        const zombieId = event.args.zombieId.toNumber();
        //console.log("Created Zombie ID:", zombieId);

        // Check Initial ownership of the Zombie
        const initialOwner = await myOwnershipContract.zombieToOwner(zombieId);
        expect(initialOwner).to.equal(alice.address);

        //Approve Bob's address
        await myOwnershipContract.connect(alice).approve(bob.address, zombieId);

         //Bob to transfer Token to himself and check that he is the owner
       await myOwnershipContract.connect(bob).transferFrom(alice.address, bob.address, zombieId);
        const currentOwner = await myOwnershipContract.connect(alice).ownerOf(zombieId);
        expect(currentOwner).to.equal(bob.address);
      
       //const bobZombies = (await myOwnershipContract.ownerZombieCount(bob.address)).toNumber();
       //const aliceZombies = (await myOwnershipContract.ownerZombieCount(alice.address)).toNumber();
      
      });
    });
   it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
        // TODO: Test the two-step scenario.  The owner calls transferFrom
        const tx = await myOwnershipContract.connect(alice).createRandomZombie(zombieNames[0]);
        const receipt = await tx.wait();
        const event = receipt.events?.find(event => event.event === "NewZombie");
        const zombieId = event.args.zombieId.toNumber();
        //console.log("Created Zombie ID:", zombieId);

        // Check Initial ownership of the Zombie
        const initialOwner = await myOwnershipContract.zombieToOwner(zombieId);
        expect(initialOwner).to.equal(alice.address);

        //Approve Bob's address
        await myOwnershipContract.connect(alice).approve(bob.address, zombieId);

         //Bob to transfer Token to himself and check that he is the owner
       await myOwnershipContract.connect(alice).transferFrom(alice.address, bob.address, zombieId);
        const currentOwner = await myOwnershipContract.connect(alice).ownerOf(zombieId);
        expect(currentOwner).to.equal(bob.address);
      
       //const bobZombies = (await myOwnershipContract.ownerZombieCount(bob.address)).toNumber();
       //const aliceZombies = (await myOwnershipContract.ownerZombieCount(alice.address)).toNumber();
      })