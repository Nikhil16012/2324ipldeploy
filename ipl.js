// var http=require("http")
// var url=require("url")
// var fs=require("fs")
// var server=http.createServer((req,res)=>{
//         var urldata=req.url
//        var parsedurl=url.parse(urldata,true)

//      fs.readFile("./ipl.json","utf-8",(err,data)=>{
//                       var dataa=JSON.parse(data)
//         if(err){
//             res.write(err)
//             res.end()
//         }
//         else if(parsedurl.pathname=="/" && req.method=="GET"){
//             if(parsedurl.query.team=="csk"){
        
//                  var filtered=dataa.ipl.filter((val)=>{
//                     return val.team=="Chennai Super Kings"
//                  })
//                  res.write(JSON.stringify(filtered));
//                  res.end()
//             }
//          else if(parsedurl.query.team=="mi"){
//                 var dataa=JSON.parse(data)
//                 var filtered=dataa.ipl.filter((val)=>{
//                    return val.team=="Mumbai Indians"
//                 })
//                 res.write(JSON.stringify(filtered));
//                 res.end()
//            }
//            else if(parsedurl.query.team=="kkr"){
//             var dataa=JSON.parse(data)
//             var filtered=dataa.ipl.filter((val)=>{
//                return val.team=="Kolkata Knight Riders"
//             })
//             res.write(JSON.stringify(filtered));
//             res.end()
//        }
//        else if(parsedurl.query.team=="rr"){
//         var dataa=JSON.parse(data)
//         var filtered=dataa.ipl.filter((val)=>{
//            return val.team=="Rajasthan Royals"
//         })
//         res.write(JSON.stringify(filtered));
//         res.end()
//    }
//        }
//        else if(parsedurl.pathname.startsWith("/year/")){
//         var dataa=JSON.parse(data)
//             var splitedval=parsedurl.pathname.split("/");
//             var routeval=splitedval[splitedval.length-1];
//             var returnedval=dataa.ipl.filter((val)=>{
//              return val.year==routeval;
//             })
//             res.write(JSON.stringify(returnedval))
//             res.end()
//          }
//         else{
//             res.write(JSON.stringify(dataa))
//             res.end()
//         }
//     })
// })
    


// server.listen(3007,()=>{
//     console.log("server is running");
// })
var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer((req, res) => {
    var urldata = req.url;
    var parsedurl = url.parse(urldata, true);

    fs.readFile("./ipl.json", "utf-8", (err, data) => {
        res.setHeader("Content-Type", "application/json"); // ✅ Set JSON header
        
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Failed to read data" }));
            return;
        }

        let dataa;
        try {
            dataa = JSON.parse(data); // ✅ Safe parsing
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Invalid JSON format in ipl.json" }));
            return;
        }

        if (parsedurl.pathname == "/" && req.method == "GET") {
            let teamQuery = parsedurl.query.team;
            let filtered = [];

            if (teamQuery == "csk") {
                filtered = dataa.ipl.filter(val => val.team == "Chennai Super Kings");
            } else if (teamQuery == "mi") {
                filtered = dataa.ipl.filter(val => val.team == "Mumbai Indians");
            } else if (teamQuery == "kkr") {
                filtered = dataa.ipl.filter(val => val.team == "Kolkata Knight Riders");
            } else if (teamQuery == "rr") {
                filtered = dataa.ipl.filter(val => val.team == "Rajasthan Royals");
            } else {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid team query" }));
                return;
            }

            res.end(JSON.stringify(filtered));
        } 
        
        else if (parsedurl.pathname.startsWith("/year/")) {
            var splitedval = parsedurl.pathname.split("/");
            var routeval = splitedval[splitedval.length - 1];

            if (isNaN(routeval)) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid year format" }));
                return;
            }

            var returnedval = dataa.ipl.filter(val => val.year == routeval);
            res.end(JSON.stringify(returnedval));
        } 
        
        else {
            res.end(JSON.stringify(dataa));
        }
    });
});

server.listen(3007, () => {
    console.log("server is running on port 3007");
});

