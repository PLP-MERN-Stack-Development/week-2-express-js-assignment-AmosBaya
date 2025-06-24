const express = require('express');
const router = express.Router();
const Product = require('./Product')

// GET /api/products - Get all products
router.get('/', async (req, res)=> {
   try {
    const product = await Product.find()
    res.status(200).send(product)
   } catch (error) {
    res.status(404).send(error)
   } 
});

// getting a product by id
router.get('/:id', async (req, res)=> {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).send();
        res.status(200).send(product)
    } catch(error) {
        res.status(500).send(error)
    }
});

// posting a poroduct
router.post('/', async (req, res)=> {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch(error) {
        res.status(500).send(error)
    }
})

// updating a task
router.put('/:id', async (req, res)=> {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true }
        )
        if (!product) return res.status(404).send();
        res.status(201).send(product)
    } catch(error) {
        res.status(500).send(error)
    }
})

// deleting a task 
router.delete('/:id', async (req, res)=> {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send();
        res.status(200).send(`${Product.name} deleted successfully`)
    } catch (error) {
        res.status(500).send(error)
    }
})