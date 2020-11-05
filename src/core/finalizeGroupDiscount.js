module.exports = finalizeGroupDiscount;

const fs = require('fs');

function finalizeGroupDiscount(filter, cb) {
    let groupDiscounts;
    let subscribers;
    let groupToFinalize;
    let subscribersToSend;
    let discount;
    let ret = {};
    fs.readFile("src/core/storage/groupDiscounts.json", (err, data)=>{
        if(err) {
            cb(err, null);
            return;
        }
        groupDiscounts=JSON.parse(data.toString());
        groupToFinalize= groupDiscounts[filter.id];
        fs.readFile("src/core/storage/subscribers.json", (err, data)=>{
            if(err) {
                cb(err, null);
                return;
            }
            subscribers=JSON.parse(data.toString());
            subscribersToSend = subscribers[filter.id] || [];
            discount = calculateDiscount(groupToFinalize.discountRules, subscribersToSend.length);
            for(var i =0; i < subscribersToSend.length; i++) {
                console.log(`Mail sent to: ${subscribersToSend[i].lastName}, ${subscribersToSend[i].firstName} with ${discount}% discount code`);
            }
            cb(null, ret);
        });
    });
}

function calculateDiscount(rules, numberOfPeople) {
    for(var i = rules.length-1; i>=0; i--) {
        if(numberOfPeople >= rules[i].requirePeople) {
            return rules[i].discount;
        }
    }
    return 0;
}