import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return ( 
    <Fragment>
      <Navbar />
      {/* Hero Image and Banner */}
      <header className="page-header">
        <div className="banner container">
          <div className="banner-caption">
            <h1>Empowering innovative brands at scale</h1>
            <p>
              GoBusiness empowers MSMEs for growth by connecting them to investors. This idea 
              supports UN SDG #1 - to end poverty by 2030. With GoBusiness, your enterprise
              growth is now on auto-pilot.
            </p>
            <div className="banner-cta">
              <Link to="/signup" className="btn btn-primary">Start NOW</Link>
              <Link to="/showcase" className="btn btn-reverse">Discover SMEs</Link> 
            </div>
          </div>
          <div className="banner-hero">
            <h1> Start Right</h1>
          </div>
        </div>
      </header>

      {/* <!-- SMEs --> */}
      <section className="section">
        <div className="section-title">SMEs Workflow</div>
        <div className="container">
          <div className="card-wrapper">
            
              <div className="card">
                <img src="./icons/sme-signup-process.svg" alt="" className="card-image"/>
                <h3 className="card-title">Signup</h3>
                <article className="card-caption0">
                  Get Started by Signing Up 
                </article>
                <div className="card-footer"></div>
              </div>
          
          
              <div className="card">
                <img src="./icons/sme-update-business-process.svg" alt="" className="card-image"/>
                <h3 className="card-title">Update Business</h3>
                <article className="card-caption0">
                  Update your business profile
                </article>
                <div className="card-footer"></div>
              </div>
          
          
              <div className="card">
                <img src="./icons/sme-req-seed-process.svg" alt="" className="card-image"/>
                <h3 className="card-title">Request Fund</h3>
                <article className="card-caption0">
                  Request for investment seed
                </article>
                <div className="card-footer"></div>
              </div>
        
          </div>
        </div>
      </section>

  {/* <!-- SMEs --> */}
      <section className="section" id="investors-process">
        <div className="section-title">Investors' Workflow</div>
        <div className="container">
          <div className="card-wrapper">
            
              <div className="card">
                <img src="./icons/funder-signup-process.svg" alt="" className="card-image"/>
                <h3 className="card-title">Signup</h3>
                <article className="card-caption0">
                  Start by creating an account 
                </article>
                <div className="card-footer"></div>
              </div>
          
          
              <div className="card">
                <img src="./icons/funder-view-sme-process.svg" alt="" className="card-image"/>
                <h3 className="card-title">Browse SMEs</h3>
                <article className="card-caption0">
                  view different SMEs and make your choice 
                </article>
                <div className="card-footer"></div>
              </div>
          
          
              <div className="card">
                <img src="./icons/funder-invest-process.svg" alt="" className="card-image" />
                <h3 className="card-title">Invest</h3>
                <article className="card-caption0">
                  Invest in selected SMEs 
                </article>
                <div className="card-footer"></div>
              </div>
        
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
   );
}
 
export default Home;