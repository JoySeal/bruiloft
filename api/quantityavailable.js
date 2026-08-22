const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  // user: "root",
  // password: "9Pix</e16PHw",
  // database: "giftlist",
  user: "deb118539_jjadmin",
  password: "5jguhidsf8340329nnk",
  database: "deb118539_bruiloft",
  port: 3306
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database:', err.stack);
      return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/api/quantityavailable', (req, res) => {
  // const gift = 'Disneyland Tickets';  
  const { gift } = req.body;


  const sqlSelectQuantity = 'SELECT quantityavailable FROM reservation WHERE gift = ? ORDER BY id DESC LIMIT 1';
  const valuesSelectQuantity = [gift];

  connection.query(sqlSelectQuantity, valuesSelectQuantity, (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error fetching quantityavailable:', selectErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const currentQuantityAvailable = selectResult[0]?.quantityavailable || 0;
    res.json({ quantityAvailable: currentQuantityAvailable });
  });
});

const port = process.env.PORT || 3001;  // Use a different port than the one used for store.js
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
