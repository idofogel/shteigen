import React from 'react';
import ArchItem from './architem';
import architems from './architems';
import nodeitems from './nodeitems';
const ArchGroup = (props) => {
//   console.log('%cArchGroup rendered','font-size:20px;color:red;');
//   console.log(props.archs);
  var arch_items = architems;
  var node_items = nodeitems;
  if(props.archs !== undefined){
    arch_items = props.archs;
  }
  if(props.nodes !== undefined){
    node_items = props.nodes;
  }
    const archToNode = (from,to,md) => {
        var from_node = node_items[from-1];
        var to_node = node_items[to-1];
        switch (md){
            case 1: 
                return from_node.placex;
            break;
            case 2:
                return from_node.placey;
            break;
            case 3: 
                return to_node.placex;
            break;
            case 4: 
                return to_node.placey;
            break;
        }
    }
    return (arch_items.map((itm, indx) => (
        <ArchItem title={itm.name} placex={archToNode(itm.from,itm.to,1)} placey={archToNode(itm.from,itm.to,2)} toplacex={archToNode(itm.from,itm.to,3)} toplacey={archToNode(itm.from,itm.to,4)} />
      )));
}
export default ArchGroup;