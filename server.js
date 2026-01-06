const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;


let parks = [
    {
        _id: 'a71e21b0-4054-46c8-a92c-f8319e7104d4',
        title: 'Шевченківський Гай',
        address: 'вул. Чернеча Гора, 1',
        bike_path_length: 3.5,
        ticket_price: 100.00,
        description: 'Музей народної архітектури та побуту просто неба. Чудове місце для прогулянок.',
    },
    {
        _id: 'f87d4c2e-9d0a-4b6f-8c3d-2a1e0b5f6a9c',
        title: 'Стрийський Парк',
        address: 'вул. Паркова, 1',
        bike_path_length: 5.0,
        ticket_price: 0.00,
        description: 'Один з найстаріших та найкрасивіших парків, ідеальний для сімейного відпочинку.',
    },
];

app.use(cors());
app.use(express.json());


// === READ (GET All) / Повертає всі парки
app.get('/api/parks', (req, res) => {
    console.log('GET /api/parks');
    res.json(parks);
});

// === READ (GET One) / Повертає один парк за ID (для редагування)
app.get('/api/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const park = parks.find(p => p._id === parkId);

    if (park) {
        res.json(park);
    } else {
        res.status(404).json({ message: 'Park not found' });
    }
});

// === CREATE (POST) / Створює новий парк
app.post('/api/parks', (req, res) => {
    const newPark = {
        _id: uuidv4(),
        ...req.body
    };

    if (!newPark.title || !newPark.address) {
        return res.status(400).json({ message: 'Title and Address are required.' });
    }

    parks.push(newPark);
    console.log('POST /api/parks: New park created:', newPark.title);
    res.status(201).json(newPark); // 201 Created
});

// === UPDATE (PUT) / Оновлює існуючий парк
app.put('/api/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const parkIndex = parks.findIndex(p => p._id === parkId);

    if (parkIndex === -1) {
        return res.status(404).json({ message: 'Park not found' });
    }

    parks[parkIndex] = {
        ...parks[parkIndex],
        ...req.body
    };

    console.log('PUT /api/parks/:id: Park updated:', parks[parkIndex].title);
    res.json(parks[parkIndex]);
});

// === DELETE (DELETE) / Видаляє парк
app.delete('/api/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const initialLength = parks.length;

    parks = parks.filter(p => p._id !== parkId);

    if (parks.length < initialLength) {
        console.log(`DELETE /api/parks/:id: Park with ID ${parkId} deleted.`);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Park not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/parks`);
});