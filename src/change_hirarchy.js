import React,{ useRef,useState } from 'react';
import NodeItems from './nodeitems';
import PresentedNodes from './present_notes';
import ArchGroups from './archgroup';
import ArchItems from './architems';
import Archmodal from './archmodal';

// import ConnectNewArch from './Connect_new_arch';
const MemHir = () => {
    const [nodes,setNodes] = useState(NodeItems);
    const [archs,setArches] = useState(ArchItems);
    const [open_modl,openModal] = useState(0);
    const [srcnd,setSourceNode] = useState(0);
    const [long_text,setLongText] = useState({});
    const inRef = useRef(0);
    const parRef = useRef(null);
    const addItemToList = (event) => {
        if(event.keyCode === 13){
            var tres = 0,tresy=0;
            for(var ite=0; ite < nodes.length; ite++){
                if(nodes[ite].placex > tres)
                    tres = nodes[ite].placex;
                if(nodes[ite].placey > tresy)
                    tresy = nodes[ite].placey;
            }
            setNodes((prevItems) => [...prevItems, {id:(nodes.length+1),name:inRef.current.value,placex:(tres+200),placey:(tresy+200)}]);
            inRef.current.value = "";
        }
    }
    const toggleNodes = () => {
        if((parRef.current.getElementsByTagName('div')[0].getBoundingClientRect().top - parRef.current.getBoundingClientRect().top) > 5)
            return;
        var pos_neg = 5;
            parRef.current.getElementsByTagName('div')[0].style.marginTop = (parseInt(parRef.current.getElementsByTagName('div')[0].style.marginTop.replace('px',''))+pos_neg)+'px';
        }
    const toggleNodesDown = () => {
        var pos_neg = -5;
            parRef.current.getElementsByTagName('div')[0].style.marginTop = (parseInt(parRef.current.getElementsByTagName('div')[0].style.marginTop.replace('px',''))+pos_neg)+'px';
    }
    const openMdl = () => {
        openModal(true);
    }
    const closeMdl = () => {
        openModal(false);
    }
    return (<div className="App">
        <input ref={inRef} type='text' placeholder='הוסף מושג' onKeyDown={addItemToList}/>

        <PresentedNodes items={nodes} />
        <ArchGroups archs={archs} nodes={nodes} />
        
        <div style={{cursor:'pointer',height: '23px',width: '169px',backgroundColor: 'grey',borderRadius: '5px',color: 'white',top: '51px',position: 'absolute',left: '21px'}}>
            הוסף חיבור בין מושגים
        </div>
        <div onClick={toggleNodes} style={{left: '22px',position: 'absolute',top: '75px',cursor:'pointer',color:'white',backgroundColor:'#8ceaee',width:'169px',borderRadius:'5px',marginTop:'3px'}}>/\</div>
        <div ref={parRef} style={{maxHeight: '100px',overflow: 'hidden',position: 'absolute',top: '100px',textAlign: 'center',left: '22px',width: '168px'}}>
        {
            nodes.map((item, index) => (
                <div onClick={() => {openMdl();setSourceNode(item.id);}} style={{cursor:'pointer',color:'white',backgroundColor:'#8ceaee',width:'169px',borderRadius:'5px',marginTop:'3px'}}>{item.name}</div>
            ))
            
        }
        {open_modl && <Archmodal long_text={long_text} set_long_text={setLongText} source_node={srcnd} cls_mdl={closeMdl} nodes={nodes} archs={archs} setarchs={setArches} setKod={setNodes} />}
        </div>
        <div onClick={toggleNodesDown} style={{left: '22px',position: 'absolute',top: '175px',cursor:'pointer',color:'white',backgroundColor:'#8ceaee',width:'169px',borderRadius:'5px',marginTop:'3px'}}>\/</div>
    </div>);
}
export default MemHir;