import React from 'react';
const ArchItem = (props) => {
    var arch_width,transform_deg,arch_height = 0;
    if(props.placey === props.toplacey){
        arch_width = props.placex > props.toplacex ? (props.placex - props.toplacex)+'px' : (props.toplacex - props.placex)+'px';
        transform_deg = 'rotate(0deg)';
        
    } else {
        var a_width = props.placex > props.toplacex ? props.placex - props.toplacex : props.toplacex - props.placex;
        var a_height = props.placey > props.toplacey ? props.placey - props.toplacey : props.toplacey - props.placey;
        arch_width = Math.sqrt(a_width*a_width + a_height*a_height);
        
        arch_height = a_height/2;
        arch_height = props.placey > props.toplacey ? (-1)*arch_height : arch_height;
        var base_angle = Math.asin(a_height/arch_width);
        base_angle = base_angle * (180 / Math.PI);
        if(props.toplacey < props.placey && props.toplacex < props.placex){//down to up right to left
            base_angle+=180;
            transform_deg = 'rotate('+base_angle+'deg)';//
        }
        if(props.toplacey > props.placey && props.toplacex < props.placex){//up to down right to left
            base_angle = parseFloat('-'+base_angle)+180;
            transform_deg = 'rotate('+base_angle+'deg)';//
        }
        if(props.toplacey < props.placey && props.toplacex > props.placex){//down to up left to right
            base_angle = parseFloat('-'+base_angle);
            transform_deg = 'rotate('+base_angle+'deg)';//
        }
        if(props.toplacey > props.placey && props.toplacex > props.placex){//up to down left to right
            //base_angle = (-1)*(base_angle);
            transform_deg = base_angle < 0 ? 'rotate('+base_angle+'deg)' : 'rotate(-'+base_angle+'deg)';
            transform_deg = 'rotate('+base_angle+'deg)';
        }










        
        // if(props.placex > props.toplacex){
        //     console.log('props title: '+props.title);
        //     if(base_angle < 0){
        //         console.log('props angle: '+props.title);
        //         base_angle = (-1)*base_angle;
        //         console.log(base_angle);
        //     }
        //     transform_deg = 'rotate(-'+base_angle+'deg)';
        // } else {
        //     transform_deg = 'rotate('+base_angle+'deg)';
        // }
        // if(props.title.indexOf('בלוב') > -1)
        //     console.log('transform_deg: '+transform_deg);
    }
    // return (<div className="arch_item" style={{top:(props.placey+30+arch_height),left:(props.placex+30 - arch_left),width:arch_width,transform:transform_deg,height:'2px',transformOrigin: '0% 0%'}}>
    //     <span style={{textAlign:'center'}}>{props.title}</span>
    // </div>);
    return (<div className="arch_item" style={{top:(props.placey+30),left:(props.placex+30),width:arch_width,transform:transform_deg,height:'2px',transformOrigin: '0% 0%'}}>
        <span style={{textAlign:'center'}}>{props.title}</span>
    </div>);
}
export default ArchItem;