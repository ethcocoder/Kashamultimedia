import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';
import { uploadFile } from '../../services/upload';
import { useLanguage } from '../../contexts/LanguageContext';
import toast from 'react-hot-toast';

export default function ImageUploader({ value, onChange, path = 'uploads', useFirebase = true }) {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useLanguage();

  const isVideo = preview && /\.(mp4|webm|mov|avi|mkv)$/i.test(preview);

  const handleFile = async (file) => {
    if (!file) return;
    
    // Check file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setUploading(true);
    try {
      // Create local preview immediately
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      
      // Upload to Firebase Storage
      const url = await uploadFile(file, path, useFirebase);
      setPreview(url);
      onChange(url);
      toast.success('Upload successful!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.');
      if (value) setPreview(value);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative group">
          {isVideo ? (
            <video src={preview} controls className="w-full h-48 object-cover rounded-xl bg-black" />
          ) : (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl bg-black" />
          )}
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className="relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group"
          style={{
            borderColor: uploading ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.02)',
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--gold)'; }}
          onDragLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            disabled={uploading}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(201,169,110,0.1)' }}>
              {uploading ? (
                <Upload className="w-6 h-6 text-[var(--gold)] animate-bounce" />
              ) : (
                <ImageIcon className="w-6 h-6 text-[var(--gold)]" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--gray-500)' }}>
                PNG, JPG, GIF, WEBP or MP4, WEBM (max 50MB)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
