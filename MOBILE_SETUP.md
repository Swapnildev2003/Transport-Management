# Mobile App IP Configuration Setup

## 🎯 Quick Setup Instructions

### Step 1: Find Your Computer's IP Address

#### Windows:
1. Open **Command Prompt** (Win + R, type `cmd`, press Enter)
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)

#### Mac:
1. Open **Terminal**
2. Type: `ifconfig | grep "inet "`
3. Look for the line that shows your local IP (usually starts with 192.168.x.x or 10.x.x.x)

#### Linux:
1. Open **Terminal**
2. Type: `hostname -I` or `ip addr show`
3. Look for your local IP address

### Step 2: Update the Configuration File

1. Open: `mobile/Transport-Driver-App/frontend/constants/ApiConfig.js`
2. Replace the IP address in the file:
   ```javascript
   const API_CONFIG = {
     BASE_URL: 'http://YOUR_IP_HERE:8000',     // ← Change this
     WS_BASE_URL: 'ws://YOUR_IP_HERE:8000',    // ← Change this
   };
   ```

### Step 3: Example Configuration

If your computer's IP is `192.168.1.105`, your config should look like:
```javascript
const API_CONFIG = {
  BASE_URL: 'http://192.168.1.105:8000',
  WS_BASE_URL: 'ws://192.168.1.105:8000',
  // ... rest of the config
};
```

### Step 4: Start Your Development Servers

#### Backend (Django):
```bash
cd backend/project
python manage.py runserver 0.0.0.0:8000
```

#### Frontend (React):
```bash
cd frontend/Transport-Management-React-Frontend
npm run dev
```

#### Mobile (Expo):
```bash
cd mobile/Transport-Driver-App/frontend
npx expo start
```

### 🔥 Common Issues & Solutions

1. **"Network request failed"**: 
   - Make sure both your computer and phone are on the same WiFi network
   - Check if the IP address is correct
   - Ensure Django server is running with `0.0.0.0:8000` (not just `127.0.0.1:8000`)

2. **"Permission denied"**:
   - Check if port 8000 is available
   - Try running Django with: `python manage.py runserver 0.0.0.0:8000`

3. **Can't connect from phone**:
   - Make sure Windows Firewall allows connections on port 8000
   - Verify your phone and computer are on the same network

### 📱 Testing the Connection

1. Open your phone's browser
2. Navigate to: `http://YOUR_IP:8000/admin/`
3. If you see the Django admin page, your setup is correct!

### 🚀 Ready to Go!

Once configured, your mobile app will connect to your local backend server automatically.