
import React from 'react';
import { Doctor } from '../types/doctor';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4" data-testid="doctor-card">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
          <img
            src={doctor.profilePhoto}
            alt={`Dr. ${doctor.name}`}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/150?text=Doctor';
            }}
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-1" data-testid="doctor-name">
            Dr. {doctor.name}
          </h3>
          
          <p className="text-gray-600 mb-2" data-testid="doctor-specialty">
            {doctor.specialities.join(', ')}
          </p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 mb-4">
            <div>
              <span className="text-gray-500 text-sm">Experience:</span>
              <span className="ml-1 font-medium" data-testid="doctor-experience">
                {doctor.experience} years
              </span>
            </div>
            
            <div>
              <span className="text-gray-500 text-sm">Fees:</span>
              <span className="ml-1 font-medium" data-testid="doctor-fee">
                ₹{doctor.fees}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3 justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                {doctor.clinicName}, {doctor.location}
              </p>
              <p className="text-sm text-gray-500">
                {doctor.consultationType === 'both' ? 'In-Clinic & Video Consultation' : 
                  doctor.consultationType === 'video' ? 'Video Consultation' : 'In-Clinic Consultation'}
              </p>
            </div>
            
            <Button className="bg-medical hover:bg-medical-dark">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
