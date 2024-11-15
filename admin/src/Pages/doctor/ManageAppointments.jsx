import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DoctorContext } from '../../Context/DoctorContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageAppointments = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { 'auth-token': dToken },
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [dToken, backendUrl]);

  const updateAppointmentStatus = async (doctorId, appointmentId, newStatus) => {
    try {
      await axios.patch(
        `${backendUrl}/api/doctor/appointments/manage/${doctorId}/${appointmentId}`,
        { status: newStatus },
        { headers: { 'auth-token': dToken } }
      );

      toast.success(`Appointment ${newStatus.toLowerCase()} successfully.`);

      // Refetch the appointments to get the updated list
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Error updating appointment status.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Appointments</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Patient Name</th>
            <th className="py-2 px-4 border-b">Requested Date</th>
            <th className="py-2 px-4 border-b">Requested Time</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="py-2 px-4 border-b"><Link to={`/patientData/${appointment.patientId._id}`} className="text-blue-500 underline">
                  {appointment.patientName}
                </Link></td>
              <td className="py-2 px-4 border-b">{appointment.day}</td>
              <td className="py-2 px-4 border-b">{appointment.time}</td>
              <td className="py-2 px-4 border-b">{appointment.status}</td>
              <td className="py-2 px-4 border-b">
                {/* Conditionally render action buttons based on the current status */}
                {appointment.status === 'Pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => updateAppointmentStatus(appointment.doctorId, appointment._id, 'Accepted')}
                    >
                      ✓
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => updateAppointmentStatus(appointment.doctorId, appointment._id, 'Rejected')}
                    >
                      ✕
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointments;
