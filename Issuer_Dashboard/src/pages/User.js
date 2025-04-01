import { useState, useEffect } from 'react';


import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Menu, 
  MenuItem ,
  Select,
  FormControl
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'doctype', label: 'Document Type', alignRight: false },
  { id: 'issuingAuthority', label: 'Issuing Authority', alignRight: false },
  { id: 'message', label: 'Message', alignRight: false },
  { id: 'cid', label: 'CID', alignRight: false },
  { id: 'receiver', label: 'Receiver Address', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('doctype');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCid, setSelectedCid] = useState(null);
  const [tableData, setTableData] = useState();


  // Fetch data from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://backendpramanik.onrender.com/issuer/getalldocuments'); // Replace with your API endpoint
        setRequestList(response.data);
        console.log(response.data)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Complete':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'grey';
    }
  };
  

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requestList.map((n) => n.doctype);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewDocument = (cidItem) => {
    const trimmedCid = cidItem.trim(); // Remove any leading or trailing spaces
    const documentUrl = `https://ipfs.io/ipfs/${trimmedCid}`;
    console.log(`Opening document at: ${documentUrl}`);
    window.open(documentUrl, '_blank', 'noopener,noreferrer'); // Open in a new tab
  };

  const handleStatusChange = async (id, newStatus) => {
    // Update in the frontend
    setRequestList((prevList) =>
      prevList.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );
  
    // Make API call to update status in the database
    try {
      await fetch(`https://backendpramanik.onrender.com/issuer/updateRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, _id:id }),
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  



  const filteredRequests = requestList.filter((request) =>
    request.doctype.toLowerCase().includes(filterName.toLowerCase())
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requestList.length) : 0;

  const isRequestNotFound = filteredRequests.length === 0;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const cidString = requestList[2].cid;
  const cidArray = cidString.split(",");
  console.log(cidArray)

  return (
    <Page title="Requests">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Applications
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={requestList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, doctype, issuingAuthority, message, cid, receiver, status } = row;
                    const isItemSelected = selected.indexOf(doctype) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, doctype)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {doctype}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{issuingAuthority}</TableCell>
                        <TableCell align="left">{message}</TableCell>
                        <TableCell align="left">
                        <Button
        variant="outlined"
        onClick={handleOpenMenu}
      >
        View Documents
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {cidArray.map((cidItem, index) => (
          <MenuItem key={index} onClick={() => handleViewDocument(cidItem)}>
            {cidItem.trim()}
          </MenuItem>
        ))}
      </Menu>


{/* <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
>
  {requestList.map((item, index) => 
    item.cid ? (
      item.cid.split(',').map((cidItem, cidIndex) => (
        <MenuItem key={cidIndex} onClick={() => handleViewDocument(cidItem.trim())}>
          {cidItem.trim()}
        </MenuItem>
      ))
    ) : (
      <MenuItem key={`${index}-no-cid`} disabled>
        No CID available
      </MenuItem>
    )
  )}
</Menu> */}



                        </TableCell>
                        <TableCell align="left">{receiver}</TableCell>
                        <TableCell align="left">
  <FormControl variant="outlined" size="small">
    <Select
      value={status}
      onChange={(event) => handleStatusChange(_id, event.target.value)}
      sx={{
        minWidth: 120,
        backgroundColor: getStatusColor(status),
        color: 'white',
        '& .MuiSvgIcon-root': {
          color: 'white', // Icon color
        },
        '&:hover': {
          backgroundColor: getStatusColor(status),
        },
      }}
    >
      <MenuItem value="Pending" sx={{ color: 'orange' }}>
        Pending
      </MenuItem>
      <MenuItem value="Complete" sx={{ color: 'green' }}>
        Complete
      </MenuItem>
      <MenuItem value="Rejected" sx={{ color: 'red' }}>
        Rejected
      </MenuItem>
    </Select>
  </FormControl>
</TableCell>


                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isRequestNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={requestList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
