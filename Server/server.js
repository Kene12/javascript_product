const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const secrets = require('./config/secrets.json');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose.connect(secrets.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB Connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use('/auth', require('./routes/authRoutes'));
app.use('/manage', require('./routes/manageRoutes'));
app.use('/userManage', require('./routes/userManage'));
app.use('/product', require('./routes/productManage'))

const PORT = secrets.PORT || 500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));