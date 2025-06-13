const express = require('express');
const bodyParser = require('body-parser'); // or use express built-in parser
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// In-memory data stores (for demo; use DB in real app)
let users = [];  // { username, passwordHash }
let books = [
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'your_secret_key_here',  // change to a secure random key
    resave: false,
    saveUninitialized: false,
}));

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes

// Signup form
app.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

// Handle signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.render('signup', { error: 'Username already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, passwordHash: hashedPassword });
        res.redirect('/login');
    } catch (err) {
        res.render('signup', { error: 'Error creating user' });
    }
});

// Login form
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Handle login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.render('login', { error: 'Invalid username or password' });
    }

    try {
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            req.session.user = { username: user.username };
            res.redirect('/');
        } else {
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (err) {
        res.render('login', { error: 'Error logging in' });
    }
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Protected home route (library)
app.get('/', isAuthenticated, (req, res) => {
    res.render('home', { data: books, user: req.session.user });
});

// Add Book
app.post('/', isAuthenticated, (req, res) => {
    const newBook = {
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: "Available"
    };
    books.push(newBook);
    res.render('home', { data: books, user: req.session.user });
});

// Issue Book
app.post('/issue', isAuthenticated, (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
        }
    });
    res.render('home', { data: books, user: req.session.user });
});

// Return Book
app.post('/return', isAuthenticated, (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });
    res.render('home', { data: books, user: req.session.user });
});

// Delete Book
app.post('/delete', isAuthenticated, (req, res) => {
    const requestedBookName = req.body.bookName;
    books = books.filter(book => book.bookName !== requestedBookName);
    res.render('home', { data: books, user: req.session.user });
});

// Start Server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
