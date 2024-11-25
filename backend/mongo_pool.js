const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectMongo() {
    try {
        if (!db) {
            await client.connect();
            console.log("MongoDB Atlas 접속 성공");
            db = client.db('chatapp');
        }
        return db;
    } catch (error) {
        console.error("MongoDB Atlas 접속 오류:", error);
        throw error;
    }
}

module.exports = connectMongo;
