// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/Bridge.sol";

contract BridgeTest is Test {
    Bridge public bridge;

    function setUp() public {
        bridge = new Bridge();
        bridge.registerValidator{ value: 1 ether}(address(0), "Some tag");
    }

    function testVote() public {
        bytes memory vote = hex"00000000_00000000000000000000000000000000_00000000000000000000000000000000_000000000000000000000000_00000000000000000000000000000080_00000000000000000000000000000000_00000000000000000000000000000060";
        // console.logBytes32(bytes32(uint256(0xdeadbeef)));
        bridge.voteForNewRoot(vote);
    }
}