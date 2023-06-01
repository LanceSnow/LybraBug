import { expect } from "chai";
import { ethers } from "hardhat";
import { Lybra } from "../typechain/Lybra";
import { Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MockLybra } from "../typechain/MockLybra";
import { PriceFeed } from "../typechain";

describe("LybraFund Bug", function () {
    let owner: SignerWithAddress, userA: SignerWithAddress, Attacker: SignerWithAddress;
    let _lybra: MockLybra;
    let _priceFeed: PriceFeed;
    // let _esLBRMinerV2: esLBRMinerV2;
    // let _helper;
    // let _boost;
    let _fund;
    let _eslbr;
    let _lbr;


    beforeEach(async function () {
        [owner, userA, Attacker] = await ethers.getSigners();
        const Lybra__fac = await ethers.getContractFactory("MockLybra");
        _lybra = await Lybra__fac.deploy();

        const Price__fac = await ethers.getContractFactory("PriceFeed");
        _priceFeed = await Price__fac.deploy();
        await _lybra.setPriceFeed(_priceFeed.address);
        await _priceFeed.setPrice(1500);

        const LybraFund__fac = await ethers.getContractFactory("LybraFund");
        _fund = await LybraFund__fac.deploy(_lybra.address);

        const esLBR__fac = await ethers.getContractFactory("esLBR");
        _eslbr = await esLBR__fac.deploy(_fund.address);

        const LBR__fac = await ethers.getContractFactory("LBR");
        _lbr = await LBR__fac.deploy(_fund.address);

        await _fund.setTokenAddress(_eslbr.address, _lbr.address);

    })

    it("Reentrancy Attack", async function () {
        
        //Mock
        await _lbr.connect(Attacker).migrate(ethers.utils.formatEther("100000"));

    });
});
