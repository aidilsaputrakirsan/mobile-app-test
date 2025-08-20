# 📱 TodoApp - React Native + Supabase + GitHub Actions

A production-ready Todo List application built with React Native, Expo, and Supabase with automated APK builds via GitHub Actions.

![TodoApp Demo](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-blue)
![Build Status](https://github.com/aidilsaputrakirsan/mobile-app-test/actions/workflows/build-apk.yml/badge.svg)
![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)
![Database](https://img.shields.io/badge/Database-Supabase-green)

## ✨ Features

- 📝 **Full CRUD Operations** - Create, Read, Update, Delete todos
- 🔄 **Real-time Sync** - Powered by Supabase real-time database
- 📱 **Cross-Platform** - Works on Android, iOS, and Web
- 🎨 **Modern UI** - Beautiful gradient design with haptic feedback
- 🚀 **Automated Builds** - GitHub Actions CI/CD pipeline
- 📦 **Production APK** - Ready-to-install Android app
- 🔒 **Secure Authentication** - Row Level Security with Supabase
- ♿ **Accessible** - Screen reader friendly interface

## 🛠 Tech Stack

- **Frontend:** React Native with Expo Router
- **Database:** Supabase (PostgreSQL)
- **State Management:** React Hooks (useState, useEffect)
- **Styling:** React Native StyleSheet with LinearGradient
- **Authentication:** Supabase Auth (ready for future implementation)
- **CI/CD:** GitHub Actions + EAS Build
- **Development:** Expo Go for testing

## 🏗 Architecture

```
TodoApp/
├── app/
│   └── index.js                 # Main screen (Expo Router)
├── components/
│   ├── TodoItem.js             # Individual todo component
│   └── AddTodo.js              # Add new todo component
├── services/
│   └── supabase.js             # Database service layer
├── .github/workflows/
│   └── build-apk.yml           # GitHub Actions workflow
├── assets/images/              # App icons and splash screens
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
└── package.json                # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Expo CLI or Expo Go app on your phone
- Supabase account (free)
- GitHub account (for automated builds)

### 1. Clone & Install

```bash
git clone https://github.com/aidilsaputrakirsan/mobile-app-test.git
cd mobile-app-test/TodoApp
npm install
```

### 2. Supabase Setup

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your Project URL and API Key

2. **Create Database Table:**
   ```sql
   -- Run this in Supabase SQL Editor
   CREATE TABLE todos (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     task TEXT NOT NULL,
     completed BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

   -- Create policy for all operations
   CREATE POLICY "Allow all operations" ON todos FOR ALL USING (true);
   ```

3. **Update Configuration:**
   ```javascript
   // services/supabase.js
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

### 3. Development

```bash
# Start development server
npx expo start

# For tunnel mode (if network issues)
npx expo start --tunnel

# Web development
npx expo start --web
```

**📱 Testing:**
- **Mobile:** Scan QR code with Expo Go app
- **Web:** Press `w` or open browser URL
- **Multi-platform:** All platforms work simultaneously

## 🏭 Production Build

### Automated APK Build (GitHub Actions)

Every push to `main` branch automatically builds production APK:

1. **Push Code:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Monitor Build:**
   - Go to GitHub repo → Actions tab
   - Watch "Build APK" workflow (~10-15 minutes)

3. **Download APK:**
   - Build completes → Artifacts section
   - Download `todo-app-apk.zip`
   - Extract to get production APK

### Manual Build (Local)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

## 📦 Installation

### Android APK
1. Download APK from GitHub Actions Artifacts
2. Transfer to Android device
3. Enable "Install from Unknown Sources"
4. Install APK directly

### iOS (Future)
- Requires Apple Developer Account ($99/year)
- Can be added to existing GitHub Actions workflow

## 🔧 Configuration Files

### app.json
```json
{
  "expo": {
    "name": "TodoApp",
    "slug": "TodoApp",
    "platforms": ["ios", "android", "web"],
    "version": "1.0.0"
  }
}
```

### eas.json
```json
{
  "cli": {
    "version": ">= 5.9.0",
    "appVersionSource": "remote"
  },
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    }
  }
}
```

## 🗄 Database Schema

### todos table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `task` | TEXT | Todo description |
| `completed` | BOOLEAN | Completion status |
| `created_at` | TIMESTAMP | Creation time |

### API Operations
- `GET` todos → Fetch all todos (newest first)
- `POST` todo → Create new todo
- `PUT` todo → Update todo (task/completion)
- `DELETE` todo → Remove todo

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/build-apk.yml
name: Build APK
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Setup EAS CLI
      - Install dependencies  
      - Build APK with EAS
      - Upload APK artifact
```

### Environment Variables
- `EXPO_TOKEN` → GitHub repository secret for EAS authentication

## 📱 Platform Compatibility

| Platform | Status | Notes |
|----------|--------|-------|
| **Android** | ✅ Full Support | APK builds via GitHub Actions |
| **iOS** | ✅ Development | Production requires Apple Developer |
| **Web** | ✅ Full Support | React Native Web |

## 🎨 UI Components

### Design System
- **Colors:** Gradient purple/blue theme
- **Typography:** System fonts with multiple weights
- **Animations:** Smooth transitions and haptic feedback
- **Layout:** Responsive design for all screen sizes

### Components
- **TodoItem:** Individual todo with edit/delete actions
- **AddTodo:** Input form with loading states
- **EmptyState:** Friendly empty list message
- **LoadingState:** Skeleton loading animation

## 🔒 Security

- **Row Level Security** enabled on Supabase
- **API Key Protection** via environment variables
- **Input Validation** for all user inputs
- **XSS Prevention** through React Native security

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create new todo
- [ ] Mark todo as complete/incomplete  
- [ ] Edit existing todo
- [ ] Delete todo
- [ ] Pull to refresh
- [ ] Empty state display
- [ ] Cross-platform compatibility

### Future Testing
- Unit tests with Jest
- Integration tests with Detox
- E2E testing automation

## 📈 Performance

- **Database:** Optimized queries with indexing
- **Rendering:** Efficient FlatList for large todo lists
- **Bundle Size:** Minimal dependencies for fast startup
- **Offline:** Ready for offline-first architecture

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/awesome-feature`
3. **Commit changes:** `git commit -m 'Add awesome feature'`
4. **Push to branch:** `git push origin feature/awesome-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow React Native best practices
- Use TypeScript for new features (migration planned)
- Maintain test coverage above 80%
- Update documentation for API changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aidil Saputra Kirsan**
- GitHub: [@aidilsaputrakirsan](https://github.com/aidilsaputrakirsan)
- Repository: [mobile-app-test](https://github.com/aidilsaputrakirsan/mobile-app-test)

## 🙏 Acknowledgments

- **Expo Team** for excellent React Native tooling
- **Supabase** for real-time database platform  
- **GitHub Actions** for seamless CI/CD
- **React Native Community** for comprehensive ecosystem

## 🔮 Roadmap

### Version 1.1
- [ ] User authentication with Supabase Auth
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Offline synchronization

### Version 1.2  
- [ ] Shared todo lists
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Export/import functionality

### Version 2.0
- [ ] React Native New Architecture
- [ ] Advanced animations with Reanimated
- [ ] Widget support (Android/iOS)
- [ ] Apple Watch companion app

---

## 📊 Build Status

Current build status and download links:

[![Build APK](https://github.com/aidilsaputrakirsan/mobile-app-test/actions/workflows/build-apk.yml/badge.svg)](https://github.com/aidilsaputrakirsan/mobile-app-test/actions/workflows/build-apk.yml)

**Latest APK:** Available in [GitHub Actions Artifacts](https://github.com/aidilsaputrakirsan/mobile-app-test/actions)

---

*Built with ❤️ using React Native, Expo, and Supabase*