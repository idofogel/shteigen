import React,{ useEffect, useState, useContext } from 'react';
import ThemeContext from './ThemeContext';
import saveToNodes from './save_to_nodes';
import { Link } from "react-router-dom";
import serverurl from './server_url';
const Splash = (props) => {
    const [modules,setModules] = useState([]);
    const {theme,setTheme} = useContext(ThemeContext);
    const [theme_set,setThemeSet] = useState(false)
    useEffect(() => {
        console.log('call nodes_of_module');
        fetch(serverurl+'/get_modules')
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
            var new_modules = [];
            for(var rew=0;rew<data.length;rew++){
                new_modules.push({caption:data[rew].caption,id_num:data[rew].id_num});
            }
            setModules(new_modules);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
      useEffect(() => {
        if(theme_set){
            document.getElementById('link').click();
        }
        console.log('Theme updated:', theme);
    }, [theme]);
      const chooseModule = (event) => {
        // setTheme
        var tretheme = parseInt(event.currentTarget.getAttribute('indicati'));
        setThemeSet(true);
        setTheme(tretheme);
        console.log('theme: '+theme);
        if(tretheme === 1)
            document.getElementById('link').click();
      }
      const changeModule = (event) => {
        if(event.keyCode === 13){
            var mods_length = modules.length+1;
            var module_name = event.currentTarget.value;
            if(modules.length > 0){
                setModules((prevItems) => [...prevItems, {caption:module_name,id_num:mods_length}]);
            } else {
                setModules([{caption:module_name,id_num:mods_length}]);
            }
            saveToNodes('save_module',{caption:module_name,id_num:mods_length});
            event.currentTarget.value = "";
        }
        
    }
    return (<div>
        
        <div className="wellcom" style={{top:'250px',left:'calc:(50% - 100px)',backgroundSize: '200px 100px',backgroundImage: `url(${require('./wellcome.png')})`}}></div>
        <div className="wellcom" style={{top:'350px',left:'calc(50%-100px)',backgroundSize: '200px 100px',backgroundImage: `url(${require('./shteigenomator.png')})`}}></div>
        <div className="choosemodule" style={{position:'absolute',top:'450px',left:'calc(50%-100px)'}}>אנא בחר מודול או צור אחד מחדש</div>
        
        <Link id="link" to="/change_hir"></Link>
        <input className="input_module" type="text" onKeyDown={changeModule} style={{left:'calc(50%-100px)'}} />
        {  
            modules.map((item, index) => (
                <div className="modules_names" key={item.id_num} onClick={chooseModule} indicati={item.id_num} style={{top: (504+(index*20))+'px'}}> {item.caption}</div>
                ))
        }
    </div>);
}
export default Splash;