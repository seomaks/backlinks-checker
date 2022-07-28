import React, {ChangeEvent} from "react";
import {FormControl, InputLabel} from "@material-ui/core";
import {NativeSelect} from "@mui/material";
import styles from "../selector/selector.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setProjectAC} from "../../state/app-reducer";
import {useAppDispatch} from "../../hooks/hooks";

export const Selector = React.memo(() => {
  const dispatch = useAppDispatch()
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
            defaultValue: project,
            id: 'uncontrolled-native',
          }}
        >
          <option value={'mightytips.com'}>mightytips.com</option>
          <option value={'mightytips.net'}>mightytips.net</option>
          <option value={'mightytips.ph'}>mightytips.ph</option>
          <option value={'mightytips.info'}>mightytips.info</option>
          <option value={'mightytips.hu'}>mightytips.hu</option>
          <option value={'mightytips.com.br'}>mightytips.com.br</option>
          <option value={'mightytips.biz'}>mightytips.biz</option>
          <option value={'mightytips.pl'}>mightytips.pl</option>
          <option value={'seobrotherslv.com'}>seobrotherslv.com</option>
          <option value={'bonusowo.com'}>bonusowo.com</option>
          <option value={'bonusowo.hu'}>bonusowo.hu</option>
        </NativeSelect>
      </FormControl>
    </div>
  </div>
})