import { Schema } from 'mongoose';

export const CitySchema = new Schema({
  name: { type: String, required: true },
  boundary: { 
    type: { type: String, enum: ['Polygon'], required: true },
    coordinates: { type: [[[Number]]], required: true },
  },
});

CitySchema.index({ boundary: '2dsphere' });
