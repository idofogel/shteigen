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
    const fir_item = useRef(0);
    const sec_item = useRef(0);
    const json_arr = useRef({});
    // const nodes_arr = useRef([]);
    const [cncpt,setCncpt] = useState(false);
    const [scndcncpt,setScndscndCncpt] = useState(false);
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
    const changeLevelOfNode = (node_id,place_x,place_y) => {
      for(var itrya = 0; itrya<nodes.length; itrya++){
        let nde = nodes[itrya];
        if(nde.id === node_id){
          nde.placex = place_x;
          nde.placey = place_y;
          saveToNodes('update_node',{'update_node':{id_num:nde.id,name:nde.name,placex:nde.placex,placey:nde.placey, module:nde.module,txt:nde.text}});
          break;
        }

      }
    }
    const closeMdl = () => {
        openModal(false);
    }
    const deleteNode = () => {
        // srcnd
    }
    const setConcept = () => {
      setCncpt(!cncpt);
    }
    const setSecondConcept = () => {
      setScndscndCncpt(!scndcncpt);
    }
    const setSecondItem = (idnum) => {
      sec_item.current = idnum;
    }
    const setArchesitem = (idnum) => {
      // for(var iterat = 0;iterat < nodes.length;iterat++){
      //   if(nodes[iterat].id_num === idnum)
      //     fir_item = nodes[iterat];
      // }
      fir_item.current = idnum;
      // setFirItem((a)=>{a=idnum;});
      // fir_item = idnum;
    }
    const copyArr = (old_arr) => {
      var newarr = [];
      for(var irty=0;irty < old_arr.length;irty++){
        newarr.push(old_arr[irty]);
      }
      return newarr;
    }
    let list_od_arrs = [];
    const bFSRecurse = (orig_node_list,orig_arch_list) => {
      var res_arr = [];
      var array_of_arrays = [];
      //fir_item,sec_item
      //add all new nodes to res_arr
      var checked = false;
      
      let arrnde = [];
      let archs_inds = [];
      //find highest node
      let highest_node = 0;
      for(var archs_index = 0;archs_index < nodes.length;archs_index++){
        if(nodes[archs_index].placey > highest_node)
          highest_node = nodes[archs_index].placey;
      }
      //run a BFS to find a path from from fir_item to sec_item
      let new_orig_node_list = copyArr(orig_node_list);
      list_od_arrs.push(new_orig_node_list);
      let stop_algo = false;
      //iterate over the levels
      for(var height_index = 0; height_index < parseInt(highest_node / 200); height_index++){
        let new_nodes_list = [];
        new_orig_node_list = copyArr(list_od_arrs[list_od_arrs.length-1]);
        for(var archs_index = 0;archs_index < new_archs.length;archs_index++){
          if(new_orig_node_list.includes(new_archs[archs_index].from) && (parseInt(new_nodes1[new_archs[archs_index].to].placey /100)*100) > new_nodes1[new_archs[archs_index].from].placey) {
            new_nodes_list.push(new_archs[archs_index].to);
            if(new_archs[archs_index].to===sec_item.current){
              new_nodes_list = [new_archs[archs_index].to];
              stop_algo=true;
              break;
            }
          }
          if(new_orig_node_list.includes(new_archs[archs_index].to) && (parseInt(new_nodes1[new_archs[archs_index].from].placey /100)*100) > new_nodes1[new_archs[archs_index].to].placey) {
            new_nodes_list.push(new_archs[archs_index].from);
            if(new_archs[archs_index].from===sec_item.current){
              new_nodes_list = [new_archs[archs_index].from];
              stop_algo=true;
              break;
            }
          }
        }
        list_od_arrs.push(new_nodes_list);
        if(stop_algo===true){break;}
      }
      //if a path was not found stop the function
    if(stop_algo === false)
      return;


      console.log('list_od_arrs:');
      console.log(list_od_arrs);
      let check_loose = {};
      check_loose[fir_item] = 1;
      check_loose[sec_item] = 1;
      //paint the path red
      for(var iter_list = (list_od_arrs.length-1);iter_list>-1;iter_list--){
        for(var iter_on_arches=0; iter_on_arches < archs.length;iter_on_arches++){
          if(list_od_arrs[iter_list] ===undefined || list_od_arrs[iter_list-1] === undefined)
            continue;
          
          if(list_od_arrs[iter_list].includes(archs[iter_on_arches].from) && list_od_arrs[iter_list-1].includes(archs[iter_on_arches].to) || list_od_arrs[iter_list].includes(archs[iter_on_arches].to) && list_od_arrs[iter_list-1].includes(archs[iter_on_arches].from)){
            archs[iter_on_arches].color="red";
            check_loose[archs[iter_on_arches].from] = check_loose[archs[iter_on_arches].from] === undefined ? 1 : check_loose[archs[iter_on_arches].from]++;
            check_loose[archs[iter_on_arches].to] = check_loose[archs[iter_on_arches].to] === undefined ? 1 : check_loose[archs[iter_on_arches].to]++;
          }

        }
      }

      setArches(archs);
    }
    let new_archs = [],new_nodes1={};
    const clearPath = () => {
      for(var iter_red=0;iter_red<archs.length;iter_red++){
        archs[iter_red].color = undefined;
      }
    }
    const startBFS = () => {
      clearPath();
      new_archs = [];
      for(var itre=0;itre< archs.length;itre++){
        new_archs.push(archs[itre]);
      }
      itre=0;
      for(itre=0;itre< nodes.length;itre++){
        new_nodes1[nodes[itre].id] = nodes[itre];
      }
      var new_jsons = bFSRecurse([fir_item.current]);
      console.log('list_od_arrs:');
      console.log(list_od_arrs);
      console.log('new_jsons');
      console.log(json_arr.current);
  
      setArches(archs);
      new_archs = [];new_nodes1={};
    }
    
    return (<div className="App">
        <input ref={inRef} type='text' placeholder='הוסף מושג' onKeyDown={addItemToList}/>

        <PresentedNodes items={nodes} callgroup={openMdl} levelchanger={changeLevelOfNode} />
        <ArchGroups archs={archs} nodes={nodes} />
       
        <div className="concept-headline">
            הוסף חיבור בין מושגים
        </div>
        
        <div onClick={toggleNodes} className="toggle-up"><span onClick={toggleNodes} style={{backgroundRepeat: 'no-repeat',left: '75px',backgroundPosition: 'center',backgroundSize: '21px 16px',zIndex: 2,position: 'absolute',width: '20px',height: '20px',backgroundImage: `url(${require('./arrow_up.png')})`}}></span></div>
        <div ref={parRef} className="node-list">
        {
            
            nodes.map((item, index) => (
                <div key={item.id_num} onClick={() => {openMdl();setSourceNode((a)=> a=item.id);}} className="node-list-item" style={{marginTop:'3px'}}>{item.name}</div>
                ))
            
            
        }
        {open_modl && <Archmodal long_text={long_text} set_long_text={setLongText} source_node={srcnd} cls_mdl={closeMdl} nodes={nodes} archs={archs} setarchs={setArches} setKod={setNodes} deleteTheNode={deleteNode} mdl={theme} />}
        </div>
        <div onClick={toggleNodesDown} className="toggle-down"><span onClick={toggleNodesDown} style={{backgroundRepeat: 'no-repeat',left: '75px',backgroundPosition: 'center',backgroundSize: '21px 16px',zIndex: 2,position: 'absolute',width: '20px',height: '20px',backgroundImage: `url(${require('./arrow_down.png')})`}}></span></div>
        <div className="choose-course">בחר מסלול ממושג למושג </div>
        <div onClick={setConcept} className="choose-course" style={{top:'254px'}}>מושג 1</div><div className="choose-source-fir" >
        { cncpt && nodes.map((item, index) => (
                <div key={item.id} onClick={() => {setArchesitem(item.id);setConcept();}} className="node-list-item" style={{marginTop:'3px'}}>{item.name}</div>
                ))
                }
        </div>
        <div onClick={setSecondConcept} className="choose-course" style={{top:'285px'}}>מושג 2</div><div className="choose-source-fir">{scndcncpt && 
        nodes.map((item, index) => (
          <div key={item.id_num} onClick={() => {setSecondItem(item.id);startBFS();setSecondConcept();}} className="node-list-item" style={{marginTop:'3px'}}>{item.name}</div>
          ))}
          </div>
    </div>);
}
export default MemHir;