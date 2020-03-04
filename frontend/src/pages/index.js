import React from "react"
import Helmet from "react-helmet"

const IndexPage = () => (
  <>
    <Helmet>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
    </Helmet>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Top 500 Stocks</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">News</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Company Info</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About Us</a>
            </li>
        </ul>
    </nav>
    <div>
	      <h1 class="home" style={{marginLeft: 15, marginTop: 15}}>Whatever we call our website</h1>
    </div>
    <br></br>
    <div class="card-deck" style={{padding: 15}}>
      <div class="card">
          <img class="card-img-top" src="..." alt="Card image cap"></img>
          <div class="card-body">
              <h5 class="Top 500 Stocks">Top 500 Stocks</h5>
              <p class="card-text">Description: something like this is the S&P 500 or the top 500 stocks by price or whatever</p>
          </div>
          <div class="card-footer">
              <small class="text-muted">Last updated 3 mins ago</small>
          </div>
      </div>
      <div class="card">
          <img class="card-img-top" src="..." alt="Card image cap"></img>
          <div class="card-body">
              <h5 class="card-title">Latest Stock News</h5>
              <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
              <small class="text-muted">Last updated 3 mins ago</small>
          </div>
      </div>
      <div class="card">
          <img class="card-img-top" src="..." alt="Card image cap"></img>
          <div class="card-body">
              <h5 class="card-title">Company Info</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
              <small class="text-muted">Last updated 3 mins ago</small>
          </div>
      </div>
    </div>
  </>
)

export default IndexPage
