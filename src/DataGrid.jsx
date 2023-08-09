import * as React from 'react';
import rows from './data.json';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'SNo', width: 80 },
  { field: 'Rank', headerName: 'Rank', width: 100 },
  { field: 'Allotted Quota', headerName: 'Allotted Quota', width: 150 },
  { field: 'Course', headerName: 'Course', width: 300 },
  { field: 'Allotted Institute', headerName: 'Allotted Institute', width: 400 },
  { field: 'Alloted Category', headerName: 'Alloted Category', width: 120 },
  { field: 'Candidate Category', headerName: 'Candidate Category', width: 150 },
  { field: 'Remarks', headerName: 'Remarks', width: 120 },
];


export default function DataTable() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[50, 100]}
      />
    </div>
  );
}