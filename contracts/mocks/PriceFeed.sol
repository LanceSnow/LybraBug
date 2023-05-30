// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.8.17;

interface IPriceFeed {
    function fetchPrice() external returns (uint256);
}

contract PriceFeed is IPriceFeed{
    uint256 private _price ;
    function fetchPrice() external view returns (uint256){
        return _price;
    }
    function setPrice(uint256 price_) external {
        _price = price_;
    }
}