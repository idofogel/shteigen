import React, {useRef,useState} from 'react';
import Tooltip from './tooltip';
const Roundnode = (props) => {
    var indexer = 10;
    const intervalRef = useRef(0);
    const startanim = useRef(true);
    const [blk,setBlk] = useState(0);
    
    const handleWindowLoad = ()=> {
        //window.requestAnimationFrame(changeRound);
    }
    // useEffect(() => {
    //     window.onload = handleWindowLoad;
    //   }, []);
    const changeRound = ()=> {
        setBlk((a) => a+1);
        // console.log('indexer: '+indexer);
        if(indexer === 0){
            var innerCircle = intervalRef.current.getElementsByTagName('div')[0];
            var cur_width = parseInt(intervalRef.current.style.width.replace('px',''));
            if(cur_width < 60){
                intervalRef.current.style.width = (cur_width + 2)+'px';
                intervalRef.current.style.height = (cur_width + 2)+'px';
                intervalRef.current.style.top = (parseInt(intervalRef.current.style.top.replace('px','')) - 1)+'px';
                intervalRef.current.style.left = (parseInt(intervalRef.current.style.left.replace('px','')) - 1)+'px';
                // innerCircle.style.top = (parseInt(innerCircle.style.top.replace('px','')) + 1)+'px';
                // innerCircle.style.left = (parseInt(innerCircle.style.left.replace('px','')) + 1)+'px';
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
        setBlk((a) => a-1);
    }
    const stopAnm = () => {
        startanim.current=false;
        // console.log('onmouseout '+startanim.current);
    }
    const startChangeRound = () => {
        // console.log('item_locked: '+blk);
        startanim.current=true;
        // console.log('onmouseover'+startanim.current);
        changeRound();
    }
    const clearWhiteCircle = () => {
        indexer = 30;
    }
    const clmdl = () =>{
        props.callMdl(true);
    }
    return (<div className="outer_red_circle" onClick={clmdl} onMouseOver={startChangeRound} onMouseOut={stopAnm} title={props.title} style={{width:'60px',height:'60px',top:props.placey,left:props.placex}}>
        <Tooltip title={props.title} />
        <div onMouseEnter={clearWhiteCircle} ref={intervalRef} className="white_circle" style={{width:'40px',height:'40px',top:'10px',left:'10px'}}>
            <div onMouseEnter={clearWhiteCircle} className="inner_circle" style={{width:'20px',height:'20px',top:'10px',left:'10px'}}></div>
            
        </div>
    </div>);   
}
export default Roundnode;