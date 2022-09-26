 const express =require("express");
const path =require("path");
const app = express();
const mysql = require('mysql');
const bodyParser =require('body-parser');
const cors=require("cors");
app.use(bodyParser.json());
app.use(express.json())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));



  
app.use(cors());




//create connection
const conn =mysql.createConnection({
    host:'database-1.cp8omipjfldw.ap-northeast-1.rds.amazonaws.com',
    user:'root',
    password: 'guri1234',
    database:'track',
    port:'3306'

});



//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log ('Mysql Connected...');
});





//route for list req hotspot
app.get('/lock',(req,res) =>{
    let sql ="SELECT * FROM location";
    let query =conn.query (sql,(err,results)=>{
           if(err)throw err;
           res.json(results);
    });
});

//route for enquery 
app.post('/locat',(req,res) =>{


    let sql ="UPDATE location SET lon='"+req.body.lon+"',lat='"+req.body.lat+"' WHERE id='"+req.body.id+"'";
  
    let query =conn.query (sql,(err,results)=>{
           if(err)throw err;
           res.json(results);
         console.log(results);
    });

});

app.listen(3306,()=>{
    console.log(`express server running on 3306`);
});
