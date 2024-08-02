const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
require('dotenv').config()
const port = process.env.PORT ||5000

app.use(express.json())
app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) =>{
    fs.readdir(`./hisaab`, "utf-8", (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading files");
            return;
        }
        const filesWithoutExtension = files.map(file => file.replace(".txt", ""))
        // console.log(filesWithoutExtension)
        res.render("index", { files :filesWithoutExtension });
    });
})


app.get("/show/:filename", (req, res) =>{
    const path = `${req.params.filename}.txt`;
    fs.readFile(`./hisaab/${path}`,"utf-8",(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
            return;
        }
        // console.log(data);
        res.render("show", { data,filename : path ,file : req.params.filename});
    })

})


app.get("/delete/:filename",(req, res) => {
    const filename = req.params.filename;
    // console.log(filename)
    fs.unlink(`./hisaab/${req.params.filename}`,(err)=>{
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting file");
            return;
        }
        console.log("file deleted successfully");
        res.redirect("/")
    })
})


app.get("/edit/:filename", (req, res) => {
    const path = `${req.params.filename}.txt`;
    // console.log(path)
    fs.readFile(`./hisaab/${path}`,"utf-8",(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
            return;
        }
        // console.log(data);
        res.render("edit", { data,filename : path });
    })
})


app.get("/createsec",(req, res) => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const fn = `${day}-${month}-${year}`;
    res.render("createsec",{date :fn})
})

app.post('/create/:filename', (req, res) =>{
    const fn = `${req.params.filename}.txt`
    const data = req.body.filedata
    fs.writeFile(`./hisaab/${fn}`,data, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error creating file");
            return;
        }
        console.log('The file has been saved!');
        // console.log(fn)
        res.redirect("/")

    });
})


app.post("/update/:filename", (req, res) => {
    const data = req.body.filedata
    console.log(data);
    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.filedata, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error creating file");
            return;
        }
        console.log('The file has been saved!');
        res.redirect("/")
    });
})

app.listen(port,() => {
    console.log(`listening on ${port}`)
})
