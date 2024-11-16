import mongoose from "mongoose";

const labResultsSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patients',
      required: true,
    },
    test_name: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true, // URL for the lab result image
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    additional_notes: {
      type: String,
      trim: true,
    },
    technician_name: {
      type: String,
      trim: true,
    },
    nurse_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors_nurses', // Reference to the Nurse model
        required: true, // Ensures every lab result is tied to a nurse
      },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const labResultsModel = mongoose.models.labResult || mongoose.model('labResult', labResultsSchema);
export default labResultsModel