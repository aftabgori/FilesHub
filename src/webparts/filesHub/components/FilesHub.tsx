import * as React from "react";
import styles from "./FilesHub.module.scss";
import { IFilesHubProps } from "./IFilesHubProps";
import { Box, Button, Select, TextField } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper/";

import FormControl from "@mui/material/FormControl";
import { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField1 from "@mui/material/TextField";
import * as dayjs from "dayjs";
import axios from "axios";

export interface IFilesHubDataState {
  isLoading: boolean;
  employeeResponseLength: number;
  searchCreatedBy: string;
  searchModifiedBy: string;
  searchDescription: string;
  searchFileType: string;
  searchCreatedDate: Dayjs;
  searchModifiedDate: Dayjs;

  items: [
    {
      employeeId: number;
      description: string;
      fileType: string;
      createdBy: string;
      modifiedBy: string;
      createdDate: string;
      modifiedDate: string;
    }
  ];
}

export default class FilesHub extends React.Component<
  IFilesHubProps,
  IFilesHubDataState
> {
  public constructor(props: IFilesHubProps, state: IFilesHubDataState) {
    super(props);

    this.state = {
      isLoading: true,
      employeeResponseLength: 0,
      searchCreatedBy: "",
      searchModifiedBy: "",
      searchDescription: "",
      searchFileType: "",
      searchCreatedDate: null,
      searchModifiedDate: null,
      items: [
        {
          employeeId: 0,
          description: "",
          fileType: "",
          createdBy: "",
          modifiedBy: "",
          createdDate: "",
          modifiedDate: "",
        },
      ],
    };

    // this.handleSearch = this.handleSearch.bind(this);
    // this.handleBack = this.handleBack.bind(this);
    this.handleModifiedDateChange = this.handleModifiedDateChange.bind(this);
    this.handleCreatedDateChange = this.handleCreatedDateChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  public render(): React.ReactElement<IFilesHubProps> {
    return (
      <>
        <div className={styles.mainDivMargin}>
          <div className={styles["disp-flex"]}>
            <div>
              <TextField
                inputProps={{
                  style: {
                    height: "6px",
                  },
                }}
                onChange={(event) => {
                  this.setState({ searchDescription: event.target.value });
                }}
                // value={this.state.searchEmpId}
                id="outlined-basic"
                label="Description"
                variant="outlined"
              />
            </div>

            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    File Type
                  </InputLabel>
                  <Select
                    variant="outlined"
                    className={styles["MuiOutlinedInput-root"]}
                    onChange={(event) => {
                      this.setState({
                        searchFileType: event.target.value.toString(),
                      });
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="FileType"
                    value={this.state.searchFileType}
                    placeholder="File Type"
                    // onChange={handleChange}
                  >
                    <MenuItem value={"file1"}>File 1</MenuItem>
                    <MenuItem value={"file2"}>File 2</MenuItem>
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
                  this.setState({ searchCreatedBy: event.target.value });
                }}
                // value={this.state.searchName}
                id="outlined-basic"
                label="Created By"
                variant="outlined"
              />
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    className={styles.DatePicker}
                    label="Created Date"
                    inputFormat="MM/DD/YYYY"
                    value={this.state.searchCreatedDate}
                    onChange={this.handleCreatedDateChange}
                    renderInput={(params) => <TextField1 {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    className={styles.DatePicker}
                    label="Modified Date"
                    inputFormat="MM/DD/YYYY"
                    value={this.state.searchModifiedDate}
                    onChange={this.handleModifiedDateChange}
                    renderInput={(params) => <TextField1 {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>

            <div>
              <TextField
                inputProps={{
                  style: {
                    height: "6px",
                  },
                }}
                onChange={(event) => {
                  this.setState({ searchModifiedBy: event.target.value });
                }}
                value={this.state.searchModifiedBy}
                id="outlined-basic"
                label="Modified By"
                variant="outlined"
              />
            </div>

            <div>
              <Button onClick={this.handleSearch} variant="contained">
                Search
              </Button>
            </div>
          </div>
          <br />
          <div>
            {this.state.employeeResponseLength > 0 ? (
              <div>
                <TableContainer component={Paper}>
                  <Table className={styles["MuiTable-root"]}>
                    <TableHead className={styles["MuiTableHead-root"]}>
                      <TableRow>
                        <TableCell className={styles["MuiTableCell-head"]}>
                          ReportFile
                        </TableCell>
                        <TableCell className={styles["MuiTableCell-head"]}>
                          FileType
                        </TableCell>
                        <TableCell className={styles["MuiTableCell-head"]}>
                          Description
                        </TableCell>
                        <TableCell className={styles["MuiTableCell-head"]}>
                          Created by
                        </TableCell>
                        <TableCell className={styles["MuiTableCell-head"]}>
                          Modified by
                        </TableCell>
                        <TableCell className={styles["MuiTableCell-head"]}>
                          Modified Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.items.map((row) => {
                        return (
                          <TableRow
                            // onClick={() => this.handleClick(row.employeeId)}
                            className={styles.tableRow}
                            key={row.employeeId}
                          >
                            {/* <TableCell component="th" scope="row" /> */}
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {row.employeeId}
                            </TableCell>
                            {/* <TableCell className={styles["MuiTableCell-body"]}>
                          {row.title + " " + row.firstName + " " + row.lastName}
                        </TableCell> */}
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {row.fileType}
                            </TableCell>
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {row.description}
                            </TableCell>
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {row.createdBy}
                            </TableCell>
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {new Date(row.createdDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </TableCell>
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {row.modifiedBy}
                            </TableCell>
                            <TableCell className={styles["MuiTableCell-body"]}>
                              {new Date(row.modifiedDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div className={styles.noData}>
                <h4>No data available,please search to get data</h4>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
      </>
    );
  }

  public async handleClick() {
    // debugger;
    console.log("clicked!");
  }

  public handleModifiedDateChange(newValue: Dayjs) {
    debugger;
    this.setState({ searchModifiedDate: newValue });
  }

  public handleCreatedDateChange(newValue: Dayjs) {
    debugger;
    this.setState({ searchCreatedDate: newValue });
  }

  public async handleSearch() {
    debugger;
    let queryString =
      "https://peoplesoftservice20221228200557.azurewebsites.net/api/PeopleSoft/SearchReportFile?";
    if (this.state.searchDescription != "") {
      queryString += "&description=" + this.state.searchDescription;
    }

    if (this.state.searchCreatedBy != "") {
      queryString += "&createdby=" + this.state.searchCreatedBy;
    }

    if (this.state.searchModifiedBy != "") {
      queryString += "&modifiedby=" + this.state.searchModifiedBy;
    }

    if (this.state.searchFileType != "") {
      queryString += "&filetype=" + this.state.searchFileType;
    }

    if (this.state.searchCreatedDate) {
      queryString += "&createddate=" + this.state.searchCreatedDate;
    }
    if (this.state.searchModifiedDate) {
      queryString += "&modifieddate=" + this.state.searchModifiedDate;
    }
    await axios.get(queryString).then((response) => {
      // debugger;
      this.setState({
        items: response.data,
        employeeResponseLength: response.data.length,
      });
    });
  }
}
