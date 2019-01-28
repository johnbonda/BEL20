module.exports = async function () {
  console.log('enter dapp init')

  app.registerContract(1000, 'bst.transfer')
  app.registerContract(1001, 'bst.transferFrom')
  app.registerContract(1002, 'bst.approve')
  app.registerContract(1003, 'best.testMint')
  


  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}