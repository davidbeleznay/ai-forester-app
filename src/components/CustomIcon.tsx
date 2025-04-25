import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import * as LucideIcons from 'lucide-react-native';

// Define icon types for TypeScript
export type IconName = 
  | keyof typeof LucideIcons 
  | 'tree' 
  | 'forest' 
  | 'culvert' 
  | 'watershed' 
  | 'landslide';

interface CustomIconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

// Custom SVG path data for forestry-specific icons
const customIcons = {
  tree: {
    viewBox: '0 0 24 24',
    path: 'M12 3L8 10H16L12 3zM10 10V20H8V22H16V20H14V10H10z',
  },
  forest: {
    viewBox: '0 0 24 24',
    path: 'M16 5L13 9H19L16 5zM8 7L5 11H11L8 7zM14 9V19H12V21H20V19H18V9H14zM6 11V19H4V21H12V19H10V11H6z',
  },
  culvert: {
    viewBox: '0 0 24 24',
    path: 'M4 6H20V18H4V6zM2 6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6zM4 7C4 7.55 4.45 8 5 8H19C19.55 8 20 7.55 20 7C20 6.45 19.55 6 19 6H5C4.45 6 4 6.45 4 7z',
  },
  watershed: {
    viewBox: '0 0 24 24',
    path: 'M12 5.5L10.2 9H13.8L12 5.5zM7 9L5.2 12.5H8.8L7 9zM17 9L15.2 12.5H18.8L17 9zM12 9.5L10.2 13H13.8L12 9.5zM4 13.5C2.9 13.5 2 14.4 2 15.5V18.5H22V15.5C22 14.4 21.1 13.5 20 13.5H4z',
  },
  landslide: {
    viewBox: '0 0 24 24',
    path: 'M15.34 7.1L17.5 10.9L5.25 16.9C4.5 17.28 3.61 17 3.24 16.24L2.5 14.75C2.12 14 2.41 13.1 3.17 12.72L15.34 7.1zM18.73 10.9L16.56 7.1L19.95 5.28C20.7 4.9 21.59 5.19 21.97 5.94L22.7 7.44C23.08 8.2 22.8 9.09 22.04 9.47L18.73 10.9zM3 19H21V21H3V19z',
  }
};

/**
 * CustomIcon component that can render both Lucide icons and custom SVG icons
 * 
 * @param name The name of the icon to render (Lucide icon name or custom icon name)
 * @param size The size of the icon (default: 24)
 * @param color The color of the icon (default: 'black')
 * @param style Additional styles to apply to the icon container
 */
const CustomIcon: React.FC<CustomIconProps> = ({ 
  name, 
  size = 24, 
  color = 'black',
  style
}) => {
  // Check if the requested icon is a custom icon
  if (name in customIcons) {
    const { viewBox, path } = customIcons[name as keyof typeof customIcons];
    
    return (
      <View style={[styles.container, style]}>
        <Svg width={size} height={size} viewBox={viewBox} fill="none">
          <Path d={path} fill={color} />
        </Svg>
      </View>
    );
  }
  
  // If it's a Lucide icon, dynamically render it
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons];
  
  if (LucideIcon) {
    return (
      <View style={[styles.container, style]}>
        <LucideIcon size={size} color={color} />
      </View>
    );
  }
  
  // Fallback if icon not found
  console.warn(`Icon "${name}" not found`);
  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomIcon;
