Pratice project

A Url shortener with a qr code generator

APIs used:

- url shortener: https://spoo.me/api
- qrCode generator: https://goqr.me/api/

HTML, CSS, Javascript, Node.js, EJS

How to run:
1. Open root file in code editor ;
2. cd to root directory ;
3. run npm install ;
4. deal with the process.env (see the point 6 below);
5. run it with " nodemon app.js ";

6. if you will only run locally, in the app.js file just replace all the process.env. variables (line 9 and 10 only) with the api base Url's.
If you prefer to hide those Urls, leave the app.js as it is and instead, in the root directory of the project create a file named " .env " , copy the content of example.env file , paste it into your created .env file and assign your Urls to the specific variables. Note that if you use different APIs , the get requests will need, most likely to be changed accordingly to your chosen APIs.
