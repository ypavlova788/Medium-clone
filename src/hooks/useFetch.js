import axios from "axios"
import {useState, useEffect, useCallback} from "react"
import useLocalStorage from "./useLocalStorage"

const useFetch = url => {
    const baseUrl = 'https://conduit.productionready.io/api'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const[token] = useLocalStorage('token')

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    },[])

    useEffect(() =>  {
        let skipGetResponseAfterDestroy = false
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }
        if(!isLoading || !options || !url) {
            return
        }
        axios(baseUrl + url, requestOptions).then(res => {
            if(!skipGetResponseAfterDestroy){
            setIsLoading(false)
            setResponse(res.data)
            }
            
        }).catch(error => {
           if(!skipGetResponseAfterDestroy){
            setIsLoading(false)
            setError(error.response.data)
           }
            

        })

        return () => {
            skipGetResponseAfterDestroy = true
        }
    }, [isLoading,options,url,token])

    return [{isLoading,response,error}, doFetch];
}

export default useFetch;