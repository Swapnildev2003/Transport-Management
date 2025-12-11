# Transport Management System

A comprehensive transport management solution with web and mobile applications.

## Project Structure

```
Transport-Management/
├── backend/              # Django REST API
├── frontend/            # React Web Application
└── mobile/              # React Native Mobile App
```

## Setup Instructions

### Backend (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend/project
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Generate a new SECRET_KEY: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
   - Update `.env` with your actual values

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend/Transport-Management-React-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration values
   - Get these from Firebase Console > Project Settings > Your apps

4. Start the development server:
   ```bash
   npm run dev
   ```

### Mobile (React Native + Expo)

1. Navigate to the mobile directory:
   ```bash
   cd mobile/Transport-Driver-App/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

## Environment Variables

### Backend (.env)
- `SECRET_KEY`: Django secret key (generate a new one)
- `DEBUG`: Set to `False` in production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts

### Frontend (.env)
- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `VITE_FIREBASE_DATABASE_URL`: Your Firebase database URL
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Your Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID

## Security Notes

⚠️ **NEVER commit `.env` files to version control!**

- All sensitive credentials are stored in `.env` files
- `.env` is already listed in `.gitignore`
- Always use `.env.example` as a template
- Rotate credentials if they are accidentally exposed

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Add your license here]
