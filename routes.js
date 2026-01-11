const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); 

let items = [
    { id: '1', title: "Dodge Challenger Demon 170", description: "Burnout? Say no more!.", price: 2415, color: 'Red', size: 'S', type: 'Widget', imageUrl: 'demon_170.jpg' },
    { id: '2', title: "S1 Hoonitron", description: "Got torque? Hell yeah! 3000 Hm per axle", price: 1500, color: 'Blue', size: 'M', type: 'Widget', imageUrl: 's1.jpg' },
    { id: '3', title: "Audi RS 6", description: "Just the best. Nothing to add", price: 5999, color: 'Black', size: 'L', type: 'Gadget', imageUrl: 'rs6.jpg' },
    { id: '4', title: "Mazda rx 7", description: "Something unusual with rotor 'heart'.", price: 800, color: 'Black', size: 'S', type: 'Tool', imageUrl: 'rx7.jpg' },
    { id: '5', title: "Mustang Hoonicorn", description: "Ken Block's mustang. Pure legend.", price: 4000, color: 'Red', size: 'L', type: 'Widget', imageUrl: 'Hoonicorn.jpg' },
    { id: '6', title: "Dodge RAM TRX", description: "Huge. Powerfull. Always hungry.", price: 3200, color: 'Green', size: 'M', type: 'Gadget', imageUrl: 'trx.jpg' },
    { id: '7', title: "Lexus LFA Nürburgring", description: "Engine sounds will make you feel good.", price: 1200, color: 'Blue', size: 'L', type: 'Tool', imageUrl: 'lfa.jpg' },
    { id: '8', title: "Dodge Viper", description: "True madness. Extereme power witout any stabilization", price: 950, color: 'Black', size: 'S', type: 'Widget', imageUrl: 'viper.jpg' },
    { id: '9', title: "Toyota Supra V12", description: "A legendary tuning project from the Top Secret studio with only one goal - to achieve a maximum speed of over 350 km/h.", price: 6500, color: 'Blue', size: 'L', type: 'Widget', imageUrl: 'supra.jpg' },
    { id: '10', title: "Rezvani Tank", description: "Armor, thermal imaging, anti-radiation protection.", price: 2100, color: 'Red', size: 'S', type: 'Gadget', imageUrl: 'rezvani.jpg' },
    { id: '11', title: "Toyota 'pishkarus'", description: "Absolutely free and always with you.", price: 0, color: 'Red', size: 'L', type: 'Tool', imageUrl: 'pishkarus.jpg' },
];


// READ (GET ALL) - Отримати всі товари
router.get('/items', (req, res) => {
    let currentItems = [...items];
    const { color, type, sortCriteria, searchQuery } = req.query;

    // Фільтрація та Пошук
    currentItems = currentItems.filter(item => {
        const matchesColor = !color || item.color === color;
        const matchesType = !type || item.type === type;
        
        const searchLower = searchQuery ? searchQuery.toLowerCase() : '';
        const matchesSearch = !searchLower ||
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower);

        return matchesColor && matchesType && matchesSearch;
    });

    // Сортування
    if (sortCriteria && sortCriteria !== 'none') {
        currentItems.sort((a, b) => {
            const [key, order] = sortCriteria.split('_');
            let result = 0;
            if (key === 'price') {
                result = (a.price || 0) - (b.price || 0);
            }
            return order === 'desc' ? result * -1 : result;
        });
    }

    setTimeout(() => {
        res.status(200).json(currentItems);
    }, 200); 
});

// READ (GET ONE) - Отримати один товар за ID
router.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = items.find(p => p.id === itemId); 

    if (item) {
        setTimeout(() => {
            res.status(200).json(item);
        }, 150);
    } else {
        res.status(404).send({ message: 'Товар не знайдено' });
    }
});






















// CREATE (POST)
router.post('/items', (req, res) => {
    const { title, description, price, color, size, type, imageUrl } = req.body;

    if (!title || !price) {
        return res.status(400).send({ message: 'Title and Price are required' });
    }

    const newItem = {
        id: uuidv4(), 
        title,
        description: description || '',
        price: parseFloat(price) || 0,
        color: color || 'Unknown',
        size: size || 'M',
        type: type || 'Widget',
        imageUrl: imageUrl || 'default.jpg',
    };

    items.push(newItem);
    res.status(201).json(newItem); // 201 Created
});

// UPDATE (PUT)
router.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const itemIndex = items.findIndex(p => p.id === itemId);

    if (itemIndex > -1) {
        const updatedItem = {
            ...items[itemIndex], 
            ...req.body,         
            id: itemId, 
            price: parseFloat(req.body.price) || items[itemIndex].price,
        };

        items[itemIndex] = updatedItem;
        res.status(200).json(updatedItem);
    } else {
        res.status(404).send({ message: 'Товар не знайдено для оновлення' });
    }
});

// DELETE
router.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const initialLength = items.length;

    items = items.filter(p => p.id !== itemId);

    if (items.length < initialLength) {
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).send({ message: 'Товар не знайдено для видалення' });
    }
});

module.exports = router;