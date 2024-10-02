const { expect } = require("chai");
const {duration, increase}= require("./time.js");

  let myAttackContract;
  let owner;
  let alice;
  let bob;
  const zombieNames = ["Zombie 1", "Zombie 2"];

  beforeEach(async function () {
    // Get the ZombieAttack and Signers here.
    const MyAttackContract = await ethers.getContractFactory("ZombieAttack");
    [alice, bob] = await ethers.getSigners();
   
    // console log the addresses
    //console.log("Alice address:", alice.address);
    //console.log("Bob address:", bob.address);
 
    // Deploy a new MyOwnershipContract contract for each test
    myAttackContract = await MyAttackContract.deploy(alice.address);
    await myAttackContract.deployed(); // Ensure the contract is deployed

});


describe("Zombies attacking", function () {
    it("should attack another zombie", async () => {
        //Alice to create Zombie
        const tx = await myAttackContract.connect(alice).createRandomZombie(zombieNames[0]);
        const receipt = await tx.wait();
        const event = receipt.events?.find(event => event.event === "NewZombie");
        const aliceZombie = event.args.zombieId.toNumber();
        //console.log("Created alice Zombie:", aliceZombie);

        //Bob to create Zombie
        const rx = await myAttackContract.connect(bob).createRandomZombie(zombieNames[1]);
        const Receipt = await rx.wait();
        const Event = Receipt.events?.find(event => event.event === "NewZombie");
        const bobZombie = Event.args.zombieId.toNumber();
        //console.log("Created bob Zombie:", bobZombie);
        
        //Increase the time to skip the cooldown time in the Createzombies function
        await increase(duration.days(1));

       //Alice Zombie to attack bob Zombie
       const attack = await myAttackContract.connect(alice).attack(aliceZombie, bobZombie);
       const Attack = await attack.wait();
       expect(Attack.status).to.equal(1);
      });
    });
