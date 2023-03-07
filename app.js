const express = require("express");
const app = express();
const path = require('path')
const methodOverride = require('method-override');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('index');
})
app.listen(8000, () => {
    console.log("Port is active..");
})

