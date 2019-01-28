module.exports = {

    transfer: async function(to, amount){
        var toBal = await app.model.Wallet.findOne({
            condition: {
                owner: to
            }
        });

        if(!toBal) return 'To address not found';

        var fromBal = await app.model.Wallet.findOne({
            condition: {
                owner: this.trs.senderId
            }
        });
        if(fromBal.amount <  amount) return 'Insufficient funds in your account';

        app.sdb.update('wallet', {amount: Number(fromBal.amount) - amount}, {owner: this.trs.senderId});
        app.sdb.update('wallet', {amount: Number(toBal.amount) + amount}, {owner: to});

        module.exports.TransferEvent(this.trs.senderId, to, amount);

    },

    transferFrom: async function(from, to, amount){
        var fromBal = await app.model.Wallet.findOne({
            condition: {
                owner: from
            }
        });
        if(!fromBal) return "Invalid from address";

        var toBal = await app.model.Wallet.findOne({
            condition: {
                owner: to
            }
        });
        if(!toBal) return "Invalid to address";

        var approved = await app.model.Approve.findOne({
            condition: {
                owner: from,
                spender: this.trs.senderId
            }
        });
        if(!approved || Number(approved.amount) < amount) return 'You have insufficient allowance from From address';

        if(fromBal.amount <  amount) return 'Insufficient funds in from address';

        app.sdb.update('wallet', {amount: Number(fromBal.amount) - amount}, {owner: from});
        app.sdb.update('wallet', {amount: Number(toBal.amount) + amount}, {owner: to});
        app.sdb.update('approve', {amount: Number(approved.amount) - amount}, {owner: from, spender: this.trs.senderId});

        module.exports.TransferEvent(from, to, amount);
    },

    approve: async function(spender, amount){
        var spenderCheck = await app.model.Wallet.exists({
            owner: spender
        });
        if(!spenderCheck) return "Invalid spender address";

        var approvalCheck = await app.model.Approve.exists({
            owner: this.trs.senderId,
            spender: spender
        });

        if(approvalCheck)
            app.sdb.update('approve', {amount: amount}, {owner: this.trs.senderId, spender: spender});
        else    
            app.sdb.create('approve', {
                owner: this.trs.senderId,
                spender: spender,
                amount: amount
            });
        
            module.exports.ApprovalEvent(this.trs.senderId, spender, amount);
    },

    TransferEvent: function(from, to, amount){
        app.sdb.create('transferevent', {
            from: from,
            to: to,
            amount: amount
        });
    },

    ApprovalEvent: function(owner, spender, amount){
        app.sdb.create('approvalevent', {
            owner: owner,
            spender: spender,
            amount: amount
        });
    },

    testMint: async function(amount){
        var bal = await app.model.Wallet.findOne({
            condition: {
                owner: this.trs.senderId
            }
        });
        if(!bal) {
            app.sdb.create('wallet', {
                owner: this.trs.senderId,
                amount: amount
            })
        }
        else{
            app.sdb.update('wallet', {amount: Number(bal.amount) + amount}, {owner: this.trs.senderId});
        }
    }
}