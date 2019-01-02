const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
console.log(path.join(__dirname , '..' , '/public'));
app.use(express.static(path.join(__dirname , '..' , 'public')));



app.listen(port,()=>{
    console.log(`server started up on port no ${3000}`);
});