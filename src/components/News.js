import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired // Ensure setProgress is required
  };

  capitalizeFl = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFl(this.props.category)} - News Today`;
  }

  async fetchArticles(page) {
    this.props.setProgress(10); // Corrected typo
    const apiKey = 'dd7931594a53446dad3a82be292c2870'; 
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=${page}&pageSize=5&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      this.setState({ 
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults
      });
      this.props.setProgress(100); // Corrected typo
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      this.setState({ articles: [] });
      this.props.setProgress(100); // Ensure progress is updated even on error
    }
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    this.setState({ loading: true, page: nextPage });
    const apiKey = 'dd7931594a53446dad3a82be292c2870'; 
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&page=${nextPage}&pageSize=5&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      this.setState(prevState => ({
        articles: prevState.articles.concat(parsedData.articles || []),
        totalResults: parsedData.totalResults,
        loading: false
      }));
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      this.setState({ loading: false });
    }
  };

  handlePrevClick = async () => {
    const prevPage = this.state.page - 1;
    if (prevPage >= 1) {
      this.setState({ loading: true });
      await this.fetchArticles(prevPage);
      this.setState({ page: prevPage, loading: false });
    }
  };

  render() {
    return (
      <>
        <h1 className="text-center">News Today - {this.capitalizeFl(this.props.category)}</h1>
        
        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className="row">
              {this.state.articles.map((article) => (
                <div className="col-md-4" key={article.url}>
                  <NewsItem 
                    title={article.title ? article.title.slice(0, 45) : ""} 
                    description={article.description ? article.description.slice(0, 88) : ""} 
                    imageUrl={article.urlToImage} 
                    newsUrl={article.url}
                    source={article.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
