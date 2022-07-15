const mysql = require('mysql');
const express = require('express');
const cors=require("cors");
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

const now = new Date();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'semangat',
    database: 'test',
    port:3308
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(fileUpload());
app.use(bodyparser.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS nodejs';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS OrderDetails(id int AUTO_INCREMENT, Name VARCHAR(255), Mobile INT(10), Email VARCHAR(255), Menu VARCHAR(255), Extra VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
});

app.get('/getall', (req, res) => {
    let sql = 'SELECT * FROM OrderDetails';
    db.query(sql, (err, result) => {
        if (err) throw err;
      //  console.log(result);
        res.send(result);
    });
});

app.get('/getunit', (req, res) => {
    let sql = 'SELECT * FROM test4';
    db.query(sql, (err, result) => {
        if (err) throw err;
      //  console.log(result);
        res.send(result);
    });
});

app.get('/getimage', (req, res) => {
    let sql = 'SELECT * FROM test4';
    db.query(sql, (err, result) => {
        if (err) throw err;
      //  console.log(result);
        res.send(result);
    });
});

app.get('/getsupp', (req, res) => {
    let sql = 'SELECT nama FROM test2';
    db.query(sql, (err, result) => {
        if (err) throw err;
       console.log(result);
        res.send(result);
    });
});

app.get('/Edit/:id', (req, res) => {
	const id = req.params.id;
    let sql = 'SELECT * FROM OrderDetails WHERE id = ?';
	

	
    db.query(sql,id, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

 app.get('/Editu/:id', (req, res) => {
      db.query(
        `SELECT * FROM OrderDetails WHERE id=${req.params.id}`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
    });

app.post('/insert', (req, res) => {
    console.log(req.body);
    let form = req.body;
	var newtgl=new Date(req.body.tglnya);
	var newtgl2 = newtgl.toISOString().slice(0, 19).replace('T', ' ');
	
    let sql = `INSERT INTO OrderDetails(Name, Mobile, Email, Menu, Extra,tglinput) VALUES ('${form.nama}', '${form.mobil}', '${form.mail}', '${form.drop}', '${form.der}', '${newtgl2}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post added...');
    });
});

app.post('/staffinput', (req, res) => {
    console.log(req.body);
    let form = req.body;
	
    

	var hargajual=3000;
	var hargabeli=5000;
	var suppl='a1';
 
    let sql = `INSERT INTO staff(name, address, telp, username, password, role_id) VALUES ('${form.nama}', '${form.address}','${form.telp}','${form.username}','${form.password}','${form.akses}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
       // console.log(result);
        res.send('Post added...');
    });
});

app.post('/tesinput1', (req, res) => {
    console.log(req.body);
    let form = req.body;

    

	var hargajual=3000;
	var hargabeli=5000;
	var suppl='a1';
	
    let sql = `INSERT INTO tesinput(nama) VALUES ( '${form.nama}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
       // console.log(result);
        res.send('Post added...');
    });
});

app.post('/insertunit', (req, res) => {
    console.log(req.body);
    let form = req.body;
	var newtgl=new Date(req.body.tglbeli);
	var newtglbeli = newtgl.toISOString().slice(0, 19).replace('T', ' ');
    

	var hargajual=3000;
	var hargabeli=5000;
	var suppl='a1';
	
    let sql = `INSERT INTO test4(nama, tglbeli, tgljual, deskripsi, filename,hargabeli,hargajual,supplier) VALUES ('${form.nama}', '${newtglbeli}', NULL, '${form.desk}', '${form.namefile}', '${hargajual}', '${hargajual}', '${suppl}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
       // console.log(result);
        res.send('Post added...');
    });
});

app.post('/insertsupp', (req, res) => {
    console.log(req.body);
    let form = req.body;

    let sql = `INSERT INTO test2(nama, alamat, notelp) VALUES ('${form.nama}', '${form.alamat}', '${form.notelp}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post added...');
    });
});

// Upload Endpoint
app.post('/upload', (req, res) => {

console.log(req);

	 if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const myFile = req.files.file;
  const path = __dirname + "/sidebar3/public/img/" + myFile.name;

  myFile.mv(path, (err) => {
    if (err) {
		console.error(err);
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });


 
});