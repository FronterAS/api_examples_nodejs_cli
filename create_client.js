var Client = require('node-rest-client').Client,
    clientOptions = {
      connection: {
        rejectUnauthorized: false,
        requestCert: true,
      }
    },
    client = new Client(clientOptions),
    tokenArgs = {
      'data': {
        'grant_type':'client_credentials',
        'client_id':'foo',
        'client_secret':'bar',
        'scope':'*'
      },
      headers: {
        'Content-Type':'application/json'
      }
    };

// first get access_token with existing client credentials.
client.post('https://api.fronter.com/oauth/token', tokenArgs, function (data, response) {
   console.log("token for existing client", data);

    var getArgs = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data['token_type'] + ' ' + data['access_token']
      }
    },
    postArgs = {
      headers: getArgs['headers'],
      data: {
        'client_secret': 'bar',
        'description': 'A dummy client',
        'scope': 'user'
      }
    };

    client.post('https://api.fronter.com/clients', postArgs, function (data, response) {
      console.log('created new client', JSON.parse(data));
      data = JSON.parse(data);

      tokenArgs['data']['client_id'] = data.client_id;
      tokenArgs['data']['client_secret'] = 'bar';

      client.post('https://api.fronter.com/oauth/token', tokenArgs, function (data, response) {
        console.log("received new token", data);
      }).on('error', function (err) {
        console.log('err: ', err);
      });

    }).on('error', function (err) {
      console.log('err: ', err);
    });

}).on('error', function (err) {
  console.log('err: ', err);
});
