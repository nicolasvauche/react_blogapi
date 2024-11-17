import React from 'react'
import PropTypes from 'prop-types'
import './ArticlesList.scss'

const ArticlesList = ({ articles }) => {
  if (articles.length === 0) {
    return <p>Aucun article disponible dans cette catégorie.</p>
  }

  return (
    <ul className='articles-list'>
      {articles.map(article => (
        <li key={article.id}>
          <a href={`/posts/${article.slug}`}>{article.title}</a>
        </li>
      ))}
    </ul>
  )
}

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ).isRequired
}

export default ArticlesList
