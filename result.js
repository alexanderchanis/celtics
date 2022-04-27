const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cs20:cs20admin@cluster0.oa3ko.mongodb.net/?retryWrites=true&w=majority";	// connection string goes here
var http = require('http');
var fs = require('fs');
var qs = require('querystring');


http.createServer(function (req, res) {
  // console.log("hi");
  res.writeHead(200, {'Content-Type': 'text/html'});
  MongoClient.connect(url, {useUnifiedTopology: true}, 
    async function(err, db) {
    if(err) { return console.log(err); return;}
    var dbo = db.db("nba");
    var coll = dbo.collection('users');
    // console.log(dbo.count("games"));
    res.write("<div style='text-align: center'><h1>Your Past Picks</h1></div>")
    res.write("<table style='border: 1px solid; width: 100%; border-collapse: collapse; text-align: center'>")
    res.write("<tr style='border: 1px solid'>")
    res.write("<th style='border: 1px solid'>Date</th>");
    res.write("<th style='border: 1px solid'>Home Team</th>");
    res.write("<th style='border: 1px solid'>Visitors Team</th>");
    res.write("<th style='border: 1px solid'>Choice</th>");

    res.write("</tr>");
    await coll.find({email: "temp"}).forEach(function(doc) {
            res.write("<tr style='border: 1px solid'>");
            res.write("<td style='border: 1px solid'>" + doc["date"] + "</td>");
            res.write("<td style='border: 1px solid'>" + doc["homeTeam"] + "</td>");
            res.write("<td style='border: 1px solid'>" + doc["visitorTeam"] + "</td>");
            res.write("<td style='border: 1px solid'>" + doc["choice"] + "</td>");
            res.write("</tr>");
            // result[i] = JSON.stringify(result[i]);
            // res.write("Company: " + result[i]["company"] + ", Ticker: " + result[i]["ticker"] + "</br>");
            // res.write(JSON.stringify(result[i]) + "</br>");
            // console.log(JSON.stringify(result[i]));
    })
        // console.log(typeof(temp));

        // console.log(temp);

    // await doSomething();
    res.end();
  }) 

//   res.end();
}).listen(8080);


