const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const options = {
      dbName: 'chatapp'
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB Atlas 연결 성공 - chatapp 데이터베이스');
  } catch (error) {
    console.error('MongoDB Atlas 연결 실패:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 