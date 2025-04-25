import React from 'react';
import { View } from 'react-native';
import * as Feather from 'react-native-feather';
import { Path, Svg } from 'react-native-svg';

// Type for icon props
interface IconProps {
  name: string;
  color: string;
  size: number;
}

// Custom SVG components for icons not available in Feather
const CustomIcons: Record<string, React.FC<{ color: string; size: number }>> = {
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
  circle: ({ color, size }) => (
    <View 
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        borderRadius: size/2 
      }} 
    />
  ),
  // Add SVG for Wolman Pebble Count icon
  pebble: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" 
        stroke={color} 
        strokeWidth="2" 
      />
      <Path 
        d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" 
        stroke={color} 
        strokeWidth="2" 
      />
      <Path 
        d="M10 18C11.1046 18 12 17.1046 12 16C12 14.8954 11.1046 14 10 14C8.89543 14 8 14.8954 8 16C8 17.1046 8.89543 18 10 18Z" 
        stroke={color} 
        strokeWidth="2" 
      />
    </Svg>
  ),
  // Add SVG for Restoration monitoring
  restoration: ({ color, size }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
        stroke={color} 
        strokeWidth="2" 
      />
      <Path 
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
        fill={color} 
      />
    </Svg>
  ),
};

const CustomIcon: React.FC<IconProps> = ({ name, color, size }) => {
  // First check if it's a native Feather icon
  const FeatherIcon = (Feather as any)[name.charAt(0).toUpperCase() + name.slice(1)];
  
  if (FeatherIcon) {
    return <FeatherIcon stroke={color} width={size} height={size} />;
  }
  
  // Then check custom icons
  const CustomSvgIcon = CustomIcons[name];
  
  if (CustomSvgIcon) {
    return <CustomSvgIcon color={color} size={size} />;
  }
  
  // Fallback to a default icon or return null
  console.warn(`Icon not found: ${name}`);
  return <Feather.HelpCircle stroke={color} width={size} height={size} />;
};

export default CustomIcon;