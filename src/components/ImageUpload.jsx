import { createWorker } from 'tesseract.js'
import { useState } from 'react'

const ImageUpload = ({ setGrid, onError }) => {
  const [loading, setLoading] = useState(false)

  const processImage = async (file) => {
    setLoading(true)
    try {
      // Create worker with proper configuration
      const worker = await createWorker();

      // Initialize with English language
      await worker.initialize('eng');

      // Set parameters for number recognition
      await worker.setParameters({
        tessedit_char_whitelist: '123456789',
        tessedit_pageseg_mode: '6', // Assume uniform block of text
      });

      // Recognize text from image
      const { data: { text } } = await worker.recognize(file);
      console.log('Raw OCR result:', text);

      // Process the recognized text
      const digits = text.replace(/[^1-9]/g, '');
      console.log('Extracted digits:', digits);

      if (digits.length < 15) {
        throw new Error('Not enough numbers detected');
      }

      // Create grid from digits
      const newGrid = Array(9).fill().map(() => Array(9).fill(0));
      let digitIndex = 0;
      for (let i = 0; i < 9 && digitIndex < digits.length; i++) {
        for (let j = 0; j < 9 && digitIndex < digits.length; j++) {
          newGrid[i][j] = parseInt(digits[digitIndex++]) || 0;
        }
      }

      console.log('Final grid:', newGrid);
      setGrid(newGrid);
      onError('');

      // Terminate worker
      await worker.terminate();
    } catch (error) {
      console.error('OCR failed:', error);
      onError('Failed to process image. Please try manually entering numbers or use a clearer image.');
    }
    setLoading(false);
  };

  return (
    <div className={`image-upload ${loading ? 'loading' : ''}`}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files[0] && processImage(e.target.files[0])}
        disabled={loading}
      />
      {loading && (
        <div className="loading-text">
          Processing image... This may take a few moments.
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
