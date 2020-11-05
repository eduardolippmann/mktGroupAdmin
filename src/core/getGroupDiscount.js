module.exports = getGroupDiscount;

const fs = require('fs');

function getGroupDiscount(filter, cb) {
    let ret = {};
    let groupDiscounts;
    fs.readFile("src/core/storage/groupDiscounts.json", (err, data)=>{
        if(err) {
            cb(err, null);
            return;
        }
        groupDiscounts=JSON.parse(data.toString());
        if(filter.all) {
            ret.groups=groupDiscounts;
            cb(null, ret);
            return;
        }
        if(Array.isArray(filter.ids)) {
            ret.groups={};
            for(var i = 0; i < filter.ids.length; i++) {
                if(groupDiscounts[filter.ids[i]]) {
                    ret.groups[filter.ids[i]] = groupDiscounts[filter.ids[i]]
                }
            }
            cb(null, ret);
        }
    });
}