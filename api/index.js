const express = require('express');
const app = express();
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

// For the purposes of this simplified demo we do a hardcoded 3005 port.
app.listen(3005, () => console.log('Server listening on port 3005!'))
