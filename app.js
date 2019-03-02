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
  'http://34.73.10.69:5000/api/summarize/text',
  { json: { textData: req.body.textData} },
  async function (error, response, finalSummary) {
      if (!error && response.statusCode == 200) {
          //console.log("Body:\n\n\n",await finalSummary)
          console.log("\n\nReceiving data: ",await finalSummary)
          console.log("\n\n\n type: ", await typeof finalSummary)
          if(finalSummary.length>1)
            {
              console.log(finalSummary.length);
              var context = await finalSummary.splice(0,finalSummary.length-1)
              console.log("\n\n\nContext: ", context)
            }
          res.send({textData: finalSummary[finalSummary.length-1], conText: context})
      }
  }
);
})

app.post("/summarize/audio",async(req,res)=>{
  req.pipe(request('http://34.73.186.176:5000/api/summarize/audio')).pipe(res)
})



app.get("/getContext",async(req,res)=>{
  res.send("Hi")
})

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "/views/index.html"))
})

