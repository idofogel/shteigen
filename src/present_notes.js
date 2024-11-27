import React from 'react';
import RoundNode from './roundnode';
const PresentedNodes = (props) => {
    return (props.items.map((item, index) => (
        <RoundNode key={item.id_num} callMdl={props.callgroup} title={item.name} placex={item.placex} placey={item.placey} />
      ))
    );
}
export default PresentedNodes;