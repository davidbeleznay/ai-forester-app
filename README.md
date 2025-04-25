# AI Forester Mobile App

A mobile application for forestry professionals leveraging AI for field work.

## Features

- Tree health analysis using AI vision
- Culvert sizing with climate factors
- Pebble count automation
- Restoration monitoring
- Road inspection
- Landslide risk assessment

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator, or a physical device with Expo Go app

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/davidbeleznay/ai-forester-app.git
   cd ai-forester-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the app in your device or emulator
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## Project Structure

```
ai-forester-app/
├── App.js                # Main entry point
├── src/                  # Source directory
│   ├── components/       # Reusable UI components
│   │   └── CustomIcon.js # Custom icon component with forestry icons
│   ├── navigation/       # Navigation configurations
│   │   └── AppNavigator.js
│   └── screens/          # Application screens
│       ├── HomeScreen.js
│       └── PlaceholderScreen.js
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly:
   ```bash
   npm install
   ```

2. Clear the Metro bundler cache:
   ```bash
   npm start -- --reset-cache
   ```

3. Ensure you're running a compatible version of Node.js

## Development Roadmap

- Complete implementation of Tree Health analysis
- Culvert sizing calculator with climate factors
- Implement offline data storage
- Add user authentication
- Location tracking and mapping features
