import React, { memo } from 'react';
import nodeitems from './nodeitems';
import Roundnode from './roundnode';
const NodeGroup = memo((props) =>{
    return (nodeitems.map((item, index) => (
        <Roundnode callMdl={props.callgroup} title={item.name} placex={item.placex} placey={item.placey} />
      ))
    );
 });

//  const NodeGroup = memo(( props ) => {
//     return (nodeitems.map((item, index) => (
//         <Roundnode callMdl={props.callgroup} title={item.name} placex={item.placex} placey={item.placey} />
//       ))
//     );
//   });
  export default NodeGroup;