import PatientModel from '../models/Patients.js';
import labResultsModel from '../models/LabResults.js';
import patientsModel from '../models/Patients.js';
import {v2 as cloudinary} from "cloudinary"

const updatePatientData = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { dob, gender, weight, health_problem, prescribed_medicine, health_update } = req.body;

    const updatedFields = { dob, gender, weight, health_problem, prescribed_medicine, health_update };

    // Find and update the patient with the allowed fields
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      patientId,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient data updated successfully', updatedPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllPatients = async (req, res) => {
    try {
      const patients = await PatientModel.find({}, 'name image'); // Fetch name and image fields only
      res.status(200).json({ patients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const uploadLabResults=async(req,res)=>{
    try {
      const { patient_id, test_name, additional_notes,technician_name,result } = req.body;
      const nurse_id = req.user.id; // Get nurse ID from auth middleware
      const imageFile=req.file;

      // Validation
      if (!patient_id || !test_name || !req.file) {
        return res.status(400).json({
          error: 'Patient ID, Test Name, and Lab Result Image are required.',
        });
      }

      const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
      const imageUrl=imageUpload.secure_url
      
      const labResult = new labResultsModel({
        patient_id,
        test_name,
        image_url: imageUrl, 
        nurse_id,
        additional_notes,
        technician_name,
        result
      });

      await labResult.save();

      res.status(201).json({
        message: 'Lab result uploaded successfully.',
        labResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  }


  const searchPatientByName=async(req,res)=>{
    const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'Patient name is required to search.' });
  }
  try {
    // Use a regex for case-insensitive matching
    const patients = await patientsModel.find({
      name: { $regex: name, $options: 'i' }, // Case-insensitive search
    }).select('_id name'); // Only return necessary fields

    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found with the given name.' });
    }

    res.status(200).json({ patients });
  } catch (error) {
    console.error('Error searching for patients:', error);
    res.status(500).json({ message: 'Internal server error while searching for patients.' });
  }
  }

export {updatePatientData,getAllPatients,uploadLabResults,searchPatientByName}