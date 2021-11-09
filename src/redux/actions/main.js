import * as t from "../types";
// export const deleteTodo = (id) => async dispatch => {
//   try {
//     dispatch({
//       type: t.LOADING,
//       payload: true
//     })

//     const userData=JSON.parse(localStorage.getItem("user_info"))
//     const email=userData ? userData.email : ""

//     const apiResponse = await request.post(
//       process.env.API_ADDRESS+'/api/todo/delete',
//       { id, email }
//     )

//     dispatch({
//       type: t.DELETE_TODO,
//       payload: apiResponse.data.todos
//     })
//     dispatch({
//       type: t.LOADING,
//       payload: false
//     })

//   }catch(error){
//     dispatch({
//       type: t.LOADING,
//       payload: false
//     })
//     dispatch({
//       type: t.ERROR,
//       payload: error.response.data.error
//     })
//   }
// }
