var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cs20:cs20admin@cluster0.oa3ko.mongodb.net/?retryWrites=true&w=majority";	// connection string goes here
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


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

http.createServer(function (req, res)  {
    // if (req.url == "/")
    // {
    //     file = 'nbaform.html';
    //     fs.readFile(file, function(err, txt) {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write("This is the home page<br>");
    //     res.write(txt);
    //     res.end();
    //     });
    // }
    if (req.url == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // res.write("<a href='http://localhost:8080/players'>players</a> <br/>");
        // res.write("<a href='http://localhost:8080/'>home</a> <br/>");
        if (count == 0) {
            res.write("No Games Today");
            // document.write("No Games Today");
        } else {
            res.write("<form target='_blank' method='post' action='/process'>");
            res.write("<input type='radio' value='home' id='home' name = 'choice'>")
            res.write("<label for='comp'>home</label>")
            res.write("<input type='radio' value='away' id='away' name='choice'>")
            res.write("<label for='st'>away</label>")
            res.write("</br>");
            res.write("<input type='submit'>");
            res.write("</form>");
        }


    }
// 
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
                email: thEmail,
                date: theDate,
                homeTeam: home,
                visitorTeam: visitor,
                choice: pdata['choice'],
                win: "In Progress",
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
    }).listen(8080);