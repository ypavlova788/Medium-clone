import React, { Fragment, useEffect } from "react";
import Feed from "components/feed";
import useFetch from "hooks/useFetch";
import Pagination from "components/pagination"; 
import { getPaginator, limit } from "components/utils";
import { stringify } from "query-string";
import PopularTags from "components/popularTags";
import Loading from "components/loading";
import ErrorMessage from "components/errorMessage";
import FeedToggler from "components/feedToggler";

const YourFeed = ({location, match}) => {
   
    const {offset, currentPage} = getPaginator(window.location.search)
    const tagName = match.params.slug
    const stringifiedParams = stringify({
        limit,
        offset,
        tag: tagName
    })
    const apiUrl = `/articles/feed?${stringifiedParams}`
    
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const url = window.location.host
    
    
    

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])
    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-9'>
                        <FeedToggler />
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                            {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles} />
                                <Pagination 
                                total={response.articlesCount} 
                                limit={limit} 
                                url={url} 
                                currentPage={currentPage}
                                />
                            </Fragment>
                        )}
                     
                    </div>
                    <div className='col-md-3'>
                    <PopularTags/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourFeed


