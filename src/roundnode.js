import React, {useRef,useState} from 'react';
import Tooltip from './tooltip';
const Roundnode = (props) => {
    var indexer = 10;
    const intervalRef = useRef(0);
    const startanim = useRef(true);
    // const [blk,setBlk] = useState(0);
    let can_move = false;
    let offset_x,offset_y;
    const changeRound = ()=> {
        // setBlk((a) => a+1);
        if(indexer === 0){
            var innerCircle = intervalRef.current.getElementsByTagName('div')[0];
            var cur_width = parseInt(intervalRef.current.style.width.replace('px',''));
            if(cur_width < 60){
                intervalRef.current.style.width = (cur_width + 2)+'px';
                intervalRef.current.style.height = (cur_width + 2)+'px';
                intervalRef.current.style.top = (parseInt(intervalRef.current.style.top.replace('px','')) - 1)+'px';
                intervalRef.current.style.left = (parseInt(intervalRef.current.style.left.replace('px','')) - 1)+'px';
                innerCircle.style.width = (parseInt(innerCircle.style.width.replace('px','')) + 2)+'px';
                innerCircle.style.height = (parseInt(innerCircle.style.height.replace('px','')) + 2)+'px';

            } else {
                intervalRef.current.style.width = '40px';
                intervalRef.current.style.height = '40px';
                intervalRef.current.style.top = '10px';
                intervalRef.current.style.left = '10px';
                innerCircle.style.top = '10px';
                innerCircle.style.left = '10px';
                innerCircle.style.width = '20px';
                innerCircle.style.height = '20px';
            }
            indexer=15;
        }
        indexer--;
        if(startanim.current)
            window.requestAnimationFrame(changeRound);
        // setBlk((a) => a-1);
    }
    const stopAnm = () => {
        startanim.current=false;
    }
    const startChangeRound = () => {
        startanim.current=true;
        changeRound();
    }
    const clearWhiteCircle = () => {
        indexer = 30;
    }
    const clmdl = () =>{
        props.callMdl(true);
    }
    const moveRound = (event) => {
        can_move = true;
        offset_x = event.pageX;
        offset_y = event.pageY;
        // console.log(event.currentTarget);
        // intervalRef.current.style.
    }
    const dontMoveRound = (event) => {
        if(can_move === true){
            var offset_mod = ((offset_y % 200) > 100) ? 1 : 0;
            var new_offset_y = parseInt(offset_y / 200) * 200 + offset_mod;
            props.changeLevel(props.node_id,offset_x,new_offset_y);
        }
        can_move = false;
    }
    const moveRoundElseWhere = (event) => {
        if(can_move === true){
            console.log(event);
            if((event.pageX > offset_x) || event.pageX < offset_x){
                event.currentTarget.style.left = (parseFloat(event.currentTarget.style.left.replace('px',''))+(event.pageX - offset_x))+'px';
                offset_x = event.pageX;
            }
            if((event.pageY > offset_y) || (event.pageY < offset_y)){
                event.currentTarget.style.top = (parseFloat(event.currentTarget.style.top.replace('px',''))+(event.pageY - offset_y))+'px';
                offset_y = event.pageY;
            }
        }
    }
    return (<div className="outer_red_circle" onMouseMove={moveRoundElseWhere} onMouseDown={moveRound} onMouseUp={dontMoveRound} onClick={clmdl} onMouseOver={startChangeRound} onMouseOut={stopAnm} title={props.title} style={{width:'60px',height:'60px',top:props.placey,left:props.placex}}>
        <Tooltip title={props.title} />
        <div onMouseEnter={clearWhiteCircle} ref={intervalRef} className="white_circle" style={{width:'40px',height:'40px',top:'10px',left:'10px'}}>
            <div onMouseEnter={clearWhiteCircle} className="inner_circle" style={{width:'20px',height:'20px',top:'10px',left:'10px'}}></div>
            
        </div>
    </div>);   
}
export default Roundnode;