import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { promisify } from 'util';

import generateFile from './generateFile.js';
import generateInputFile from './generateInputFile.js';

import executeCpp from './executeCpp.js';
import executeC from './executeC.js';
import executeJava from './executeJava.js';
import executePython from './executePython.js';

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

const unlinkAsync = promisify(fs.unlink);

app.get('/', (req, res) => {
    res.send('Welcome to compiler API');
});



app.post('/run', async (req, res) => {
    const { language = 'cpp', code, input } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: 'Empty code!' });
    }

    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    let output, timeTaken, memoryUsed, stderr;

    try {
        switch (language) {
            case 'c':
                const { stderr: cStderr, stdout: cStdout, memoryUsed: cMemoryUsed, timeUsed: cTimeUsed } = await executeC(filePath, inputPath);
                output = cStdout;
                timeTaken = cTimeUsed;
                memoryUsed = cMemoryUsed;
                stderr = cStderr;
                break;
            case 'java':
                const { stderr: javaStderr, stdout: javaStdout, memoryUsed: javaMemoryUsed, timeUsed: javaTimeUsed } = await executeJava(filePath, inputPath);
                output = javaStdout;
                timeTaken = javaTimeUsed;
                memoryUsed = javaMemoryUsed;
                stderr = javaStderr;
                break;
            case 'python':
                const { stderr: pythonStderr, stdout: pythonStdout, memoryUsed: pythonMemoryUsed, timeUsed: pythonTimeUsed } = await executePython(filePath, inputPath);
                output = pythonStdout;
                timeTaken = pythonTimeUsed;
                memoryUsed = pythonMemoryUsed;
                stderr = pythonStderr;
                break;
            default:
                const { stderr: cppStderr, stdout: cppStdout, memoryUsed: cppMemoryUsed, timeUsed: cppTimeUsed } = await executeCpp(filePath, inputPath);
                output = cppStdout;
                timeTaken = cppTimeUsed;
                memoryUsed = cppMemoryUsed;
                stderr = cppStderr;
                break;
        }

        res.status(200).json({ output: output.trim(), timeTaken, memoryUsed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message,stderr:stderr });
    } finally {
        // Ensure files are deleted after processing
        try {
            await unlinkAsync(filePath);
            await unlinkAsync(inputPath);
        } catch (cleanupError) {
            console.error('Error deleting files:', cleanupError);
        }
    }
});

app.post('/runOntest', async (req, res) => {
    const { language, code, testcases, timeLimit, memoryLimit } = req.body;

    const filePath = await generateFile(language, code);
    let outputs = [];
    let timeTaken = 0;
    let memoryUsed = 0;
    try {
        let count=0;
        for (let testcase of testcases) {
            const inputPath = await generateInputFile(testcase.input);
            let output, time = 0, memory = 0, stderr;
            count++;
            switch (language) {
                case 'c':
                    const { stderr: cStderr, stdout: cStdout, memoryUsed: cMemoryUsed, timeUsed: cTimeUsed } = await executeC(filePath, inputPath);
                    output = cStdout;
                    time = cTimeUsed;
                    memory = cMemoryUsed;
                    stderr = cStderr;
                    break;
                case 'java':
                    const { stderr: javaStderr, stdout: javaStdout, memoryUsed: javaMemoryUsed, timeUsed: javaTimeUsed } = await executeJava(filePath, inputPath);
                    output = javaStdout;
                    time = javaTimeUsed;
                    memory = javaMemoryUsed;
                    stderr = javaStderr;
                    break;
                case 'python':
                    const { stderr: pythonStderr, stdout: pythonStdout, memoryUsed: pythonMemoryUsed, timeUsed: pythonTimeUsed } = await executePython(filePath, inputPath);
                    output = pythonStdout;
                    time = pythonTimeUsed;
                    memory = pythonMemoryUsed;
                    stderr = pythonStderr;
                    break;
                default:
                    const { stderr: cppStderr, stdout: cppStdout, memoryUsed: cppMemoryUsed, timeUsed: cppTimeUsed } = await executeCpp(filePath, inputPath);
                    output = cppStdout;
                    time = cppTimeUsed;
                    memory = cppMemoryUsed;
                    stderr = cppStderr;
                    break;
            }

            timeTaken = Math.max(timeTaken, time);
            memoryUsed = Math.max(memoryUsed, memory);
            outputs.push(output.trim());

            // Delete the input file after it's processed
            await unlinkAsync(inputPath);
        }

        res.status(200).json({ outputs, timeTaken, memoryUsed });
    } catch (error) {
        // If an error occurs, send it as a response
        res.status(500).json({ success: false, error: error.message,stderr:stderr });
    } finally {
        // Ensure the code file is deleted after processing
        try {
            await unlinkAsync(filePath);
        } catch (cleanupError) {
            console.error('Error deleting file:', cleanupError);
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});