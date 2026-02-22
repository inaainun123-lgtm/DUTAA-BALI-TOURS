import requests
import sys
import json
from datetime import datetime, timedelta

class BaliTourAPITester:
    def __init__(self, base_url="https://tour-booking-27.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        
        # Expected data from static arrays in server.py
        self.expected_packages = 6  # 6 tour packages
        self.expected_locations = 16  # 16 pickup locations
        
        # Sample test data
        self.sample_package_id = "best-of-ubud"
        self.sample_location_id = "kuta"
        self.expected_package_price = 750000  # Best of Ubud
        self.expected_location_surcharge = 300000  # Kuta
        self.expected_total = self.expected_package_price + self.expected_location_surcharge

    def run_test(self, name, method, endpoint, expected_status=200, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, params=params)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            
            result = {
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'error': None,
                'response_data': None
            }
            
            if success:
                self.tests_passed += 1
                print(f"   ✅ Passed - Status: {response.status_code}")
                try:
                    result['response_data'] = response.json()
                except:
                    result['response_data'] = response.text
            else:
                print(f"   ❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                result['error'] = f"Status code mismatch. Response: {response.text[:200]}"

            self.test_results.append(result)
            return success, response

        except Exception as e:
            print(f"   ❌ Failed - Error: {str(e)}")
            result = {
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': None,
                'success': False,
                'error': str(e),
                'response_data': None
            }
            self.test_results.append(result)
            return False, None

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            ""
        )
        
        if success:
            data = response.json()
            if 'message' in data:
                print(f"   📝 Message: {data['message']}")
            else:
                print(f"   ⚠️  Unexpected response format: {data}")
        
        return success

    def test_get_packages(self):
        """Test getting tour packages"""
        success, response = self.run_test(
            "Get Tour Packages",
            "GET",
            "packages"
        )
        
        if success:
            packages = response.json()
            print(f"   📦 Found {len(packages)} packages")
            
            if len(packages) != self.expected_packages:
                print(f"   ⚠️  Expected {self.expected_packages} packages, got {len(packages)}")
            
            # Check if our sample package exists
            sample_found = any(pkg['id'] == self.sample_package_id for pkg in packages)
            if sample_found:
                print(f"   ✅ Sample package '{self.sample_package_id}' found")
            else:
                print(f"   ❌ Sample package '{self.sample_package_id}' not found")
            
            # Validate package structure
            if packages:
                required_fields = ['id', 'name', 'price', 'duration', 'description', 'destinations', 'images']
                first_package = packages[0]
                missing_fields = [field for field in required_fields if field not in first_package]
                if missing_fields:
                    print(f"   ⚠️  Missing fields in package: {missing_fields}")
                else:
                    print(f"   ✅ Package structure looks correct")
        
        return success, response.json() if success else []

    def test_get_locations(self):
        """Test getting pickup locations"""
        success, response = self.run_test(
            "Get Pickup Locations",
            "GET",
            "locations"
        )
        
        if success:
            locations = response.json()
            print(f"   📍 Found {len(locations)} locations")
            
            if len(locations) != self.expected_locations:
                print(f"   ⚠️  Expected {self.expected_locations} locations, got {len(locations)}")
            
            # Check if our sample location exists
            sample_found = any(loc['id'] == self.sample_location_id for loc in locations)
            if sample_found:
                print(f"   ✅ Sample location '{self.sample_location_id}' found")
            else:
                print(f"   ❌ Sample location '{self.sample_location_id}' not found")
            
            # Validate location structure
            if locations:
                required_fields = ['id', 'name', 'region', 'surcharge']
                first_location = locations[0]
                missing_fields = [field for field in required_fields if field not in first_location]
                if missing_fields:
                    print(f"   ⚠️  Missing fields in location: {missing_fields}")
                else:
                    print(f"   ✅ Location structure looks correct")
        
        return success, response.json() if success else []

    def test_calculate_price(self):
        """Test price calculation"""
        success, response = self.run_test(
            "Calculate Price",
            "POST",
            "calculate-price",
            params={
                'package_id': self.sample_package_id,
                'location_id': self.sample_location_id,
                'num_passengers': 1
            }
        )
        
        if success:
            data = response.json()
            print(f"   💰 Package Price: Rp {data.get('package_price', 'N/A'):,}")
            print(f"   💰 Location Surcharge: Rp {data.get('surcharge', 'N/A'):,}")
            print(f"   💰 Total: Rp {data.get('total', 'N/A'):,}")
            
            # Validate calculation
            expected_total = self.expected_package_price + self.expected_location_surcharge
            actual_total = data.get('total', 0)
            
            if actual_total == expected_total:
                print(f"   ✅ Price calculation correct")
            else:
                print(f"   ❌ Price calculation incorrect. Expected: {expected_total}, Got: {actual_total}")
            
            # Validate response structure
            required_fields = ['package_name', 'package_price', 'location_name', 'surcharge', 'total']
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                print(f"   ⚠️  Missing fields in calculation response: {missing_fields}")
        
        return success

    def test_create_booking(self):
        """Test creating a booking"""
        # Generate test data
        test_booking = {
            "full_name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "whatsapp": "+6281234567890",
            "package_id": self.sample_package_id,
            "tour_date": (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d'),
            "pickup_location_id": self.sample_location_id,
            "num_passengers": 2,
            "special_requests": "Test booking - please ignore"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "bookings",
            201,  # Expect 201 Created
            data=test_booking
        )
        
        if success:
            booking_data = response.json()
            print(f"   📅 Booking ID: {booking_data.get('id', 'N/A')}")
            print(f"   👤 Customer: {booking_data.get('full_name', 'N/A')}")
            print(f"   💰 Total: Rp {booking_data.get('total_price', 'N/A'):,}")
            
            # Validate booking structure
            required_fields = ['id', 'full_name', 'email', 'package_name', 'total_price', 'created_at']
            missing_fields = [field for field in required_fields if field not in booking_data]
            if missing_fields:
                print(f"   ⚠️  Missing fields in booking response: {missing_fields}")
            
            return booking_data.get('id')
        
        return None

    def test_get_bookings(self):
        """Test getting all bookings"""
        success, response = self.run_test(
            "Get All Bookings",
            "GET",
            "bookings"
        )
        
        if success:
            bookings = response.json()
            print(f"   📋 Found {len(bookings)} bookings")
        
        return success

    def test_whatsapp_link(self):
        """Test WhatsApp link generation"""
        params = {
            'package_name': 'Best of Ubud Tour',
            'package_price': self.expected_package_price,
            'location_name': 'Kuta',
            'surcharge': self.expected_location_surcharge,
            'total': self.expected_total,
            'full_name': 'Test Customer',
            'tour_date': '2026-02-15',
            'num_passengers': 2,
            'special_requests': 'Test request'
        }
        
        success, response = self.run_test(
            "Generate WhatsApp Link",
            "GET",
            "whatsapp-link",
            params=params
        )
        
        if success:
            data = response.json()
            link = data.get('link', '')
            print(f"   📱 WhatsApp link generated: {len(link)} characters")
            
            if 'wa.me' in link:
                print(f"   ✅ Link format looks correct")
            else:
                print(f"   ❌ Link format seems incorrect: {link[:100]}...")
            
            # Check if required info is in the message
            message = data.get('message', '')
            if 'Test Customer' in message and 'Best of Ubud' in message:
                print(f"   ✅ Message contains customer and package info")
            else:
                print(f"   ⚠️  Message might be missing key information")
        
        return success

    def test_invalid_endpoints(self):
        """Test error handling for invalid requests"""
        print(f"\n🛡️ Testing Error Handling...")
        
        # Test invalid package ID in price calculation
        success, _ = self.run_test(
            "Invalid Package ID",
            "POST",
            "calculate-price",
            404,  # Expect 404 Not Found
            params={'package_id': 'invalid-package', 'location_id': self.sample_location_id}
        )
        
        # Test invalid location ID in price calculation  
        success2, _ = self.run_test(
            "Invalid Location ID",
            "POST",
            "calculate-price",
            404,  # Expect 404 Not Found
            params={'package_id': self.sample_package_id, 'location_id': 'invalid-location'}
        )
        
        return success and success2

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Bali Tour API Tests...")
        print(f"📡 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Core functionality tests
        self.test_root_endpoint()
        packages_success, packages = self.test_get_packages()
        locations_success, locations = self.test_get_locations()
        
        # Only continue if basic endpoints work
        if packages_success and locations_success:
            self.test_calculate_price()
            booking_id = self.test_create_booking()
            self.test_get_bookings()
            self.test_whatsapp_link()
            
        # Error handling tests
        self.test_invalid_endpoints()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        # List failed tests
        failed_tests = [test for test in self.test_results if not test['success']]
        if failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"   - {test['name']}: {test['error'] or 'Status code mismatch'}")
        
        return self.tests_passed, self.tests_run, self.test_results

def main():
    tester = BaliTourAPITester()
    passed, total, results = tester.run_all_tests()
    
    # Save detailed results to file
    results_file = f"/app/test_reports/backend_test_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    
    with open(results_file, 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'summary': {
                'total_tests': total,
                'passed_tests': passed,
                'failed_tests': total - passed,
                'success_rate': (passed/total)*100 if total > 0 else 0
            },
            'test_results': results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: {results_file}")
    
    # Return appropriate exit code
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())