import React from 'react';
import RoundNode from './roundnode';
const PresentedNodes = (props) => {
    return (props.items.map((item, index) => (
        <RoundNode key={item.id_num} source_node={index} changeLevel={props.levelchanger} callMdl={props.callgroup} node_id={item.id} title={item.name} placex={item.placex} placey={item.placey} />
      ))
    );
}
export default PresentedNodes;