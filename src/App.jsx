import { useState } from 'react'
import React from 'react'
import './App.css'
import Currentlocation from "./Currentlocation"

function App() {
 
  return (
    <React.Fragment>
    <div className='container'>

<Currentlocation/>

 </div>
<div className='footer-info'>
  <a href=' '>Download source code</a>{" "} | Developed by Rohini Kadam
</div>  
    </React.Fragment>
  )
}

export default App;
