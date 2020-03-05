import React from "react"
import Helmet from "react-helmet"

const Stocklanding = () => (
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
    <div>
      <h2 class="home">Top 500 Stocks</h2>
    </div>
    <br></br>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </>
)

export default Stocklanding
