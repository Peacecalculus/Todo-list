# ⚡ Quick Start Guide

Get your Todo app running in **5 minutes**!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Setup Convex (2 min)

```bash
# Login to Convex (opens browser)
npx convex login

# Start Convex dev server (keep this running)
npx convex dev
```

**Important**: Copy the URL it gives you! It looks like:
```
https://happy-animal-123.convex.cloud
```

## Step 3: Configure Environment (30 sec)

Open the `.env` file and paste your Convex URL:

```env
EXPO_PUBLIC_CONVEX_URL=https://your-actual-url.convex.cloud
```

## Step 4: Start the App (30 sec)

Open a **new terminal** (keep Convex running) and run:

```bash
npm start
```

## Step 5: Open on Device (1 min)

Choose one:

### Option A: Expo Go (Easiest)
1. Install **Expo Go** from Play Store or App Store
2. Scan the QR code from terminal
3. App loads instantly!

### Option B: Emulator
```bash
# Android
npm run android

# iOS (Mac only)
npm run ios
```

## ✅ You're Done!

Try these first:
1. Tap **+** button to create a todo
2. Tap **sun/moon** icon to switch themes
3. **Swipe left** on a todo to delete it

## 🐛 Something Wrong?

### "Cannot connect to Convex"
- Make sure `npx convex dev` is running
- Check `.env` file has the correct URL
- Restart: `npx expo start -c`

### App won't open
- Update Expo Go app
- Clear cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

## 📚 Need More Help?

- Full docs: `README.md`
- Testing guide: `TESTING.md`
- Submission guide: `SUBMISSION.md`

---

**Happy coding! 🚀**
