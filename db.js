if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const uri = process.env.URI;
const { MongoClient, ObjectId } = require('mongodb');
//const uri = 'URI';
const client = new MongoClient(uri);

module.exports =
{
    dbConnect: async function dbConnect() {
        try {
            await client.connect();
            console.log("Coach DB connected!");
        } catch (err) {
            console.log(err);
        }
    },
    saveCoach: async function saveCoach(coach) {
        try {
            await client.db('cs5610').collection('coaches').insertOne(coach);
        } catch (err) {
            console.log(err);
        }
    },

    findCoaches: async function findCoaches(coach) {
        try {
            const data = await client.db('cs5610').collection('coaches').find();
            const dataArray = await data.toArray();
            return dataArray;
        } catch (err) {
            console.log(err);
        }
    },
    deleteCoach: async function deleteCoach(coachID) {
        try {
            await client.db('cs5610').collection('coaches').deleteOne({ _id: ObjectId(coachID) });
            console.log("to delete for COACH:");
            console.log(coachID);
        } catch (err) {
            console.log(err);
        }
    }
}
//Add a function in db.js that receives an id and deletes the document with _id equal to the ObjectId(id)