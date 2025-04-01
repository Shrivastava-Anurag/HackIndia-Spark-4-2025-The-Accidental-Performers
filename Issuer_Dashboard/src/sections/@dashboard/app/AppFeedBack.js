import React, { useState } from 'react';
import {
  Box,
  Card,
  Paper,
  Typography,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function FeedbackAndIssues() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('');

  const feedbackList = [
    { category: 'Technical Issues', count: 120, icon: <BugReportIcon />, severity: 'High' },
    { category: 'General Feedback', count: 340, icon: <FeedbackOutlinedIcon />, severity: 'Low' },
    { category: 'Complaints', count: 75, icon: <ReportProblemOutlinedIcon />, severity: 'Medium' },
    { category: 'Suggestions', count: 50, icon: <ThumbUpOutlinedIcon />, severity: 'Low' },
  ];

  const issueData = {
    'Technical Issues': [
      'Server downtime on 02/12',
      'Login not working for some users',
      'Error in data synchronization',
    ],
    'General Feedback': ['Great UI!', 'Needs a dark mode feature', 'Excellent support team'],
    'Complaints': ['Slow loading times', 'Incorrect billing', 'Customer support unavailable'],
    'Suggestions': ['Add real-time notifications', 'Improve accessibility features'],
  };

  const handleOpenDialog = (category) => {
    setSelectedCategory(category);
    setIssues(issueData[category] || []);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory('');
    setIssues([]);
    setFilter('');
  };

  const filteredIssues = issues.filter((issue) =>
    issue.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader title="Feedback and Issues" subheader="Overview of recent feedback and reported issues" />

        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {feedbackList.map((item) => (
              <Paper
                key={item.category}
                variant="outlined"
                sx={{
                  py: 2.5,
                  textAlign: 'center',
                  backgroundColor: item.severity === 'High' ? 'error.lighter' : 'background.paper',
                  cursor: 'pointer',
                }}
                onClick={() => handleOpenDialog(item.category)}
              >
                <Box sx={{ mb: 0.5 }}>{item.icon}</Box>

                <Typography variant="h6">{item.count}</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.category}
                </Typography>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Popup Dialog */}
      <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedCategory}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Filter Issues"
              variant="outlined"
              fullWidth
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Box>

          <List>
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue, index) => (
                <ListItem
                  key={index}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <ListItemText primary={issue} />
                  <Button variant="outlined" size="small">
                    Respond
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography>No issues found.</Typography>
            )}
          </List>
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
