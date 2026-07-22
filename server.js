import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(join(__dirname, 'public')));

// Ensure upload directories exist
const uploadDir = join(__dirname, 'public', 'upload', 'images');
mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Default to public/upload/images, but can be overridden via query param
    const targetDir = req.query.path ? join(__dirname, 'public', 'upload', req.query.path) : uploadDir;
    mkdirSync(targetDir, { recursive: true });
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Increased to 50MB to support video
  fileFilter: (req, file, cb) => {
    const allowedImages = /jpeg|jpg|png|gif|webp|svg|bmp|tiff/;
    const allowedVideos = /mp4|webm|mov|avi|mkv/;
    const ext = extname(file.originalname).toLowerCase().replace('.', '');
    
    const isImage = allowedImages.test(ext) || allowedImages.test(file.mimetype);
    const isVideo = allowedVideos.test(ext) || allowedVideos.test(file.mimetype);
    
    cb(null, isImage || isVideo);
  },
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid type' });
  }
  
  // Return URL relative to public directory
  const url = `/upload/images/${req.file.filename}`;
  res.json({ url });
});

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`);
});
