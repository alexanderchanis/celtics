var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cs20:cs20admin@cluster0.oa3ko.mongodb.net/?retryWrites=true&w=majority";	// connection string goes here
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var port = process.env.PORT || 3000;
console.log("This goes to the console window");

const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 3000)
  })
}

const doSomething = async () => {
  console.log(await doSomethingAsync())
}


var temp = new Date();
// document.write(temp.getDate());  
var day = temp.getDate();
var month = temp.getMonth() + 1;
var year = temp.getFullYear();
var theDate = year + '-' + month + '-' + day;
var count = 0;
var home;
var visitor;
// document.write(year + "-" + month + "-" + day);

const options = {
method: 'GET',
};

// fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + year + '-' + month + '-' + day + '?key=1c2c929991f44db1beb8bb281c7c1d52', options)
fetch("https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/2022-4-10?key=1c2c929991f44db1beb8bb281c7c1d52", options)
.then(response => {
return response.json();
})

.then(json => 
{
    // count = 0;
    for(var i = 0; i < json.length; i++) {
        if (json[i]["HomeTeam"] == "BOS" || json[i]["AwayTeam"] == "BOS") {
            home = json[i]["HomeTeam"];
            visitor = json[i]["AwayTeam"];
            // document.write(json[i]["HomeTeam"] + "<br/>")
            // document.write(json[i]["AwayTeam"] + "<br/>")
            count = 1;
        }
    }

    // document.write(JSON.stringify(json));
    // console.log(json);
})

.catch(err => console.error(err));




http.createServer(function (req, res) {
   if (req.url == "/")
	  {
		  file = 'homepage.html';
                  
		  fs.readFile(file, function(err, txt) {
                          
        
    	  res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(txt);
          res.write("<link rel='stylesheet' href='https://github.com/alexanderchanis/celtics/blob/main/ext.css'>");
          

            MongoClient.connect(url, async function(err, db) {
     
              if(err) { return console.log(err); return;}
              var dbo = db.db("nba");
              var coll = dbo.collection('players');
			  //res.write("here <br/>");
              res.write("<table id='players' style='border: 1px solid; width: 100%; border-collapse: collapse'>");        
              res.write("<tr>");
              res.write("<th style='width: 40%'> Name </th>");
              res.write("<th style='width: 10%'> PTS </th>");
              res.write("<th style='width: 10%'> REB </th>");
              res.write("<th style='width: 10%'> AST </th>");
              res.write("<th style='width: 10%'> STL </th>");
              res.write("<th style='width: 10%'> BLK </th>");
              res.write("<th style='width: 10%'> TO </th>");
              res.write("</tr>");
      
             await coll.find().forEach(function(doc) {
              // res.write("<table hidden id='" + doc["_id"] + "></table>");
                // res.write("<table hidden style= id='" + doc["_id"] + "></table>");
      
              res.write("<tr >");
              res.write("<td >" + doc["Name"] + "</td>");
              res.write("<td >" + doc["PTS"] + "</td>");
              res.write("<td >" + doc["REB"] + "</td>");
              res.write("<td >" + doc["AST"] + "</td>");
              res.write("<td >" + doc["STL"] + "</td>");
              res.write("<td >" + doc["BLK"] + "</td>");
              res.write("<td >" + doc["TO"] + "</td>");
              res.write("</tr>");
              
          })
          res.write("</table>");
        
           var dbo = db.db("nba");
          var coll = dbo.collection('games');
          // console.log(dbo.count("games"));
          res.write("<table id='games' style='border: 1px solid; width: 100%; border-collapse: collapse; text-align: center'>")
          res.write("<tr >")
          res.write("<th >Home Team</th>");
          res.write("<th >Home Team Score</th>");
          res.write("<th >Visitors Team</th>");
          res.write("<th >Visitors Team Score</th>");
      
          res.write("</tr>");
          await coll.find().limit(25).forEach(function(doc) {
                  res.write("<tr >");
                  res.write("<td >" + doc["homeTeam"] + "</td>");
                  res.write("<td >" + doc["homeTeamScore"] + "</td>");
                  res.write("<td >" + doc["visitorTeam"] + "</td>");
                  res.write("<td >" + doc["visitorTeamScore"] + "</td>");
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
              		if (count == 0) {
            res.write("No Games Today");
            // document.write("No Games Today");
        } else {
            res.write("<div style='text-align: center'><h2>The Boston Celtics are playing tonight!</h2>");
            res.write("<h3>Vote on who you think will win!</h3></div>")
            res.write("<form target='_blank' method='post' action='/process'>");
            res.write("<input type='radio' value='home' id='home' name = 'choice' required>")
            res.write("<label for='home'>" + home + "</label>")
            res.write("<input type='radio' value='away' id='away' name='choice'>")
            res.write("<label for='away'>" + visitor + "</label>")
            res.write("</br>");
            res.write("<input type='submit'>");
            res.write("</form>");
        }
    var dbo = db.db("nba");
    var coll = dbo.collection('users');
    // console.log(dbo.count("games"));
    res.write("<div style='text-align: center'><h1>Your Past Picks</h1></div>")
    res.write("<table style='border: 1px solid; width: 100%; border-collapse: collapse; text-align: center'>")
    res.write("<tr >")
    res.write("<th >Date</th>");
    res.write("<th >Home Team</th>");
    res.write("<th >Visitors Team</th>");
    res.write("<th >Choice</th>");

    res.write("</tr>");
    coll.find({email: "temp"}).forEach(function(doc) {
            res.write("<tr >");
            res.write("<td >" + doc["date"] + "</td>");
            res.write("<td >" + doc["homeTeam"] + "</td>");
            res.write("<td >" + doc["visitorTeam"] + "</td>");
            res.write("<td >" + doc["choice"] + "</td>");
            res.write("</tr>");
            // result[i] = JSON.stringify(result[i]);
            // res.write("Company: " + result[i]["company"] + ", Ticker: " + result[i]["ticker"] + "</br>");
            // res.write(JSON.stringify(result[i]) + "</br>");
            // console.log(JSON.stringify(result[i]));
    })
            }) 


          //res.end();
		  })  
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
            console.log(pdata['choice']);
            obj = {
                email: "temp",
                date: theDate,
                homeTeam: home,
                visitorTeam: visitor,
                choice: pdata['choice'],
            }
            // console.log(obj);
            
        MongoClient.connect(url, {useUnifiedTopology: true}, 
            async function(err, db) {
            if(err) { return console.log(err); return;}
            var dbo = db.db("nba");
            var coll = dbo.collection('users');
            await coll.insertOne(obj);
          
          
          
            db.close();
          }) 


            // res.write ("Value "+ pdata['winner']);
            // console.log()
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
