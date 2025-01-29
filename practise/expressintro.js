const express=require('express');
const app=express();
app.get('/',function(req,res){
    res.send('this is home page')
})
app.get('/about',function(req,res){
    res.send('this is about us page')
})
app.get('/contactus',function(req,res){
    res.send('this is contact us page')
})
app.get('/services',function(req,res){
    res.send('this is services us page')
})
app.listen(4900);