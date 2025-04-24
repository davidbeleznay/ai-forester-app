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
git clone https://github.com/aiforester/field-companion.git
cd ai-forester-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on a device or emulator:
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Scan the QR code with Expo Go app on your physical device

## Project Structure

```
ai-forester-app/
├── app/                    # Main application code
│   ├── assets/             # Images, icons, and other static files
│   ├── components/         # Reusable UI components
│   ├── config/             # Configuration files and constants
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # Application screens
│   │   ├── CulvertTool/    # Culvert sizing tool screens
│   │   └── ...             # Other tool screens
│   └── utils/              # Utility functions and helpers
├── .gitignore              # Git ignore file
├── app.json                # Expo configuration
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Culvert Sizing Tool

The Culvert Sizing Tool helps forestry engineers properly size culverts for forest road construction. It implements multiple sizing methodologies:

1. **California Method**: Uses a combination of drainage area, regional coefficients, and Manning's equation to determine proper sizing
2. **Stream Transportability Matrix**: Considers stream characteristics like width-to-depth ratio and gradient to ensure proper material transport
3. **Climate Projection**: Optional layer that adjusts calculations based on projected future rainfall intensity

### Key Calculations

- Q100 Flow Estimation based on regional curves
- Manning's equation for hydraulic radius and flow capacity
- Width-to-depth ratio analysis
- Cross-sectional area calculation via the end area method
- Inlet/outlet control determination
- Safety factor application based on risk assessment

## Field Data Management

The app includes a comprehensive data management system:

- Local storage of field cards
- Automatic backup when connected to the internet
- Data export in PDF and CSV formats
- Location tagging via GPS

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