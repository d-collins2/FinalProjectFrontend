import { UPDATE_USER, LOGIN, TEAM_PAGE, LOGOUT, DELETE_LIST, UPDATE_LIST } from "./types.js"

export function updateUserAction(src) {
  return {
    type: UPDATE_USER,
    payload: src,
  }
}

export function updateCurrentUserAction(src){
  return {
    type: LOGIN,
    payload: src
  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}

export function deleteList(src){
  return {
    type: DELETE_LIST,
    payload: src
  }
}

export function updateTeamId(src){
  return {
    type: TEAM_PAGE,
    payload: src
  }
}

export function updateList(newlist, task, oldList, board){
  return {
    type: UPDATE_LIST,
    newList: newlist,
    task: task,
    oldList: oldList,
    board: board
  }
}
