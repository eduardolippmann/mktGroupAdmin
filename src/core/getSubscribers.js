module.exports = getSubscribers;

const fs = require('fs');

function getSubscribers(filter, cb) {
    let subscribers;
    fs.readFile("src/core/storage/subscribers.json", (err, data)=>{
        if(err) {
            cb(err, null);
            return;
        }
        subscribers=JSON.parse(data.toString());
        
        cb(null, subscribers);
    });
}