import * as React from 'react';
import rows from './data.json';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const columns = [
    { field: 'id', headerName: 'SNo', width: 80 },
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'allotted_quota', headerName: 'Allotted Quota', width: 150 },
    { field: 'course', headerName: 'Course', width: 300 },
    { field: 'allotted_institute', headerName: 'Allotted Institute', width: 400 },
    { field: 'alloted_category', headerName: 'Alloted Category', width: 120 },
    { field: 'candidate_category', headerName: 'Candidate Category', width: 150 },
    { field: 'remarks', headerName: 'Remarks', width: 120 },
];

const Dropdown = (props) => {
    return (
        <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
            value={props.value}
            label={props.label}
            onChange={props.handleChange}
        >
            {props.options.map(option => {
                return <MenuItem value={option}>{option}</MenuItem>
            })}
        </Select> */}
            <Autocomplete
                options={props.options}
                onChange={(event, newValue) => {
                    props.handleChange(newValue, props.label);
                }}
                renderInput={(params) => <TextField {...params} label={props.label} />}
            />
        </FormControl>
    )
}


export default function DataTable() {
    const [tableRows, updateTableRows] = useState(rows);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, updateSelectedOptions] = useState({
        "allotted_quota": "",
        "allotted_institute": "",
        "course": "",
        "alloted_category": "",
        "candidate_category": "",
        "remarks": ""
    });
    const [quotaOptions, updateQuotaOptions] = useState([]);
    const [instituteOptions, updateInstituteOptions] = useState([]);
    const [courseOptions, updateCourseOptions] = useState([]);
    const [allotedCategoryOptions, updateAllotedCategoryOptions] = useState([]);
    const [candidateCategoryOptions, updateCandidateCategoryOptions] = useState([]);
    const [remarksOptions, updateRemarksOptions] = useState([]);


    useEffect(() => {
        console.log("Application Init")
        const tempquotaOptions = [];
        const tempInstituteOptions = [];
        const tempCourseOptions = [];
        const tempAllotedCategoryOptions = [];
        const tempCandidateCategoryOptions = [];
        const tempRemarksOptions = [];

        rows.map((row => {
            if (!tempquotaOptions.includes(row.allotted_quota)) {
                tempquotaOptions.push(row.allotted_quota);
            }
            if (!tempInstituteOptions.includes(row.allotted_institute)) {
                tempInstituteOptions.push(row.allotted_institute);
            }
            if (!tempCourseOptions.includes(row.course)) {
                tempCourseOptions.push(row.course);
            }
            if (!tempAllotedCategoryOptions.includes(row.alloted_category)) {
                tempAllotedCategoryOptions.push(row.alloted_category);
            }
            if (!tempCandidateCategoryOptions.includes(row.candidate_category)) {
                tempCandidateCategoryOptions.push(row.candidate_category);
            }
            if (!tempRemarksOptions.includes(row.remarks)) {
                tempRemarksOptions.push(row.remarks);
            }
            updateQuotaOptions(tempquotaOptions);
            updateInstituteOptions(tempInstituteOptions);
            updateCourseOptions(tempCourseOptions);
            updateAllotedCategoryOptions(tempAllotedCategoryOptions);
            updateCandidateCategoryOptions(tempCandidateCategoryOptions);
            updateRemarksOptions(tempRemarksOptions);
            return 0;
        }));
        setLoading(false)
        return;
    }, [tableRows])

    const updateOption = (value, optionName) => {
        setLoading(true)
        updateSelectedOptions({ ...selectedOptions, [optionName]: value == null ? '' : value })
        // console.log(selectedOptions)
        updateRows();
    }

    const updateRows = () => {
        var tempFilteredRows = []
        tempFilteredRows = rows.filter(row => {
            if (selectedOptions.allotted_quota === '') { return true; }
            return row.allotted_quota === selectedOptions.allotted_quota;
        })
        tempFilteredRows = tempFilteredRows.filter(row => {
            if (selectedOptions.allotted_institute === '') { return true; }
            return row.allotted_institute === selectedOptions.allotted_institute;
        })
        tempFilteredRows = tempFilteredRows.filter(row => {
            if (selectedOptions.course === '') { return true; }
            return row.course === selectedOptions.course;
        })
        tempFilteredRows = tempFilteredRows.filter(row => {
            if (selectedOptions.alloted_category === '') { return true; }
            return row.alloted_category === selectedOptions.alloted_category;
        })
        tempFilteredRows = tempFilteredRows.filter(row => {
            if (selectedOptions.candidate_category === '') { return true; }
            return row.candidate_category === selectedOptions.candidate_category;
        })
        tempFilteredRows = tempFilteredRows.filter(row => {
            if (selectedOptions.remarks === '') { return true; }
            return row.remarks === selectedOptions.remarks;
        })
        console.log(tempFilteredRows)
        updateTableRows(tempFilteredRows);
        setLoading(false)
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item>
                            <Dropdown
                                label="Select Quota"
                                value={selectedOptions.allotted_quota}
                                handleChange={(e) => { updateOption(e, "allotted_quota") }}
                                options={quotaOptions} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item>
                            <Dropdown
                                label="Select Institute"
                                value={selectedOptions.allotted_institute}
                                handleChange={(e) => { updateOption(e, "allotted_institute") }}
                                options={instituteOptions} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item>
                            <Dropdown
                                label="Select Course"
                                value={selectedOptions.course}
                                handleChange={(e) => { updateOption(e, "course") }}
                                options={courseOptions} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item>
                            <Dropdown
                                label="Select Alloted Category"
                                value={selectedOptions.alloted_category}
                                handleChange={(e) => { updateOption(e, "alloted_category") }}
                                options={allotedCategoryOptions} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item>
                            <Dropdown
                                label="Select Candidate Category"
                                value={selectedOptions.candidate_category}
                                handleChange={(e) => { updateOption(e, "candidate_category") }}
                                options={candidateCategoryOptions} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item>
                            <Dropdown
                                label="Select Remarks"
                                value={selectedOptions.remarks}
                                handleChange={(e) => { updateOption(e, "remarks") }}
                                options={remarksOptions} />
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Button variant="outlined" onClick={()=>{updateRows();}}>UPDATE TABLE</Button>
                        </Item>
                    </Grid>
                    <Grid item lg={12}>
                        <Item>
                            <DataGrid
                                loading={loading}
                                rows={tableRows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 100 },
                                    },
                                }}
                                pageSizeOptions={[50, 100]}
                                disableColumnFilter
                            />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}