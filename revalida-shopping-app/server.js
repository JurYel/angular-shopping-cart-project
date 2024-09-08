const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Use CORS to allow cross-origin requests from Angular (optional)
app.use(cors());

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies (optional, if needed)

// Custom middleware to ensure req.body is populated
app.use((req, res, next) => {
    if (req.headers['content-type']?.startsWith('multipart/form-data')) {
        next(); // Proceed to multer
    } else {
        express.urlencoded({ extended: true })(req, res, next);
    }
});

// Specify the storage location and filename for the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/users'); // Save to this folder
    },
    filename: (req, file, cb) => {
        let fileName = req.body.name || 'default'; // Use 'default' if no name is provided
        console.log(req.body.name);
        cb(null, Date.now().toString().slice(0, -3) + path.extname(file.originalname)); // Use a unique name (timestamp)
    }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Not an image! Please upload an image file.'), false); // Reject the file
    }
};

// Setup multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Define the route to handle file uploads
app.post('/api/v1/upload-image', upload.single('image'), (req, res) => {
    const imageName = req.body.name;
    const filePath = req.file.path;
    if(!req.file) {
        return res.status(400).send('No file uploaded');
    }
    
    res.send({ message: "File uploaded successfully", imageName: imageName, filePath: filePath });
});

// Serve static files (the uploaded images will be served from this directory)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Start the server
app.listen(3030, () => {
    console.log('Server running on port 3030');
});