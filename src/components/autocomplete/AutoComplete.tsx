import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useDeferredValue } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface AutocompleteProps<T> {
  suggestions: T[];
  fetchSuggestions?: (value: string) => void;
  onSelect?: (value: T) => void;
  loading?: boolean;
  renderSuggestion: (item: T) => React.ReactNode;
  debounceTime?: number;
  placeholder?: string;
}

const Autocomplete = <T,>({
  suggestions,
  fetchSuggestions,
  onSelect,
  renderSuggestion,
  loading = false,
  debounceTime = 300,
  placeholder = 'Type to search...',
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const deferredValue = useDeferredValue(inputValue);

  const debouncedFetchSuggestions = useCallback(
    debounce((value: string) => {
      if (fetchSuggestions && value) {
        fetchSuggestions(value);
      }
    }, debounceTime),
    [fetchSuggestions, debounceTime]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  const handleSelect = (value: T) => {
    setInputValue('');
    onSelect?.(value);
  };

  const renderInputLoading = () => (
    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
      <CgSpinner className="animate-spin text-blue-600" size={25} />
    </div>
  );

  const renderSuggestionsList = () => (
    <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelect(suggestion)}
        >
          {renderSuggestion(suggestion)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative w-full mx-auto z-50">
      <input
        type="text"
        value={deferredValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && renderInputLoading()}
      {inputValue && suggestions.length > 0 && !loading && renderSuggestionsList()}
      {loading && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto p-2 text-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
