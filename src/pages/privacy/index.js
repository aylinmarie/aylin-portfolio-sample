import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Banner from '../../components/Banner'

import * as stylesheet from './Privacy.module.less';

const PrivacyPage = () => (
  <Layout>
    <SEO title="Privacy Policy" />
    <Banner>
      <h1>Privacy Policy</h1>
      <p className="h3">Last updated: August 2, 2020</p>
    </Banner>
    <section className={stylesheet.root}>
      <p>
        By visiting this site, you are consenting to the privacy policy of
        this site. Policies may be updated at any time. By using this site you
        acknowledge that it is your responsibility to review these policies
        and be aware of any modifications.
      </p>
      <p>
        Aylin Marie ("Aylin" or "I") operates the this website ("Site"). This
        page informs you of my policies and disclaimers regarding the
        collection, use and disclosure of Personal Information when you use my
        Site. I will not use or share your information with anyone except as
        described in this Privacy Policy. I use your Personal Information for
        providing and improving the Site. By using the Site, you agree to the
        collection and use of information in accordance with this policy.
        Unless otherwise defined in this Privacy Policy, terms used in this
        Privacy Policy have the same meanings as in my Terms and Conditions,
        accessible at AylinMarie.co. I may update my Privacy Policy from time
        to time. I will notify you of any changes by posting the new Privacy
        Policy on this page. You are advised to review this Privacy Policy
        periodically for any changes. Changes to this Privacy Policy are
        effective when they are posted on this page.
      </p>
      <h3>Information Collection and Use</h3>
      <p>
        While using my Site, I may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you. Personally identifiable information may include, but is
        not limited to, your name and email address ("Personal Information").
        I will collect and use personal information solely with the objective
        of fulfilling those purposes specified and for other compatible
        purposes, unless I obtain the consent of the individual concerned or
        as required by law. I will only retain personal information as long as
        necessary for the fulfillment of those purposes.
      </p>
      <h3>Cookies</h3>
      <p>
        Cookies are files with small amount of data, which may include an
        anonymous unique identifier. Cookies are sent to your browser from a
        web site and stored on your computer's hard drive. I use "cookies" to
        collect information. You can instruct your browser to refuse all
        cookies or to indicate when a cookie is being sent. However, if you do
        not accept cookies, you may not be able to use some portions of my
        Site. I also use these technologies to collect and store information
        when you interact with services I offer. My Google Analytics product
        helps us analyze the traffic to my website.
      </p>
      <h3>Security</h3>
      <p>
        The security of your Personal Information is important to me, but
        remember that no method of transmission over the Internet, or method
        of electronic storage is 100% secure. While I strive to use
        commercially acceptable means to protect your Personal Information, I
        cannot guarantee its absolute security.
      </p>
      <h3>External Links</h3>
      <p>
        This website contains links to other sites. Please be aware that I am
        not responsible for the content or privacy practices of such other
        sites. I encourage you to be aware when you leave my site and to read
        the privacy statements of any other site that collects personally
        identifiable information.
      </p>
      <p>
        Contact If you have any questions about the Terms and Conditions or
        Privacy Policy,{' '}
        <a href="mailto:hello@aylinmarie.co" target="_blank" rel="noreferrer">
          please contact me
        </a>
        .
      </p>
    </section>
  </Layout>
)

export default PrivacyPage
