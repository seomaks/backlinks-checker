import React from 'react';
import {LinksChecker} from "./components/links-checker/links-checker";
import {Selector} from "./components/selector/selector";
import {DataMonitor} from "./components/data-monitor/data-monitor";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./state/app-reducer";
import {LinearProgress} from "@material-ui/core";
import {ErrorSnackbar} from "./components/error-snackbar/error-snackbar";

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  return (
    <div>
      <Selector/>
      {status === 'idle' && <LinksChecker />}
      {status === 'loading' && <LinearProgress />}
      {status === 'succeeded' && <DataMonitor/>}
      <ErrorSnackbar />
    </div>
  );
}

export default App