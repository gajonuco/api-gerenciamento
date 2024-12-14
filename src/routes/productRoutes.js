const express = require('express');
const protect = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

// Criar um novo produto
router.post('/', protect, async (req, res) => {
    const { name, description, amount, price, categories } = req.body;

    if (!name || !description || !amount || !price) {
        return res.status(400).json({ message: 'Os campos name, description, amount e price são obrigatórios.' });
    }

    try {
        // Verifica se as categorias existem (se fornecidas)
        let categoryList = [];
        if (categories && categories.length > 0) {
            categoryList = await Category.find({ _id: { $in: categories } });
            if (categoryList.length !== categories.length) {
                return res.status(400).json({ message: 'Uma ou mais categorias fornecidas são inválidas.' });
            }
        }

        const newProduct = new Product({
            name,
            description,
            amount,
            price,
            categories: categoryList.map((category) => category._id)
        });

        await newProduct.save();
        res.status(201).json({ message: 'Produto criado com sucesso!', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o produto.', error: error.message });
    }
});

// Atualizar um produto (PUT)
router.put('/:id', protect, async (req, res) => {
    const { name, description, amount, price, categories } = req.body;

    try {
        let categoryList = [];
        if (categories && categories.length > 0) {
            categoryList = await Category.find({ _id: { $in: categories } });
            if (categoryList.length !== categories.length) {
                return res.status(400).json({ message: 'Uma ou mais categorias fornecidas são inválidas.' });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, amount, price, categories: categoryList.map((category) => category._id) },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto atualizado com sucesso!', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o produto.', error: error.message });
    }
});

// Deletar um produto
router.delete('/:id', protect, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o produto.', error: error.message });
    }
});

// Buscar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('categories', 'name description');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
    }
});

// Buscar um produto específico
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categories', 'name description');

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o produto.', error: error.message });
    }
});

module.exports = router;
