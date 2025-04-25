
import React from 'react';
import { Doctor } from '../types/doctor';
import { Button } from '@/components/ui/button';
import { Building2, MapPin } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const getSpecialtyName = (specialty: string | { name: string }): string => {
    return typeof specialty === 'string' ? specialty : specialty.name;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4" data-testid="doctor-card">
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
        
        <div className="flex-grow space-y-3">
          <div>
            <h3 className="text-xl font-semibold mb-1" data-testid="doctor-name">
              Dr. {doctor.name}
            </h3>
            
            <p className="text-gray-600 text-sm" data-testid="doctor-specialty">
              {doctor.specialities.map(specialty => getSpecialtyName(specialty)).join(', ')}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span data-testid="doctor-experience">
              {doctor.experience} years exp
            </span>
            <span data-testid="doctor-fee" className="font-medium">
              ₹{doctor.fees}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>{doctor.clinicName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{doctor.location}</span>
            </div>
          </div>

          <Button className="w-full md:w-auto bg-medical hover:bg-medical-dark">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
