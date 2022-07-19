import React, {ChangeEvent, useCallback} from 'react';
import styles from './links-checker.module.css'
import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
  EntitiesType,
  setLinksAC,
  statusCodeTC
} from "../../state/app-reducer";
import {useAppDispatch} from "../../hooks/hooks";

export const LinksChecker = React.memo(() => {
  const dispatch = useAppDispatch()
  const links = useSelector<AppRootStateType, EntitiesType>(state => state.app.links)
  const project = useSelector<AppRootStateType, string>(state => state.app.project)


  const setItems = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let links = (e.currentTarget.value).split('\n')
    dispatch(setLinksAC(links))
  },[dispatch])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter'){
      dispatch(statusCodeTC(links, project))
    }
  }, [dispatch, links, project])

  const addItem = useCallback(() => {
    dispatch(statusCodeTC(links, project))
  },[dispatch, links, project])

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
                onKeyDown={handleKeyPress}
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
})





