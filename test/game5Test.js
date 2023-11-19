const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const signer = ethers.provider.getSigner(0)

      
    
    const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf"
    let address, isValid, wallet

    // while not isValid create a random wallet and address 
    while(!isValid) {
      wallet = ethers.Wallet.createRandom()
      address = await wallet.getAddress()

      if(address < threshold) {
        isValid = true

        // connect wallet to provider
        wallet = wallet.connect(ethers.provider)
      }
    }
    

    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("0.1")
    })
   
    return { game, wallet,  };
  }
  it('should be a winner', async function () {

    const { game, wallet, } = await loadFixture(deployContractAndSetVariables);

    await game.connect(wallet).win()



    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
