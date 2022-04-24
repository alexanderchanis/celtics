const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// let allGames= [];
var allGames = [];
// var players = [];
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cs20:cs20admin@cluster0.oa3ko.mongodb.net/?retryWrites=true&w=majority";	// connection string goes here
        const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
		'X-RapidAPI-Key': '6e976fee54msh2cd42ae41e15c49p1d38b7jsn29e6209e59d7'
	}
};


MongoClient.connect(url, {useUnifiedTopology: true}, 
   async function(err, db) {
    if(err) { return console.log(err); return;}
    // console.log("hi");
    var dbo = db.db("nba");
    var coll = dbo.collection('games');
await fetch('https://free-nba.p.rapidapi.com/games?page=0&per_page=100&seasons[]=2021&team_ids[]=2', options)
.then(response => response.json())
.then(data => {
    // JSONArray test = new JSONArray(data);
    // data = data.raw_body;
    data = JSON.stringify(data);
    // while(data.length >2000){
        // for (var i = 0; i < ; i++) {
    // First loop to get rid of data[]
    index = data.indexOf("date");
    temp = data.substring(index+4);
    // document.write(temp);
    nextGame = temp.indexOf("date");
    game = '{"date';
    game += temp;
    // console.log(nextGame);
    game = game.substring(0,nextGame-9);
    // console.log(data[0]);
    // document.write(game);
    nextIndex = data.indexOf(game);
    gameLength = game.length;
    // console.log(gameLength)
    game = JSON.parse(game);
    hts = game["home_team_score"];
    vts = game["visitor_team_score"];
    ht = game["home_team"]["full_name"];
    vt = game["visitor_team"]["full_name"];
    gameObj = {
        homeTeam: ht,
        visitorTeam: vt,
        homeTeamScore: hts,
        visitorTeamScore: vts,
        _id: 1
    }
    allGames.push(gameObj);
    // console.log(game["home_team_score"])
    // console.log(game["visitor_team_score"])
    // nextIndex = data.IndexOf("hii");
    // console.log(typeof(game));
    // console.log(nextIndex);
    data = data.substring(gameLength+22);
    // }
    // console.log(data.indexOf("date"));


    for (var i = 0; i < 88; i++) {
    index = data.indexOf("date");
    temp = data.substring(index+4);
    // document.write(temp);
    nextGame = temp.indexOf("date");
    game = '{"date';
    game += temp;
    // console.log(nextGame);
    game = game.substring(0,nextGame-9);
    // console.log(data[0]);
    // document.write(game);
    nextIndex = data.indexOf(game);
    gameLength = game.length;
    // console.log(gameLength)
    game = JSON.parse(game);
    hts = game["home_team_score"];
    vts = game["visitor_team_score"];
    ht = game["home_team"]["full_name"];
    vt = game["visitor_team"]["full_name"];
    id = i+2;
    gameObj = {
        homeTeam: ht,
        visitorTeam: vt,
        homeTeamScore: hts,
        visitorTeamScore: vts,
        _id: id
    }
     allGames.push(gameObj);
    // console.log(game["home_team_score"])
    // console.log(game["visitor_team_score"])
    // console.log(typeof(game));
    // console.log(nextIndex);
    data = data.substring(gameLength+13);
    }
    // document.write(data);
    // console.log(allGames);
    // document.write(allGames)


})
        .catch(err => console.error(err));

    // console.log(allGames);
        // return allGames;
    // console.log(data);
      
    // getData().then(data => {
    //     console.log(data)
        coll.insertMany(allGames);

    // })


        // console.log(allGames);
        // coll.insertMany(allGames);

        // console.log("Success!");
        // set time out
        // db.close();
        
           
        });
