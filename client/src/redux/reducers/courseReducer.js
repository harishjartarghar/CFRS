const initialState = {
    course:[],
    join:false,
    review:[],
    submission:[],
    data:[]
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
        case 'GET_REVIEW':
            return{
                ...state,
                review:actions.review,
                submission:actions.submission
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
        case 'NEW_REVIEW':
            return{
                ...state,
                review:[actions.review,...state.review]
            }
        case 'GET_DATA':
            return{
                ...state,
                data:actions.data
            }
        
        default:
            return state;
    }
}

export default authReducers;