const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://dimonkey1912:IApsJQMxinzWF27z@cluster0.q5t8zwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB
let db;
(async () => {
    try {
        const client = await MongoClient.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        db = client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

// Route to add an item
app.get('/add', async (req, res) => {
    try {
        const newItem = req.query.item;
        const result = await db.collection('items').insertOne({ item: newItem });
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all items
app.get('/items', async (req, res) => {
    try {
        const items = await db.collection('items').find({}).toArray();
        res.status(200).json(items.map(item => item.item));
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
