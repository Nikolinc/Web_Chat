import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as ActionCreators from '../store/action-creators/user'

export const useAction = () => {
  const dispatch = useDispatch()
  return bindActionCreators(ActionCreators, dispatch)
}