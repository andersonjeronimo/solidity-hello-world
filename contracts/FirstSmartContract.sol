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