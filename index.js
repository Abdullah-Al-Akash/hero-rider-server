const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.wasvl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
                console.log("Database Connected")
        }
        finally {

        }
}
run().catch(console.dir);

// Root API
app.get('/', (req, res) => {
        res.send('Hello Hero Rider')
})

app.listen(port, () => {
        console.log(`Hero Rider listening on port ${port}`)
})