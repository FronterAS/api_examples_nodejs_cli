var Client = require('node-rest-client').Client,
    clientOptions = {
      connection: {
        rejectUnauthorized: true,
        requestCert: true,
      }
    },
    client = new Client(clientOptions),

    token = process.argv[2],
    client_secret = process.argv[3],

    params = {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      data: {
        'client_secret' : client_secret,
        'description' : 'A dummy client',
        'scope' : 'user:name'
      }
    };

client.post('https://api.fronter.com/clients', params, function (data, response) {
  console.log(JSON.parse(data));
}).on('error', function (err) {
  console.log('err: ', err);
});
