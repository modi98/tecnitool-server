import mongoose, { Schema } from 'mongoose'

const deviceSchema = new Schema({
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
  manufacturer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

deviceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      clientId: this.clientId,
      manufacturer: this.manufacturer,
      model: this.model,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Device', deviceSchema)

export const schema = model.schema
export default model
