import React from "react"
import Helmet from "react-helmet"

const Newslanding = () => (
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
	    <h2 class="home" style={{marginLeft: 15, marginTop: 15}}>Latest Stock News</h2>
    </div>
    <br></br>
    <div class="card-columns" style={{paddingLeft: 15, paddingRight: 15}}>
        <div class="card">
            <img class="card-img-top" src="..." alt="Card image cap"></img>
            <div class="card-body">
                <h5 class="card-title">Card title that wraps to a new line</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="card p-3">
            <blockquote class="blockquote mb-0 card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">
                    <small class="text-muted">Someone famous in <cite title="Source Title">Source Title</cite></small>
                </footer>
            </blockquote>
        </div>
        <div class="card">
            <img class="card-img-top" src="..." alt="Card image cap"></img>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div class="card bg-primary text-white text-center p-3">
            <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                <footer class="blockquote-footer">
                    <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                </footer>
            </blockquote>
        </div>
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div class="card">
            <img class="card-img" src="..." alt="Card image"></img>
        </div>
        <div class="card p-3 text-right">
            <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">
                    <small class="text-muted">Someone famous in <cite title="Source Title">Source Title</cite></small>
                </footer>
            </blockquote>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</>
)

export default Newslanding