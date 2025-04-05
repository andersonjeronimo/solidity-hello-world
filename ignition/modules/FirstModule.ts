// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FirstModule = buildModule("FirstModule", (m) => {
  const greet = "Hello World";
  const constract = m.contract("FirstSmartContract", [greet]);

  return { constract };
});

export default FirstModule;
