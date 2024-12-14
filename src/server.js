const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB
connectDB();

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
