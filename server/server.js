const express = require('express');
const fs = require('fs');
const path = require('path');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public/dist')));

app.use((req,res,next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Error: could not log network action: ' + log);
    }
  });
  // move on
  next();
});

// app.get('/', (req,res) => {
//   res.sendFile('/index.html');
// });

app.listen(port, () => {
  console.log('Server restarted at: ', new Date().toString());
});
