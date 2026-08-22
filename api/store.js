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
  // host: "localhost",
  // user: "root",
  // password: "9Pix</e16PHw",
  // database: "giftlist",
  host: "localhost",
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

app.post('/api/store', (req, res) => {
  const { username, gift } = req.body;


  // Fetch current quantityavailable
  const sqlSelectQuantity = 'SELECT quantityavailable FROM reservation WHERE gift = ? ORDER BY id DESC LIMIT 1';
  const valuesSelectQuantity = [gift];

  connection.query(sqlSelectQuantity, valuesSelectQuantity, (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error fetching quantityavailable:', selectErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const currentQuantityAvailable = selectResult[0]?.quantityavailable || 0;

    if (currentQuantityAvailable <= 0) {
      console.error('Quantity not available for reservation.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Insert a new record for each reservation
    const sqlInsert = 'INSERT INTO reservation (name, gift, reserved_at, quantity, quantityavailable) VALUES (?, ?, NOW(), ?, ?)';
    const valuesInsert = [username, gift_name, 1, currentQuantityAvailable - 1];

    connection.query(sqlInsert, valuesInsert, (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error executing insert query:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('Data inserted into reservation table.');

      return res.status(200).json({ message: 'Reservation successful' });
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
