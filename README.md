
Before running examples:

    npm install

Example of getting client:

    node get_client.js

Example of creating client:

    node create_client.js


Example of missing stored token - will retrieve the token:

    node get_client_expiredtoken.js

Example of using stored token:

    node get_client_expiredtoken.js 'bearer <copy the token from last example>'

If you now run the previous example after token has expired (60 minutes), the token gets refreshed and client is retrieved

    node get_client_expiredtoken.js 'bearer <copy the token from last example>'
