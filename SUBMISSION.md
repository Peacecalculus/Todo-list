# 📤 Submission Guide

Complete checklist for submitting your Todo App Stage 3B.

## 📋 Submission Requirements

You must submit:
1. **APK file** (Android app package)
2. **Demo video** (screen recording with voice-over)
3. **GitHub repository** (complete source code)
4. **Google Drive link** (containing APK + video)

---

## 🏗️ Step 1: Build the APK

### Install EAS CLI (one-time)
```bash
npm install -g eas-cli
```

### Login to Expo
```bash
eas login
```
Use your Expo account credentials.

### Configure EAS Build (if not done)
```bash
eas build:configure
```
This creates/updates `eas.json`.

### Build Android APK
```bash
eas build --platform android --profile preview
```

**This takes 10-15 minutes**. The CLI will:
1. Upload your code to Expo servers
2. Build the APK in the cloud
3. Provide a download link

### Download APK
- Click the link in terminal, OR
- Visit: https://expo.dev/accounts/[your-account]/projects/todo-app-stage-3b/builds
- Download the `.apk` file

**Test the APK**: Install on a real Android device before submitting!

---

## 🎥 Step 2: Record Demo Video

### What to Show (5-7 minutes)

1. **Introduction** (30 sec)
   - Your name
   - Project name: "Todo App Stage 3B"
   - Brief overview

2. **CRUD Operations** (2 min)
   - Create a todo (show all fields)
   - Edit a todo
   - Mark as complete/incomplete
   - Delete a todo (swipe gesture)

3. **Search & Filter** (1 min)
   - Search for a todo
   - Filter by All/Active/Completed
   - Show stats updating

4. **Theme Switching** (1 min)
   - Toggle between light and dark theme
   - Show smooth transitions
   - Close and reopen app (persistence)

5. **Additional Features** (1 min)
   - Empty states
   - Due date functionality
   - Real-time sync (if possible with 2 devices)

6. **Code Walkthrough** (1-2 min)
   - Open project structure
   - Show key files (App.js, components, convex)
   - Highlight clean code organization

### Recording Tools

**Android**:
- Built-in screen recorder (Android 11+)
- AZ Screen Recorder
- Mobizen Screen Recorder

**iOS**:
- Built-in screen recorder (Control Center)

**Desktop** (if using emulator):
- OBS Studio (free)
- Screen recording (Windows Game Bar: Win+G)
- QuickTime (Mac)

### Voice-Over Tips
- Speak clearly and at moderate pace
- Explain what you're doing
- Mention the technologies used
- Be enthusiastic but professional

### Video Format
- **Resolution**: 720p or 1080p
- **Format**: MP4 (H.264)
- **Duration**: 5-7 minutes
- **File size**: Under 500MB

---

## 📁 Step 3: Prepare GitHub Repository

### Create/Update .gitignore
Ensure these are NOT committed:
```gitignore
node_modules/
.expo/
.expo-shared/
*.apk
*.jks
.env
npm-debug.*
yarn-error.*
```

### Commit All Changes
```bash
git add .
git commit -m "Final submission: Todo App Stage 3B"
git push origin main
```

### Verify Repository Contains:
- [ ] Source code (App.js, components, convex)
- [ ] Configuration (package.json, app.json, eas.json)
- [ ] Documentation (README.md, TESTING.md, this file)
- [ ] .env.example (NOT .env with secrets)

### Make Repository Public
- Go to GitHub repository settings
- Scroll to "Danger Zone"
- Change visibility to Public

---

## ☁️ Step 4: Upload to Google Drive

### Create a Folder
Name: `TodoApp_Stage3B_[YourName]`

### Upload Files
1. **APK file** - The `.apk` you built
2. **Demo video** - The screen recording
3. **README.txt** (optional) - Any additional notes

Example README.txt:
```
Todo App Stage 3B Submission

Student Name: [Your Name]
Date: [Submission Date]
GitHub: [Your GitHub repo URL]

Files Included:
- todo-app-stage-3b.apk (Android app)
- demo-video.mp4 (Demo with voice-over)

Setup Instructions:
See GitHub README.md

Notes:
[Any additional information]
```

### Share Link
1. Right-click the folder
2. Click "Share"
3. Change to "Anyone with the link can view"
4. Copy the link

---

## ✅ Pre-Submission Checklist

### Code Quality
- [ ] All features working (test with TESTING.md)
- [ ] No console errors or warnings
- [ ] Clean, readable code
- [ ] Comments where necessary
- [ ] No hardcoded secrets

### Documentation
- [ ] README.md is complete
- [ ] Setup instructions are clear
- [ ] Environment variables documented
- [ ] Convex setup explained

### APK
- [ ] APK builds successfully
- [ ] APK tested on real device
- [ ] All features work in APK
- [ ] Theme persists after restart

### Video
- [ ] All features demonstrated
- [ ] Voice-over is clear
- [ ] 5-7 minutes long
- [ ] Good quality (720p+)
- [ ] Shows both light and dark themes

### GitHub
- [ ] Repository is public
- [ ] All code committed
- [ ] No sensitive data (.env)
- [ ] README.md is visible

### Google Drive
- [ ] APK uploaded
- [ ] Video uploaded
- [ ] Link is shareable
- [ ] Link tested (open in incognito)

---

## 📝 Final Submission Form

Fill this out when submitting:

```
=================================
TODO APP STAGE 3B SUBMISSION
=================================

Student Name: _______________
Student ID: _______________
Submission Date: _______________

LINKS:
GitHub Repository: _______________
Google Drive: _______________

APK Details:
- File name: _______________
- Size: _______________
- Tested on: _______________

Video Details:
- Duration: _______________
- Format: _______________
- Size: _______________

DECLARATION:
[ ] I confirm all features are working
[ ] I have tested the APK on a real device
[ ] The video demonstrates all requirements
[ ] The code is my own work
[ ] All documentation is complete

Signature: _______________
Date: _______________
```

---

## 🎯 Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality** (40%)
   - All CRUD operations work
   - Real-time sync via Convex
   - Theme switching works
   - Search and filter work

2. **UI/UX** (25%)
   - Pixel-perfect implementation
   - Smooth animations
   - Responsive design
   - Empty states

3. **Code Quality** (20%)
   - Clean, modular code
   - Proper component structure
   - Error handling
   - No warnings/errors

4. **Documentation** (10%)
   - Clear README
   - Setup instructions
   - Comments where needed

5. **Video Presentation** (5%)
   - All features shown
   - Clear voice-over
   - Professional delivery

---

## 📞 Support

If you have issues:
- Re-read this guide
- Check TESTING.md
- Review README.md troubleshooting
- Ask course instructor

---

## 🎉 You're Ready!

Once you've completed all checklist items:
1. Submit the Google Drive link via course platform
2. Include GitHub repository URL
3. Wait for feedback

**Good luck! 🚀**
