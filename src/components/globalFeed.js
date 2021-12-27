import React, { Fragment, useEffect } from "react";
import Feed from "./feed";
import useFetch from "hooks/useFetch";
import Pagination from "./pagination"; 
import { getPaginator, limit } from "./utils";
import { stringify } from "query-string";
import PopularTags from "./popularTags";
import Loading from "./loading";
import errorMessage from "./errorMessage";
import FeedToggler from "./feedToggler";

const GlobalFeed = ({location, match}) => {
    const {offset, currentPage} = getPaginator(window.location.search)
    const stringifiedParams = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles?${stringifiedParams}`
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
                        {error && <errorMessage/>}
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

export default GlobalFeed


