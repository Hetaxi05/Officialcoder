const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

app.post('/run-python', (req, res) => {
    const pythonProcess = spawn('python', ['script.py']); // Runs script.py

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    pythonProcess.on('close', () => {
        res.json({ result: output });
    });
});

app.listen(8000, () => console.log('Server running on port 3000'));
