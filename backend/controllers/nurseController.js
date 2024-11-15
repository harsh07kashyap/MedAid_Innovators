import PatientModel from '../models/Patients.js';

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
  


export {updatePatientData,getAllPatients}