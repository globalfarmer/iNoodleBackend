var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var statusResponse = require('../util/statusResponse');

//firebase admin sdk
var serviceAccount = require("../config/serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://inoodle2017.firebaseio.com"
});

var ref = firebase.database().ref('node-test');
var messagesRef = ref.child('messages');

messagesRef.push({
	name: 'abcxyz'
})

for (var i = 0; i < 10; i++) {
	messagesRef.push();
}

router.get('/', (req, res) => {
	
})

module.exports = router;