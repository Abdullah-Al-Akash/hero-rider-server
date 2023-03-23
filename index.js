const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://HeroRider:${process.env.DB_PASS}@hero-rider.bxaobxd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
                console.log("Database Connected")
                const memberCollection = client.db("hero-rider").collection("member");
                // Registration People:
                app.post('/registration', async (req, res) => {
                        const newMember = req.body;
                        const registrationInformation = await memberCollection.insertOne(newMember);
                        res.send(registrationInformation);
                })

                // Load All Members:
                app.get('/members', async (req, res) => {
                        const query = {};
                        const cursor = memberCollection.find(query);
                        const members = await cursor.toArray();
                        res.send(members);
                })

                // Login User
                app.post('/login', async (req, res) => {
                        const user = req.body;
                        console.log(user)
                        const query = { email: user.email, password: user?.password }
                        const cursor = memberCollection.find(query);
                        const checkUser = await cursor.toArray();
                        if (checkUser.length) {
                                res.send({
                                        success: true,
                                })
                        }
                        else {
                                res.send({ success: false })
                        }
                })
                //Single Member Load By ID:
                app.get('/member/:id', async (req, res) => {
                        const id = req.params.id;
                        const query = { _id: new ObjectId(id) };
                        const product = await memberCollection.findOne(query);
                        res.json(product);
                });
                //Single Member Load By ID:
                app.get('/block/:id', async (req, res) => {
                        const id = req.params.id;
                        const query = { _id: new ObjectId(id) };
                        const product = await memberCollection.findOne(query);
                        res.json(product);
                });

                // Update Status:
                app.put('/member/:id', async (req, res) => {
                        const id = req.params.id;
                        const updateStatus = req.body;
                        console.log(updateStatus.body);
                        const filter = { _id: new ObjectId(id) }
                        const options = { upsert: true };
                        // create a document that sets the plot of the movie
                        const updateDoc = {
                                $set: {
                                        status: 'active'
                                },
                        };
                        const result = await memberCollection.updateOne(filter, updateDoc, options);
                        res.json(result)
                });

                // Block Someone:
                app.put('/block/:id', async (req, res) => {
                        const id = req.params.id;
                        const updateStatus = req.body;
                        console.log(updateStatus.body);
                        const filter = { _id: new ObjectId(id) }
                        const options = { upsert: true };
                        // create a document that sets the plot of the movie
                        const updateDoc = {
                                $set: {
                                        status: 'block'
                                },
                        };
                        const result = await memberCollection.updateOne(filter, updateDoc, options);
                        res.json(result)
                });
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