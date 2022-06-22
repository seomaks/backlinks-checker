import React, {useState} from 'react';
import styles from './data-monitor.module.css'
import {
  Button,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
  EntitiesType,
  StatusCodesType
} from "../../state/app-reducer";
import {utils, writeFile} from "xlsx";

export const DataMonitor = () => {
  const entities = useSelector<AppRootStateType, EntitiesType>(state => state.app.entities)
  const statusCodes = useSelector<AppRootStateType, StatusCodesType>(state => state.app.statusCodes)
  const isIndexing = useSelector<AppRootStateType, EntitiesType>(state => state.app.isIndexing)
  const liveLinks = useSelector<AppRootStateType, EntitiesType>(state => state.app.liveLinks)

  const [data, setData] = useState<Array<any>>([
    [{'URL': '', 'Status code': 0, 'Link': '', 'Google Index': ''}]
  ])

  const handleExport = () => {
    const headings = [[
      'URL',
      'Status code',
      'Link',
      'Google index'
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, entities.map(entity=>[entity]), { origin: 'A2', skipHeader: true });
    utils.sheet_add_json(ws, statusCodes.map(status=>[status]), { origin: 'B2', skipHeader: true });
    utils.sheet_add_json(ws, liveLinks.map(link=>[link]), { origin: 'C2', skipHeader: true });
    utils.sheet_add_json(ws, isIndexing.map(index=>[index]), { origin: 'D2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Backlinks report.xlsx');
  }

  return (
    <div className={styles.dataMonitor}>
      <Button variant="contained" onClick={handleExport} className="btn btn-primary float-right">
        Export <i className="fa fa-download"></i>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Check your result</b></TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Status code</TableCell>
              <TableCell align="right">Link</TableCell>
              <TableCell align="right">Google Index</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{entities.map((entity, index) => <p key={index}>{entity}</p>)}</TableCell>
                <TableCell align="right">{statusCodes.map((status, index) =>status === 200 ? <p key={index}>{status}</p> : <p key={index} style={{color: "red"}}>{status}</p>)}</TableCell>
                <TableCell align="right">{liveLinks.map((link, index) =>link === 'Yep 😁' ? <p key={index}>{link}</p> : <p key={index} style={{color: "red"}}>{link}</p>)}</TableCell>
                <TableCell align="right">{isIndexing.map((ind, index) =>ind === 'Yep 😁' ? <p key={index}>{ind}</p> : <p key={index} style={{color: "red"}}>{ind}</p>)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

