// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.8.17;

interface Ilido {
    function submit(address _referral) external payable returns (uint256 StETH);

    function withdraw(address _to) external returns (uint256 ETH);

    function balanceOf(address _account) external view returns (uint256);

    function transfer(address _recipient, uint256 _amount)
        external
        returns (bool);

    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) external returns (bool);
}

contract MockLido is Ilido {


    function submit(
        address _referral
    ) external payable override returns (uint256 StETH) {
        return 0;
    }

    function withdraw(address _to) external override returns (uint256 ETH) {
        return 0;
    }

    function balanceOf(
        address _account
    ) external view override returns (uint256) {
        return 0;
    }

    function transfer(
        address _recipient,
        uint256 _amount
    ) external override returns (bool) {}

    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) external override returns (bool) {}
}