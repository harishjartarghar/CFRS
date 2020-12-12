import axios from 'axios';
import {BASE_URL} from '../../utils/constants';


export const NewCourse=(course,props)=>{
    return (dispatch,getState)=>{
        axios.post(BASE_URL+'/new_course',course,{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"COURSE CREATED!",snackbarType:"success"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                 dispatch({type:'NEW_COURSE',course:res.data});
            })
            .catch(error=>{
             
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}


export const GetCourse=(isTeacher)=>{
    return (dispatch,getState)=>{
        var url;
        if(isTeacher)
            url=BASE_URL+'/new_course';
        else
            url=BASE_URL+'/student_course';
        axios.get(url,{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
              if(isTeacher)
                 dispatch({type:'GET_COURSE',course:res.data});
             else
                dispatch({type:'GET_COURSE',course:res.data.course});

            })
            .catch(error=>{
             
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}


export const GetCourseAndVerify=(id,props)=>{
    return (dispatch,getState)=>{
        axios.get(BASE_URL+'/join_verify?id='+id,{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
              
                 dispatch({type:'JOIN_VERIFY',course:res.data.course});
            })
            .catch(error=>{
                console.log(error.response);
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
                 if(error.response.data.status===0)
                     props.history.push('/login');
                 if(error.response.data.status===1)
                     props.history.push('/dashboard');
               setTimeout(()=>{
                

            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}


export const INVITE=(email,id)=>{
    return (dispatch,getState)=>{
        axios.post(BASE_URL+'/invite',{email,id},{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
              
                 dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"INVITE SENT!",snackbarType:"success"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                 dispatch({type:'INVITE',course:res.data});
            })
            .catch(error=>{
             
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}



export const JOIN=(id,props)=>{
    return (dispatch,getState)=>{
        axios.post(BASE_URL+'/student_course',{id},{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
              props.history.push('/dashboard');
                 dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"Course Joined!",snackbarType:"success"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                 dispatch({type:'JOIN'});
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}



export const NEW_REVIEW=(code,question)=>{
    return (dispatch,getState)=>{
        axios.post(BASE_URL+'/review',{code,question},{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
               dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"REVIEW CREATED!",snackbarType:"success"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                 dispatch({type:'NEW_REVIEW',review:res.data});
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}


export const REVIEW_SUBMIT=(review,code)=>{
    return (dispatch,getState)=>{
        axios.post(BASE_URL+'/student_review',{review,code},{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
               dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"REVIEW SUBMITTED!",snackbarType:"success"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                 dispatch({type:'REVIEW_SUBMIT'});
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}



export const GET_REVIEW=(code,isTeacher)=>{
    return (dispatch,getState)=>{
        var url;
        if(isTeacher)
            url=BASE_URL+'/review?code='+code;
        else
            url=BASE_URL+'/student_review?code='+code;
        axios.get(url,{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
                if(isTeacher)
                {
                    var list=res.data.filter(item=>item.course!==null);
                    dispatch({type:'GET_REVIEW',review:list,submission:[]});
                }
                else
                {
                    dispatch({type:'GET_REVIEW',review:res.data.review,submission:res.data.submission});
                }
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}



export const GET_DATA=(id)=>{
    return (dispatch,getState)=>{
        axios.get(BASE_URL+'/data?id='+id,{headers:{'Content-Type': 'application/json','token':localStorage.getItem("jwt")}})
            .then(res=>{
                dispatch({type:'GET_DATA',data:res.data});
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
            });
    }
}





