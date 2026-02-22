import { useState, useEffect, useCallback, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Clock, Users, Phone, Mail, Star, 
  ChevronRight, ChevronDown, Check, X, Calendar, MessageCircle,
  Menu, ArrowRight, Sparkles, Car, Shield, Heart, Navigation as NavigationIcon,
  Image as ImageIcon, ExternalLink, Search
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo URL from user
const LOGO_URL = "https://customer-assets.emergentagent.com/job_tour-booking-27/artifacts/fghvlh0y_WhatsApp%20Image%202026-02-22%20at%205.01.54%20PM.jpeg";

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-3">
    <img 
      src={LOGO_URL} 
      alt="Duta Bali Transport and Tours" 
      className="w-14 h-14 rounded-full object-cover shadow-lg"
    />
    <div className="hidden sm:block">
      <h1 className="font-heading text-lg font-bold text-primary leading-tight">Duta Bali</h1>
      <p className="text-xs text-bali-stone tracking-wider">Transport & Tours</p>
    </div>
  </div>
);

// Navigation
const Navigation = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-soft py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#packages" className="text-sm font-medium text-bali-stone hover:text-primary transition-colors">
              Tour Packages
            </a>
            <a href="#locations" className="text-sm font-medium text-bali-stone hover:text-primary transition-colors">
              Locations
            </a>
            <a href="#booking" className="text-sm font-medium text-bali-stone hover:text-primary transition-colors">
              Book Now
            </a>
            <a href="#reviews" className="text-sm font-medium text-bali-stone hover:text-primary transition-colors">
              Reviews
            </a>
            <button 
              onClick={onBookClick}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:scale-105"
            >
              Book Now
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-100 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#packages" className="text-sm font-medium text-bali-stone">Tour Packages</a>
              <a href="#locations" className="text-sm font-medium text-bali-stone">Locations</a>
              <a href="#booking" className="text-sm font-medium text-bali-stone">Book Now</a>
              <a href="#reviews" className="text-sm font-medium text-bali-stone">Reviews</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ onBookClick }) => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Bali Rice Terraces"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
    </div>

    <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl pt-32 pb-20">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-accent" />
          Premium Bali Experience
        </span>
        
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up stagger-1">
          Explore Bali with{' '}
          <span className="text-accent">Private Tours</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed animate-fade-in-up stagger-2">
          Comfortable, flexible, and private tour experience across Bali's most breathtaking destinations. 
          Discover hidden gems with expert local guides.
        </p>

        <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <Shield className="w-4 h-4 text-accent" />
            Licensed & Insured
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <Car className="w-4 h-4 text-accent" />
            Private Vehicles
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <Users className="w-4 h-4 text-accent" />
            Expert Guides
          </div>
        </div>

        <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-4">
          <button 
            onClick={onBookClick}
            data-testid="hero-book-now-btn"
            className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-hover shadow-lg shadow-accent/30 transition-all hover:scale-105 flex items-center gap-2"
          >
            Book Your Tour
            <ArrowRight className="w-5 h-5" />
          </button>
          <a 
            href="#packages"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 border border-white/20 transition-all"
          >
            View Packages
          </a>
        </div>
      </div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
        <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
      </div>
    </div>
  </section>
);

// Stats Section
const StatsSection = () => (
  <section className="bg-primary py-12 relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: '1000+', label: 'Happy Travelers', icon: Heart },
          { value: '500+', label: '5-Star Reviews', icon: Star },
          { value: '50+', label: 'Tour Destinations', icon: MapPin },
          { value: '10+', label: 'Years Experience', icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Tour Card with Expanded View (like reference)
const TourCard = ({ tour, onSelect, isExpanded, onToggle }) => {
  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-floating transition-all duration-500 animate-fade-in-up"
      data-testid={`tour-card-${tour.id}`}
    >
      {/* Header with Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={tour.images[0]} 
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-primary flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {tour.duration}
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="text-white/70 text-sm">Starting from</div>
          <div className="text-2xl font-bold text-white price-tag">
            Rp {formatPrice(tour.price)}
            <span className="text-sm font-normal text-white/70">/car</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-primary mb-2">
          {tour.name}
        </h3>
        <p className="text-bali-stone text-sm mb-4">
          {tour.description}
        </p>

        {/* Toggle Destinations */}
        <button 
          onClick={onToggle}
          className="flex items-center gap-2 text-primary font-medium mb-4 hover:text-accent transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Tour Destinations
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Destinations */}
        {isExpanded && (
          <div className="space-y-3 mb-4 animate-fade-in">
            {tour.destinations.map((dest, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-xl">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-bold">
                  {i + 1}
                </div>
                <span className="text-sm text-bali-stone">{dest}</span>
              </div>
            ))}

            {/* Included/Excluded */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-stone-100">
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2">Included:</h4>
                <ul className="space-y-1">
                  {tour.included.slice(0, 4).map((item, i) => (
                    <li key={i} className="text-xs text-bali-stone flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2">Excluded:</h4>
                <ul className="space-y-1">
                  {tour.excluded.map((item, i) => (
                    <li key={i} className="text-xs text-bali-stone flex items-center gap-1">
                      <X className="w-3 h-3 text-red-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <button 
          onClick={() => onSelect(tour)}
          data-testid={`select-tour-${tour.id}`}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 group"
        >
          Reserve This Tour
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

// Packages Section
const PackagesSection = ({ packages, onSelectPackage }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="packages" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Explore Bali
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-4">
            Unforgettable Tour Packages
          </h2>
          <p className="text-bali-stone text-lg">
            6 carefully curated experiences showcasing the best of Bali's culture, nature & spirituality
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-bali-stone">
              <Check className="w-4 h-4 text-green-500" /> Licensed & Insured
            </div>
            <div className="flex items-center gap-2 text-sm text-bali-stone">
              <Check className="w-4 h-4 text-green-500" /> Professional Drivers
            </div>
            <div className="flex items-center gap-2 text-sm text-bali-stone">
              <Check className="w-4 h-4 text-green-500" /> Flexible Itinerary
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((tour, i) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              onSelect={onSelectPackage}
              isExpanded={expandedId === tour.id}
              onToggle={() => setExpandedId(expandedId === tour.id ? null : tour.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Draggable Marker Component
const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null);
  
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setPosition([newPos.lat, newPos.lng]);
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    />
  );
};

// Map click handler
const MapClickHandler = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

// Recenter map component
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

// Address Search Component with Autocomplete
const AddressSearch = ({ setMarkerPosition, setSelectedLocation, setSearchedAddress }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Debounce search
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Search with Nominatim, bounded to Bali area
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=id&viewbox=114.4,−9.0,115.8,−8.0&bounded=0&limit=5`
        );
        const data = await response.json();
        
        // Filter results to Bali area
        const baliResults = data.filter(item => 
          item.display_name.toLowerCase().includes('bali') ||
          (parseFloat(item.lat) >= -9.0 && parseFloat(item.lat) <= -8.0 &&
           parseFloat(item.lon) >= 114.4 && parseFloat(item.lon) <= 116.0)
        );
        
        setSuggestions(baliResults.length > 0 ? baliResults : data.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    setMarkerPosition([lat, lng]);
    setSelectedLocation(null); // Clear predefined location
    setSearchedAddress(item.display_name);
    setQuery(item.display_name.split(',')[0]); // Show short name
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Ketik nama hotel/villa/alamat..."
          className="w-full h-12 pl-10 pr-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          data-testid="address-search-input"
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bali-stone" />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-floating border border-stone-100 overflow-hidden animate-fade-in">
          {suggestions.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-stone-50 last:border-0"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary line-clamp-1">
                    {item.display_name.split(',')[0]}
                  </p>
                  <p className="text-xs text-bali-stone line-clamp-1">
                    {item.display_name.split(',').slice(1, 4).join(',')}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.length >= 3 && suggestions.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-floating border border-stone-100 p-4 text-center text-sm text-bali-stone">
          Tidak ditemukan hasil untuk "{query}"
        </div>
      )}
    </div>
  );
};

// Locations Section with Interactive Map
const LocationsSection = ({ locations, selectedLocation, setSelectedLocation, markerPosition, setMarkerPosition }) => {
  const regions = ['South Bali', 'West Bali', 'East Bali', 'Central Bali', 'North Bali', 'Northwest Bali'];
  const [activeRegion, setActiveRegion] = useState('South Bali');
  const [searchedAddress, setSearchedAddress] = useState('');
  
  const filteredLocations = locations.filter(loc => loc.region === activeRegion);
  
  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    setMarkerPosition([loc.lat, loc.lng]);
    setSearchedAddress(''); // Clear search when selecting predefined location
  };

  return (
    <section id="locations" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <NavigationIcon className="w-4 h-4" />
            Location Guide
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-4">
            Pick-up & Drop-off Points
          </h2>
          <p className="text-bali-stone text-lg">
            Ketik alamat hotel/villa Anda, pilih lokasi dari daftar, atau <span className="text-accent font-semibold">drag marker</span> di peta!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-floating">
            {/* Address Search */}
            <div className="p-4 bg-secondary/50 border-b border-stone-100">
              <h3 className="font-heading font-semibold text-primary flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-accent" />
                Cari Alamat Penjemputan
              </h3>
              <AddressSearch 
                setMarkerPosition={setMarkerPosition} 
                setSelectedLocation={setSelectedLocation}
                setSearchedAddress={setSearchedAddress}
              />
            </div>
            
            <div className="h-[400px] relative">
              <MapContainer
                center={markerPosition}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker position={markerPosition} setPosition={setMarkerPosition} />
                <MapClickHandler setPosition={setMarkerPosition} />
                {selectedLocation && <RecenterMap center={[selectedLocation.lat, selectedLocation.lng]} />}
              </MapContainer>
            </div>
            
            {/* Marker Position Info */}
            <div className="p-4 bg-primary text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70">Pickup Location:</p>
                  <p className="font-semibold truncate">
                    {selectedLocation ? selectedLocation.name : (searchedAddress || 'Custom Location')}
                  </p>
                  {searchedAddress && (
                    <p className="text-xs text-white/60 truncate mt-0.5">{searchedAddress}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-white/70">Coordinates:</p>
                  <p className="text-sm font-mono">
                    {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
                  </p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Location List */}
          <div>
            {/* Region Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeRegion === region 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-white text-bali-stone hover:bg-secondary'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Location Table */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-primary">#</th>
                    <th className="text-left p-4 text-sm font-semibold text-primary">Location</th>
                    <th className="text-right p-4 text-sm font-semibold text-primary">Surcharge</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLocations.map((loc, i) => (
                    <tr 
                      key={loc.id}
                      onClick={() => handleLocationSelect(loc)}
                      className={`cursor-pointer transition-colors ${
                        selectedLocation?.id === loc.id 
                          ? 'bg-primary/10' 
                          : 'hover:bg-secondary/30'
                      }`}
                    >
                      <td className="p-4 text-sm text-bali-stone">{i + 1}</td>
                      <td className="p-4">
                        <div className="font-medium text-primary">{loc.name}</div>
                        <div className="text-xs text-bali-stone">{loc.region}</div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-accent font-semibold">
                          Rp {formatPrice(loc.surcharge)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-accent/10 rounded-2xl border border-accent/20">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Important Information:
              </h4>
              <ul className="text-sm text-bali-stone space-y-1">
                <li>• Biaya tambahan ini <strong>di luar harga paket tour</strong></li>
                <li>• Surcharge berlaku untuk <strong>pick-up dan drop-off</strong></li>
                <li>• Drag marker di peta untuk lokasi yang tidak tercantum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews Section
const ReviewsSection = () => {
  const reviews = [
    { name: "Sarah Johnson", country: "Australia", date: "January 2026", tour: "Best of Ubud Tour", rating: 5, text: "Pengalaman terbaik di Bali! Guide kami sangat ramah dan berpengetahuan luas. Best of Ubud Tour sangat worth it, semua destinasi indah sekali. Highly recommended!" },
    { name: "Michael Chen", country: "Singapore", date: "December 2025", tour: "Hiking/Jeep Kintamani Tour", rating: 5, text: "Sunrise di Mount Batur luar biasa! Driver profesional dan mobil sangat nyaman. Jeep tour experience yang tidak akan pernah saya lupakan." },
    { name: "Emma Williams", country: "UK", date: "November 2025", tour: "Best of Lempuyang Tour", rating: 5, text: "Lempuyang Gate of Heaven adalah highlight dari trip kami! Photos yang dihasilkan amazing. Service sangat memuaskan, flexible dengan schedule kami." },
    { name: "David Kumar", country: "India", date: "October 2025", tour: "Best of Bali West Tour", rating: 5, text: "Tanah Lot sunset sangat romantic! West Bali Tour covers semua tempat yang kami inginkan. Driver sangat helpful dan tahu tempat photo spots terbaik." },
    { name: "Lisa Anderson", country: "USA", date: "September 2025", tour: "Best of Uluwatu Tour", rating: 5, text: "Uluwatu Temple dan Kecak Dance performance sangat memukau! Jimbaran seafood dinner di sunset adalah pengalaman kuliner terbaik." },
    { name: "James Rodriguez", country: "Spain", date: "August 2025", tour: "Best of Kintamani Tour", rating: 5, text: "Tirta Empul holy water experience sangat spiritual. Kintamani volcano view breathtaking! Driver kami sangat punctual dan knowledgeable." }
  ];

  return (
    <section id="reviews" className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 text-accent" />
            Customer Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-white/70 text-lg">
            Read authentic experiences from travelers who explored Bali with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-white/90 mb-6 leading-relaxed text-sm">"{review.text}"</p>
              <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs inline-block mb-4">
                {review.tour}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{review.name}</div>
                  <div className="text-xs text-white/60">{review.country} • {review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Booking Form Section (inline, like reference)
const BookingFormSection = ({ packages, locations, selectedPackage, setSelectedPackage, markerPosition }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    packageId: '',
    tourDate: '',
    locationId: '',
    numPassengers: 1,
    specialRequests: ''
  });
  const [priceDetails, setPriceDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({ ...prev, packageId: selectedPackage.id }));
    }
  }, [selectedPackage]);

  const calculatePrice = useCallback(async () => {
    if (formData.packageId && formData.locationId) {
      try {
        const response = await axios.post(
          `${API}/calculate-price?package_id=${formData.packageId}&location_id=${formData.locationId}&num_passengers=${formData.numPassengers}`
        );
        setPriceDetails(response.data);
      } catch (error) {
        console.error('Error calculating price:', error);
      }
    } else if (formData.packageId) {
      const pkg = packages.find(p => p.id === formData.packageId);
      if (pkg) {
        setPriceDetails({
          package_name: pkg.name,
          package_price: pkg.price,
          location_name: 'Custom Location',
          surcharge: 0,
          total: pkg.price
        });
      }
    } else {
      setPriceDetails(null);
    }
  }, [formData.packageId, formData.locationId, formData.numPassengers, packages]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.packageId) return;

    setIsSubmitting(true);
    
    try {
      const pkg = packages.find(p => p.id === formData.packageId);
      const loc = locations.find(l => l.id === formData.locationId);
      
      const total = pkg.price + (loc?.surcharge || 0);
      
      // Create booking
      await axios.post(`${API}/bookings`, {
        full_name: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        package_id: formData.packageId,
        tour_date: formData.tourDate,
        pickup_location_id: formData.locationId || 'custom',
        num_passengers: formData.numPassengers,
        special_requests: `${formData.specialRequests}\n\nCustom Pickup Coordinates: ${markerPosition[0].toFixed(6)}, ${markerPosition[1].toFixed(6)}`
      });

      // Generate WhatsApp message
      const message = `🌺 *NEW TOUR BOOKING*

👤 *Customer:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *WhatsApp:* ${formData.whatsapp}
📅 *Tour Date:* ${formData.tourDate}
👥 *Passengers:* ${formData.numPassengers}

🎫 *Package:* ${pkg.name}
💰 Package Price: Rp ${formatPrice(pkg.price)}

📍 *Pickup Location:* ${loc?.name || 'Custom Location'}
💰 Surcharge: Rp ${formatPrice(loc?.surcharge || 0)}
🗺️ *Coordinates:* ${markerPosition[0].toFixed(6)}, ${markerPosition[1].toFixed(6)}
📍 Maps: https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]}

═══════════════════
💵 *TOTAL: Rp ${formatPrice(total)}*
═══════════════════

📝 *Special Requests:*
${formData.specialRequests || 'None'}

Thank you for booking with Duta Bali Tours! 🙏`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/6283871225179?text=${encodedMessage}`, '_blank');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        whatsapp: '',
        packageId: '',
        tourDate: '',
        locationId: '',
        numPassengers: 1,
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-4">
            Book Your Dream Tour Today!
          </h2>
          <p className="text-bali-stone text-lg">
            <strong>Limited slots available!</strong> Reserve your spot now and get ready for an unforgettable Bali adventure
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-bali-stone">
            <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-accent" /> Instant confirmation via WhatsApp</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> Best price guarantee</span>
            <span className="flex items-center gap-1"><Car className="w-4 h-4 text-primary" /> Private comfortable vehicles</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-floating p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-bali-stone mb-2">Full Name *</label>
              <input
                type="text"
                required
                data-testid="input-full-name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-bali-stone mb-2">Email *</label>
              <input
                type="email"
                required
                data-testid="input-email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-bali-stone mb-2">WhatsApp Number *</label>
              <input
                type="tel"
                required
                data-testid="input-whatsapp"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="+62 812 3456 7890"
              />
            </div>

            {/* Tour Package */}
            <div>
              <label className="block text-sm font-medium text-bali-stone mb-2">Select Tour Package *</label>
              <select
                required
                data-testid="select-package"
                value={formData.packageId}
                onChange={(e) => setFormData({...formData, packageId: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="">Choose a tour package</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - Rp {formatPrice(pkg.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Tour Date */}
            <div>
              <label className="block text-sm font-medium text-bali-stone mb-2">Tour Date *</label>
              <input
                type="date"
                required
                data-testid="input-tour-date"
                value={formData.tourDate}
                onChange={(e) => setFormData({...formData, tourDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-bali-stone mb-2">Pickup Location</label>
              <select
                data-testid="select-location"
                value={formData.locationId}
                onChange={(e) => setFormData({...formData, locationId: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="">Custom location (use map above)</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} - +Rp {formatPrice(loc.surcharge)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-bali-stone mt-1">
                Or drag the marker on the map for custom location
              </p>
            </div>

            {/* Special Requests */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-bali-stone mb-2">Notes (Optional)</label>
              <textarea
                data-testid="input-special-requests"
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>

          {/* Price Summary */}
          {priceDetails && (
            <div className="mt-6 p-4 bg-primary rounded-2xl text-white" data-testid="price-summary">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-white/70">Tour Package: {priceDetails.package_name}</p>
                  <p className="text-sm text-white/70">Pickup: {priceDetails.location_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70">Rp {formatPrice(priceDetails.package_price)} + Rp {formatPrice(priceDetails.surcharge)}</p>
                  <p className="text-2xl font-bold text-accent">Total: Rp {formatPrice(priceDetails.total)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.packageId || isSubmitting}
            data-testid="submit-booking"
            className="mt-6 w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/30 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="spinner" />
                Processing...
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                Send Reservation
              </>
            )}
          </button>

          {/* Contact Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-bali-stone mb-3">Or contact us directly via WhatsApp or email</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://wa.me/6283871225179" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                +62 838-7122-5179
              </a>
              <a 
                href="mailto:dutabalitourr@gmail.com"
                className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                dutabalitourr@gmail.com
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-primary text-white py-16">
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={LOGO_URL} 
              alt="Duta Bali Transport and Tours" 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <h3 className="font-heading text-xl font-bold">Duta Bali</h3>
              <p className="text-white/60 text-sm">Transport & Tours</p>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed max-w-md">
            Experience the best of Bali with our premium private tour services. 
            Comfortable vehicles, expert guides, and unforgettable memories await you.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#packages" className="text-white/70 hover:text-accent transition-colors">Tour Packages</a></li>
            <li><a href="#locations" className="text-white/70 hover:text-accent transition-colors">Pickup Locations</a></li>
            <li><a href="#booking" className="text-white/70 hover:text-accent transition-colors">Book Now</a></li>
            <li><a href="#reviews" className="text-white/70 hover:text-accent transition-colors">Customer Reviews</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li>
              <a href="https://wa.me/6283871225179" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                <Phone className="w-5 h-5" />
                +62 838-7122-5179
              </a>
            </li>
            <li>
              <a href="mailto:dutabalitourr@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
                dutabalitourr@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
        © 2026 Duta Bali Tours. All rights reserved.
      </div>
    </div>
  </footer>
);

// Floating WhatsApp Button
const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/6283871225179"
    target="_blank"
    rel="noopener noreferrer"
    data-testid="floating-whatsapp"
    className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 animate-float"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);

// Main App Component
function App() {
  const [packages, setPackages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([-8.4095, 115.1889]); // Default Bali center
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, locationsRes] = await Promise.all([
          axios.get(`${API}/packages`),
          axios.get(`${API}/locations`)
        ]);
        setPackages(packagesRes.data);
        setLocations(locationsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bali-cream">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <p className="text-bali-stone">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-bali-cream">
      <Navigation onBookClick={scrollToBooking} />
      <HeroSection onBookClick={scrollToBooking} />
      <StatsSection />
      <PackagesSection packages={packages} onSelectPackage={handleSelectPackage} />
      <LocationsSection 
        locations={locations} 
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
      />
      <ReviewsSection />
      <BookingFormSection 
        packages={packages} 
        locations={locations}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        markerPosition={markerPosition}
      />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
