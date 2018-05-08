import * as firebase from "firebase";
import React, { Component } from 'react';
import {Button,Alert,AsyncStorage} from 'react-native';
import MlivConstants from '../utils/constants'


const firebaseConfig = {
  apiKey: "AIzaSyA6BvWbNH4AoVI_j4p4-HlkH7L6xVRNSWI",
  authDomain: "hytteroger.firebaseapp.com",
  databaseURL: "https://hytteroger.firebaseio.com",
  storageBucket: "hytteroger.appspot.com",
};
	var currentUser = null;

var firebaseApp = {};
var thisState;

module.exports =
{

	initializeAppConfig(config,reactComponent)
	{


		firebaseApp = firebase.initializeApp(config);
		thisState =  reactComponent;
		console.log(thisState.state)
	},

	async signup(email, pass) 
	{

	    try {
	        await firebase.auth()
	            .createUserWithEmailAndPassword(email, pass);
	            this.initilazieUser();

	        console.log("Account created");

	        // Navigate to the Home page, the user is auto logged in

	    } catch (error) {
	        console.log(error.toString())
	            	Alert.alert(error.toString());
	               thisState.setState({"isLoading":false})
	    }
	},

    async login(email, pass) 
    {
    
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(email, pass);
            this.initilazieUser();

        // Navigate to the Home page

    } catch (error) {
    	Alert.alert(error.toString());
        console.log(error.toString())
               thisState.setState({"isLoading":false})
        return null
    }

	},

	async logout() 
	{

    try {

        await firebase.auth().signOut();
        console.log('logout')
        firebase.auth().onAuthStateChanged(function(user) {
	 	AsyncStorage.setItem("isSignedIn","false");
	  	AsyncStorage.setItem("userData",JSON.stringify(user));
	  	thisState.setState({"signedIn":false,"uid":"","mail":"","password":"","isLoading":false})
	  	console.log(user)

	  
	});

        // Navigate to login view
        console.log("done");


    } catch (error) {
        console.log(error.toString());
       thisState.setState({"isLoading":false})
    }

	},

	async initilazieUser()
	{
	  firebase.auth().onAuthStateChanged(function(user) {
	  	userName = thisState.state.username
	  if (user !=null) {
	  	console.log("userName" + userName)
	  	if(userName!=null && userName!="")
	  	{
	  		console.log("in")
	  	user.updateProfile({
	  		displayName: userName
	  	}).then(function() {	  	console.log(user);});}

	  	url = MlivConstants.apiUrl+"/api/fw/addUser?email="+user.email+"&uname="+userName+"&uid="+user.uid+"&userType=1"
	  	console.log(url);
	  	fetch(url)
      .then((response) => {

			jsonData = response.json();
			console.log(jsonData)

        })
      .catch((error) => {
        console.error("Error while adding data to server : "+error);
      
      });



	  	console.log(user);
	  	AsyncStorage.setItem("isSignedIn","true");
	  	AsyncStorage.setItem("userData",JSON.stringify(user));
	  	MlivConstants.userData = user;
	  	thisState.setState({"signedIn":true,"uid":user.uid,"isLoading":false,"signUp":false,"username":user.displayName})

	  	currentUser =  user;
	  	console.log(thisState.state)
	  } 
	});

	},

	getUser()
	{
		return currentUser;
	}
}

