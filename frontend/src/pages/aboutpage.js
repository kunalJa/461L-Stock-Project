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
        const login = node.login
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
          const resp = JSON.parse(this.responseText);
          info.content = {
            ...info.content,
            [email]: resp,
            [login]: resp,
          };
          setInfo({
            content: {
              ...info.content,
              [email]: resp,
              [login]: resp,
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
              user(login: "${login}") {
                avatarUrl
                bio
                issues {
                  totalCount
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
                login
                email
              }
              totalCount
            }
          }
        }`
    });
    xhr2.send(t);
  }, []);

  let commitCounts = null;
  let avatars = null;
  let bio = null;
  let issues = null;
  console.log(info);
  if (Object.keys(info.content).length) {
    commitCounts = {};
    avatars = {};
    bio = {};
    issues = {};
    for (const key of Object.keys(info.content)) {
      commitCounts[key] = info.content[key].data.repository.object.history.totalCount
      avatars[key] = info.content[key].data.user.avatarUrl
      bio[key] = info.content[key].data.user.bio
      issues[key] = info.content[key].data.user.issues.totalCount
    }
  }

  const group1 = [
    {
      "name": "Kunal Jain",
      "bio": bio ? bio['kunaljain@utexas.edu'] : '',
      "major": "Major/Track: ECE/Software Engineering",
      "responsibilities": "Backend development, database management, API management",
      "commitCount": commitCounts ? commitCounts['kunaljain@utexas.edu'] : '',
      "avatar": avatars ? avatars['kunaljain@utexas.edu'] : '',
      "issues": issues ? issues['kunaljain@utexas.edu'] : ''
    },
    {
      "name": "Yulei Xu",
      "bio": bio ? bio['yuleixu@utexas.edu'] : '',
      "major": "Major/Track: ECE/Software Engineering",
      "responsibilities": "Backend development, database management, API management",
      "commitCount": commitCounts ? commitCounts['yuleixu@utexas.edu'] : '',
      "avatar": avatars ? avatars['yuleixu@utexas.edu'] : '',
      "issues": issues ? issues['yuleixu@utexas.edu'] : '',
    },
    {
      "name": "Justin Liu",
      "bio": bio ? bio['justin.jac.liu@utexas.edu'] : '',
      "major": "Major/Track: ECE/Software Engineering",
      "responsibilities": "Backend development, database management, API management",
      "commitCount": commitCounts ? commitCounts['justin.jac.liu@utexas.edu'] : '',
      "avatar": avatars ? avatars['justin.jac.liu@utexas.edu'] : '',
      "issues": issues ? issues['justin.jac.liu@utexas.edu'] : '',
    }
  ];
  const group2 = [
    {
      "name": "Naveen Yarlagadda",
      "bio": bio ? bio['nyar99@gmail.com'] : '',
      "major": "Major/Track: ECE/Software Engineering",
      "responsibilities": "Backend development, database management, API management",
      "commitCount": commitCounts ? commitCounts['nyar99@gmail.com'] : '',
      "avatar": avatars ? avatars['nyar99@gmail.com'] : '',
      "issues": issues ? issues['nyar99@gmail.com'] : '',
    },
    {
      "name": "Balakumaran Balasubramanian",
      "bio": bio ? bio['balakumaran55@gmail.com'] : '',
      "major": "Major/Track: ECE/Software Engineering",
      "responsibilities": "Backend development, database management, API management",
      "commitCount": commitCounts ? commitCounts['balakumaran55@gmail.com'] : '',
      "avatar": avatars ? avatars['balakumaran55@gmail.com'] : '',
      "issues": issues ? issues['balakumaran55@gmail.com'] : '',
    },
    {
      "name": "Jacob Poston",
      "bio": "I am an honest man",
      "major": "Major/Track: ECE/Software Engineering",
      "responsibilities": "Primary responsibilites: Writing, CSS Styling, Frontend Design, Moral Support",
      "commitCount": commitCounts ? commitCounts['jacob.poston.6@gmail.com'] : '',
      "avatar": avatars ? avatars['jacob.poston.6@gmail.com'] : '',
      "issues": issues ? issues['jacob.poston.6@gmail.com'] : '',
    }
  ];

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
        {group1.map(person => <PersonCard avatar={person.avatar} name={person.name} bio={person.bio} major={person.major} responsibilities={person.responsibilities} commitCount={person.commitCount} issues={person.issues} key={person.name} />)}
      </div>
      <div className="card-group" style={{ padding: 15 }}>
        {group2.map(person => <PersonCard avatar={person.avatar} name={person.name} bio={person.bio} major={person.major} responsibilities={person.responsibilities} commitCount={person.commitCount} issues={person.issues} key={person.name} />)}
      </div>
    </>
  );
}

const PersonCard = ({ avatar, name, bio, major, responsibilities, commitCount, issues}) => (
  <div className="card">
    <img className="card-img-top" src={avatar} alt="Card image cap"></img>
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{bio}</p>
      <p>{major}</p>
      <p>{responsibilities}</p>
      <p>Commits: {commitCount}</p>
      <p>Issues: {issues}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
);

export default Aboutpage

