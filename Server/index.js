const express = require('express');
const User = require('./Routes/User');
const app = express();

app.use(express.json());
app.use('/User', User);


app.listen(8090,()=>{
    console.log("Server has started and listening on port 8090\n");
});