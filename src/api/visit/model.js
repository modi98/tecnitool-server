import mongoose, { Schema } from 'mongoose'

const visitSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client',
    required: true
  },
  startDate: {
    type: Date,
    required: Date
  },
  endDate: {
    type: Date,
    required: Date
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  maintenance: [
    {
      device: {
        type: Schema.ObjectId,
        ref: 'Device'
      },
      category: String,
      description: String
    }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

visitSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      clientId: this.clientId,
      startDate: this.startDate,
      endDate: this.endDate,
      coordinates: this.coordinates,
      maintenance: this.maintenance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Visit', visitSchema)

export const schema = model.schema
export default model
