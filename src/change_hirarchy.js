import React,{ useRef,useState, useEffect, useContext,useCallback } from 'react';
import NodeItems from './nodeitems';
import PresentedNodes from './present_notes';
import ArchGroups from './archgroup';
import ArchItems from './architems';
import Archmodal from './archmodal';
import saveToNodes from './save_to_nodes';
import ThemeContext from './ThemeContext';
import server_url from './server_url';

const MemHir = () => {
    const [nodes,setNodes] = useState(NodeItems);
    const [archs,setArches] = useState(ArchItems);
    const [open_modl,openModal] = useState(false);
    const [srcnd,setSourceNode] = useState(0);
    const [long_text,setLongText] = useState({});
    const inRef = useRef(0);
    const parRef = useRef(null);
    const {theme,setTheme} = useContext(ThemeContext);
    const maintheme = theme;//changed the context to const in order to keep theme context out of the dependencies list
    useEffect(() => {
        console.log('call nodes_of_module');
        fetch(server_url+'/nodes_of_module?module='+maintheme)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log('response:');
            console.log(response.body);
            return response.json();
          })
          .then(data => {
            console.log('data');
            console.log(data);
            var new_nodes = [],new_archs = [];
            var tres=0;
            for(tres=0; tres < data['archs'].length; tres++){
              new_archs.push({name: data['archs'][tres].caption,id: data['archs'][tres].id_num,from: data['archs'][tres].from,to: data['archs'][tres].to,module:data['archs'][tres].module});
            }
            var p_heights = {};
            var change_const,push_node_right;
            tres=0;
            for(tres=0; tres < data['nodes'].length; tres++){
                var node_obj = data['nodes'][tres];
                var level_key = parseInt(node_obj.level/100)*100;
              if(p_heights[level_key] === undefined)
                p_heights[level_key] = 1;
              else
                p_heights[level_key]++;
            
              change_const = parseInt(Math.random()*10);
              push_node_right = (parseInt(node_obj.level/200) % 2 ===0) ? 100 : 0;
              new_nodes.push({name: node_obj.caption,id: node_obj.id_num,placey:(node_obj.level+(change_const*3)),placex:(p_heights[level_key]*200+push_node_right),module:node_obj.module,txt:node_obj.content});
            }
            console.log('new_nodes');
            console.log(new_nodes);
            console.log('new_archs');
            console.log(new_archs);
            setNodes(new_nodes);
            setArches(new_archs);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
    const addItemToList = (event) => {
        if(event.keyCode === 13){
            var tres = 0;
            for(var ite=0; ite < nodes.length; ite++){
                if(nodes[ite].placex > tres)
                    tres = nodes[ite].placex;
            }
            var new_node = {id:(nodes.length+1),name:inRef.current.value,placex:(tres+200),placey:200, module:theme};
            if(nodes.length > 0){
                setNodes((prevItems) => [...prevItems, new_node]);
            } else {
                setNodes([new_node]);
            }
            saveToNodes('add_remove',{'nodestoadd':[new_node]});
            inRef.current.value = "";
        }
    }
    const toggleNodes = useCallback(() => {
        if((parRef.current.getElementsByTagName('div')[0].getBoundingClientRect().top - parRef.current.getBoundingClientRect().top) > 5)
            return;
        var pos_neg = 5;
            parRef.current.getElementsByTagName('div')[0].style.marginTop = (parseInt(parRef.current.getElementsByTagName('div')[0].style.marginTop.replace('px',''))+pos_neg)+'px';
        },[])
    const toggleNodesDown = useCallback(() => {
        var pos_neg = -5;
            parRef.current.getElementsByTagName('div')[0].style.marginTop = (parseInt(parRef.current.getElementsByTagName('div')[0].style.marginTop.replace('px',''))+pos_neg)+'px';
    },[])
    const openMdl = () => {
        openModal(true);
    }
    const closeMdl = () => {
        openModal(false);
    }
    const deleteNode = () => {
        // srcnd
    }
    return (<div className="App">
        <input ref={inRef} type='text' placeholder='הוסף מושג' onKeyDown={addItemToList}/>

        <PresentedNodes items={nodes} callgroup={openMdl} />
        <ArchGroups archs={archs} nodes={nodes} />
       
        <div className="concept-headline">
            הוסף חיבור בין מושגים
        </div>
        
    
    
    
    
        <div onClick={toggleNodes} className="toggle-up"><span onClick={toggleNodes} style={{backgroundRepeat: 'no-repeat',left: '75px',backgroundPosition: 'center',backgroundSize: '21px 16px',zIndex: 2,position: 'absolute',width: '20px',height: '20px',backgroundImage: `url(${require('./arrow_up.png')})`}}></span></div>
        <div ref={parRef} className="node-list">
        {
            
            nodes.map((item, index) => (
                <div key={item.id_num} onClick={() => {openMdl();setSourceNode(item.id);}} className="node-list-item" style={{marginTop:'3px'}}>{item.name}</div>
                ))
            
            
        }
        {open_modl && <Archmodal long_text={long_text} set_long_text={setLongText} source_node={srcnd} cls_mdl={closeMdl} nodes={nodes} archs={archs} setarchs={setArches} setKod={setNodes} deleteTheNode={deleteNode} mdl={theme} />}
        </div>
        <div onClick={toggleNodesDown} className="toggle-down"><span onClick={toggleNodesDown} style={{backgroundRepeat: 'no-repeat',left: '75px',backgroundPosition: 'center',backgroundSize: '21px 16px',zIndex: 2,position: 'absolute',width: '20px',height: '20px',backgroundImage: `url(${require('./arrow_down.png')})`}}></span></div>
    </div>);
}
export default MemHir;