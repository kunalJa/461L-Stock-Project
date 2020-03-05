import React from "react"
import Helmet from "react-helmet"

const Stockpage = () => (
  <>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Top 500 Stocks
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            News
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Company Info
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            About Us
          </a>
        </li>
      </ul>
    </nav>
    <h2 style={{ marginLeft: 45, marginTop: 15 }}>AMD</h2>
    <h3 style={{ marginLeft: 45 }}>$48.92</h3>
    <h4 style={{ marginLeft: 45 }}>Rating:</h4>
    <h4 style={{ marginLeft: 45 }}>High:</h4>
    <h4 style={{ marginLeft: 45 }}>Low:</h4>
    <h4 style={{ marginLeft: 45 }}>Industry</h4>
    <br></br>
    <h2 style={{ marginLeft: 15 }}>Recent News:</h2>
    <div class="card-deck" style={{ paddingLeft: 15, paddingRight: 15 }}>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="Top 500 Stocks">Top 500 Stocks</h5>
          <p class="card-text">
            Description: something like this is the S&P 500 or the top 500
            stocks by price or whatever
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Latest Stock News</h5>
          <p class="card-text">
            This card has supporting text below as a natural lead-in to
            additional content.
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Company Info</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  </>
)

export default Stockpage
