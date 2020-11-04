module.exports = createGroupDiscount;
let lastId =2;

const fs = require('fs');

function createGroupDiscount(group, cb) {
    lastId++;
    group.id = lastId;
    fs.readFile("src/core/storage/groupDiscounts.json", (err, data)=>{
        if(err) {
            cb(err, null);
            return;
        }
        groupDiscounts=JSON.parse(data.toString());
        groupDiscounts[group.id] = group;
        fs.writeFile("src/core/storage/groupDiscounts.json", JSON.stringify(groupDiscounts, null, 4), ()=> {
            cb(null, {});
        });
    });
}