import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface AddressSuggestion {
  properties: {
    label: string;
    score: number;
    housenumber?: string;
    id: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    city: string;
    context: string;
    type: string;
    importance: number;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export default function AddressAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter an address" 
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchAddresses = async (query: string) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      
      // French official address API
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=8`,
        {
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        throw new Error('Error searching addresses');
      }

      const data = await response.json();
      setSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Address API error:', error);
        setSuggestions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length > 2) {
      // Debounce search
      const timeoutId = setTimeout(() => {
        fetchAddresses(inputValue);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.properties.label);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (value.length > 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="mt-1 block w-full pl-10 pr-3 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
        />
        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-royal-gold-500" />
        {isLoading && (
          <div className="absolute right-3 top-3.5">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal-gold-500"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-royal-gold-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.properties.id || index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-royal-gold-50 focus:bg-royal-gold-50 focus:outline-none border-b border-royal-gold-100 last:border-b-0"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-royal-gold-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm text-royal-brown-900 block">
                    {suggestion.properties.label}
                  </span>
                  <span className="text-xs text-royal-brown-600">
                    {suggestion.properties.context}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && !isLoading && value.length > 2 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-royal-gold-300 rounded-md shadow-lg"
        >
          <div className="px-4 py-2 text-sm text-royal-brown-600">
            No addresses found
          </div>
        </div>
      )}
    </div>
  );
}