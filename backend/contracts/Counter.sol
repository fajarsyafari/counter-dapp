// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    function increment() public {
        count++;
    }

    function decrement() public {
        require(count > 0, "Cannot go below zero");
        count--;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
