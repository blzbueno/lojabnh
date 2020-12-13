import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsProduto.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsProduto.title}</h1>
        <div className="product_column">
            <div className="sheet__slider">
                <Slider infinite={true} slidesToShow={1} arrows>
                    {data.datoCmsProduto.gallery.map(({ fluid }) => (
                    <img alt={data.datoCmsProduto.title} key={fluid.src} src={fluid.src} />
                    ))}
                </Slider>
            </div>
            <div className="sheet__lead">
                <p>{data.datoCmsProduto.excerpt}</p>
                <p className="price"><strong>R$ {data.datoCmsProduto.price}</strong></p>
                <Link to="#" className="buyButton">Comprar</Link>
            </div>
        </div>
        <hr />
        <div className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsProduto.descriptionNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query ProdutoQuery($slug: String!) {
    datoCmsProduto(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      price
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
