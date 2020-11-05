module.exports = addSubscriber;

const fs = require('fs');

function addSubscriber(subscriberInfo, cb) {
    let subscribers;
    fs.readFile("src/core/storage/subscribers.json", (err, data)=>{
        if(err) {
            cb(err, null);
            return;
        }
        subscribers=JSON.parse(data.toString());
        if(!subscribers[subscriberInfo.groupId]) {
            subscribers[subscriberInfo.groupId] = [];
        }
        subscribers[subscriberInfo.groupId].push(subscriberInfo);
        fs.writeFile("src/core/storage/subscribers.json", JSON.stringify(subscribers, null, 4), ()=> {
            cb(null, {});
        });
    });
}