import axios from 'axios';
import {BASE_URL} from '../../utils/constants';


export const signUp=(NewUser,props)=>{
    return (dispatch,getState)=>{
        axios.post(BASE_URL+'/auth/signup',NewUser,{headers:{'Content-Type': 'application/json'}})
            .then(res=>{
                 dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"REGISTER SUCCUESS",snackbarType:"success"});

                 localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.newUser));
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                props.history.push('/dashboard');
                dispatch({type:'SIGNUP_SUCCESS',...res});
                
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





export const Login=(UserCredentials,props)=>{
    return (dispatch,getState)=>{
            axios.post(BASE_URL+'/auth/signin',UserCredentials,{headers:{'Content-Type': 'application/json'}})
            .then(res=>{
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:"LOGIN SUCCUESS",snackbarType:"success"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));

                props.history.push('/dashboard');
                dispatch({type:'LOGIN_SUCCESS',...res.data});
            })
            .catch(error=>{
                console.log(error);
                  dispatch({type:'SHOW_SNACKBAR',snackbar:true,message:error.response.data.message,snackbarType:"error"});
               setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },2000)
                dispatch({type:'LOGIN_ERROR',error});
            })
    }
}

export const LOGOUT=(props)=>{
    return (dispatch,getState)=>{
        localStorage.clear();
       window.location.href='/login'
        dispatch({type:'LOGGED_OUT'});

    }
}

export const UPDATE_PROFILE=(imageUrl)=>{
    return (dispatch,getState)=>{
        const user=JSON.parse(localStorage.getItem("user"));
        user.profile=imageUrl;
        localStorage.setItem("user",JSON.stringify(user)); 
    axios.post('http://192.168.43.13:8080/api/user/newprofile',{imageUrl},{headers:{'Content-Type': 'application/json','auth-token':localStorage.getItem("jwt")}})
        console.log("cjeck",user);
        dispatch({type:'PROFILE_UPDATE',...user});
    }
}

export const CHECK_AUTH=()=>{
    return (dispatch,getState)=>{
        if(localStorage.getItem("jwt"))
        {
            const data={token:localStorage.getItem("jwt"),user:JSON.parse(localStorage.getItem("user"))}
            dispatch({type:'LOGGED_IN',...data});
        }
        else{
            dispatch({type:'LOGGED_OUT'});
        }
    }
}

