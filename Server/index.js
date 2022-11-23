const express = require('express');
const user = require('./Routes/user');
const app = express();


// app.use(express.json());

// app.set('json spaces', 2)

// app.get('/',(req,res)=>{
//     res.send('This is the express server and stuff')
// })

app.use('/user', user);

app.listen(8090,()=>{
    console.log("Server has started and listening on port 8090\n");
});