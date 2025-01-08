import { Schema } from 'mongoose';

export const DocumentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['landmark', 'business', 'residence'], required: true },
  location: { 
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add 2dsphere index for geospatial queries
DocumentSchema.index({ location: '2dsphere' });
