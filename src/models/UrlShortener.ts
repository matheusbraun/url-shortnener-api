import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';

interface IUrlShortener extends Document {
  fullUrl: string;
  shortUrl: string;
}

const UrlShortenerSchema: Schema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate,
  },
});

export default mongoose.model<IUrlShortener>(
  'UrlShortener',
  UrlShortenerSchema,
);
