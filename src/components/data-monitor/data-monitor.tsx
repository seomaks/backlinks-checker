import React, {useState} from 'react';
import styles from './data-monitor.module.css'
import {
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
  LinksType,
  StatusCodesType
} from "../../state/app-reducer";

export const DataMonitor = () => {
  const entities = useSelector<AppRootStateType, LinksType>(state => state.app.entities)
  const statusCodes = useSelector<AppRootStateType, StatusCodesType>(state => state.app.statusCodes)
  const isIndexing = useSelector<AppRootStateType, Array<any>>(state => state.app.isIndexing)
  const liveLinks = useSelector<AppRootStateType, Array<string>>(state => state.app.liveLinks)

  const [data, setData] = useState<Array<any>>([
    [{'URL': '', 'Status code': 0, 'Link': '', 'Google Index': ''}]
  ])

  return (
    <div className={styles.dataMonitor}>
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
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{entities.map((entity, index) => <p key={index}>{entity}</p>)}</TableCell>
                <TableCell align="right">{statusCodes.map((status, index) => <p key={index}>{status}</p>)}</TableCell>
                <TableCell align="right">{liveLinks.map((link, index) => <p key={index}>{link}</p>)}</TableCell>
                <TableCell align="right">{isIndexing.map((ind, index) => <p key={index}>{ind}</p>)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

