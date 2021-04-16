const express = require('express')
const app = express()
const port = 4000

const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://yoona:yoona1004%2A@cluster0.q0cpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('Mongo DB Connected,,,,'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})