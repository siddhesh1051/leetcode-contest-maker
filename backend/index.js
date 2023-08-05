import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});


app.get("/contests", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

app.post("/contests", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `duration`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.duration,
   
  ];

  // console.log(values);

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/contests/:id", (req, res) => {
  const contestId = req.params.id;
  // console.log(contestId);
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [contestId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/contests/:id", (req, res) => {
  const contestId = req.params.id;
  console.log(contestId);

  const q = "UPDATE books SET `title`= ?, `desc`= ?, `duration`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.duration,
  ];

  db.query(q, [...values,contestId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
