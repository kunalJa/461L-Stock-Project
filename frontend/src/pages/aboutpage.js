import React, {useEffect, useState} from "react"
import Navbar from "../components/Navbar"

const Aboutpage = () => {
  const [respy, setResp] = useState({});
  useEffect(() => {
    const xhr2 = new XMLHttpRequest();
    xhr2.addEventListener('load', function () {
      const resp = JSON.parse(this.responseText);

      for (const node of resp.data.repository.collaborators.nodes) {
        const email = node.email
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
          const resp = JSON.parse(this.responseText);
          respy[email] = resp;
          setResp(respy);
        });
        xhr.open('POST', 'https://api.github.com/graphql');
        xhr.setRequestHeader('Authorization', 'bearer 9dec6f3f6c84fa4dc8b400b8854a54d06a5d9e8c');
        xhr.setRequestHeader('Content-Type', 'application/json');
        const t = JSON.stringify({
          query: `
            {
              repository(owner: "kunalJa", name: "461L-Stock-Project") {
                object(expression: \"master\") {
                  ... on Commit {
                    history (author : {emails: [\"${email}\"]} ) {
                      edges {
                        node {
                          messageHeadline
                          oid
                          message
                          author {
                              name
                              email
                              date
                          }
                        }
                      }
                      totalCount
                    }
                  }
                }                
              }
            }`
        });
        xhr.send(t);
      }
    });
    xhr2.open('POST', 'https://api.github.com/graphql');
    xhr2.setRequestHeader('Authorization', 'bearer 9dec6f3f6c84fa4dc8b400b8854a54d06a5d9e8c');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    const t = JSON.stringify({
      query: `
        {
          repository(owner: "kunalJa", name: "461L-Stock-Project") {         
            issues {
              totalCount
            }
            collaborators {
              nodes {
                name
                email
              }
              totalCount
            }
          }
        }`
    });
    console.log(t)
    xhr2.send(t);
  }, []);

  let happy = null;
  console.log('hi');
  console.log(Object.getOwnPropertyNames(respy).length);
  if (Object.getOwnPropertyNames(respy).length) {
    happy = {};
    for (const key in Object.getOwnPropertyNames(respy)) {
      happy[key] = respy[key].data.repository.object.history.totalCount
    }
  }
  console.log(happy);


  return (
    <>
      <Navbar />
      <div>
        <h2 className="home" style={{ marginLeft: 15, marginTop: 15 }}>
          About Us
        </h2>
      </div>
      <br />
      <div className="card-group" style={{ padding: 15 }}>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Kunal Jain</h5>
            <p className="card-text">
              Bio: I'm pretty much the smart one.<br />
              Major/Track: ECE/Software Engineering<br />
              Primary responsibilites: Backend development, database management, API management<br />
            </p>
            <p>Commits: {happy ? happy['kunaljain@utexas.edu'] : ''}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Yulei Xu</h5>
            <p className="card-text">
              Bio: Be happy with who you are. Even if no one else likes you, make sure you still like you.<br />
              Major/Track: ECE/Software Engineering<br />
              Primary responsibilites: Editor, CSS styling, frontend web design.<br />
            </p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Justin Liu</h5>
            <p className="card-text">
              Bio: I'm just here doing things and stuff you know? Like stuff kind of things.<br />
              Major/Track: ECE/Software Engineering. <br />
              Primary responsibilites: Writing, CSS styling, frontend web design<br />
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div className="card-group" style={{ padding: 15 }}>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Naveen Yarlagadda</h5>
            <p className="card-text">
              Bio: My life goal is to one day have a mustache as glorious as my father's<br />
              Major/Track: ECE/Software Engineering<br />
              Primary responsibilites: Backend web design, database management<br />
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Bala Balasubramanian</h5>
            <p className="card-text">
              Bio: Web development sure is.....it sure is.<br />
              Major/Track: ECE/Software Engineering<br />
              Primary responsibilites: Editor, backend web design<br />
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Jacob Poston</h5>
            <p className="card-text">
              Bio: Just a kid that likes to make videos<br />
              Major/Track: ECE/Software Engineering<br />
              Primary responsibilites: Frontend structure design<br />
            </p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Jacob Poston</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutpage
