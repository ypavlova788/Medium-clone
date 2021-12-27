import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import ArticleForm from "components/articleForm";
import useFetch from "hooks/useFetch";
import { CurrentUserContexts } from "contexts/currentUser";

const CreateArtice = () => {
    const apiUrl = '/articles'
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContexts)
    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }
    const [isSuccessfullSubmit, setIsSuccesfulSubmit] = useState(false)
    const handleSubmit = article => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }
    useEffect(() => {
        if(!response) {
            return
        }
        setIsSuccesfulSubmit(true)
    },[response])

    if (currentUserState.isLoggedIn === false){
        return <Redirect to='/' />
    }
    if (isSuccessfullSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`}/>
    }
    return (
    <div>
        <ArticleForm
         errors={(error && error.errors) || {}} 
        initialValues={initialValues} 
        onSubmit={handleSubmit}/>
        </div>
    )
}

export default CreateArtice