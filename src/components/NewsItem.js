import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, source } = this.props;
    return (
      <div className="position-relative">
        {/* Source label */}
        <span className='news-item-source'>
          {source}
        </span>
        {/* News card */}
        <div className="card" style={{ width: "18rem" }}>
          <img 
            src={imageUrl || "https://assets3.cbsnewsstatic.com/hub/i/r/2024/09/08/655261d6-3f67-4793-970b-ca364cb83d0c/thumbnail/1200x630/40a0ea5066a9ec1c21cb14445fa30bcf/ap24252007029495.jpg?v=631cf5f2b4e8db7f9bc428589402864d"} 
            className="card-img-top" 
            alt={title || "News Image"} 
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Check</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
