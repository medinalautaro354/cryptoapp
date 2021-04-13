class Http{
    static instance = new Http();

    get = async (url) =>{
        try{
            let request = await fetch(url);

            let json = await request.json();

            return json;
        }catch(err){
            console.log("Get error", err);

            throw Error(err);
        }
    }

    post = async(url, body) =>{
        try {
            let request = fetch(url,{
                method:"POST",
                body
            });

            let json = await request.json();

            return json;
        } catch (error) {
            console.log("Post error", error);

            throw Error(error);
        }
    }

}

export default Http;