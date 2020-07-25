import mongoose from 'mongoose';

const UrlShortenerSchema = new mongoose.Schema({
  url: {
    type: String,
  },
});

export default mongoose.model('UrlShortener', UrlShortenerSchema);
