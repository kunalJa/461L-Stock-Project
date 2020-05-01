import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Navbar from "../components/Navbar"
import Card from "../components/Card"

import useScript from "../hooks/useScript"

import Carousel from 'nuka-carousel';

import './style.css'

	


const IndexPage = ({ data }) => {
	
	//useScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
	//useScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
	//useScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
	
  const news = data.allMongodbStockInformationNews.edges
  return (
    <>
      <Navbar />
      <div>
        <h1 className="home" style={{ marginLeft: 15, marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>
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
      <h2 className="home" style={{ marginTop: 45, marginLeft: 15, fontWeight: 'bold', textAlign: 'center'}}>
        Check out our Content!
      </h2>
	  
	  <div style={{ paddingLeft: 400, paddingRight: 400, marginBottom: 200 }}>
		<Carousel width="500px" enableKeyboardControls={true} wrapAround={true} heightMode="first" autoplay={true} autoplayInterval={2000}
			defaultControlsConfig={{
				nextButtonText: 'Next',
				prevButtonText: 'Back',
				pagingDotsStyle: {
				  fill: 'red'
				}
			  }}> 
			<img src="https://undervaluedequity.com/wp-content/uploads/2018/05/free-charts.jpg" />
			<img src="https://static9.depositphotos.com/1011646/1236/i/450/depositphotos_12369509-stock-photo-breaking-news-screen.jpg" />
			<img src="https://www.rockwellautomation.com/resources/images/rockwellautomation/publication/Chemical-Plant-Production-shutterstock_355435700--photograph_848w477h.jpg" />
		</Carousel>
	  </div>
	  
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
