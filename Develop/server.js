const express = require('express');
const path = require('path');
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
fs.readFile('db/db.json', 'utf8', (error, data) =>{
if(error) {
   console.log('error')
 }else { 
  console.log(typeof data)
  res.send(data)
}
});

});


app.post('/api/notes', (req, res) => {
  const {title, text} = req.body
  if (title && text) {
  const newNote = {
    title,
    text
  };
  const response = {
    status: 'success',
    body: newNote
  }
  console.log(newNote)
 fs.appendFile('./develope/db/db.json', newNote ,(error)=>error?console.error(error):console.log("successful") )

}
});
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public//notes.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);