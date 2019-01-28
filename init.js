module.exports = async function () {
  console.log('enter dapp init')

  app.registerContract(1000, 'bst.transfer')
  app.registerContract(1001, 'bst.transferFrom')
  app.registerContract(1002, 'bst.approve')
  app.registerContract(1003, 'bst.testMint')


  app.registerFee(1000, '0', 'BEL')
  app.registerFee(1001, '0', 'BEL')
  app.registerFee(1002, '0', 'BEL')
  app.registerFee(1003, '0', 'BEL')
  


  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}