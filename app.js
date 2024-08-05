import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', {posts});
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id));
    res.render('edit', {post});
});

app.post('/edit/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id));
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(post => post.id !== parseInt(req.params.id));
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


