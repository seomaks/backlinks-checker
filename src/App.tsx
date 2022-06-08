import React from 'react';
import {LinksChecker} from "./components/links-checker/links-checker";
import {Selector} from "./components/selector/selector";

function App() {

  return (
    <div>
      <Selector />
      <LinksChecker />
    </div>
  );
}

export default App