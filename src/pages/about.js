import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from "../components/layout"

const About = ({ data: { sobre } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={sobre.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{sobre.title}</h1>
        <p className="sheet__lead">{sobre.subtitle}</p>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: sobre.bioNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query SobreQuery {
    sobre: datoCmsSobre {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
