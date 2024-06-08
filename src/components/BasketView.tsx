import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserData } from '../contex/UserDataContex';

const BasketView: React.FC = () => {
  const { getAllProducts, removeProduct } = useUserData();
  const products = getAllProducts();

  const handleDelete = (productId: number) => {
    removeProduct(productId);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'sizes', headerName: 'Size', width: 100 },
    { field: 'colors', headerName: 'Color', width: 150 },
    { field: 'price', headerName: 'Price', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => {
            console.log(params.row);
            handleDelete(params.row.id as number);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Basket
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          disableRowSelectionOnClick
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        href="/butex/checkout" // Change this to your actual next step route
      >
        Next
      </Button>
    </Box>
  );
};

export default BasketView;
function handleDelete(arg0: number): void {
  throw new Error('Function not implemented.');
}

function removeProduct(arg0: number): void {
  throw new Error('Function not implemented.');
}

