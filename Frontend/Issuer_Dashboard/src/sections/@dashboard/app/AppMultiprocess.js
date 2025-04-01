import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import PropTypes from 'prop-types';
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';

export default function AppDocumentApproval() {

  const documentList = [
    {
      id: 1,
      title: 'Document #12345 Issued',
      description: 'This document has been issued and is pending approval from Level 1 approver.',
      postedAt: new Date('2024-11-28T10:00:00'),
      level1Status: 'Pending',
      finalApprovalStatus: 'Pending',
    },
    {
      id: 2,
      title: 'Document #12346 Issued',
      description: 'This document has been issued and approved by Level 1 approver, awaiting final approval.',
      postedAt: new Date('2024-11-28T12:00:00'),
      level1Status: 'Approved',
      finalApprovalStatus: 'Pending',
    },
    {
      id: 3,
      title: 'Document #12347 Issued',
      description: 'This document has been fully approved by both Level 1 and final approvers.',
      postedAt: new Date('2024-11-28T14:00:00'),
      level1Status: 'Approved',
      finalApprovalStatus: 'Approved',
    },
    {
      id: 4,
      title: 'Document #12348 Issued',
      description: 'This document has been issued but rejected by Level 1 approver.',
      postedAt: new Date('2024-11-28T16:00:00'),
      level1Status: 'Rejected',
      finalApprovalStatus: 'Pending',
    },
  ];

  return (
    <Card>
      <CardHeader title="Multi-Step Approval Process" subheader="Last 24 hours" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {documentList.map((document) => (
            <DocumentItem key={document.id} documentList={document} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

function DocumentItem({ documentList }) {
  const { title, description, postedAt, level1Status, finalApprovalStatus } = documentList;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>

        {/* Approval Status */}
        <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Level 1 Approval: {level1Status}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Final Approval: {finalApprovalStatus}
          </Typography>
        </Stack>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
DocumentItem.propTypes = {
  documentList: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    postedAt: PropTypes.instanceOf(Date).isRequired,
    level1Status: PropTypes.string.isRequired,
    finalApprovalStatus: PropTypes.string.isRequired,
  }).isRequired,
};