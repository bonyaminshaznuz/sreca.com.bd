# Mailjet Setup Instructions

## Step 1: Install Dependencies

```bash
cd backend
pip install mailjet-rest==1.3.4
```

Or install from requirements.txt:
```bash
pip install -r requirements.txt
```

## Step 2: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Step 3: Configure Mailjet API in Admin Panel

1. Start Django server: `python manage.py runserver`
2. Go to admin panel: `http://localhost:8000/admin`
3. Login with superuser account
4. Go to "Mailjet Settings" section
5. Click "Add Mailjet Settings"
6. Fill in the following:
   - **API Key**: `4a8edee35cec2a9885a14b492a645325`
   - **API Secret**: `c67608fe80dca2a45dd50feef7cf353d`
   - **From Email**: `contact@shaznuz.com` (must be verified in Mailjet)
   - **From Name**: `Sreca`
   - **Is Active**: Check this box
7. Click "Save"

## Step 4: Test

1. Go to frontend forgot password page
2. Enter a registered email
3. Check email for OTP
4. Complete the password reset flow

## API Credentials (Already provided)

- API Key: `4a8edee35cec2a9885a14b492a645325`
- API Secret: `c67608fe80dca2a45dd50feef7cf353d`
- From Email: `contact@shaznuz.com` (must be verified in Mailjet dashboard)

## Notes

- API settings can be updated anytime from admin panel
- Only one active setting can exist at a time
- OTP expires in 15 minutes
- OTP is 6 digits
- Email template is HTML formatted
