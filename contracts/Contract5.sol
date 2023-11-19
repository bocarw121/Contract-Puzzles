// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "hardhat/console.sol";

contract Game5 {
    bool public isWon;

    address threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;

    function win() external {
        console.log(msg.sender, "sender");
        console.log(threshold, "threshold");
        require(bytes20(msg.sender) < bytes20(threshold), "Nope. Try again!");

        isWon = true;
    }
}
