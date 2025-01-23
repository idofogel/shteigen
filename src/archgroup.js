import React from 'react';
import ArchItem from './architem';
/* container of archs*/
const ArchGroup = (props) => {
  var arch_items = props.archs;
  var node_items = props.nodes;
    const archToNode = (from,to,md) => {
        var from_node,to_node;
        for(var iter_nodes=0; iter_nodes<node_items.length; iter_nodes++){
          var tred = node_items[iter_nodes];
          if(tred.id === from){from_node = tred;}
          if(tred.id === to){to_node = tred;}
        }

        if(from_node === undefined || to_node === undefined)
          return 0;
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
        <ArchItem key={itm.id_num} title={itm.name} colorize={itm.color} placex={archToNode(itm.from,itm.to,1)} placey={archToNode(itm.from,itm.to,2)} toplacex={archToNode(itm.from,itm.to,3)} toplacey={archToNode(itm.from,itm.to,4)} />
      )));
}
export default ArchGroup;