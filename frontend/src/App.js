import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import axios from "axios";
import { 
  MapPin, Clock, Users, Phone, Mail, Star, 
  ChevronRight, Check, X, Calendar, MessageCircle,
  Menu, ArrowRight, Sparkles, Car, Shield, Heart
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo URL from user
const LOGO_URL = "https://customer-assets.emergentagent.com/job_tour-booking-27/artifacts/fghvlh0y_WhatsApp%20Image%202026-02-22%20at%205.01.54%20PM.jpeg";

// Format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

// Logo Component with user's logo
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
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#packages" className="text-sm font-medium text-bali-stone hover:text-primary transition-colors">
              Tour Packages
            </a>
            <a href="#locations" className="text-sm font-medium text-bali-stone hover:text-primary transition-colors">
              Locations
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-100 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#packages" className="text-sm font-medium text-bali-stone">Tour Packages</a>
              <a href="#locations" className="text-sm font-medium text-bali-stone">Locations</a>
              <a href="#reviews" className="text-sm font-medium text-bali-stone">Reviews</a>
              <button 
                onClick={onBookClick}
                className="bg-primary text-white px-6 py-2.5 rounded-full font-medium w-full"
              >
                Book Now
              </button>
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
    {/* Background Image */}
    <div className="absolute inset-0">
      <img 
        src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Bali Rice Terraces"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
    </div>

    {/* Content */}
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

        {/* Features */}
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

        {/* CTA Buttons */}
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

    {/* Scroll indicator */}
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

// Tour Card
const TourCard = ({ tour, onSelect, index }) => (
  <div 
    className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-floating transition-all duration-500 card-hover animate-fade-in-up`}
    style={{ animationDelay: `${index * 0.1}s` }}
    data-testid={`tour-card-${tour.id}`}
  >
    {/* Image */}
    <div className="relative h-56 overflow-hidden">
      <img 
        src={tour.images[0]} 
        alt={tour.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      {/* Duration badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-primary flex items-center gap-1.5">
        <Clock className="w-4 h-4" />
        {tour.duration}
      </div>

      {/* Price */}
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
      <h3 className="font-heading text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
        {tour.name}
      </h3>
      <p className="text-bali-stone text-sm mb-4 line-clamp-2">
        {tour.description}
      </p>

      {/* Destinations preview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tour.destinations.slice(0, 3).map((dest, i) => (
          <span key={i} className="bg-secondary text-primary text-xs px-2 py-1 rounded-full">
            {dest}
          </span>
        ))}
        {tour.destinations.length > 3 && (
          <span className="bg-secondary text-bali-stone text-xs px-2 py-1 rounded-full">
            +{tour.destinations.length - 3} more
          </span>
        )}
      </div>

      {/* CTA */}
      <button 
        onClick={() => onSelect(tour)}
        data-testid={`select-tour-${tour.id}`}
        className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 group"
      >
        Select Package
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

// Packages Section
const PackagesSection = ({ packages, onSelectPackage }) => (
  <section id="packages" className="py-20 md:py-28 bg-secondary/30">
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      {/* Header */}
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
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((tour, i) => (
          <TourCard 
            key={tour.id} 
            tour={tour} 
            onSelect={onSelectPackage} 
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);

// Location Selector Card
const LocationCard = ({ location, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(location)}
    data-testid={`location-${location.id}`}
    className={`p-4 rounded-2xl border-2 transition-all text-left w-full ${
      isSelected 
        ? 'border-primary bg-primary/5 shadow-lg' 
        : 'border-stone-200 hover:border-primary/50 hover:bg-white'
    }`}
  >
    <div className="flex items-start justify-between">
      <div>
        <div className="font-semibold text-primary">{location.name}</div>
        <div className="text-sm text-bali-stone">{location.region}</div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? 'border-primary bg-primary' : 'border-stone-300'
      }`}>
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>
    </div>
    <div className="mt-2 text-accent font-semibold">
      +Rp {formatPrice(location.surcharge)}
    </div>
  </button>
);

// Locations Section with Google Maps
const LocationsSection = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const groupedLocations = locations.reduce((acc, loc) => {
    if (!acc[loc.region]) acc[loc.region] = [];
    acc[loc.region].push(loc);
    return acc;
  }, {});

  // Default center is Bali
  const defaultCenter = { lat: -8.4095, lng: 115.1889 };
  const mapCenter = selectedLocation 
    ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
    : defaultCenter;
  const mapZoom = selectedLocation ? 13 : 9;

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${mapCenter.lat},${mapCenter.lng}&zoom=${mapZoom}&maptype=roadmap`;
  
  // Fallback to OpenStreetMap if Google Maps doesn't work
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.1},${mapCenter.lat - 0.1},${mapCenter.lng + 0.1},${mapCenter.lat + 0.1}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`;

  return (
    <section id="locations" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Car className="w-4 h-4" />
            Pick-up Service
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-4">
            Pick-up & Drop-off Points
          </h2>
          <p className="text-bali-stone text-lg">
            Click on a location to see it on the map. Additional charges based on your location.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl overflow-hidden shadow-floating sticky top-24">
              <div className="relative h-[500px]">
                <iframe
                  title="Bali Pickup Locations Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={osmUrl}
                  allowFullScreen
                />
                {/* Map overlay info */}
                {selectedLocation && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-fade-in-up">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-heading font-semibold text-primary text-lg">{selectedLocation.name}</h4>
                        <p className="text-sm text-bali-stone">{selectedLocation.region}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-accent font-bold text-xl">
                          +Rp {formatPrice(selectedLocation.surcharge)}
                        </span>
                        <p className="text-xs text-bali-stone">Surcharge</p>
                      </div>
                    </div>
                    <a 
                      href={`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full bg-primary text-white py-2 rounded-xl font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Locations List */}
          <div className="order-1 lg:order-2 space-y-6">
            {Object.entries(groupedLocations).map(([region, locs]) => (
              <div key={region} className="bg-white rounded-3xl p-6 shadow-soft">
                <h3 className="font-heading text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  {region}
                </h3>
                <div className="space-y-2">
                  {locs.map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        selectedLocation?.id === loc.id 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary/50 hover:bg-secondary text-bali-stone'
                      }`}
                    >
                      <span className="font-medium">{loc.name}</span>
                      <span className={`font-semibold text-sm ${
                        selectedLocation?.id === loc.id ? 'text-white' : 'text-accent'
                      }`}>
                        +Rp {formatPrice(loc.surcharge)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews Section
const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      country: "Australia",
      date: "January 2026",
      tour: "Best of Ubud Tour",
      rating: 5,
      text: "Pengalaman terbaik di Bali! Guide kami sangat ramah dan berpengetahuan luas. Best of Ubud Tour sangat worth it, semua destinasi indah sekali. Highly recommended!"
    },
    {
      name: "Michael Chen",
      country: "Singapore",
      date: "December 2025",
      tour: "Hiking/Jeep Kintamani Tour",
      rating: 5,
      text: "Sunrise di Mount Batur luar biasa! Driver profesional dan mobil sangat nyaman. Jeep tour experience yang tidak akan pernah saya lupakan."
    },
    {
      name: "Emma Williams",
      country: "UK",
      date: "November 2025",
      tour: "Best of Lempuyang Tour",
      rating: 5,
      text: "Lempuyang Gate of Heaven adalah highlight dari trip kami! Photos yang dihasilkan amazing. Service sangat memuaskan, flexible dengan schedule kami."
    }
  ];

  return (
    <section id="reviews" className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header */}
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

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/90 mb-6 leading-relaxed">"{review.text}"</p>

              {/* Tour tag */}
              <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm inline-block mb-4">
                {review.tour}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{review.name}</div>
                  <div className="text-sm text-white/60">{review.country} • {review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Booking Modal
const BookingModal = ({ 
  isOpen, 
  onClose, 
  packages, 
  locations, 
  selectedPackage,
  onPackageChange 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    packageId: selectedPackage?.id || '',
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

  // Calculate price when package or location changes
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
    } else {
      setPriceDetails(null);
    }
  }, [formData.packageId, formData.locationId, formData.numPassengers]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!priceDetails) return;

    setIsSubmitting(true);
    
    try {
      // Create booking
      await axios.post(`${API}/bookings`, {
        full_name: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        package_id: formData.packageId,
        tour_date: formData.tourDate,
        pickup_location_id: formData.locationId,
        num_passengers: formData.numPassengers,
        special_requests: formData.specialRequests
      });

      // Generate WhatsApp link
      const waResponse = await axios.get(`${API}/whatsapp-link`, {
        params: {
          package_name: priceDetails.package_name,
          package_price: priceDetails.package_price,
          location_name: priceDetails.location_name,
          surcharge: priceDetails.surcharge,
          total: priceDetails.total,
          full_name: formData.fullName,
          tour_date: formData.tourDate,
          num_passengers: formData.numPassengers,
          special_requests: formData.specialRequests || ''
        }
      });

      // Open WhatsApp
      window.open(waResponse.data.link, '_blank');
      
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
      setPriceDetails(null);
      onClose();
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentPackage = packages.find(p => p.id === formData.packageId);
  const currentLocation = locations.find(l => l.id === formData.locationId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold">Book Your Dream Tour</h2>
                <p className="text-white/70 text-sm mt-1">Fill in the details below</p>
              </div>
              <button 
                onClick={onClose}
                data-testid="close-booking-modal"
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-5">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Personal Information</h3>
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-bali-stone mb-2">
                    Full Name *
                  </label>
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
                  <label className="block text-sm font-medium text-bali-stone mb-2">
                    Email Address *
                  </label>
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
                  <label className="block text-sm font-medium text-bali-stone mb-2">
                    WhatsApp Number *
                  </label>
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

                {/* Tour Date */}
                <div>
                  <label className="block text-sm font-medium text-bali-stone mb-2">
                    Tour Date *
                  </label>
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

                {/* Number of Passengers */}
                <div>
                  <label className="block text-sm font-medium text-bali-stone mb-2">
                    Number of Passengers
                  </label>
                  <select
                    data-testid="input-passengers"
                    value={formData.numPassengers}
                    onChange={(e) => setFormData({...formData, numPassengers: parseInt(e.target.value)})}
                    className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'passenger' : 'passengers'}</option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-bali-stone mb-2">
                    Special Requests (Optional)
                  </label>
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

              {/* Right Column - Package & Location Selection */}
              <div className="space-y-6">
                {/* Package Selection */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-4">Select Tour Package *</h3>
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
                  
                  {currentPackage && (
                    <div className="mt-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={currentPackage.images[0]} 
                          alt={currentPackage.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-semibold text-primary">{currentPackage.name}</div>
                          <div className="text-sm text-bali-stone flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {currentPackage.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location Selection */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-4">Select Pickup Location *</h3>
                  <select
                    required
                    data-testid="select-location"
                    value={formData.locationId}
                    onChange={(e) => setFormData({...formData, locationId: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Choose pickup location</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.region}) - +Rp {formatPrice(loc.surcharge)}
                      </option>
                    ))}
                  </select>

                  {currentLocation && (
                    <div className="mt-3 p-4 bg-secondary/50 rounded-xl flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-semibold text-primary">{currentLocation.name}</div>
                        <div className="text-sm text-bali-stone">{currentLocation.region}</div>
                      </div>
                      <div className="ml-auto text-accent font-semibold">
                        +Rp {formatPrice(currentLocation.surcharge)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                {priceDetails && (
                  <div className="bg-primary rounded-2xl p-6 text-white" data-testid="price-summary">
                    <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Price Summary
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Tour Package</span>
                        <span className="font-semibold">Rp {formatPrice(priceDetails.package_price)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Pickup Surcharge</span>
                        <span className="font-semibold">Rp {formatPrice(priceDetails.surcharge)}</span>
                      </div>
                      <div className="border-t border-white/20 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-2xl font-bold text-accent">
                            Rp {formatPrice(priceDetails.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!priceDetails || isSubmitting}
                  data-testid="submit-booking"
                  className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/30 transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Book via WhatsApp
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-bali-stone">
                  You'll be redirected to WhatsApp to confirm your booking
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-primary text-white py-16">
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="grid md:grid-cols-4 gap-12">
        {/* Logo & About */}
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

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#packages" className="text-white/70 hover:text-accent transition-colors">Tour Packages</a></li>
            <li><a href="#locations" className="text-white/70 hover:text-accent transition-colors">Pickup Locations</a></li>
            <li><a href="#reviews" className="text-white/70 hover:text-accent transition-colors">Customer Reviews</a></li>
          </ul>
        </div>

        {/* Contact */}
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
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
    setIsBookingOpen(true);
  };

  const handleOpenBooking = () => {
    setSelectedPackage(null);
    setIsBookingOpen(true);
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
      <Navigation onBookClick={handleOpenBooking} />
      <HeroSection onBookClick={handleOpenBooking} />
      <StatsSection />
      <PackagesSection packages={packages} onSelectPackage={handleSelectPackage} />
      <LocationsSection locations={locations} />
      <ReviewsSection />
      <Footer />
      <FloatingWhatsApp />
      
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packages={packages}
        locations={locations}
        selectedPackage={selectedPackage}
        onPackageChange={setSelectedPackage}
      />
    </div>
  );
}

export default App;
