import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Layout from "../components/layout"
import Slider from 'react-slick'

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsProduto.edges.map(({ node: produto }) => (
        <div key={produto.id} className="showcase__item">
          <figure className="card">
            <Link to={`/produtos/${produto.slug}`}>
                <Slider infinite={true} slidesToShow={1} arrows>
                    {produto.gallery.map(({ fluid }) => (
                    <img alt={produto.title} key={fluid.src} src={fluid.src} />
                    ))}
                </Slider>
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/produtos/${produto.slug}`}>{produto.title}</Link>
              </h6>
              <div className="card__description">
                <p>{produto.excerpt}</p>
                <p className="price"><strong>R$ {produto.price}</strong></p>
                <Link to={`/produtos/${produto.slug}`} className="buyButton">Detalhes</Link>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsProduto(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt,
          price,
          gallery {
              fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
              src
            }
          }
        }
      }
    }
  }
`
