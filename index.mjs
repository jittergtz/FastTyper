
import express from 'express';
import path from 'path';

const app = express()
const port = 3000

app.use(express.urlencoded())


app.use(express.static("public"));



app.get('/', (req, res) => {
  res.sendFile(path.resolve("public/alphapass.html"))
})



app.post('/main.html', (req, res) => {

  const pass = req.body.password;
    if (pass === '1234') {
        res.sendFile(path.resolve("public/main.html")) 
    } else {
     console.log("wrong")
    }
})

app.listen(port, () => {
  console.log(`server running on ${port}`)
})






