"use client"; // Add this directive at the top

import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';

// ----------------------------------------------------------------------

export default function AppUserActivityLog() {
  const [activities, setActivities] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Helper function to get the device type
  const getDeviceType = () => {
    if (isMobile) return 'Mobile';
    if (isTablet) return 'Tablet';
    if (isDesktop) return 'Desktop';
    return 'Unknown';
  };

  // Helper function to fetch location
  const fetchLocation = async () => {
    try {
      // Using Geolocation API for real-time location
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
          },
          async () => {
            // Fallback to IP-based location (use a service like ipapi)
            const response = await fetch('https://ipapi.co/8.8.8.8/json/');
            const data = await response.json();
            resolve(`${data.city}, ${data.region}, ${data.country}`);
          }
        );
      });
    } catch (error) {
      console.error('Error fetching location:', error);
      return 'Location unavailable';
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      const deviceType = getDeviceType();
      const userAgent = navigator.userAgent;
      const location = await fetchLocation();

      const mockData = [
        {
          id: 1,
          time: '2024-11-29 09:00 AM',
          title: 'Logged In',
          description: 'Successfully logged into the dashboard.',
          type: 'login',
          device: `${deviceType} (${userAgent})`,
          location,
        },
        {
          id: 2,
          time: '2024-11-29 10:00 AM',
          title: 'Viewed Document',
          description: 'Viewed document #12345.',
          type: 'documentViewed',
          device: `${deviceType} (${userAgent})`,
          location,
        },
        {
          id: 3,
          time: '2024-11-29 11:00 AM',
          title: 'Updated Document',
          description: 'Updated details in document #12345.',
          type: 'documentUpdated',
          device: `${deviceType} (${userAgent})`,
          location,
        },
      ];

      setActivities(mockData.slice(0, 6));
    };

    fetchActivities();
  }, []);

  const handleShowMore = () => {
    // Fetch and display all data (for simplicity, reusing mock data here)
    setShowMore(true);
  };

  return (
    <Card>
      <CardHeader title="Activity Log" subheader="Last 24 hours" />

      <CardContent
        sx={{
          height: 400, // Fixed height to enable scrolling
          overflowY: 'auto', // Enables vertical scrolling
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {activities.map((activity, index) => (
            <TimelineItem key={activity.id}>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    (activity.type === 'login' && 'primary') ||
                    (activity.type === 'documentViewed' && 'success') ||
                    (activity.type === 'documentUpdated' && 'info') ||
                    (activity.type === 'logout' && 'warning') ||
                    'error'
                  }
                />
                {index !== activities.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <Typography variant="subtitle2">{activity.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {activity.description}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {activity.time}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Device: {activity.device}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Location: {activity.location}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        {!showMore && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button onClick={handleShowMore} variant="outlined">
              See More
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
