import React, { useState, useEffect } from 'react';

// Define the props interface for the UNSDG component
interface UNSDGProps {
  goal: number | 'all' | 'circle';
  label?: string;
  width?: string;
  height?: string;
  colorOnly?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

// Define color codes for each SDG goal
const goalColors = {
  1: '#e5243b', 2: '#dda63a', 3: '#4c9f38', 4: '#c5192d', 5: '#ff3a21',
  6: '#26bde2', 7: '#fcc30b', 8: '#a21942', 9: '#fd6925', 10: '#dd1367',
  11: '#fd9d24', 12: '#bf8b2e', 13: '#3f7e44', 14: '#0a97d9', 15: '#56c02b',
  16: '#00689d', 17: '#19486a'
};

// Define names for each SDG goal
const goalNames = {
  1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health and Well-being', 4: 'Quality Education',
  5: 'Gender Equality', 6: 'Clean Water and Sanitation', 7: 'Affordable and Clean Energy',
  8: 'Decent Work and Economic Growth', 9: 'Industry, Innovation and Infrastructure',
  10: 'Reduced Inequalities', 11: 'Sustainable Cities and Communities',
  12: 'Responsible Consumption and Production', 13: 'Climate Action', 14: 'Life Below Water',
  15: 'Life on Land', 16: 'Peace, Justice and Strong Institutions', 17: 'Partnerships for the Goals',
  'all': 'All Sustainable Development Goals', 'circle': 'Sustainable Development Goals Circle'
};

// Define the UNSDG functional component
const UNSDG: React.FC<UNSDGProps> = ({
  goal,
  label,
  width = '254px',
  height = '254px',
  colorOnly = false,
  loading = 'lazy',
  fetchPriority = 'low'
}) => {
  // Initialize state for image source and alt text
  const [imageSrc, setImageSrc] = useState<string>('');
  const [altText, setAltText] = useState<string>('');

  // Use effect hook to update image source and alt text when goal or label changes
  useEffect(() => {
    const updateImage = () => {
      // If goal is a number between 1 and 17, set the corresponding SDG goal image
      if (typeof goal === 'number' && goal >= 1 && goal <= 17) {
        setImageSrc(new URL(`../assets/sdg/goal-${goal}.svg`, import.meta.url).href);
        setAltText(label || `UN Sustainable Development Goal ${goal}: ${goalNames[goal as keyof typeof goalNames]}`);
      // If goal is 'all', set the image for all SDG goals
      } else if (goal === 'all') {
        setImageSrc(new URL('../assets/sdg/all-goals.svg', import.meta.url).href);
        setAltText(label || 'All UN Sustainable Development Goals');
      // If goal is 'circle', set the SDG circle image
      } else if (goal === 'circle') {
        setImageSrc(new URL('../assets/sdg/circle.svg', import.meta.url).href);
        setAltText(label || 'UN Sustainable Development Goals Circle');
      }
    };

    // Call the updateImage function
    updateImage();
  }, [goal, label]); // Dependencies for the effect

  // If colorOnly is true and goal is a valid number, render a colored div
  if (colorOnly && typeof goal === 'number' && goal >= 1 && goal <= 17) {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: goalColors[goal as keyof typeof goalColors],
        }}
        aria-label={altText}
        role="img"
      />
    );
  }

  // Render the SDG goal image
  return (
    <img
      src={imageSrc}
      alt={altText}
      width={width}
      height={height}
      loading={loading}
      fetchpriority={fetchPriority}
      style={{ width, height }}
    />
  );
};

export default UNSDG;