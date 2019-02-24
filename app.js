const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const exphbs = require("express-handlebars");
const uuid = require("uuid");
const request = require("request")
const cookieParser = require("cookie-parser");
const exphndlbars = require("express-handlebars");
const path = require("path");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(cookieParser());

const static = express.static(__dirname + "/views");
app.use("/views", static);

app.set("view engine", "handlebars");
app.engine("handlebars", exphndlbars({defaultLayout:""}));

app.listen(80, () => {
  console.log("We've now got a server!");
});

app.post("/summarize/text",async(req,res)=>{
  console.log("Coming inside summarise route: ",req.body);
  const finalSummary = "";

  await request.post(
  'http://34.73.186.176:5000/api/summarize/text',
  { json: { textData: 'Ole Gunnar Solskjaer has confirmed that Jesse Lingard and Anthony Martial have a chance of returning for Manchester United in Sunday’s huge Premier League clash with Liverpool. The attacking duo missed Monday’s 2-0 Emirates FA Cup fifth-round win at Chelsea with injuries they sustained during the Champions League defeat to Paris St-Germain last week. Speaking in our exclusive interview before Friday’s pre-match press conference at the Aon Training Complex, Ole gave an update on the pair’s situation ahead of this weekend’s showdown at Old Trafford. “I hope and think Anthony will be ready and I hope Jesse will be ready because it’s two different injuries,” the Norwegian told Stewart Gardner. “So maybe more hope than think, with Anthony as well, but he’s got a chance. Anyway, we still hope Jesse could be ready. Let’s see. We’ve still got a couple of days’ training left and they need to be part of it.” Adding in his press conference, Ole said: “Theyve not been part of it yet, but theyve been doing some recovery work and Anthonys was a different muscle, of course, so we think that he might be ready and hope that Jesse will.” When asked how important Anthony and Jesse are to the way the team plays, he added: “Every single player has their attributes to give us something and I think the way we played against Chelsea shows that we can manage without them as well. Weve got options, its a big squad, good players, everyones eager. ”They [Lingard and Martial] want to play this game and some of them havent played so much. If they get a chance in this game its a chance to step forward, so if they dont make it, it might be the same team as we played against Chelsea. Who knows?“ HOW ABOUT LIVERPOOL? Jurgen Klopp’s side, who are second in the Premier League table, will welcome back key defender Virgil van Dijk after the Dutchman missed Tuesday night’s goalless draw against Bayern Munich in the Champions League through suspension. But fellow centre-back Dejan Lovren is set to be sidelined again with a hamstring injury, while Joe Gomez isn’t expected to return for several weeks as he undergoes surgery on a broken ankle. Trent Alexander-Arnold returned from injury against Bayern at Anfield in midweek, when Brazilian midfielder Fabinho played in defence. Klopp could give a further update on the Merseysiders’ squad later today (Friday).'} },
  async function (error, response, finalSummary) {
      if (!error && response.statusCode == 200) {
          console.log("Body:\n\n\n",await finalSummary)
          console.log("Outside: \n\n",finalSummary)
          res.send({textData: finalSummary})
          //console.log(typeof finalSummary)
      }
  }
);
})


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "/views/index.html"))
})

