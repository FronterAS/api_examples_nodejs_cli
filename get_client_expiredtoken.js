'use strict';

var Client = require('node-rest-client').Client,
    clientOptions = {
        connection: {
            rejectUnauthorized: false,
            requestCert: true,
        }
    },
    client = new Client(clientOptions),
    authData = {
        'grant_type':'client_credentials',
        'client_id':'foo',
        'client_secret':'bar',
        'scope':'*'
    },
    storedAuthToken = process.argv[2]; //simulation of local storage

var getAuthToken = function (data, callback){
    var tokenArgs = {
        'data': data,
        headers: {
            'Content-Type':'application/json'
        }
    };

    client.post('https://api.fronter.com/oauth/token', tokenArgs, function (data, response) {
        console.log('authorize: ', data);
        storedAuthToken=data.token_type + ' ' + data.access_token;
        callback(storedAuthToken);
    }).on('error', function (err) {
        console.log('err: ', err);
    });
};

var getClient = function(client_id, authToken, authData, callback){
    var clientArgs = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
    };
    //if token missing, call getAuthToken with callback to myself, clear the authData parameter for preventing infinite loop
    if(!authToken) {
        getAuthToken(authData,function(newAuthToken){getClient(client_id,newAuthToken,{},callback);});
    } else {
        client.get('https://api.fronter.com/clients/' + client_id, clientArgs, function (data, response) {
            console.log('clientInternal: ', data);
            if(JSON.parse(data).error === 'token_expired') {
                getAuthToken(authData,function(newAuthToken){getClient(client_id,newAuthToken,{},callback);});
            }
            else
              callback(data);
        }).on('error', function (err) {
            //if token expired, call getAuthToken with callback to myself, clear the authData parameter for preventing infinite loop
            console.log('err: ', err);
        });
    }
};

var getClientCallback = function(data){
    console.log('getClientCallback: ' + data);
};


getClient(authData.client_id, storedAuthToken, authData, getClientCallback);
