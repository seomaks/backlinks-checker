import React, {useCallback} from 'react';
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
  dataResetTC,
  EntitiesType,
  StatusCodesType
} from "../../state/app-reducer";
import {utils, writeFile} from "xlsx";
import {useAppDispatch} from "../../hooks/hooks";

export const DataMonitor = React.memo(() => {
  const dispatch = useAppDispatch()
  const entities = useSelector<AppRootStateType, EntitiesType>(state => state.app.entities)
  const statusCodes = useSelector<AppRootStateType, StatusCodesType>(state => state.app.statusCodes)
  const liveLinks = useSelector<AppRootStateType, EntitiesType>(state => state.app.liveLinks)
  const isIndexing = useSelector<AppRootStateType, EntitiesType>(state => state.app.isIndexing)

  const data: Array<any> = [{
    entities,
    statusCodes,
    liveLinks,
    isIndexing
  }]

  const handleExport = useCallback(() => {
    const headings = [[
      'URL',
      'Status code',
      'Link',
      'Google index'
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, entities.map(entity => [entity]), {
      origin: 'A2',
      skipHeader: true
    });
    utils.sheet_add_json(ws, statusCodes.map(status => [status]), {
      origin: 'B2',
      skipHeader: true
    });
    utils.sheet_add_json(ws, liveLinks.map(link => [link]), {
      origin: 'C2',
      skipHeader: true
    });
    utils.sheet_add_json(ws, isIndexing.map(index => [index]), {
      origin: 'D2',
      skipHeader: true
    });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Backlinks report.xlsx');
  }, [entities, statusCodes, liveLinks, isIndexing])

  const handleReset = () => {
    dispatch(dataResetTC())
  }

  return (
    <div className={styles.dataMonitor}>
      <div className={styles.buttons}>
        <div className={styles.button}>
        <Button variant="contained" onClick={handleExport}
                className="btn btn-primary float-right">
          Export
        </Button>
        </div>
        <div className={styles.button}>
        <Button variant="contained" onClick={handleReset}
                className="btn btn-primary float-right">
          Clean
        </Button>
        </div>
      </div>
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
                <TableCell align="right">{entities.map((entity, index) => <p className={styles.urlColumn}
                  key={index}>{entity}&nbsp;
                  <a href={entity} target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link" aria-hidden="true"></i></a>
                  &nbsp;
                  <a href={`https://www.google.com/search?q=${entity}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-google" aria-hidden="true"></i></a>
                </p>)}
                </TableCell>
                <TableCell
                  align="right">{statusCodes.map((status, index) => status === 200 ?
                  <p key={index}>{status}</p> : <p key={index}
                                                   style={{color: "red"}}>{status}</p>)}</TableCell>
                <TableCell
                  align="right">{liveLinks.map((link, index) => link === 'Yep 😁' ?
                  <p key={index}>{link}</p> :
                  <p key={index} style={{color: "red"}}>{link}</p>)}</TableCell>
                <TableCell
                  align="right">{isIndexing.map((ind, index) => ind === 'Yep 😁' ?
                  <p key={index}>{ind}</p> :
                  <p key={index} style={{color: "red"}}>{ind}</p>)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
})

