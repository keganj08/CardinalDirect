const express = require('express');
const webpush = require('web-push');
const body_parser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

//vapid keys identify sender of push notification
//generated via 'web-push generate-vapid-keys' from within server/node_modules/.bin
const publicVapidKey = 'BMUZGiEE7XECrZ1UZJlqaawhJGq17kF_4emEs1g5OSzItEEe4Ezcs2ugH78Yf48a3ep3SjGqRYvNNBBppOtV-x8';
const privateVapidKey = 'rpL24G9aXwUBg3IjDU6k6KfhtrulvlmpycBxjC_nNno';

webpush.setVapidDetails('mailto:keganj08@gmail.com', publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send status 201 - resource created successfully
    res.status(201).json({});

    //Create payload
    const payload = JSON.stringify({title:'Push notification test'});

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});