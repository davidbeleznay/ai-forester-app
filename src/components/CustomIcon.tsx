import React from 'react';
import { View } from 'react-native';
import { icons } from 'lucide-react-native';
import { Path, Svg } from 'react-native-svg';

interface IconProps {
  name: string;
  color: string;
  size: number;
}

// Custom icons that aren't available in the lucide-react-native package
const CustomSvgIcons: Record<string, React.FC<{ color: string; size: number }>> = {
  tree: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 22V12M12 12L18 6M12 12L6 6M18 6H15.3333M18 6V8.66667M6 6H8.66667M6 6V8.66667" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  ),
  road: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M4 19L8 5M12 19L16 5M20 19L16 5M4 19L8 5M4 19H20M8 5H16" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  ),
  fire: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 17 7 15 5C15 10 12 12 10.5 10.5C10.5 10.5 9 12 9 14C5 14 4 17 4 17C4 19.7614 7.58172 22 12 22Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  ),
  pebble: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M8 9C9.65685 9 11 7.65685 11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6C5 7.65685 6.34315 9 8 9Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M16 15C18.2091 15 20 13.2091 20 11C20 8.79086 18.2091 7 16 7C13.7909 7 12 8.79086 12 11C12 13.2091 13.7909 15 16 15Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M10 16C11.1046 16 12 15.1046 12 14C12 12.8954 11.1046 12 10 12C8.89543 12 8 12.8954 8 14C8 15.1046 8.89543 16 10 16Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  ),
  gully: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M3 21L9 11L13 15L21 3" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M4 4H20V18H4V4Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  ),
  circle: ({ color, size }) => (
    <View 
      style={{
        width: size, 
        height: size, 
        borderRadius: size / 2,
        backgroundColor: color
      }}
    />
  ),
};

// Main icon component that handles both Lucide icons and custom SVG icons
const CustomIcon: React.FC<IconProps> = ({ name, color, size }) => {
  // Check if it's a Lucide icon
  const LucideIcon = icons[name as keyof typeof icons];
  
  if (LucideIcon) {
    return <LucideIcon color={color} size={size} />;
  }
  
  // Check if it's a custom SVG icon
  const CustomSvgIcon = CustomSvgIcons[name];
  
  if (CustomSvgIcon) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <CustomSvgIcon color={color} size={size} />
      </View>
    );
  }
  
  // If icon not found, return a default or empty view
  console.warn(`Icon "${name}" not found`);
  return <View style={{ width: size, height: size }} />;
};

export default CustomIcon;