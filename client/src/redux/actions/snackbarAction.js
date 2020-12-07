export const showSnackbarAction=(message , snackbarType)=>{
    return (dispatch,getState)=>{
    
        dispatch({type: 'SHOW_SNACKBAR', message ,snackbarType });
        setTimeout(()=>{
            dispatch({
                type:"HIDE_SNACKBAR"
            })
        },1500)
    }
}



