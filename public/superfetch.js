function superfetch(url, type, success, fail, settings) {    
    

    fetch(url, settings).then(function(response){
            //1. stage
        if (response.ok) {
            
            if (type == "json") {
                return response.json();
            }
            else if (type == "text") {
                return response.text();
            }
            else if (type == "xml") {
                return response
            }
            
        } else {
            console.log(response);
            throw new Error(response.status);
        }

    }).then(function(data){
        // 2. stage

        success(data);

    }).catch(function(error){
        console.log(error);
        
        fail(error);
    }); //end fetch
}