const express = require('express');
const db = require('./config/db');
const mainRoute = require('./routes');
const propertyRoute = require('./routes/property');
const { authenticatedUser } = require('./middleware/user');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/property', authenticatedUser, propertyRoute)
app.use('/api', mainRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});