const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const getGroupDiscount = require('./core/getGroupDiscount.js');
const deleteGroupDiscount = require('./core/deleteGroupDiscount.js');
const createGroupDiscount = require('./core/createGroupDiscount.js');

const app = express();
app.use(bodyParser.json());

app.post('/ajax/hello', (req,res) => res.json('Hello you'));
app.post('/ajax/getGroups', (req,res) => {
    getGroupDiscount({all:true}, (err, data)=>{
        res.json(data)
    });
});
app.post('/ajax/deleteGroup', (req,res) => {
    let id = req.body.id;
    deleteGroupDiscount({id:id}, (err, data)=>{
        res.json(data);
    });
});
app.post('/ajax/createGroup', (req,res) => {
    let group = req.body.group;
    createGroupDiscount(group, (err, data)=>{
        res.json(data);
    });
});

app.use(express.static(path.resolve(__dirname, 'web/public/')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'web/public/index.html')));

restoreStorage();

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});

function restoreStorage() {
    let data = fs.readFileSync("src/core/storage/defaultGroupDiscounts.json");
    fs.writeFileSync("src/core/storage/groupDiscounts.json", data);
}