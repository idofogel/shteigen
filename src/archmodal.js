import React,{ useState,useEffect,useRef } from 'react';
const Archmodal = (props) => {
    const [new_arch,setNewArch] = useState([]);
    const [new_arch_text_open,setNewArchTextOpen] = useState(false);
    const [to_id,setToId] = useState(null);
    const text_obj = useRef("");
    //const [long_text,setLongText] = useState({});
    const arch_ref = useRef(0);
    
    var setting_node = [],archs_of_nodes={};
    for(var trewq=0; trewq < props.nodes.length; trewq++){
        if(props.source_node !== props.nodes[trewq].id){
            setting_node.push(props.nodes[trewq]);
        }
    }
    //{name:'ביחד',from:1,to:3
    for(var trewq=0; trewq < props.archs.length; trewq++){
        if(props.archs[trewq].from === props.source_node){
            archs_of_nodes[props.archs[trewq].to] = true;
        } else {
            if(props.archs[trewq].to === props.source_node){
                archs_of_nodes[props.archs[trewq].from] = true;
            }
        }
    }
    const saveLongText = (event) => {
        var revised_source;
        for(var itera = 0; itera < props.nodes.length;itera++){
            if(props.nodes[itera].id === props.source_node)
                revised_source = props.nodes[itera].id;
        }
            var ltext = event.currentTarget.parentElement.getElementsByTagName('textarea')[0].value;
            var temp_long_text = props.long_text;
            temp_long_text[revised_source] = ltext;
            props.set_long_text(temp_long_text);
        
    }
    const removeItem = (itemToRemove) => {
        props.setarchs((prevItems) => prevItems.filter(item => item !== itemToRemove));
    };
    const chooseNode = (itm_id) => {
        if(archs_of_nodes[itm_id]){
            var ytrfg;
            for(var iytr=0; iytr < props.archs.length; iytr++){
                // console.log('arch from: '+props.archs[iytr].from+' arch to: '+props.archs[iytr].to+' itm id argument: '+itm_id+' source_node: '+props.source_node);
                if((props.archs[iytr].from === itm_id && props.archs[iytr].to === props.source_node) || (props.archs[iytr].to === itm_id && props.archs[iytr].from === props.source_node)){
                    removeItem(props.archs[iytr]);
                }
            }
        } else {
            // setNewArch([itm_id,props.source_node]);
            setNewArchTextOpen(true);
            setToId(itm_id);
//setNodes((prevItems) => [...prevItems, {id:(nodes.length+1),name:inRef.current.value,placex:(tres+200),placey:(tresy+200)}]);
        }
    }
    const createNewArch = (event) => {
        if(event.keyCode === 13){
            props.setarchs((prevItems) => [...prevItems, {name:arch_ref.current.value,from:props.source_node,to:to_id}]);
            //add connected node
            let srcnd = 0,trgtnd=0,ndtop=0,trgttxt = "",srctxt="",tottxt="",srcndx=0,trgtndx=0;
            for(var inds=0; inds < props.nodes.length; inds++){
                var cur_prop = props.nodes[inds];
                //identify the heighest point
                if(props.nodes[inds].id === props.source_node){
                    srcnd = cur_prop.placey;
                    srctxt = cur_prop.name;
                    srcndx = cur_prop.placex;
                }
                if(props.nodes[inds].id === to_id){
                    trgtnd = cur_prop.placey;
                    trgttxt = cur_prop.name;
                    trgtndx = cur_prop.placex;
                }
            }
            var rew = 0;
            if(srcndx >= trgtndx){
                rew = trgtndx+(srcndx - trgtndx)/2;
            } else {
                rew = srcndx+(trgtndx - srcndx)/2;
            }
            tottxt = trgttxt+" "+srctxt;
            ndtop = srcnd >= trgtnd ? srcnd : trgtnd;
            var new_id = (props.nodes.length+1);
            props.setKod((prevItems) => [...prevItems, {id:new_id,name:tottxt,placex:rew,placey:(ndtop+200)}]);
            //create to additional archs
            props.setarchs((prevItems) => [...prevItems, {name:tottxt,from:props.source_node,to:new_id}]);
            props.setarchs((prevItems) => [...prevItems, {name:tottxt,from:to_id,to:new_id}]);
            setNewArchTextOpen(false);

        }
    }
    return (<div className="modal-background" >
        <div className="modal-itself">
            <div className="arch-nodes" style={{borderColor:'grey',position:'absolute',width:'150px',height:'calc(100% - 20px)',top:'10px',left:'10px',borderRadius:'5px',borderStyle:'solid',borderStyle:'solid',borderWidth:'1px'}}>
            {
                setting_node.map((itm, index) => (
                    <div onClick={()=>{chooseNode(itm.id);}} className="connected-node" style={{backgroundColor: archs_of_nodes[itm.id] ? 'blue' : '#8ceaee'}}>{itm.name}</div>
                ))
            }
            </div>
            <textarea ref={text_obj} style={{resize:'none',position:'absolute',left:'170px',top:'10px',width:'calc(100% - 210px)',height:'calc(100% - 70px)'}}>{props.long_text[props.source_node]}</textarea>
            <button onClick={saveLongText} style={{cursor:'pointer',color:'grey',width:'150px',height:'30px',borderRadius:'5px',position:'absolute',bottom:'10px',right:'10px',backgroundColor:'#8ceaee',borderStyle:'none'}}>שמור</button>
            {new_arch_text_open && <div style={{position:'absolute',width:'100%',height:'100%',top:'0px',left:'0px',backgroundColor:'rgba(100,100,100,0.5)'}}><input ref={arch_ref} placeholder='כתוב שם של קשת' type='text' onKeyDown={createNewArch} style={{position: 'absolute',top: 'calc(50% - 5px)',left: 'calc(50% - 75px)'}} /></div>}
            <span onClick={props.cls_mdl} className="x-modal">X</span>
        </div>
    </div>);
 }
 export default Archmodal;