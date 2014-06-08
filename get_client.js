var Client = require('node-rest-client').Client,
    clientOptions = {
      connection: {
        rejectUnauthorized: true,
        requestCert: true,
      }
    },
    client = new Client(clientOptions),

    token = process.argv[2],
    client_id = process.argv[3],

    params = {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'bearer ' + token
      }
    };

client.get('https://api.fronter.com/clients/' + client_id, params, function (data, response) {
  console.log(data);
}).on('error', function (err) {
  console.error(' get error: ', err);
});

client.on('error', function (err) {
 console.error(' client error : ', err);
});
