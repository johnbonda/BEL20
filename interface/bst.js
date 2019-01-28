app.route.post('/balanceOf', async function(req, cb){
    var balance = await app.model.Wallet.findOne({
        condition: {
            owner: req.query.address
        }
    });
    if(!balance) return {
        error: "Account not found",
        isSuccess: false
    }
    return {
        address: req.query.address,
        balance: balance.amount,
        isSuccess: true
    }
});

app.route.post('/allowance', async function(req, cb){
    var allowance = await app.model.Approve.findOne({
        condition: {
            owner: req.query.owner,
            spender: req.query.spender
        }
    });
    if(!allowance) return {
        allowance: '0',
        isSuccess: true
    }
    return {
        allowance: allowance.amount,
        isSuccess: true
    }
})

app.route.post('/transferEvents', async function(req, cb){
    var transferEvents = await app.model.Transferevent.findAll({
        limit: req.query.limit,
        offset: req.query.offset
    });
    return transferEvents;
})

app.route.post('/approvalEvents', async function(req, cb){
    var approvalEvents = await app.model.Approvalevent.findAll({
        limit: req.query.limit,
        offset: req.query.offset
    });
    return approvalEvents;
})

app.route.post('/transferEvents/from/to', async function(req, cb){
    var transferEvents = await app.model.Transferevent.findAll({
        condition: {
            from: req.query.from,
            to: req.query.to
        },
        limit: req.query.limit,
        offset: req.query.offset
    });
    return transferEvents;
})

app.route.post('/transferEvents/from', async function(req, cb){
    var transferEvents = await app.model.Transferevent.findAll({
        condition: {
            from: req.query.from
        },
        limit: req.query.limit,
        offset: req.query.offset
    });
    return transferEvents;
})

app.route.post('/transferEvents/to', async function(req, cb){
    var transferEvents = await app.model.Transferevent.findAll({
        condition: {
            to: req.query.to
        },
        limit: req.query.limit,
        offset: req.query.offset
    });
    return transferEvents;
})

app.route.post('/approvalEvents/owner/spender', async function(req, cb){
    var approvalEvents = await app.model.Approvalevent.findAll({
        condition: {
            owner: req.query.owner,
            spender: req.query.spender
        },
        limit: req.query.limit,
        offset: req.query.offset
    });
    return approvalEvents;
})

app.route.post('/approvalEvents/owner', async function(req, cb){
    var approvalEvents = await app.model.Approvalevent.findAll({
        condition: {
            owner: req.query.owner
        },
        limit: req.query.limit,
        offset: req.query.offset
    });
    return approvalEvents;
})

app.route.post('/approvalEvents/spender', async function(req, cb){
    var approvalEvents = await app.model.Approvalevent.findAll({
        condition: {
            spender: req.query.spender
        },
        limit: req.query.limit,
        offset: req.query.offset
    });
    return approvalEvents;
})