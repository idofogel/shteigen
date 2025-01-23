import React from 'react';
/*create new arch*/
const ArchItem = (props) => {
    var arch_width,transform_deg,arch_height = 0,arch_left = 0;
    //when arch is to the same level
    if(props.placey === props.toplacey){
        arch_width = props.placex > props.toplacex ? (props.placex - props.toplacex)+'px' : (props.toplacex - props.placex)+'px';
        arch_left = props.placex > props.toplacex ? ((-1)*(props.placex - props.toplacex)) : 0;
        transform_deg = 'rotate(0deg)';
        
    } else {
        //calculate the angle of the arch
        var a_width = props.placex > props.toplacex ? props.placex - props.toplacex : props.toplacex - props.placex;
        var a_height = props.placey > props.toplacey ? props.placey - props.toplacey : props.toplacey - props.placey;
        arch_width = Math.sqrt(a_width*a_width + a_height*a_height);
        
        //arch_height = a_height/2;
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
            transform_deg = base_angle < 0 ? 'rotate('+base_angle+'deg)' : 'rotate(-'+base_angle+'deg)';
            transform_deg = 'rotate('+base_angle+'deg)';
        }
        if(props.toplacey > props.placey && props.toplacex === props.placex){
            transform_deg = 'rotate(90deg)';
        }
        if(props.toplacey < props.placey && props.toplacex === props.placex){
            transform_deg = 'rotate(90deg)';
        }
    }
    let emptycolor = {};
    if(props.colorize){
        emptycolor = {backgroundColor:props.colorize};
        // console.log('color');
        // console.log(emptycolor);
    }
    return (<div className="arch_item" style={{top:(props.placey+30),left:(props.placex+30+arch_left),width:arch_width,transform:transform_deg,height:'2px',transformOrigin: '0% 0%',backgroundColor: props.colorize === "red" ? "red" : "blue"}}>
        <span style={{textAlign:'center'}}>{props.title}</span>
    </div>);
}
export default ArchItem;