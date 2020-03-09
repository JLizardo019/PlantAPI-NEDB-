//server-side code

const fs = require("fs"); //opening fs Node module library?
const Datastore= require("nedb");
const db = new Datastore({filename: "db/plants.db", autoload:true}); 
db.loadDatabase(); // creates file for us

// const content = fs.readFileSync('db/plants.json');
// let plantsObj = JSON.parse(content);
// let allData = plantsObj.map((plant)=>{
//     return plant;
// });

// //console.log(allData);
// db.insert (allData, (err,docs)=>
// {
//     console.log(docs);
// });


// make a webserver
const express=require("express"); 
const app = express();
app.use(express.static('public')); // creating a static server and serving public number
app.use(express.json());



//endpoints
app.get("/plants",(req,res) =>{
    console.log("someone requested plants!");
    db.find({}, (err, docs)=>{
        console.log(docs);
        res.json(docs);
    });
})

app.post("/plants", (req,res)=>
{   
    console.log("post new plant");
    db.insert(req.body, (err,docs)=>{ // adding an item, also automatically adds an id to each object it recognizes
        if (err)
        {
            console.log(err);
        }
        res.json(docs);
    });
});

app.put("/plants/:name", (req,res)=>
{
    const itemToUpdate = req.params.name;
    const attr = req.body.attribute;
    const val = req.body.value;

    if (attr === "name")
    {
        db.update({"plantId":itemToUpdate},{$set: {"name" : val}}, (err,docs) =>
        {
            console.log("updating");
            res.json(docs);
        } ); 
    }
    else if (attr === "description")
    {
        db.update({"plantId":itemToUpdate},{$set: {"description" : val}}, (err,docs) =>
        {
            console.log("updating");
            res.json(docs);
        } ); 
    }
    else if (attr === "growZoneNumber")
    {
        db.update({"plantId":itemToUpdate},{$set: {"growZoneNumber" : val}}, (err,docs) =>
        {
            console.log("updating");
            res.json(docs);
        } ); 
    }
    else if (attr === "wateringInterval")
    {
        db.update({"plantId":itemToUpdate},{$set: {"wateringInterval" : val}}, (err,docs) =>
        {
            console.log("updating");
            res.json(docs);
        } ); 
    }
    else if (attr === "imageUrl")
    {
        db.update({"plantId":itemToUpdate},{$set: {'imageUrl' : val}}, (err,docs) =>
        {
            console.log("updating");
            res.json(docs);
        } ); 
    }
    else
    {
        console.log("trying to change something I don't understand");
    }
    

});

app.delete("/plants/:name", (req, res) => {
    const itemToDelete = req.params.name;
    console.log("deleting");
    db.remove({"plantId": itemToDelete}, (err,removed)=>
    {
        console.log(removed);
    });
  });


app.listen(3000, ()=> {
    console.log("listening on port localhost:3000");
}); // port number for server
