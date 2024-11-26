import server_url from './server_url';
const saveToNodes = (new_path,activity_key_and_new_node) => {
    fetch(server_url+'/'+new_path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity_key_and_new_node)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  export default saveToNodes;