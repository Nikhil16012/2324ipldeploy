var http=require("http")
var url=require("url")
var fs=require("fs")
var server=http.createServer((req,res)=>{
        var urldata=req.url
        parsedurl=url.parse(urldata,true)

     fs.readFile("./ipl.json","utf-8",(err,data)=>{
        if(err){
            res.write(err)
            res.end()
        }
        else if(parsedurl.pathname=="/ipl"&&req.method=="POST"){
         res.write(data)
            res.end()
        }
        else{
            res.write("data not found")
            res.end()
        }
     })

})
server.listen(3007,()=>{
    console.log("server is running");
})