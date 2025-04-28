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

## Troubleshooting

If you encounter the following errors:

- **Gesture Handler not found**: Make sure `import 'react-native-gesture-handler'` is at the top of both `App.js` and `index.js` files.
- **TypeError: Cannot convert undefined value to object**: This usually indicates an issue with component props or state. Check that all objects have proper initialization.
- **Unable to resolve module**: Run `npm install` to ensure all dependencies are installed.

To fix common issues:
1. Clear Metro bundler cache: `expo start --clear`
2. Ensure gesture-handler is properly installed: `npm install react-native-gesture-handler --save`
3. Check that your Expo SDK version matches the dependencies in package.json

## Using the Culvert Sizing Tool

The Culvert Sizing Tool helps forestry professionals calculate the appropriate culvert size based on watershed characteristics and stream measurements.

### Features

- **Interactive Inputs**: Easy adjustment of watershed area and channel slope values
- **Real-time Calculations**: Dynamic calculation of cross-sectional area as you input stream measurements
- **Advanced Options**: Climate change projections and stream transportability considerations
- **Visual Results**: Clean, intuitive results display with visual representation of the culvert
- **Technical Recommendations**: Contextual recommendations based on culvert size and site conditions
- **Share Functionality**: Generate and share detailed reports with colleagues

### How to Use

1. From the Home screen, tap on the "Culvert Sizing" button
2. Enter watershed area and channel slope values
3. Enter stream geometry measurements:
   - Top widths at one or more points (meters)
   - Bottom width (meters)
   - Depths at one or more points (meters)
4. The cross-sectional area will be calculated automatically
5. Expand Advanced Options if needed to enable:
   - Climate change projections
   - Stream transportability considerations
6. Tap "Calculate Culvert Size" to get your recommendation
7. The results screen will show:
   - Recommended culvert diameter with visual representation
   - Technical details including flow capacity and controlling factors
   - Context-specific recommendations
8. You can share a report or go back to modify your inputs

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

### 2025-04-28 (v5)
- **Fixed gesture handler and component errors**:
  - Added gesture-handler import at the top of App.js and index.js
  - Removed slider component to address TypeError issues
  - Implemented simpler form with standard inputs
  - Updated README with troubleshooting section
  - Fixed component configuration to ensure compatible rendering

### 2025-04-28 (v4)
- **Enhanced Culvert Sizing Tool UI**:
  - Added interactive inputs for watershed area and channel slope
  - Implemented dynamic calculation of cross-sectional area
  - Improved visual layout with cleaner card-based design
  - Enhanced results screen with culvert visualization
  - Added context-aware recommendations based on culvert size
  - Improved sharing functionality with loading indicators
  - Added collapsible advanced options section
  - Added technical notes with additional installation guidance

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
