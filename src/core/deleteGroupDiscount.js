module.exports = deleteGroupDiscount;

const fs = require('fs');

function deleteGroupDiscount(filter, cb) {
    let ret = {};
    fs.readFile("src/core/storage/groupDiscounts.json", (err, data)=>{
        if(err) {
            cb(err, null);
            return;
        }
        groupDiscounts=JSON.parse(data.toString());
        if(filter.id) {
            delete groupDiscounts[filter.id];
            fs.writeFile("src/core/storage/groupDiscounts.json", JSON.stringify(groupDiscounts, null, 4), ()=> {
                cb(null, ret);
            });
            return;
        }
    });
}