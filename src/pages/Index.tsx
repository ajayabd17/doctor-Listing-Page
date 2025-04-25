
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import DoctorList from '../components/DoctorList';
import { fetchDoctors } from '../services/doctorService';
import { useDoctorFilters } from '../hooks/useDoctorFilters';
import { Doctor } from '../types/doctor';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setLoading(false);
    };

    loadDoctors();
  }, []);

  const {
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
  } = useDoctorFilters({ doctors });

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      {/* Header */}
      <header className="bg-[#2463EB] shadow-sm py-6 mb-6">
        <div className="container max-w-6xl mx-auto px-4">
          <SearchBar 
            searchTerm={searchTerm}
            suggestions={suggestions}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-1/3 lg:w-1/4">
            <FilterSidebar
              allSpecialties={allSpecialties}
              selectedSpecialties={selectedSpecialties}
              toggleSpecialty={toggleSpecialty}
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </aside>

          {/* Doctor List */}
          <div className="md:w-2/3 lg:w-3/4">
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-medical border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-2 text-gray-600">Loading doctors...</p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">
                  {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
                </h2>
                <DoctorList doctors={filteredDoctors} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
