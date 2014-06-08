var Client = require('node-rest-client').Client,
    clientOptions = {
      connection: {
        rejectUnauthorized: true,
        requestCert: true,
      }
    },
    client = new Client(clientOptions),

    client_id = process.argv[2],
    client_secret = process.argv[3],

    params = {
      'data': {
        'grant_type' : 'client_credentials',
        'scope' : '*'
      },
      'headers': {
        'Content-Type' : 'application/json',
        'Authorization' : 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
      }
    };


client.post('https://api.fronter.com/oauth/token', params, function (data, response) {
   console.log(data);
}).on('error', function (err) {
  console.log('err: ', err);
});
