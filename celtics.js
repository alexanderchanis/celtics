var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cs20:cs20admin@cluster0.oa3ko.mongodb.net/?retryWrites=true&w=majority";	// connection string goes here
//const url = "mongodb+srv://achristie:Croppail1@cluster0.zt269.mongodb.net/cluster0?retryWrites=true&w=majority";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var port = process.env.PORT || 3000;
console.log("This goes to the console window");
http.createServer(function (req, res) {
   if (req.url == "/")
	  {
		  file = 'homepage.html';
		  fs.readFile(file, function(err, txt) {
    	  res.writeHead(200, {'Content-Type': 'text/html'});
		  res.write("This is the home page<br>");
          res.write(txt);

            MongoClient.connect(url, async function(err, db) {
     
              if(err) { return console.log(err); return;}
              var dbo = db.db("nba");
              var coll = dbo.collection('players');
			  //res.write("here <br/>");
              res.write("<table id='players' style='border: 1px solid; width: 100%; border-collapse: collapse'>");        
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
        
           var dbo = db.db("nba");
          var coll = dbo.collection('games');
          // console.log(dbo.count("games"));
          res.write("<table id='games' style='border: 1px solid; width: 100%; border-collapse: collapse; text-align: center'>")
          res.write("<tr style='border: 1px solid'>")
          res.write("<th style='border: 1px solid'>Home Team</th>");
          res.write("<th style='border: 1px solid'>Home Team Score</th>");
          res.write("<th style='border: 1px solid'>Visitors Team</th>");
          res.write("<th style='border: 1px solid'>Visitors Team Score</th>");
      
          res.write("</tr>");
          await coll.find().forEach(function(doc) {
                  res.write("<tr style='border: 1px solid'>");
                  res.write("<td style='border: 1px solid'>" + doc["homeTeam"] + "</td>");
                  res.write("<td style='border: 1px solid'>" + doc["homeTeamScore"] + "</td>");
                  res.write("<td style='border: 1px solid'>" + doc["visitorTeam"] + "</td>");
                  res.write("<td style='border: 1px solid'>" + doc["visitorTeamScore"] + "</td>");
                  res.write("</tr>");
                  // result[i] = JSON.stringify(result[i]);
                  // res.write("Company: " + result[i]["company"] + ", Ticker: " + result[i]["ticker"] + "</br>");
                  // res.write(JSON.stringify(result[i]) + "</br>");
                  // console.log(JSON.stringify(result[i]));
          })    
		  res.write("</table>");
                // res.write("</br></br>")
        
                // result[i] = JSON.stringify(result[i]);
                // res.write("Company: " + result[i]["company"] + ", Ticker: " + result[i]["ticker"] + "</br>");
                // res.write(JSON.stringify(result[i]) + "</br>");
                // console.log(JSON.stringify(result[i]));
            // console.log(typeof(getElementById("1")))
            // <script>
            // res.write(typeof(getElementById("1")));
            // </script>
              
            }) 







          //res.end();
		  });
	  }
	  else if (req.url == "/process")
	  {
		 res.writeHead(200, {'Content-Type':'text/html'});
		 res.write ("Process the form<br>");
		 pdata = "";
		 req.on('data', data => {
           pdata += data.toString();
         });

		// when complete POST data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);
			res.write ("The name is: "+ pdata['the_name']);
			res.end();
		});
		
	  }
	  else 
	  {
		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }

   
   
}).listen(port);