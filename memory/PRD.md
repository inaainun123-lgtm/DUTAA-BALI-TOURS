# Duta Bali Tours - Private Tour Booking Platform

## Original Problem Statement
Memperbaiki aplikasi tour booking Bali dengan:
- Kalkulasi total harga otomatis (paket + lokasi penjemputan) seperti Grab/Gojek
- Form booking yang lengkap
- Desain tropical natural yang bagus dan elegant dengan animasi
- Logo custom di bagian atas (logo dari user: Duta Bali Transport and Tours)
- Notifikasi ke Gmail & WhatsApp saat ada booking
- Foto yang bisa diganti-ganti
- Google Maps untuk lokasi penjemputan
- Layout seperti referensi https://private-tours.preview.emergentagent.com/
- **Map interaktif dengan marker yang bisa dipindah-pindah** untuk custom pickup location

## Architecture
- **Frontend**: React.js with TailwindCSS, Leaflet Maps
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **External**: WhatsApp Business API, OpenStreetMap/Leaflet

## User Personas
1. **Tourist** - International/domestic travelers looking for private Bali tours
2. **Admin** - Tour operator managing bookings and content

## Core Requirements
### Must Have (Implemented)
- [x] Custom logo (Duta Bali Transport and Tours)
- [x] 6 Tour packages with pricing and custom images
- [x] 16 Pickup locations with surcharges and GPS coordinates
- [x] **Interactive Leaflet map with draggable marker**
- [x] Region tabs for filtering locations
- [x] "Open in Google Maps" feature with coordinates
- [x] Real-time price calculation (Package + Location = Total)
- [x] Inline booking form (not modal) like reference
- [x] Expandable tour destinations
- [x] WhatsApp booking redirect with coordinates in message
- [x] Responsive tropical design with animations

### What's Been Implemented (Jan 22, 2026)
1. **Homepage**
   - Custom logo from user (Duta Bali Transport and Tours)
   - Hero section with background image
   - Navigation with sticky header (Tour Packages, Locations, Book Now, Reviews)
   - Stats section

2. **Tour Packages Section**
   - 6 tour packages with custom images
   - Expandable destinations list
   - Included/Excluded items shown when expanded
   - "Reserve This Tour" buttons

3. **Locations Section with Interactive Map**
   - **Leaflet map with draggable green marker**
   - Click anywhere on map to set pickup point
   - Region tabs (South/West/East/Central/North/Northwest Bali)
   - Table of locations with surcharges
   - Click location row to move marker
   - Live coordinates display
   - "Open in Google Maps" button

4. **Reviews Section**
   - 6 customer testimonials
   - Card layout with ratings

5. **Inline Booking Form**
   - All fields inline on page (not modal)
   - Full Name, Email, WhatsApp, Package, Date, Location, Notes
   - Real-time price summary
   - "Send Reservation" button → WhatsApp with full details + coordinates

6. **Backend APIs**
   - GET /api/packages - List all tour packages
   - GET /api/locations - List all pickup locations with coordinates
   - GET /api/logo - Get logo URL
   - POST /api/calculate-price - Calculate total price
   - POST /api/bookings - Create booking record
   - GET /api/whatsapp-link - Generate WhatsApp message URL

## Prioritized Backlog
### P0 (Critical) - DONE
- [x] Custom logo implementation
- [x] Custom photos for tours
- [x] Interactive map with draggable marker
- [x] Layout like reference site
- [x] Inline booking form

### P1 (High Priority) - PENDING
- [ ] Email notification via SendGrid (requires API key)
- [ ] Admin panel for managing photos
- [ ] Admin panel for managing bookings

### P2 (Medium Priority) - FUTURE
- [ ] Payment gateway integration (Midtrans/Stripe)
- [ ] Multi-language support (EN/ID)
- [ ] Photo gallery management

## Next Tasks
1. Add SendGrid email integration (requires SENDGRID_API_KEY)
2. Build admin panel for booking management
3. Add photo management feature
