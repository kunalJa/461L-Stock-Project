import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const Aboutpage = () => {
  const [info, setInfo] = useState({ content: {} });
  useEffect(() => {
    const xhr2 = new XMLHttpRequest();
    xhr2.addEventListener('load', function () {
      const resp = JSON.parse(this.responseText);

      for (const node of resp.data.repository.collaborators.nodes) {
        const email = node.email
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
          const resp = JSON.parse(this.responseText);
          info.content = {
            ...info.content,
            [email]: resp,
          };
          setInfo({
            content: {
              ...info.content,
              [email]: resp,
            }
          });
        });
        xhr.open('POST', 'https://api.github.com/graphql');
        xhr.setRequestHeader('Authorization', `bearer ${process.env.PERSONAL_ACCESS_TOKEN}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        const t = JSON.stringify({
          query: `
            {
              repository(owner: "kunalJa", name: "461L-Stock-Project") {
                object(expression: "master") {
                  ... on Commit {
                    history (author : {emails: ["${email}"]} ) {
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
    xhr2.setRequestHeader('Authorization', `bearer ${process.env.PERSONAL_ACCESS_TOKEN}`);
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
    xhr2.send(t);
  }, []);

  let gitData = null;
  if (Object.keys(info.content).length) {
    gitData = {};
    for (const key of Object.keys(info.content)) {
      gitData[key] = info.content[key].data.repository.object.history.totalCount
    }
  }

  const people = [
    {
      "name": "Kunal Jain",
      "bio": `
        Bio: I am an Electrical and Computer Engineering student at the University of Texas at Austin.
        Major/Track: ECE/Software Engineering
        Primary responsibilites: Backend development, database management, API management
      `,
      "commitCount": gitData ? gitData['kunaljain@utexas.edu'] : ''
    },
    {
      "name": "Yulei Xu",
      "bio": `
        Bio: Be happy with who you are. Even if no one else likes you, make sure you still like you.
        Major/Track: ECE/Software Engineering
        Primary responsibilites: Backend development, database management, API management
      `,
      "commitCount": ''
    },
    {
      "name": "Justin Liu",
      "bio": `
        Bio: I'm just here doing things and stuff you know? Like stuff kind of things.
        Major/Track: ECE/Software Engineering
        Primary responsibilites: Writing, CSS styling, frontend web design
      `,
      "commitCount": ''
    },
    {
      "name": "Naveen Yarlagadda",
      "bio": `
        Bio: My life goal is to one day have a mustache as glorious as my father's
        Major/Track: ECE/Software Engineering
        Primary responsibilites: Backend development, database management, API management
      `,
      "commitCount": ''
    },
    {
      "name": "Balakumaran Balasubramanian",
      "bio": `
        Bio: Web development sure is.....it sure is.
        Major/Track: ECE/Software Engineering
        Primary responsibilites: Backend development, database management, API management
      `,
      "commitCount": gitData ? gitData['balakumaran55@gmail.com'] : ''
    },
    {
      "name": "Jacob Poston",
      "bio": `
        Bio: I am an honest man
        Major/Track: ECE/Software Engineering
        Primary responsibilites: Writing, CSS Styling, Frontend Design, Moral Support
      `,
      "commitCount": gitData ? gitData['jacob.poston.6@gmail.com'] : ''
    }
  ];

  return (
    <>
      <Navbar />
      <div>
        <h2 className="home" style={{ marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>
          About Us
        </h2>
      </div>
      <br />
      <div className="card-group" style={{ padding: 15 }}>
        {people.map(person => <PersonCard name={person.name} bio={person.bio} commitCount={person.commitCount} key={person.name} />)}
      </div>
    </>
  );
}

const PersonCard = ({ name, bio, commitCount }) => (
  <div className="card">
    <img className="card-img-top" src="..." alt="User Profile"></img>
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{bio}</p>
      <p>Commits: {commitCount}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
);

export default Aboutpage
