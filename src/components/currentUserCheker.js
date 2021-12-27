import useFetch from "hooks/useFetch"
import { useContext, useEffect } from "react"
import { CurrentUserContexts } from "contexts/currentUser"
import useLocalStorage from "hooks/useLocalStorage"

const CurrentUserCheker = ({children}) => {
        const [{response}, doFetch] = useFetch('/user')
        const [,dispatch] = useContext(CurrentUserContexts)
        const [token] = useLocalStorage('token')
        
        useEffect(() =>{
            if(!token) {
                dispatch({type: 'SET_UNAUTHORIZED'})
                return
            }
            
            doFetch()
            dispatch({type: 'LOADING'})
            
        }, [token,dispatch,doFetch])
        useEffect(()=> {
            if (!response) {
                return 
            }
            dispatch({type: 'SET_AUTHORIZED', payload: response.user})
        }, [response,dispatch])
    return children
}

export default CurrentUserCheker