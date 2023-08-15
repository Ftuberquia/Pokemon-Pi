const { Router } = require('express');
const { Type } = require('../db.js');
const { getTypes } = require('../controllers/getTypes.js');
const router = Router();


router.get('/', async (req, res) => {
    try {
        await getTypes();
        const types = await Type.findAll();
        return res.json(types);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;