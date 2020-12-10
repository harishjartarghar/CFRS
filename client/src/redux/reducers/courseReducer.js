const initialState = {
    course:[],
    join:false
};

const authReducers=(state={...initialState},actions)=>{
    switch(actions.type){
        case 'NEW_COURSE':
            return{
                ...state,
                course:[actions.course,...state.course]
            }
        case 'GET_COURSE':
            return{
                ...state,
                course:actions.course
            }

        case 'INVITE':
            return{
                ...state
            }
        case 'JOIN_VERIFY':
            return{
                ...state,
                join:true,
                detail:actions.course
            }
        
        default:
            return state;
    }
}

export default authReducers;