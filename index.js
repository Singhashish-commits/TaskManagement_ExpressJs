require('dotenv').config();

const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();

    await sequelize.sync({ alter: true }); // auto create tables

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})();