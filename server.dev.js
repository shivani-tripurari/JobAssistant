/**
 * Local development server for testing Vercel serverless functions
 * Run with: node server.dev.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import { createServer } from 'vite';
import generateHandler from './api/generate.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API route - wrap the Vercel handler for Express
app.post('/api/generate', async (req, res) => {
    // Create a mock Vercel request/response interface
    const mockReq = {
        method: req.method,
        body: req.body,
    };

    const mockRes = {
        status: (code) => {
            res.status(code);
            return mockRes;
        },
        json: (data) => {
            res.json(data);
            return mockRes;
        },
        setHeader: (name, value) => {
            res.setHeader(name, value);
            return mockRes;
        },
        end: () => res.end(),
    };

    try {
        await generateHandler(mockReq, mockRes);
    } catch (error) {
        console.error('Handler error:', error);
        res.status(200).json({
            text: `===COLD===
Demo content - error occurred.

===FOLLOWUP===
Just following up.

===SUBJECTS===
Quick intro`,
            warning: 'Error occurred, showing demo content',
        });
    }
});

// Start Vite as middleware
async function startServer() {
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'spa',
    });

    // Use Vite's middleware for everything else (frontend)
    app.use(vite.middlewares);

    app.listen(PORT, () => {
        console.log(`\n🚀 Job Assistant running at http://localhost:${PORT}\n`);
        console.log('   Frontend: Vite dev server');
        console.log('   Backend:  Express with Vercel function');
        console.log('\n   Press Ctrl+C to stop\n');
    });
}

startServer().catch(console.error);
