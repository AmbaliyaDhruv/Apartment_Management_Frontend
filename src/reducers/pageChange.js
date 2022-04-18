const initialState=1;
const changeThePage=(state=initialState,action)=>{
    switch (action.type) {
        case 'NEXT_PAGE':return state+1;
        case 'PREV_PAGE':return state===1?state:state-1;
        default:return state;
    }
}

export default changeThePage;