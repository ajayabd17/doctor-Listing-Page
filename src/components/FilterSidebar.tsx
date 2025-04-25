
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  allSpecialties: string[];
  selectedSpecialties: string[];
  toggleSpecialty: (specialty: string) => void;
  consultationType: 'video' | 'in-clinic' | null;
  setConsultationType: (type: 'video' | 'in-clinic' | null) => void;
  sortBy: 'fees' | 'experience' | null;
  setSortBy: (option: 'fees' | 'experience' | null) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  allSpecialties,
  selectedSpecialties,
  toggleSpecialty,
  consultationType,
  setConsultationType,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Sort By</h2>
        <RadioGroup 
          value={sortBy || ''} 
          onValueChange={(value) => setSortBy(value as 'fees' | 'experience' | null)}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
              <Label htmlFor="sort-fees">Price: Low-High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
              <Label htmlFor="sort-experience">Experience - Most Experience first</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Specialities</h3>
          <div className="space-y-2">
            {allSpecialties.map((specialty) => (
              <div key={specialty} className="flex items-center">
                <Checkbox
                  id={`specialty-${specialty}`}
                  data-testid={`filter-specialty-${specialty}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={() => toggleSpecialty(specialty)}
                />
                <label
                  htmlFor={`specialty-${specialty}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Mode of Consultation</h3>
          <RadioGroup 
            value={consultationType || ''} 
            onValueChange={(value) => setConsultationType(value as 'video' | 'in-clinic' | null)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video-consult" data-testid="filter-video-consult" />
                <Label htmlFor="video-consult">Video Consultation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-clinic" id="in-clinic" data-testid="filter-in-clinic" />
                <Label htmlFor="in-clinic">In-Clinic Consultation</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
