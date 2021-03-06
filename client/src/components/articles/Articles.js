import React, { Component } from "react";
import API from "../../utils/API";
import Media from 'react-bootstrap/Media';
import moment from 'moment';
import "./styles.css"

class Articles extends Component {
    state = {
        articles: []
    }
    
   componentDidMount() {
       API.getArticles(this.props.name)
       .then((result) => {
            this.setState({
                articles: result.data.docs
            })
       })
   }
   render() {
       const articles = this.state.articles;
        return (
            <div >
                <ul className="list-unstyled">
                    {
                        articles.map((article,index)=> (
                            <Media as="li" key={index} className="article-list">
                                <img
                                    width={120}
                                    height={85}
                                    className="mr-3"
                                    src={article.featured_image}
                                    alt={article.title}
                                    
                                />
                                <Media.Body>
                                    {moment.unix(article.date_published).format("MMMM DD YYYY")}
                                    <h5>{article.title}</h5>
                                    <h6>Source: {article.news_site_long}</h6>
                                    <a className="article-read" href={article.url} target='_blank'>Read</a>
                                </Media.Body>
                            </Media> 
                            )
                        )
                    }
                    
                    </ul>
            </div>
                
        )
        //    dates, title, url, image
   }
   }

   export default Articles