let express = require('express')
let port = 3000
let app =express()
app.use(express.json())
app.post('/testing',(req,res)=>{
try{let {name} = req.body
return res.json({
    message:"This is Data",
    data:name
})
}catch(err){
    return res.status(500)
}
})

app.listen(port,()=>{
    console.log(`Server is runnig port ${port}`)
})