const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));

// POST route to handle incoming requests
app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;
        const user_id = "Akhil_Sai_Kapa_28102003";  // This should come from actual data
        
        // Validate incoming data
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid data format" });
        }

        // Separate numbers and alphabets from the input array
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
        
        // Find the highest lowercase alphabet
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
            ? [lowercaseAlphabets.sort().reverse()[0]]
            : [];

        // File handling logic
        let file_valid = false;
        let file_mime_type = null;
        let file_size_kb = null;

        if (file_b64) {
            const buffer = Buffer.from(file_b64, 'base64');
            file_size_kb = (buffer.length / 1024).toFixed(2);  // Convert to KB

            // You can do more file validation here (like checking the file type)
            // For now, we'll consider it valid if there's any file content
            file_valid = true;
            file_mime_type = "application/octet-stream";  // Default MIME type for binary data
        }

        // Construct response
        const response = {
            is_success: true,
            user_id: user_id,
            email: "akhilsai_kapa@srmap.edu.in",
            roll_number: "AP21110010125",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet,
            file_valid: file_valid,
            file_mime_type: file_mime_type,
            file_size_kb: file_size_kb
        };

        // Send response
        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

// GET route to return hardcoded operation code
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
