const express = require('express');
const { registerUser, authenticateUser } = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered"
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', async (req, res) => {
    const { name, surname, email, password } = req.body;
    try {
        const newUser = await registerUser(name, surname, email, password);
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with email and password to get a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ message: 'Login successful', token });
});

module.exports = router;
