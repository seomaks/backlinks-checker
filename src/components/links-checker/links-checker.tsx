import React, {ChangeEvent} from 'react';
import styles from './links-checker.module.css'
import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
  LinksType,
  setLinksAC,
  statusCodeTC
} from "../../state/app-reducer";

export const LinksChecker = () => {
  const dispatch = useDispatch()
  const links = useSelector<AppRootStateType, LinksType>(state => state.app.links)


  const setItems = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let links = (e.currentTarget.value).split('\n')
    dispatch(setLinksAC(links))
  }

  const addItem = () => {
    dispatch(statusCodeTC(links) as any)
    // dispatch(indexingTC(links, 10) as any)
  }

  return (
    <div className={styles.linksChecker}>
      <div className={styles.row}>
        <div className={styles.displayChecker}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '85ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Check it"
                placeholder="Add your links"
                multiline
                rows={12}
                defaultValue={links}
                onChange={setItems}
              />
            </div>
          </Box>
        </div>
        <div className={styles.button}>
          <Button variant="outlined" color="inherit" onClick={addItem}>
            Send
          </Button>
        </div>
      </div>
      <div className={styles.dataMonitor}>
      </div>
    </div>
  );
}





