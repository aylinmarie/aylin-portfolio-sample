import React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Grid from '@material-ui/core/Grid';

import Layout from "../components/layout"
import Button from "../components/Button"
import SEO from "../components/seo"
import stylesheet from './home/Home.module.less';

// Section Illustrations
import accent0 from '../images/travel_accent.svg';
import accent1 from '../images/portfolio_accent_1.svg';
import accent2 from '../images/portfolio_accent_2.svg';

const IndexPage = ({ data }) => {
  const { mainPic, portfolioPic, portfolioPic2, travelPic } = data;

  return (
    <Layout>
      <SEO title="Home" />
      <section id="intro" className={stylesheet.intro}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={5}>
            <h1>Merhaba, I'm Aylin</h1>
            <p className="caption">I'm an Atlanta based designer and developer who loves creating clean and minimal designs.</p>
            <Button type="primary" href="/about">About Me</Button>
          </Grid>
          <Grid item xs={12} sm={7}>
            <GatsbyImage image={getImage(mainPic)} alt="Headshot of Aylin" />
          </Grid>
        </Grid>
      </section>

      <section id="travel" className={stylesheet.portfolio}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={7}>
            <GatsbyImage image={getImage(portfolioPic)} alt="Camille Simone brand desktop view" />
            <GatsbyImage image={getImage(portfolioPic2)} alt="Camille Simone brand mobile view" />
          </Grid>
          <Grid item xs={12} sm={5}>
            <h2>Portfolio</h2>
            <p className="caption">My work in design and development</p>
            <Button type="primary" href="/portfolio">My Work</Button>
            <img className={stylesheet.accent0} src={accent0} alt="" />
          </Grid>
        </Grid>
      </section>

      <section id="portfolio" className={stylesheet.travel}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={5}>
            <h2>Travel</h2>
            <p className="caption">A few snapshots of where I've been</p>
            <Button type="primary"
              href="https://vsco.co/aylin-marie/journal/p/1" target="_blank" rel="noreferrer">Travel Journal</Button>
            <img className={stylesheet.accent1} src={accent1} alt="" />
          </Grid>
          <Grid item xs={12} sm={7}>
            <GatsbyImage image={getImage(travelPic)} alt="Winslow building in Helsinki, Finland" />
            <img className={stylesheet.accent2} src={accent2} alt="" />
          </Grid>
        </Grid>
      </section>
    </Layout>
  )}

export default IndexPage

export const HomeQuery = graphql`
query HomeQuery {
  mainPic: file(relativePath: {eq: "pic_main.jpg"}) {
    id
    base
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }

  portfolioPic: file(relativePath: {eq: "portfolio_preview1.png"}) {
    id
    base
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }

  portfolioPic2: file(relativePath: {eq: "portfolio_preview2.png"}) {
    id
    base
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }

  travelPic: file(relativePath: {eq: "travel_main.jpg"}) {
    id
    base
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
}
`
