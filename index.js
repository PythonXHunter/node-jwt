 const express = require('express');
const app = express();
const authRoutes = require('./routes/route');
const protectedRoute = require('./routes/protectedRoute');
const connectDB = require('./connect');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 3000;
const MONGO_DB = "mongodb://127.0.0.1:27017/node-jwt";

const start = async () => {
  try {
    await connectDB(MONGO_DB);
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch(err){
    console.err(err);
  }
}

start();