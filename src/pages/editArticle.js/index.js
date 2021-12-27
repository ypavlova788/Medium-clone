import React, { useEffect, useState, useContext } from "react";
import ArticleForm from "components/articleForm";
import useFetch from "hooks/useFetch";
import { Redirect } from "react-router";
import { CurrentUserContexts } from "contexts/currentUser";

const EditArtice = ({match}) => {
    const slug = match.params.slug
    const [currentUserState] = useContext(CurrentUserContexts)
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [
        {response: updateArticleResponse, error: updateArticleError},
        doUpdateArticle
    ] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState(null)
    const [isSuccesfulSubmit, setIsSuccesfulSubmit] = useState(false)

    const handleSubmit  = article => {
        doUpdateArticle({
            method: 'put',
            data: {
                article: {
                    ...initialValues,
                    ...article,
                },
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse){
            return
        }
        setInitialValues(
            fetchArticleResponse.article
        )
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse){
            return
        }
        setIsSuccesfulSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to='/'/>

    }

    if (isSuccesfulSubmit){
        return <Redirect to={`/articles/${slug}`}/>
    }
    return (
        <ArticleForm 
        onSubmit={handleSubmit}
        errors={(updateArticleError && updateArticleError.errors) || {}}
        initialValues = {initialValues}
        />
    )
    }
export default EditArtice