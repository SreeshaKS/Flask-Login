function get(url,params,cb,headers={}){
    let urlnew = new URL(url);
    let paramsNew = new URLSearchParams(urlnew);
    Object.keys(params).forEach((item)=>{
        paramsNew.append(item,params[item]);
       
    });
    console.log(urlnew);
    fetch(url,{
        method:'GET',
        headers : {
            ...headers
        },
        credentials: 'include'
    })
    .then((res)=>res.json())
    .then((json)=>cb(null,json))
    .catch((err)=>cb(err,null));
}

function post(url,data,cb,headers={}){
    // var d = new FormData();
    // Object.keys(data).map((item)=>{
    //     d.append( item, data[item]);
    // });
    fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers : {
            ...headers
        },
        credentials: 'include'
    })
    .then((res)=>{
        let d ;
        res.status==200? d=res.json() :d={'ok':res.ok,'status':res.status,'statusText':res.statusText};
        return d;
    })
    .then((json)=>cb(null,json))
    .catch((err)=>cb(err,null));
}
const FetchAPI = {
    get,
    post
}
export default FetchAPI;