var http=require("http")
var url=require("url")
var fs=require("fs")
var server=http.createServer((req,res)=>{
        var urldata=req.url
       var parsedurl=url.parse(urldata,true)

     fs.readFile("./ipl.json","utf-8",(err,data)=>{
        if(err){
            res.write(err)
            res.end()
        }
        else if(parsedurl.pathname=="/" && req.method=="GET"){
            if(parsedurl.query.team=="csk"){
                 var dataa=JSON.parse(data)
                 var filtered=dataa.ipl.filter((val)=>{
                    return val.team=="Chennai Super Kings"
                 })
                 res.write(JSON.stringify(filtered));
                 res.end()
            }
         else if(parsedurl.query.team=="mi"){
                var dataa=JSON.parse(data)
                var filtered=dataa.ipl.filter((val)=>{
                   return val.team=="Mumbai Indians"
                })
                res.write(JSON.stringify(filtered));
                res.end()
           }
           else if(parsedurl.query.team=="kkr"){
            var dataa=JSON.parse(data)
            var filtered=dataa.ipl.filter((val)=>{
               return val.team=="Kolkata Knight Riders"
            })
            res.write(JSON.stringify(filtered));
            res.end()
       }
       else if(parsedurl.query.team=="rr"){
        var dataa=JSON.parse(data)
        var filtered=dataa.ipl.filter((val)=>{
           return val.team=="Rajasthan Royals"
        })
        res.write(JSON.stringify(filtered));
        res.end()
   }
       }
       else if(parsedurl.pathname.startsWith("/year/")){
        var dataa=JSON.parse(data)
            var splitedval=parsedurl.pathname.split("/");
            var routeval=splitedval[splitedval.length-1];
            var returnedval=dataa.ipl.filter((val)=>{
             return val.year==routeval;
            })
            res.write(JSON.stringify(returnedval))
            res.end()
         }
        else{
            res.write(JSON.stringify(dataa))
            res.end()
        }
    })
})
    


server.listen(3007,()=>{
    console.log("server is running");
})

