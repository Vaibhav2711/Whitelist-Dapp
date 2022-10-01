//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract Whitelist {
    uint8 public maxNumberofWhitelist;
    mapping(address => bool) public whitelistedAddress;
    uint8 public numberOfWhitelistedAddress;

    constructor (uint8 _maxNumberofWhitelist) {
        maxNumberofWhitelist = _maxNumberofWhitelist;
        numberOfWhitelistedAddress = 0;
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddress[msg.sender],"Account already whitelisted!!");
        require(numberOfWhitelistedAddress<maxNumberofWhitelist,"More address can't be added, limit reached!!");
        whitelistedAddress[msg.sender] = true;
        numberOfWhitelistedAddress++;
    }
}