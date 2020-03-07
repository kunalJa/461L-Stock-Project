import React from "react"
import Navbar from "../components/Navbar"

const Aboutpage = () => (
  <>
    <Navbar />
    <div>
      <h2 class="home" style={{ marginLeft: 15, marginTop: 15 }}>
        About Us
      </h2>
    </div>
    <br></br>
    <div class="card-group" style={{ padding: 15 }}>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Kunal Jain</h5>
          <p class="card-text">
            <br>Bio: I'm pretty much the smart one.</br>
            <br>Major/Track: ECE/Software Engineering</br>
            <br>Primary responsibilites: Backend development, database management, API management</br>
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Yulei Xu</h5>
          <p class="card-text">
            <br>Bio: Be happy with who you are. Even if no one else likes you, make sure you still like you.</br>
            <br>Major/Track: ECE/Software Engineering</br>
            <br>Primary responsibilites: Editor, CSS styling, frontend web design.</br>

          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Justin Liu</h5>
          <p class="card-text">
            <br>Bio: I'm just here doing things and stuff you know? Like stuff kind of things.</br>
            <br>Major/Track: ECE/Software Engineering. </br>
            <br>Primary responsibilites: Writing, CSS styling, frontend web design</br>
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
    <div class="card-group" style={{ padding: 15 }}>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Naveen Yarlagadda</h5>
          <p class="card-text">
            <br>Bio: My life goal is to one day have a mustache as glorious as my father's</br>
            <br>Major/Track: ECE/Software Engineering</br>
            <br>Primary responsibilites: Backend web design, database management</br>
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Bala Balasubramanian</h5>
          <p class="card-text">
            <br>Bio: Web development sure is.....it sure is.</br>
            <br>Major/Track: ECE/Software Engineering</br>
            <br>Primary responsibilites: Editor, backend web design</br>
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"></img>
        <div class="card-body">
          <h5 class="card-title">Jacob Poston</h5>
          <p class="card-text">
            <br>Bio: Just a kid that likes to make videos</br>
            <br>Major/Track: ECE/Software Engineering</br>
            <br>Primary responsibilites: Frontend structure design</br>
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  </>
)

export default Aboutpage
