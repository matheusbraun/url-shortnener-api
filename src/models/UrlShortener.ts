import mongoose, { Schema, Document } from 'mongoose';

export interface IUrlShortener extends Document {
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
    unique: true,
    lowercase: true,
  },
});

export default mongoose.model<IUrlShortener>(
  'UrlShortener',
  UrlShortenerSchema,
);
