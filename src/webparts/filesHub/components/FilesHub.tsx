import * as React from "react";
import styles from "./FilesHub.module.scss";
import { IFilesHubProps } from "./IFilesHubProps";
import { Box, Button, Select, TextField } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField1 from '@mui/material/TextField';
import * as dayjs from "dayjs";

export interface IFilesHubDataState {
  isLoading: boolean;
  empIdDetail: number;
  employeeResponseLength: number;
  searchEmpId: string;
  searchName: string;
  searchEmail: string;
  searchFileType: string;
  searchStartDate: string;
  searchEndDate: string;
  selectedDate: Dayjs;
  itemEmployee: {
    employeeId: number;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    fileType: string;
    StartDate: string;
    EndDate: string;
  };

  items: [
    {
      employeeId: number;
      title: string;
      firstName: string;
      middleName: string;
      lastName: string;
      fileType: string;
      email: string;
      StartDate: string;
      EndDate: string;
    }
  ];
}

export default class FilesHub extends React.Component<IFilesHubProps, IFilesHubDataState> {
  public constructor(props: IFilesHubProps, state: IFilesHubDataState) {
    super(props);

    this.state = {
      isLoading: true,
      empIdDetail: 0,
      searchEmpId: "",
      employeeResponseLength: 0,
      searchName: "",
      searchEmail: "",
      searchFileType: "",
      searchStartDate: "",
      searchEndDate: "",
      selectedDate:  dayjs("2014-08-18T21:11:54"),
      itemEmployee: {
        employeeId: 0,
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        fileType: "",
        email: "",
        StartDate: "",
        EndDate: "",
      },
      items: [
        {
          employeeId: 0,
          title: "",
          firstName: "",
          middleName: "",
          lastName: "",
          fileType: "",
          email: "",
          StartDate: "",
          EndDate: "",
        },
      ],
    };

    // this.handleSearch = this.handleSearch.bind(this);
    // this.handleBack = this.handleBack.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  public render(): React.ReactElement<IFilesHubProps> {
    return (
      <>
        <div>
          <div className={styles["disp-flex"]}>
            <div>
              <TextField
                inputProps={{
                  style: {
                    height: "6px",
                  },
                }}
                onChange={(event) => {
                  this.setState({ searchEmpId: event.target.value });
                }}
                // value={this.state.searchEmpId}
                id="outlined-basic"
                label="Employee ID"
                variant="outlined"
              />
            </div>

            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    className={styles["MuiOutlinedInput-root"]}
                    onChange={(event) => {
                      this.setState({
                        searchFileType: event.target.value.toString(),
                      });
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="File Type"
                    // value={this.state.searchFileType}
                    placeholder="File Type"
                    // onChange={handleChange}
                  >
                    <MenuItem value={"File1"}>File 1</MenuItem>
                    <MenuItem value={"File2"}>File 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div>
              <TextField
                inputProps={{
                  style: {
                    height: "6px",
                  },
                }}
                onChange={(event) => {
                  this.setState({ searchName: event.target.value });
                }}
                // value={this.state.searchName}
                id="outlined-basic"
                label="Employee Name"
                variant="outlined"
              />
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    renderInput={(params) => <TextField1 {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            
            <div></div>

            <div>
              <TextField
                inputProps={{
                  style: {
                    height: "6px",
                  },
                }}
                onChange={(event) => {
                  this.setState({ searchEmail: event.target.value });
                }}
                // value={this.state.searchEmail}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </div>

            <div></div>

            <div>
              <Button onClick={this.handleSearch} variant="contained">
                Search
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  public handleDateChange(newValue: Dayjs){
    debugger;
    this.setState({selectedDate: newValue})
  }



  public async handleSearch() {
    // debugger;
    console.log("search");
  }
}

