
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Doctor, Specialty } from '../types/doctor';

type SortOption = 'fees' | 'experience';
type ConsultationType = 'video' | 'in-clinic' | null;

interface UseDoctorFiltersProps {
  doctors: Doctor[];
}

export const useDoctorFilters = ({ doctors }: UseDoctorFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get('specialties')?.split(',').filter(Boolean) || []
  );
  const [consultationType, setConsultationType] = useState<ConsultationType>(
    (searchParams.get('mode') as ConsultationType) || null
  );
  const [sortBy, setSortBy] = useState<SortOption | null>(
    (searchParams.get('sort') as SortOption) || null
  );

  const getSpecialtyName = (specialty: string | Specialty): string => {
    return typeof specialty === 'string' ? specialty : specialty.name;
  };

  // Extract all unique specialties from doctors
  const allSpecialties = useMemo(() => {
    const specialtiesSet = new Set<string>();
    doctors.forEach(doctor => {
      doctor.specialities.forEach(specialty => {
        specialtiesSet.add(getSpecialtyName(specialty));
      });
    });
    return Array.from(specialtiesSet).sort();
  }, [doctors]);

  // Update URL params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (selectedSpecialties.length > 0) {
      newSearchParams.set('specialties', selectedSpecialties.join(','));
    }

    if (consultationType) {
      newSearchParams.set('mode', consultationType);
    }

    if (sortBy) {
      newSearchParams.set('sort', sortBy);
    }

    if (searchTerm) {
      newSearchParams.set('search', searchTerm);
    }

    setSearchParams(newSearchParams, { replace: true });
  }, [selectedSpecialties, consultationType, sortBy, searchTerm, setSearchParams]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const suggestions = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(term) ||
          doctor.specialities.some(specialty => getSpecialtyName(specialty).toLowerCase().includes(term)) ||
          doctor.clinicName.toLowerCase().includes(term)
        )
        .map(doctor => doctor.name)
        .slice(0, 3);
      
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(item => item !== specialty)
        : [...prev, specialty]
    );
  };

  // Apply all filters in combination
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Apply search filter
      const matchesSearch = !searchTerm || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialities.some(specialty => 
          getSpecialtyName(specialty).toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        doctor.clinicName.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply specialty filter
      const matchesSpecialty = selectedSpecialties.length === 0 || 
        selectedSpecialties.every(selectedSpecialty =>
          doctor.specialities.some(doctorSpecialty => 
            getSpecialtyName(doctorSpecialty) === selectedSpecialty
          )
        );

      // Apply consultation type filter
      const matchesConsultationType = !consultationType || 
        doctor.consultationType === consultationType || 
        doctor.consultationType === 'both';

      // Return true only if ALL filters match
      return matchesSearch && matchesSpecialty && matchesConsultationType;
    }).sort((a, b) => {
      if (sortBy === 'fees') {
        return a.fees - b.fees;
      } else if (sortBy === 'experience') {
        return b.experience - a.experience;
      }
      return 0;
    });
  }, [doctors, searchTerm, selectedSpecialties, consultationType, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    selectedSpecialties,
    toggleSpecialty,
    consultationType,
    setConsultationType,
    sortBy,
    setSortBy,
    filteredDoctors,
    allSpecialties,
  };
};
