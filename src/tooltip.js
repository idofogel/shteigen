import React from 'react';
const Tooltip = (props) => {
    return (<div>
        <div style={{width:'100px',height:'100px',backgroundColor:'rgb(234, 220, 222,0.4)',top:'-104px',left:'50px',position:'absolute',borderWidth:'1px',borderColor:'grey',borderTopRightRadius:'3px',borderTopLeftRadius:'3px',borderBottomRightRadius:'3px'}}>
            <span>{props.title}</span>
            <div style={{width: 0,height: 0,borderLeft: '0px solid transparent',borderRight: '10px solid transparent', borderTop: '10px solid rgb(234, 220, 222,0.4)',position:'absolute',top:'100px',left:'0px' }}></div>
        </div>
    </div>);
 }
export default Tooltip;