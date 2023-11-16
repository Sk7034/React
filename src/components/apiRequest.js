import React from "react"

const apiRequest= async (url='',optionsObj=null,errMsg=null) =>{
    try{
        const response = await fetch(url,optionsObj);
        if(!response.ok) throw Error('Please Reload ')

    }catch(err){
        errMsg=err.message
        console.log('inside apiRequst',errMsg)

    }finally{
        return errMsg;
    }
}

export default apiRequest;