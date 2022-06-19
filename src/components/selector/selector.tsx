import React, {ChangeEvent} from "react";
import {FormControl, InputLabel} from "@material-ui/core";
import {NativeSelect} from "@mui/material";
import styles from "../selector/selector.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setProjectAC} from "../../state/app-reducer";

export const Selector = () => {
  const dispatch = useDispatch()
  const project = useSelector<AppRootStateType, string>(state => state.app.project)

  const switchProject = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist()
    dispatch(setProjectAC(e.currentTarget.value))
  }

  return <div className={styles.selector}>
    <div className={styles.items}>
      <FormControl fullWidth>
        <InputLabel variant="outlined" htmlFor="uncontrolled-native">
          Project
        </InputLabel>
        <NativeSelect
          onChange={switchProject}
          defaultValue={project}
          inputProps={{
            name: 'project',
            id: 'uncontrolled-native',
          }}
        >
          <option value={'mightytips.info'}>mightytips.info</option>
          <option value={'mightytips.hu'}>mightytips.hu</option>
          <option value={'mightytips.com.br'}>mightytips.com.br</option>
          <option value={'mightytips.biz'}>mightytips.biz</option>
          <option value={'seobrotherslv.com'}>seobrotherslv.com</option>
          <option value={project}>mightytips.com</option>
        </NativeSelect>
      </FormControl>
    </div>
  </div>
}