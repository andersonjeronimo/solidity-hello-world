import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("HelloWorld", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const greet = "Hello World";
    const FirstSmartContract = await hre.ethers.getContractFactory("FirstSmartContract");
    const contract = await FirstSmartContract.deploy(greet);

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right greet", async function () {
      const { contract } = await loadFixture(deployFixture);
      expect(await contract.greet()).to.equal("Hello World");
    });

    it("Should set the right owner", async function () {
      const { contract, owner } = await loadFixture(deployFixture);
      expect(await contract.owner()).to.equal(owner.address);
    });
   
  });

});
