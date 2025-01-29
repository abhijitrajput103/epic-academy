const express=require('express');
const app=express();
var router=express.Router()
router.get('/index',function(req,res)
{
    res.sendFile(__dirname+'/index.html');
}
)
router.get('/contactus',function(req,res)
{
    res.sendFile(__dirname+'/contactus.html');
}
)
router.get('/services',function(req,res)
{
    res.sendFile(__dirname+'/services.html');
}
)
app.use('/',router);
app.listen(4010);
