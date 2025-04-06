# Hello World com Solidity + Hardhat

Este projeto demonstra um caso de uso básico do Hardhat. Ele vem com um contrato de amostra, um teste para esse contrato e um módulo Hardhat Ignition que implementa esse contrato.

1. Crie o repositório no [Github](https://github.com/) chamado `FirstSmartContract (exemplo)`
2. Clone localmente com comando
```git clone https://github.com/[your github username]/FirstSmartContract.git (exemplo)```
4. Com editor de código [Visual Studio Code](https://code.visualstudio.com/download), abra a pasta do projeto recém clonado
5. Abra o console integrado do **Visual Studio Code** com o atalho `CTRL + '` ou no menu `View -> Terminal`
6. Inicie um projeto [Node](https://nodejs.org/pt) com o comando ```npm init -y```
7. Instale o [Hardhat](https://hardhat.org/) com o comando ```npm i -D hardhat```
8. Inicialize um projeto [Typescript](https://www.typescriptlang.org/) [Hardhat](https://hardhat.org/) com o comando ```npx hardhat init```
9. Instale a biblioteca [contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) do [OpenZeppelin](https://www.openzeppelin.com/) com o comando ```npm i -D @openzeppelin/contracts```
10. Altere o contrato gerado no passo `7` (diretório `./contracts/Lock.ts`) da seguinte forma, renomeando o arquivo `Lock.ts` para `FirstSmartContract.ts`:
```
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";  

contract FirstSmartContract is Ownable {
    string public greet;  

    constructor(string memory _greet) Ownable(msg.sender) {
        greet = _greet;
    }

}
```
10. Configure o arquivo `hardhat.config.ts` assim: 
```
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";  

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      }
    }
  }
};
export default config;
```

11. Configure o módulo de deploy do `Ignition` (diretório `./ignition/modules/`) assim, renomeando-o como `FirstModule.ts`:
```
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";  

const FirstModule = buildModule("FirstModule", (m) => {
  const greet = "Hello World";
  const constract = m.contract("FirstSmartContract", [greet]); 

  return { constract };
});  

export default FirstModule;
```
12. E o arquivo de `testes` (diretório `./test`) assim:
```
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
```
13. Execute o comando ```npx hardhat compile```
14. Suba (e mantenha ativa) a rede local com o comando ```npx hardhat node```
15. A partir de agora, abra outro terminal com o atalho `CTRL + SHIFT + '` para todos os comandos seguintes
16. No novo terminal, execute o comando ```npx hardhat test```. Se tudo correr bem (passar nos testes), prossiga para o próximo passo
17. Faça `deploy` localmente com o comando ```npx hardhat ignition deploy ignition/modules/FirstModule.ts --network local```
18. O resultado será:
```
Hardhat Ignition 🚀
Deploying [ FirstModule ]
Batch #1
Executed FirstModule#FirstSmartContract
[ FirstModule ] successfully deployed 
🚀Deployed Addresses
FirstModule#FirstSmartContract - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```	

	
20. Guarde o endereço do contrato gerado no `deploy`. Neste exemplo, o endereço gerado foi `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
21. Para interagir com o contrato localmente, execute o comando ```npx hardhat console --network local```
22. No prompt que iniciou, use o comando ```const Contract = await ethers.getContractFactory('FirstSmartContract');```
23. Depois execute o comando a seguir, utilizando o endereço do contrato gerado no `deploy` (passo `17`):
```
const contract = await Contract.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
```
25. Finalmente, execute o comando ```await contract.greet();```
26. O resultado deverá ser: ```Hello World```
27. Congratulations! 🚀🚀🚀
