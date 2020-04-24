import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

import './style.css'

const IndexPage = ({ data }) => {
  const news = data.allMongodbStockInformationNews.edges
  return (
    <>
      <Navbar />
      <div>
        <h1 class="home" style={{ marginLeft: 15, marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>
          Plumbing & Co. Finance
        </h1>
      </div>
      <div className="card-deck ml-3">
        <img
          style={{ float: "left" }}
          src={
            "https://ojjme2x5sm337cgpo2mhuny3-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/director-of-finance-640x230.jpg"
          }
          alt=""
        />
        <h1 className="ml-5" style={{ float: "left", width: "600px" }}>
          The stock market was doing great... <br />Click on our navigation links (above)
          to see information about each stock, industry, or related news!
        </h1>
      </div>
      <h2 class="home" style={{ marginTop: 45, marginLeft: 15, fontWeight: 'bold' }}>
        Check out our Content!
      </h2>
	  
	  <div id="carousel" class="carousel slide" data-ride="carousel" style={{ paddingLeft: 150, paddingRight: 150,}}>
	  <ol class="carousel-indicators">
		<li data-target="#carousel" data-slide-to="0" class="active"></li>
		<li data-target="#carousel" data-slide-to="1"></li>
		<li data-target="#carousel" data-slide-to="2"></li>
	  </ol>
	  <div class="carousel-inner">
		<div class="carousel-item active">
		  <div class="card text-white bg-dark mb-3">
			  <img class="card-img-top" src="https://undervaluedequity.com/wp-content/uploads/2018/05/free-charts.jpg" alt="Card image cap"></img>
			  <div class="card-body">
				<Link className="nav-link" to="/stocklanding">
				  <h5 class="card-title">Stocks</h5>
				  <p class="card-text">Click here to look through all stocks that we have available on our site featuring all S&P 500 stocks.</p>
				</Link>
			  </div>
			</div>
		</div>
		<div class="carousel-item">
		  <div class="card text-white bg-dark mb-3">
			  <img class="card-img-top" src="https://static9.depositphotos.com/1011646/1236/i/450/depositphotos_12369509-stock-photo-breaking-news-screen.jpg" height="300" alt="Card image cap"></img>
			  <div class="card-body">
				<Link className="nav-link" to="/newslanding">
				  <h5 class="card-title">News</h5>
				  <p class="card-text">Click here to get the latest news on S&P 500 stocks. Stay informed on what is going on with all the top stocks!</p>
				</Link>
			  </div>
			</div>
		</div>
		<div class="carousel-item">
		  <div class="card text-white bg-dark mb-3">
			  <img class="card-img-top" src="https://www.rockwellautomation.com/resources/images/rockwellautomation/publication/Chemical-Plant-Production-shutterstock_355435700--photograph_848w477h.jpg" height="300" alt="Card image cap"></img>
			  <div class="card-body">
				<Link className="nav-link" to="/industrylanding">
				  <h5 class="card-title">Industries</h5>
				  <p class="card-text">Click here to learn about what industries are trending upwards and what stocks are trending downhill.</p>
				</Link>
			  </div>
			</div>
		</div>
	  </div>
	  <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	  </a>
	  <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	  </a>
	  </div>
	  
	  <script>

	  </script>
      
	  
    </>
  )
}

export default IndexPage

export const newsTeslaResult = graphql`
  query teslaNews {
    allMongodbStockInformationNews(limit: 3) {
      edges {
        node {
          article {
            source_name
            news_url
            image_url
            text
            title
          }
        }
      }
    }
  }
`
