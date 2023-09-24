const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults(true);
const { v4: uuidv4 } = require('uuid');
let cors = require('cors');
const db = router.db;
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);


// api for the register
server.post('/api/registration', async (req, res) => {
  const { email, password, firstName, lastName, gender, role, phone, bday } = req.body;
  const user = db.get('users').find({ email }).value();
  if (user) {
    res.status(409).json({ success: false, message: 'Already Have' });
  } else {
    const newUser = { id: uuidv4(), email, password, firstName, lastName, gender, role, phone, bday };
    db.get('users').push(newUser).write();
    res.status(201).json({ success: true, message: 'Registration successful', user: newUser });
  }
});

// api for the login
server.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find({ email, password }).value();
  if (user) {
    res.json({ success: true, message: 'Login successful', user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

//api for the data fetch
server.get('/api/get', async (req, res) => {
  const user = db.get('users')
    .map(user => ({
      id: user.id,
      name: user.firstName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      bday: user.bday
    }))
    .value(); if (user) {
      res.status(200).json({ user });
    } else {
    res.json({ message: 'No data' });
  }
});


//api for the delete
server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  const user = db.get('users').find({ id: userId }).value();

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    db.get('users').remove({ id: userId }).write();

    res.status(200).json({ message: 'User deleted successfully' });
  }
});

const port = 4008
server.use("/api", router);
server.listen(port, () => {
  console.log(`JSON server is running ${port}`);
});
