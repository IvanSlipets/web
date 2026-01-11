const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5050; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: "Welcome to Wordllban application." });
});

const itemRoutes = require("./routes");


app.use('/api', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});