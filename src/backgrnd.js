 import React, { useState } from 'react';

 import Nodemodal from './nodemodal';
 import NodeGroup from './nodegroup';
 import ArchGroup from './archgroup';

 const Backgrnd = () =>{
    const [open_modal,setModal] = useState(false);
    return (
      <div className="App"><NodeGroup callgroup={setModal} /><ArchGroup />{
        open_modal && <Nodemodal callgroup={setModal} />
        }
      </div>
    );
 }
 export default Backgrnd;