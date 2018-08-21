const express = require('express');
const app = express();
const rp = require('request-promise');
const cors = require('cors')

app.use(cors());

app.get('/emotional-transactions', (req, res) => {
  const csvFilePath='transactions.csv'
  const csv=require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((emotionalTransactions)=>{
        res.json(emotionalTransactions);
    })
    .catch((error) => {
      console.log('Error:', error);
    })
});

app.listen(3005, () => console.log('Server listening on port 3005!'))