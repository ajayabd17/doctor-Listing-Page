
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Doctor } from '../types/doctor';

type SortOption = 'fees' | 'experience';
type ConsultationType = 'video' | 'in-clinic' | null;

interface UseDoctorFiltersProps {
  doctors: Doctor[];
}

export const useDoctorFilters = ({ doctors }: UseDoctorFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState<ConsultationType>(null);
  const [sortBy, setSortBy] = useState<SortOption | null>(null);

  // Extract all unique specialties from doctors
  const allSpecialties = useMemo(() => {
    const specialtiesSet = new Set<string>();
    doctors.forEach(doctor => {
      doctor.specialities.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    });
    return Array.from(specialtiesSet).sort();
  }, [doctors]);

  // Initialize filters from URL params
  useEffect(() => {
    const specialtiesParam = searchParams.get('specialties');
    if (specialtiesParam) {
      setSelectedSpecialties(specialtiesParam.split(','));
    }

    const modeParam = searchParams.get('mode');
    if (modeParam === 'video' || modeParam === 'in-clinic') {
      setConsultationType(modeParam);
    }

    const sortParam = searchParams.get('sort');
    if (sortParam === 'fees' || sortParam === 'experience') {
      setSortBy(sortParam);
    }

    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

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

    setSearchParams(newSearchParams);
  }, [selectedSpecialties, consultationType, sortBy, searchTerm, setSearchParams]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const doctorSuggestions = doctors
        .filter(doctor => doctor.name.toLowerCase().includes(term))
        .map(doctor => doctor.name)
        .slice(0, 3);
      
      setSuggestions(doctorSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  // Toggle specialty selection
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(item => item !== specialty)
        : [...prev, specialty]
    );
  };

  // Apply all filters
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialities.some(specialty => specialty.toLowerCase().includes(term)) ||
        doctor.clinicName.toLowerCase().includes(term)
      );
    }

    // Filter by specialties
    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor => 
        selectedSpecialties.some(specialty => doctor.specialities.includes(specialty))
      );
    }

    // Filter by consultation type
    if (consultationType) {
      result = result.filter(doctor => 
        doctor.consultationType === consultationType || doctor.consultationType === 'both'
      );
    }

    // Sort by fees or experience
    if (sortBy === 'fees') {
      result.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    return result;
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
