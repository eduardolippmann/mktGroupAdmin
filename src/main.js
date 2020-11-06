const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const getGroupDiscount = require('./core/getGroupDiscount.js');
const deleteGroupDiscount = require('./core/deleteGroupDiscount.js');
const finalizeGroupDiscount = require('./core/finalizeGroupDiscount.js');
const createGroupDiscount = require('./core/createGroupDiscount.js');
const addSubscriber = require('./core/addSubscriber.js');
const getSubscribers = require('./core/getSubscribers.js');

const app = express();

main(); // Explicit entry point

function main() {
    app.use(bodyParser.json());
    
    setupRoutes();
    
    app.use(express.static(path.resolve(__dirname, 'web/public/')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'web/public/index.html')));
    
    restoreStorage();
    
    app.listen(3000, () => {
        console.log(`Example app listening at http://localhost:3000`);
    });
}

function restoreStorage() {
    let groupDiscountsData = fs.readFileSync("src/core/storage/defaultGroupDiscounts.json");
    fs.writeFileSync("src/core/storage/groupDiscounts.json", groupDiscountsData);
    let subscribersData = fs.readFileSync("src/core/storage/defaultSubscribers.json");
    fs.writeFileSync("src/core/storage/subscribers.json", subscribersData);
}

function setupRoutes() {
    app.post('/ajax/hello', (req,res) => res.json('Hello you'));
    app.post('/ajax/getGroups', (req,res) => {
        let filter = req.body.filter;
        getGroupDiscount(filter, (err, data)=>{
            res.json(data)
        });
    });
    app.post('/ajax/getNumberOfSubscribers', (req,res) => {
        let id = req.body.id;
        getSubscribers({id:id}, (err, data)=>{
            res.json(data.length)
        });
    });
    app.post('/ajax/deleteGroup', (req,res) => {
        let id = req.body.id;
        deleteGroupDiscount({id:id}, (err, data)=>{
            res.json(data);
        });
    });
    app.post('/ajax/finalizeGroup', (req,res) => {
        let id = req.body.id;
        finalizeGroupDiscount({id:id}, (err, data)=>{
            res.json(data);
        });
    });
    app.post('/ajax/createGroup', (req,res) => {
        let group = req.body.group;
        createGroupDiscount(group, (err, data)=>{
            res.json(data);
        });
    });
    app.post('/ajax/getSubscribers', (req,res) => {
        getSubscribers(null, (err, data)=>{
            res.json(data)
        });
    });
    app.post('/ajax/subscribe', (req,res) => {
        let group = req.body.subscription;
        addSubscriber(group, (err, data)=>{
            res.json(data);
        });
    });
}