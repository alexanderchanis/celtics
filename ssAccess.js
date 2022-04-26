var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cs20:cs20admin@cluster0.oa3ko.mongodb.net/?retryWrites=true&w=majority";	// connection string goes here
// const puppeteer = require('puppeteer');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;



http.createServer(function (req, res) {
    // console.log("hi");
    res.writeHead(200, {'Content-Type': 'text/html'});
    MongoClient.connect(url, {useUnifiedTopology: true}, 
      async function(err, db) {
      if(err) { return console.log(err); return;}
      var dbo = db.db("nba");
      var coll = dbo.collection('players');

        res.write("<table style='border: 1px solid; width: 100%; border-collapse: collapse'>");        
        res.write("<tr>");
        res.write("<th style='border: 1px solid; width: 40%'> Name </th>");
        res.write("<th style='border: 1px solid; width: 10%'> PTS </th>");
        res.write("<th style='border: 1px solid; width: 10%'> REB </th>");
        res.write("<th style='border: 1px solid; width: 10%'> AST </th>");
        res.write("<th style='border: 1px solid; width: 10%'> STL </th>");
        res.write("<th style='border: 1px solid; width: 10%'> BLK </th>");
        res.write("<th style='border: 1px solid; width: 10%'> TO </th>");
        res.write("</tr>");

       await coll.find().forEach(function(doc) {
        // res.write("<table hidden id='" + doc["_id"] + "></table>");
          // res.write("<table hidden style='border: 1px solid' id='" + doc["_id"] + "></table>");

        res.write("<tr style='border: 1px solid'>");
        res.write("<td style='border: 1px solid'>" + doc["Name"] + "</td>");
        res.write("<td style='border: 1px solid'>" + doc["PTS"] + "</td>");
        res.write("<td style='border: 1px solid'>" + doc["REB"] + "</td>");
        res.write("<td style='border: 1px solid'>" + doc["AST"] + "</td>");
        res.write("<td style='border: 1px solid'>" + doc["STL"] + "</td>");
        res.write("<td style='border: 1px solid'>" + doc["BLK"] + "</td>");
        res.write("<td style='border: 1px solid'>" + doc["TO"] + "</td>");
        res.write("</tr>");
        
    })
    res.write("</table>");

    // res.write("<script>console.log(document.getElementById('1').innerHTML)</script>");

    // console.log(typeof(getElementById("1")))
    // <script>
    // res.write(typeof(getElementById("1")));
    // </script>
      
    }) 

    //   res.end();
    }).listen(8080);