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

client.post('https://api.fronter.com/oauth/token', tokenArgs, function (data, response) {
    console.log(data);

    var clientArgs = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data['token_type'] + ' ' + data['access_token']
      }
    };

    client.get('https://api.fronter.com/planning/users/12345', clientArgs, function (data, response) {
      console.log(data);
    }).on('error', function (err) {
      console.log('err: ', err);
    });

}).on('error', function (err) {
  console.log('err: ', err);
});
