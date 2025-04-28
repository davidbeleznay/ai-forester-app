# AI Forester Field Companion App

## Project Overview

The AI Forester Field Companion is a mobile application designed for forestry professionals who need to perform field calculations and assessments while working in remote areas. The app is specifically optimized for field use with offline functionality, battery conservation features, and interfaces designed for outdoor visibility.

Built with React Native and Expo, this app leverages AI capabilities to enhance traditional forestry calculations and provides a suite of field tools that help professionals make data-driven decisions directly from the field.

## Key Features

- **Offline Functionality**: All calculations and tools work without internet connection
- **Field Data Collection**: Capture and store field measurements efficiently
- **Culvert Sizing Tool**: Calculate proper culvert sizes based on watershed characteristics
- **Cross-platform**: Works on both iOS and Android devices
- **GPS Integration**: Capture location data for field cards
- **PDF Export**: Generate professional reports for documentation
- **Climate Adaptation**: Optional climate change projection factors
- **Low Battery Usage**: Optimized for extended field use

## Getting Started

### Prerequisites

- Node.js (v16+)
- Expo CLI
- Android Studio or Xcode (for emulation/building)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davidbeleznay/ai-forester-app.git
cd ai-forester-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start --clear
```

4. Run on a device or emulator:
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Scan the QR code with Expo Go app on your physical device

## Using the Culvert Sizing Tool

The Culvert Sizing Tool helps forestry professionals calculate the appropriate culvert size based on watershed characteristics and stream measurements.

1. From the Home screen, tap on the "Culvert Sizing" button
2. Enter the required watershed information:
   - Drainage area (hectares)
   - Stream gradient (%)
   - Geographic region
   - Culvert material
3. Input stream geometry measurements:
   - Top widths at three points (meters)
   - Bottom width (meters)
   - Depths at three points (meters)
4. Optional: Enable climate change projections and/or stream transportability considerations
5. Tap "Calculate" to get your culvert sizing recommendation
6. The results screen will show:
   - Recommended culvert diameter
   - Flow capacity
   - Controlling factors
   - Notes and recommendations
7. You can share a report or go back to modify your inputs

## Project Structure

```
ai-forester-app/
├── App.js                 # Root App component (entry point)
├── index.js               # Registers the root App component
├── app/                   # Main application code
│   ├── App.tsx            # Main app component (without NavigationContainer)
│   ├── assets/            # Images, icons, and other static files
│   ├── components/        # Reusable UI components
│   ├── config/            # Configuration files and constants
│   ├── navigation/        # Navigation configuration
│   │   ├── MainAppNavigator.tsx      # Main application navigator
│   │   └── CulvertToolNavigator.tsx  # Culvert tool navigator
│   ├── screens/           # Application screens
│   │   ├── CulvertTool/   # Culvert sizing tool screens
│   │   └── ...            # Other tool screens
│   └── utils/             # Utility functions and helpers
├── .gitignore             # Git ignore file
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling, especially for field conditions
- Include comments on complex calculations and forestry-specific logic

### UI/UX Guidelines

- Design for outdoor visibility (high contrast, readable fonts)
- Optimize for one-handed operation where possible
- Implement large touch targets for field use (gloves)
- Use visual indicators for calculations and results
- Ensure feedback for all user actions

## Building for Production

### Android

```bash
eas build -p android --profile production
```

### iOS

```bash
eas build -p ios --profile production
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Developed by AI Forester Technologies
- Special thanks to the forestry professionals who provided domain expertise
- Built with React Native and Expo

## Changelog

### 2025-04-28 (v3)
- **Implemented Culvert Sizing Tool functionality**:
  - Created CulvertToolNavigator for tool navigation
  - Implemented Input screen with form fields for watershed characteristics
  - Added stream geometry measurement inputs
  - Implemented calculation functionality based on culvertLogic.ts
  - Created Results screen to display recommended culvert size
  - Added ability to share culvert sizing reports
  - Integrated tool with main application navigation
  - Updated HomeScreen to navigate to the Culvert Tool
  - Created MainAppNavigator to manage overall app navigation

### 2025-04-28 (v2)
- **Fixed application structure to resolve rendering errors**:
  - Corrected App.js to properly reference app/App.tsx
  - Removed duplicate NavigationContainer in app/App.tsx
  - Fully simplified HomeScreen with static components and no ScrollView
  - Fixed invalid component references
  - Added more explicit TypeScript typing in all components
  - Fixed HomeScreen lines 132-137 that were causing crashes
  - Ensured proper import/export pattern consistency
  - Updated index.js to reference root App.js

### 2025-04-28 (v1)
- **Fixed Application Entry Point Structure**:
  - Added index.js at the root to properly register the App component
  - Fixed App.tsx with proper SafeAreaProvider wrapping
  - Updated HomeSettingsTabs with explicit TypeScript interfaces
  - Added babel.config.js for proper transpilation
  - Fixed component type definitions and navigation setup
  - Ensured consistent export patterns across component files

- Previous changes:
  - **Complete Ultra-Simplification** to resolve persistent rendering errors:
    - Created minimal screen components with zero external dependencies
    - Removed all third-party icon libraries and custom SVG components
    - Used basic View components to create simple colored circle icons
    - Eliminated all complex UI elements that could cause rendering issues
    - Streamlined component props and navigation
    - Simplified all screen layouts with minimal styling
    - Created placeholder content for all main screens
  
  - Earlier changes:
    - Replaced complex SVG icons with simpler implementations
    - Added proper navigation type definitions
    - Added missing dependencies
    - Updated NavigationContainer implementation
