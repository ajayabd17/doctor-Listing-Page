
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  suggestions: string[];
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, suggestions, setSearchTerm }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" data-testid="search-container">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 pl-12 pr-4 bg-white border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-medical text-base"
            placeholder="Search Symptoms, Doctors, Specialities, Clinics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="autocomplete-input"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </form>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                data-testid="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
