import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader, Stack, Button, Typography } from '@mui/material';
import Iconify from '../../../components/Iconify'; // Assuming Iconify is available

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppConversionRates() {
  return (
    <Card>
      <CardHeader title='Top Actions' />
      <Box sx={{ mx: 3, mt: 4, maxHeight: 400, overflowY: 'auto' }}>
        {/* Scrollable Action Buttons */}
        <Stack spacing={2}>
          {/* Action Buttons */}
          <ActionButton 
            title="Issue New Doc" 
            icon="eva:file-add-fill"
            color="primary"
          />
          <ActionButton 
            title="Review Application" 
            icon="eva:search-fill"
            color="secondary"
          />
          <ActionButton 
            title="Check Doc Expiry" 
            icon="eva:clock-fill"
            color="info"
          />
          <ActionButton 
            title="Bulk Processing" 
            icon="eva:activity-fill"
            color="warning"
          />
          
          <ActionButton 
            title="Download Report" 
            icon="eva:download-fill"
            color="primary"
          />
          <ActionButton 
            title="Generate Invoice" 
            icon="eva:file-text-fill"
            color="secondary"
          />
          <ActionButton 
            title="Renew License" 
            icon="eva:refresh-fill"
            color="warning"
          />
        </Stack>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function ActionButton({ title, icon, color }) {
  return (
    <Button 
      variant="outlined" 
      color={color} 
      fullWidth 
      startIcon={<Iconify icon={icon} />}
      sx={{
        justifyContent: 'flex-start', 
        textTransform: 'none', 
        borderRadius: 1, 
        padding: 1.5,
      }}
    >
      {title}
    </Button>
  );
}

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
