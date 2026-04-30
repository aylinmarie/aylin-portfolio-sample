import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid';

import Header from "./header"
import '../styles/global.less'
import * as stylesheet from "./layout.module.less"

const Layout = ({ children }) => {

  return (
    <div className={stylesheet.root}>
      <Header />
      <div>
        <main className={stylesheet.main}>{children}</main>
        <footer>
          <Grid container justify="space-between"
            alignItems="center">
            <Grid item>
              <strong>Contact Me</strong>
              <p>hello@aylinmarie.co</p>
            
              <strong>Social</strong>
              <a href="https://twitter.com/aylin_marie" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://www.instagram.com/aylinmcg/" target="_blank" rel="noreferrer">Instagram</a>
            </Grid>
            <Grid item>
              <Link
                to="/privacy"
              >
          Privacy Policy
              </Link>
              <p>© {new Date().getFullYear()} aylin marie</p>
            </Grid>
          </Grid>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
