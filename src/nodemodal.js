import React from 'react';
const Nodemodal = (props) => {
    const rmvModal = () => {
        props.callgroup(false);
    }
    return (<div className="modal-background" >
        <div className="modal-itself" style={{padding:'12px',position:'absolute',left:'50px',top:'50px',zIndex:13,height:'calc(100% - 100px)',width:'calc(100% - 100px)',backgroundColor:'white',borderRadius:'10px'}}>
        <span className="x-modal" onClick={rmvModal} >X</span>
        </div>
    </div>);
 }
 export default Nodemodal;