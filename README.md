# AI Forester Field Companion App

## CRITICAL TROUBLESHOOTING GUIDE

If you're still experiencing the gesture handler error after our previous fixes, here are two options:

### Option 1: Clean Start With Existing Project

1. **Delete node_modules and clean install:**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm cache clean --force
   npm install
   ```

2. **Clear Expo cache:**
   ```powershell
   npx expo-doctor clear-cache
   npx expo start --clear
   ```

3. **Test minimal app version:**
   The app has been simplified to a basic version without navigation or advanced components. This should run in Expo Go without any errors.

### Option 2: Create a Fresh Expo Project (RECOMMENDED)

If you continue having issues, creating a new project may be the fastest solution:

1. **Create a new Expo project:**
   ```powershell
   npx create-expo-app AI-Forester-New
   cd AI-Forester-New
   ```

2. **Install basic dependencies:**
   ```powershell
   npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
   ```

3. **Start the new project:**
   ```powershell
   npx expo start
   ```

4. **Copy over components one by one:**
   Once the base app is working, copy over components from the original project one by one, testing after each addition.

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

- **Gesture Handler not found**: This typically happens when the app tries to use gesture handler functionality before it's fully initialized. Some solutions:
  - Make sure the import is at the top of both App.js and index.js files
  - In Expo managed workflow, try removing the gesture-handler import temporarily
  - Try using a simplified app structure without navigation dependencies

- **TypeError: Cannot convert undefined value to object**: 
  - Check for missing or undefined properties in objects
  - Ensure all objects are properly initialized
  - Check for typos in property names
  - Use conditional checks before accessing nested properties

- **Unable to resolve module**: 
  - Run `npm install` to ensure all dependencies are installed
  - Check if the module is properly listed in package.json
  - Try adding the specific missing dependency

## Working With Expo

When working with Expo, keep these tips in mind:

1. **Clear cache regularly:**
   ```
   npx expo start --clear
   ```

2. **Check Expo compatibility:**
   Not all React Native libraries work with Expo Go. Some require custom native code that's not supported in the managed workflow.

3. **Use Expo versions:**
   Many libraries have Expo-compatible versions (like `@react-navigation/native` instead of direct React Navigation).

4. **Simplify for testing:**
   When facing persistent errors, try a minimal app version to identify the problematic component.

## Changelog

### 2025-04-28 (v8)
- **Created ultra-minimal app version to resolve bundling errors**:
  - Removed all gesture handler and advanced navigation dependencies
  - Created a basic one-screen app as a starting point
  - Simplified configuration files
  - Added detailed troubleshooting guide
  - Provided instructions for creating a fresh project if needed

### 2025-04-28 (v7)
- **Fixed bundling issues and dependency problems**:
  - Updated app structure to use simplified base components
  - Fixed potential TypeError from undefined COLORS references
  - Ensured proper gesture handler setup with appropriate imports
  - Updated app.json and package.json for better Expo compatibility
  - Disabled new architecture temporarily to improve stability
  - Updated README with enhanced troubleshooting guidance

### 2025-04-28 (v6)
- **Enhanced Culvert Sizing Tool with Comprehensive Features**:
  - Implemented advanced culvert sizing algorithms based on hydraulic principles
  - Added dynamic field measurements for multiple stream width/depth points
  - Integrated GPS location capturing for field card documentation
  - Created PDF export functionality with professional formatting
  - Added field card storage and history management
  - Implemented real-time calculation feedback
  - Added visual representation of culvert sizing with human scale reference
  - Integrated climate change projection adjustments
  - Added transportability assessment for culvert installation planning
  - Created reusable components (FieldInput, GPSCapture, ConnectivityStatus)
  - Improved UI with collapsible advanced options
  - Added offline-first functionality with network status indicators

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