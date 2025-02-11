// var http=require("http")
// var url=require("url")
// var fs=require("fs")
// var server=http.createServer((req,res)=>{
//         var urldata=req.url
//        var parsedurl=url.parse(urldata,true)

//      fs.readFile("./ipl.json","utf-8",(err,data)=>{
//         if(err){
//             res.write(err)
//             res.end()
//         }
//         else if(parsedurl.pathname=="/" && req.method=="GET"){
//             if(parsedurl.query.team=="csk"){
//                  var dataa=JSON.parse(data)
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
//             res.write("data not found")
//             res.end()
//         }
//     })
// })
    // fs.readFile("./ipl.json","utf-8",(err,data)=>{
    //     if(err){
    //         throw err
    //     }
    //    else if(parsedurl.pathname.startsWith("/year/")){
    //     var dataa=JSON.parse(data)
    //         var splitedval=parsedurl.pathname.split("/");
    //         var routeval=splitedval[splitedval.length-1];
    //         var returnedval=dataa.ipl.filter((val)=>{
    //          return val.year==routeval;
    //         })
    //         res.write(JSON.stringify(returnedval))
    //         res.end()
    //      }
    //      else{
    //         res.write(JSON.stringify(dataa))
    //         res.end()
    //      }
    //   })
      
    // })
    //     if(parsedurl.pathname.startsWith("/year/")){
    //        var splitedval=parsedurl.pathname.split("/");
    //        var routeval=splitedval[splitedval.length-1];
    //        var returnedval=dataa.ipl.filter((val)=>{
    //         return val.year==routeval;
    //        })
    //        res.write(returnedval)
    //        res.end()
    //     }
    //  })


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
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
            return;
        }

        try {
            var dataa = JSON.parse(data); // Parse JSON only once
        } catch (parseError) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error parsing JSON file" }));
            return;
        }

        if (parsedurl.pathname === "/" && req.method === "GET") {
            var teamQuery = parsedurl.query.team;
            var filtered = [];

            if (teamQuery === "csk") {
                filtered = dataa.ipl.filter((val) => val.team === "Chennai Super Kings");
            } else if (teamQuery === "mi") {
                filtered = dataa.ipl.filter((val) => val.team === "Mumbai Indians");
            } else if (teamQuery === "kkr") {
                filtered = dataa.ipl.filter((val) => val.team === "Kolkata Knight Riders");
            } else if (teamQuery === "rr") {
                filtered = dataa.ipl.filter((val) => val.team === "Rajasthan Royals");
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            if (filtered.length > 0) {
                res.end(JSON.stringify(filtered));
            } else {
                res.end(JSON.stringify({ message: "Team not found" }));
            }
        } 
        // Handling requests for a specific year
        else if (parsedurl.pathname.startsWith("/year/")) {
            var splitedval = parsedurl.pathname.split("/");
            var routeval = splitedval[splitedval.length - 1];

            var returnedval = dataa.ipl.filter((val) => val.year == Number(routeval)); // Convert routeval to Number

            res.writeHead(200, { "Content-Type": "application/json" });
            if (returnedval.length > 0) {
                res.end(JSON.stringify(returnedval));
            } else {
                res.end(JSON.stringify({ message: "No data found for the given year" }));
            }
        } 
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Data not found" }));
        }
    });
});

server.listen(3007, () => {
    console.log("Server is running on port 3007");
});

