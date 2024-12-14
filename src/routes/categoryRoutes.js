const express = require('express');
const protect = require('../middleware/authMiddleware');
const Category = require('../models/Category');
const Product = require('../models/Product'); 

const router = express.Router();

// Criar uma nova categoria
router.post('/', protect, async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Os campos name e description são obrigatórios.' });
    }

    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: 'Categoria criada com sucesso!', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a categoria.', error: error.message });
    }
});
// Buscar todas as categorias
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias.', error: error.message });
    }
});

// Consultar todas as categorias com produtos associados
router.get('/with-products', async (req, res) => {
    try {
        const categories = await Category.find();

        const results = await Promise.all(
            categories.map(async (category) => {
                const products = await Product.find({ categories: category._id });
                return {
                    category: {
                        _id: category._id,
                        name: category.name,
                        description: category.description
                    },
                    products
                };
            })
        );

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias com produtos associados.', error: error.message });
    }
});


// Atualizar uma categoria (PUT)
router.put('/:id', protect, async (req, res) => {
    const { name, description } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        res.status(200).json({ message: 'Categoria atualizada com sucesso!', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a categoria.', error: error.message });
    }
});

// Deletar uma categoria
router.delete('/:id', protect, async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        res.status(200).json({ message: 'Categoria deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar a categoria.', error: error.message });
    }
});



// Buscar uma categoria específica
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a categoria.', error: error.message });
    }
});



// Consultar todos os produtos de uma categoria específica
router.get('/:id/products', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        const products = await Product.find({ categories: category._id });
        res.status(200).json({
            category: {
                _id: category._id,
                name: category.name,
                description: category.description
            },
            products
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos da categoria.', error: error.message });
    }
});


module.exports = router;
