from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import urllib.parse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Tour Packages Data
TOUR_PACKAGES = [
    {
        "id": "best-of-ubud",
        "name": "Best of Ubud Tour",
        "price": 750000,
        "duration": "8 hours",
        "description": "Explore the heart of Bali's culture and nature",
        "destinations": [
            "Batuan Temple Village",
            "Coffee Plantation",
            "Sacred Monkey Forest",
            "Lunch at Local Restaurant",
            "Tegalalang Rice Terrace",
            "Tegenungan Waterfall"
        ],
        "included": ["Private car with AC", "English-speaking driver", "Petrol", "Parking fee", "Free mineral water"],
        "excluded": ["Personal expenses", "Tipping (optional)", "Entrance fees"],
        "images": [
            "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/19137171/pexels-photo-19137171.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&w=800"
        ]
    },
    {
        "id": "hiking-kintamani",
        "name": "Hiking or Jeep Kintamani Tour",
        "price": 1300000,
        "duration": "8 hours",
        "description": "Witness the majestic sunrise at Mount Batur",
        "destinations": [
            "Sunrise Jeep Tour / Hiking Mount Batur",
            "Natural Hot Spring",
            "Breakfast at Kintamani Café",
            "Coffee Plantation"
        ],
        "included": ["Private car with AC", "4WD Jeep", "English-speaking driver", "Petrol", "Parking fee", "Free mineral water"],
        "excluded": ["Personal expenses", "Tipping (optional)"],
        "images": [
            "https://images.pexels.com/photos/3254728/pexels-photo-3254728.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/2499744/pexels-photo-2499744.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/6176936/pexels-photo-6176936.jpeg?auto=compress&w=800"
        ]
    },
    {
        "id": "best-of-uluwatu",
        "name": "Best of Uluwatu Tour",
        "price": 950000,
        "duration": "8 hours",
        "description": "Experience dramatic cliffs and Kecak dance",
        "destinations": [
            "Garuda Wisnu Kencana Cultural Park",
            "Coffee Plantation",
            "Kecak Dance at Uluwatu Temple",
            "Dinner at Jimbaran Seafood"
        ],
        "included": ["Private car with AC", "English-speaking driver", "Petrol", "Parking fee", "Free mineral water"],
        "excluded": ["Personal expenses", "Tipping (optional)", "Entrance fees"],
        "images": [
            "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/5990051/pexels-photo-5990051.jpeg?auto=compress&w=800"
        ]
    },
    {
        "id": "best-of-bali-west",
        "name": "Best of Bali West Tour",
        "price": 950000,
        "duration": "10 hours",
        "description": "Discover iconic temples and rice terraces",
        "destinations": [
            "Tanah Lot Temple",
            "Sangeh Monkey Forest",
            "Coffee Plantation",
            "Lunch",
            "Ulun Danu Beratan Temple",
            "Jatiluwih Rice Terrace",
            "Taman Ayun Temple"
        ],
        "included": ["Private car with AC", "English-speaking driver", "Petrol", "Parking fee", "Free mineral water"],
        "excluded": ["Personal expenses", "Tipping (optional)", "Entrance fees"],
        "images": [
            "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/2100804/pexels-photo-2100804.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/17299295/pexels-photo-17299295.jpeg?auto=compress&w=800"
        ]
    },
    {
        "id": "best-of-kintamani",
        "name": "Best of Kintamani Tour",
        "price": 850000,
        "duration": "10 hours",
        "description": "Explore volcanoes and sacred springs",
        "destinations": [
            "Goa Gajah (Elephant Cave Temple)",
            "Coffee Plantation",
            "Tirta Empul Holy Spring Temple",
            "Kintamani Volcano Viewpoint",
            "Tegalalang Rice Terrace"
        ],
        "included": ["Private car with AC", "English-speaking driver", "Petrol", "Parking fee", "Free mineral water"],
        "excluded": ["Personal expenses", "Tipping (optional)", "Entrance fees"],
        "images": [
            "https://images.pexels.com/photos/3254728/pexels-photo-3254728.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/35144895/pexels-photo-35144895.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/19137171/pexels-photo-19137171.jpeg?auto=compress&w=800"
        ]
    },
    {
        "id": "best-of-lempuyang",
        "name": "Best of Lempuyang Tour",
        "price": 1000000,
        "duration": "12 hours",
        "description": "Visit the iconic Gate of Heaven",
        "destinations": [
            "Lempuyang Temple (Gate of Heaven)",
            "Tirta Gangga Royal Water Palace",
            "Taman Ujung Floating Palace",
            "Lunch"
        ],
        "included": ["Private car with AC", "English-speaking driver", "Petrol", "Parking fee", "Free mineral water"],
        "excluded": ["Personal expenses", "Tipping (optional)", "Entrance fees"],
        "images": [
            "https://images.pexels.com/photos/28211183/pexels-photo-28211183.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&w=800",
            "https://images.pexels.com/photos/35144895/pexels-photo-35144895.jpeg?auto=compress&w=800"
        ]
    }
]

# Pickup Locations with surcharge
PICKUP_LOCATIONS = [
    {"id": "kuta", "name": "Kuta", "region": "South Bali", "surcharge": 300000},
    {"id": "seminyak", "name": "Seminyak", "region": "South Bali", "surcharge": 350000},
    {"id": "canggu", "name": "Canggu", "region": "West Bali", "surcharge": 500000},
    {"id": "nusa-dua", "name": "Nusa Dua", "region": "South Bali", "surcharge": 350000},
    {"id": "uluwatu", "name": "Uluwatu", "region": "South Bali", "surcharge": 500000},
    {"id": "jimbaran", "name": "Jimbaran", "region": "South Bali", "surcharge": 350000},
    {"id": "sanur", "name": "Sanur", "region": "East Bali", "surcharge": 300000},
    {"id": "legian", "name": "Legian", "region": "South Bali", "surcharge": 350000},
    {"id": "tanah-lot", "name": "Tanah Lot", "region": "West Bali", "surcharge": 600000},
    {"id": "ubud", "name": "Ubud", "region": "Central Bali", "surcharge": 450000},
    {"id": "padang-bai", "name": "Padang Bai", "region": "East Bali", "surcharge": 700000},
    {"id": "sidemen", "name": "Sidemen", "region": "East Bali", "surcharge": 600000},
    {"id": "candidasa", "name": "Candidasa", "region": "East Bali", "surcharge": 650000},
    {"id": "kintamani", "name": "Kintamani", "region": "North Bali", "surcharge": 750000},
    {"id": "lovina", "name": "Lovina", "region": "North Bali", "surcharge": 950000},
    {"id": "pemuteran", "name": "Pemuteran", "region": "Northwest Bali", "surcharge": 1000000}
]

# Models
class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    whatsapp: str
    package_id: str
    tour_date: str
    pickup_location_id: str
    num_passengers: int = 1
    special_requests: Optional[str] = None

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    whatsapp: str
    package_id: str
    package_name: str
    package_price: int
    tour_date: str
    pickup_location_id: str
    pickup_location_name: str
    pickup_surcharge: int
    num_passengers: int
    total_price: int
    special_requests: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SiteSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = "site_settings"
    hero_title: str = "Explore Bali with Private Tours"
    hero_subtitle: str = "Comfortable, flexible, and private tour experience across Bali's most breathtaking destinations"
    contact_whatsapp: str = "+6283871225179"
    contact_email: str = "dutabalitourr@gmail.com"
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "Duta Bali Tour API"}

@api_router.get("/packages")
async def get_packages():
    return TOUR_PACKAGES

@api_router.get("/packages/{package_id}")
async def get_package(package_id: str):
    for pkg in TOUR_PACKAGES:
        if pkg["id"] == package_id:
            return pkg
    raise HTTPException(status_code=404, detail="Package not found")

@api_router.get("/locations")
async def get_locations():
    return PICKUP_LOCATIONS

@api_router.post("/calculate-price")
async def calculate_price(package_id: str, location_id: str, num_passengers: int = 1):
    package = None
    location = None
    
    for pkg in TOUR_PACKAGES:
        if pkg["id"] == package_id:
            package = pkg
            break
    
    for loc in PICKUP_LOCATIONS:
        if loc["id"] == location_id:
            location = loc
            break
    
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    package_price = package["price"]
    surcharge = location["surcharge"]
    total = package_price + surcharge
    
    return {
        "package_name": package["name"],
        "package_price": package_price,
        "location_name": location["name"],
        "surcharge": surcharge,
        "num_passengers": num_passengers,
        "total": total
    }

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    # Get package info
    package = None
    for pkg in TOUR_PACKAGES:
        if pkg["id"] == booking_data.package_id:
            package = pkg
            break
    
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    # Get location info
    location = None
    for loc in PICKUP_LOCATIONS:
        if loc["id"] == booking_data.pickup_location_id:
            location = loc
            break
    
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    # Calculate total
    total_price = package["price"] + location["surcharge"]
    
    # Create booking
    booking = Booking(
        full_name=booking_data.full_name,
        email=booking_data.email,
        whatsapp=booking_data.whatsapp,
        package_id=booking_data.package_id,
        package_name=package["name"],
        package_price=package["price"],
        tour_date=booking_data.tour_date,
        pickup_location_id=booking_data.pickup_location_id,
        pickup_location_name=location["name"],
        pickup_surcharge=location["surcharge"],
        num_passengers=booking_data.num_passengers,
        total_price=total_price,
        special_requests=booking_data.special_requests
    )
    
    # Save to database
    doc = booking.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.bookings.insert_one(doc)
    
    return booking

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for b in bookings:
        if isinstance(b.get('created_at'), str):
            b['created_at'] = datetime.fromisoformat(b['created_at'])
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if isinstance(booking.get('created_at'), str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return booking

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Status updated"}

@api_router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str):
    result = await db.bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted"}

@api_router.get("/settings", response_model=SiteSettings)
async def get_settings():
    settings = await db.settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        default_settings = SiteSettings()
        doc = default_settings.model_dump()
        doc['updated_at'] = doc['updated_at'].isoformat()
        await db.settings.insert_one(doc)
        return default_settings
    if isinstance(settings.get('updated_at'), str):
        settings['updated_at'] = datetime.fromisoformat(settings['updated_at'])
    return settings

@api_router.put("/settings", response_model=SiteSettings)
async def update_settings(settings: SiteSettings):
    doc = settings.model_dump()
    doc['updated_at'] = datetime.now(timezone.utc).isoformat()
    await db.settings.update_one(
        {"id": "site_settings"},
        {"$set": doc},
        upsert=True
    )
    return settings

@api_router.get("/whatsapp-link")
async def get_whatsapp_link(
    package_name: str,
    package_price: int,
    location_name: str,
    surcharge: int,
    total: int,
    full_name: str,
    tour_date: str,
    num_passengers: int,
    special_requests: str = ""
):
    """Generate WhatsApp booking link"""
    message = f"""🌺 *NEW TOUR BOOKING*

👤 *Customer:* {full_name}
📅 *Tour Date:* {tour_date}
👥 *Passengers:* {num_passengers}

🎫 *Package:* {package_name}
💰 Package Price: Rp {package_price:,}

📍 *Pickup Location:* {location_name}
💰 Surcharge: Rp {surcharge:,}

═══════════════════
💵 *TOTAL: Rp {total:,}*
═══════════════════

📝 *Special Requests:*
{special_requests if special_requests else 'None'}

Thank you for booking with Duta Bali Tours! 🙏"""

    encoded_message = urllib.parse.quote(message)
    whatsapp_number = "6283871225179"
    
    return {
        "link": f"https://wa.me/{whatsapp_number}?text={encoded_message}",
        "message": message
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
