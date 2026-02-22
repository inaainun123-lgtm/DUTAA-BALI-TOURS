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

## Architecture
- **Frontend**: React.js with TailwindCSS
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **External**: WhatsApp Business API (via wa.me links), OpenStreetMap

## User Personas
1. **Tourist** - International/domestic travelers looking for private Bali tours
2. **Admin** - Tour operator managing bookings and content

## Core Requirements
### Must Have (Implemented)
- [x] Custom logo (Duta Bali Transport and Tours)
- [x] 6 Tour packages with pricing and custom images
- [x] 16 Pickup locations with surcharges and GPS coordinates
- [x] Interactive map (OpenStreetMap) for location selection
- [x] "Open in Google Maps" feature
- [x] Real-time price calculation (Package + Location = Total)
- [x] Complete booking form (name, email, WhatsApp, date, passengers, notes)
- [x] WhatsApp booking redirect with formatted message
- [x] Responsive tropical design with animations

### What's Been Implemented (Jan 22, 2026)
1. **Homepage**
   - Custom logo from user (Duta Bali Transport and Tours)
   - Hero section with background image
   - Navigation with sticky header
   - Stats section (1000+ travelers, 500+ reviews, etc.)
   - Floating WhatsApp button

2. **Tour Packages Section**
   - 6 tour packages with custom images from user
   - Best of Ubud: Silver class experience photo
   - Best of Uluwatu: GWK statue, Kecak dance photos

3. **Locations Section with Map**
   - Interactive OpenStreetMap embed
   - 16 pickup locations with GPS coordinates
   - Click to select and view on map
   - Info overlay with name, region, surcharge
   - "Open in Google Maps" button

4. **Reviews Section**
   - 3 customer testimonials

5. **Booking Modal**
   - Complete booking form
   - Price calculator
   - WhatsApp redirect

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
- [x] Interactive map for locations
- [x] Google Maps integration

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
