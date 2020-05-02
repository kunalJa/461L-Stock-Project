import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function getGitQuery(email, login) {
  const t = JSON.stringify({
    query: `
      {
        repository(owner: "kunalJa", name: "461L-Stock-Project") {
          issues {
            totalCount
          }

          object(expression: "master") {
            ... on Commit {
              total: history {
                totalCount
              }
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
      }`,
  })
  return t
}

function getGitEmails() {
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
      }`,
  })
  return t
}

function sendGitRequest(email, login, info, setInfo) {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", function() {
    const resp = JSON.parse(this.responseText)
    info.content = {
      ...info.content,
      [email]: resp,
      [login]: resp,
    }
    setInfo({
      content: {
        ...info.content,
        [email]: resp,
        [login]: resp,
      },
    })
  })
  xhr.open("POST", "https://api.github.com/graphql")
  xhr.setRequestHeader(
    "Authorization",
    `bearer ${process.env.GATSBY_PERSONAL_ACCESS_TOKEN}`
  )
  xhr.setRequestHeader("Content-Type", "application/json")
  let query = getGitQuery(email, login)
  xhr.send(query)
}

function requestEmails(info, setInfo) {
  const xhr2 = new XMLHttpRequest()
  xhr2.addEventListener("load", function() {
    const resp = JSON.parse(this.responseText)
    for (const node of resp.data.repository.collaborators.nodes) {
      const email = node.email
      const login = node.login
      sendGitRequest(email, login, info, setInfo)
    }
  })
  xhr2.open("POST", "https://api.github.com/graphql")
  xhr2.setRequestHeader(
    "Authorization",
    `bearer ${process.env.GATSBY_PERSONAL_ACCESS_TOKEN}`
  )
  xhr2.setRequestHeader("Content-Type", "application/json")
  let query = getGitEmails()
  xhr2.send(query)
}

const Aboutpage = () => {
  const [info, setInfo] = useState({ content: {} })
  useEffect(() => {
    requestEmails(info, setInfo)
  }, [])

  let commitCounts = null
  let avatars = null
  let bio = null
  let issues = null
  let totalIssues = null
  let totalCommits = null
  console.log(info)
  if (Object.keys(info.content).length) {
    commitCounts = {}
    avatars = {}
    bio = {}
    issues = {}
    for (const key of Object.keys(info.content)) {
      commitCounts[key] =
        info.content[key].data.repository.object.history.totalCount
      avatars[key] = info.content[key].data.user.avatarUrl
      bio[key] = info.content[key].data.user.bio
      issues[key] = info.content[key].data.user.issues.totalCount
      totalIssues = info.content[key].data.repository.issues.totalCount
      totalCommits = info.content[key].data.repository.object.total.totalCount
    }
  }

  const group1 = [
    {
      name: "Kunal Jain",
      bio: bio ? bio["kunaljain@utexas.edu"] : "",
      major: "Major/Track: ECE/Software Engineering",
      responsibilities:
        "Backend development, database management, API management",
      commitCount: commitCounts ? commitCounts["kunaljain@utexas.edu"] : "",
      avatar: avatars ? avatars["kunaljain@utexas.edu"] : "",
      issues: issues ? issues["kunaljain@utexas.edu"] : "",
    },
    {
      name: "Yulei Xu",
      bio: bio ? bio["yuleixu@utexas.edu"] : "",
      major: "Major/Track: ECE/Software Engineering",
      responsibilities:
        "Backend development, database management, API management",
      commitCount: commitCounts ? commitCounts["yuleixu@utexas.edu"] : "",
      avatar: avatars ? avatars["yuleixu@utexas.edu"] : "",
      issues: issues ? issues["yuleixu@utexas.edu"] : "",
    },
    {
      name: "Justin Liu",
      bio: bio ? bio["justin.jac.liu@utexas.edu"] : "",
      major: "Major/Track: ECE/Software Engineering",
      responsibilities:
        "Backend development, database management, API management",
      commitCount: commitCounts
        ? commitCounts["justin.jac.liu@utexas.edu"]
        : "",
      avatar: avatars ? avatars["justin.jac.liu@utexas.edu"] : "",
      issues: issues ? issues["justin.jac.liu@utexas.edu"] : "",
    },
  ]
  const group2 = [
    {
      name: "Naveen Yarlagadda",
      bio: bio ? bio["nyar99@gmail.com"] : "",
      major: "Major/Track: ECE/Software Engineering",
      responsibilities:
        "Backend development, database management, API management",
      commitCount: commitCounts ? commitCounts["nyar99@gmail.com"] : "",
      avatar: avatars ? avatars["nyar99@gmail.com"] : "",
      issues: issues ? issues["nyar99@gmail.com"] : "",
    },
    {
      name: "Balakumaran Balasubramanian",
      bio: bio ? bio["balakumaran55@gmail.com"] : "",
      major: "Major/Track: ECE/Software Engineering",
      responsibilities:
        "Backend development, database management, API management",
      commitCount: commitCounts ? commitCounts["balakumaran55@gmail.com"] : "",
      avatar: avatars ? avatars["balakumaran55@gmail.com"] : "",
      issues: issues ? issues["balakumaran55@gmail.com"] : "",
    },
    {
      name: "Jacob Poston",
      bio: "I am an honest man",
      major: "Major/Track: ECE/Software Engineering",
      responsibilities:
        "Primary responsibilites: Writing, CSS Styling, Frontend Design, Moral Support",
      commitCount: commitCounts ? commitCounts["jacob.poston.6@gmail.com"] : "",
      avatar: avatars ? avatars["jacob.poston.6@gmail.com"] : "",
      issues: issues ? issues["jacob.poston.6@gmail.com"] : "",
    },
  ]

  return (
    <>
      <Navbar />
      <div>
        <h2
          className="home"
          style={{ marginTop: 15, fontWeight: "bold" }}
          align="center"
        >
          {" "}
          About Us{" "}
        </h2>
      </div>
      <br />
      <div className="card-group" style={{ padding: 15 }}>
        {group1.map(person => (
          <PersonCard
            avatar={person.avatar}
            name={person.name}
            bio={person.bio}
            major={person.major}
            responsibilities={person.responsibilities}
            commitCount={person.commitCount}
            issues={person.issues}
            key={person.name}
          />
        ))}
      </div>
      <div className="card-group" style={{ padding: 15 }}>
        {group2.map(person => (
          <PersonCard
            avatar={person.avatar}
            name={person.name}
            bio={person.bio}
            major={person.major}
            responsibilities={person.responsibilities}
            commitCount={person.commitCount}
            issues={person.issues}
            key={person.name}
          />
        ))}
      </div>
      <div>
        <h2 className="home" style={{ marginTop: 15 }} align="center">
          {" "}
          Our Motivation{" "}
        </h2>
      </div>
      <p style={{ marginLeft: 150, marginRight: 150 }} align="left | right">
        The primary goal for developing this website was twofold: a topic out of
        learning interest, and of self interest. For the former, many of us
        found stocks as a fascinating subject, with many broad elements to learn
        from. Data is rich, multiple APIs provide extremely detailed data about
        the subject, and graphical elements to track individual stocks were
        necessary. The tracking website seemed like an interesting challenge
        with real world application. Our application keeps things simple for its
        users. You see exactly all the pertinent information for a casual
        trader, and can stay informed on the ratings and performances of stocks
        based on the opinions of those who know more than you.
      </p>
      <div>
        <h2
          className="home"
          style={{ marginTop: 15, fontWeight: "bold" }}
          align="center"
        >
          {" "}
          Data{" "}
        </h2>
      </div>
      <p style={{ marginLeft: 150, marginRight: 150 }} align="left | right">
        The intention of the application is to serve as a central hub for stocks
        and financial information. We have three models of interest: stocks,
        industries/sectors, and financial news. Users that are interested in
        learning about stocks can do so from a variety of sources. Stocks are
        intrinsically linked with the industries and sectors that they are
        associated with, and we have also created financial news that is sector
        oriented as well. Financial news is useful to users as well, so that
        they can get a general sentiment of how the stock market is performing
        overall. We provide that in a news tab that users can access which will
        contain news information both about the stocks that we serve and about
        the market as a whole.
        <br />
        Our stock information comes from a free API called financial modeling
        prep. This website comes with very rich information about each stock,
        including volume, high, low, close, and start for each day going back
        five years. We only grab some of this information, including name,
        industry, sector, and image for each stock. We also grab all the close
        price data for the last few years in order to create a graph. The news
        information comes from an api called stock news api. It allows us to
        grab news about stocks by tickers, company, or by sector/industry. We
        use these results to associate news objects for both stocks and sectors
        which are stored as well as separate models. The news objects are also
        rich in information. One piece of information that we use from our API
        is a general sentiment of each article. We also grab sector for each
        article, companies associated, and tickers associated. We use this
        information to gauge whether the outlook on specific sectors and
        industries is positive, negative, or neutral.
      </p>
      <div>
        <h2
          className="home"
          style={{ marginTop: 15, fontWeight: "bold" }}
          align="center"
        >
          {" "}
          Tools{" "}
        </h2>
      </div>
      <p style={{ marginLeft: 150, marginRight: 150 }} align="left | right">
        Our website was created on Gatsby, which is a React framework for
        creating static web applications. This works well for our application
        because we only have three models we need to serve. Each instance of our
        model swaps out data, so we simply created templates for our stock page
        and our industry page, which are configured based on the database
        information for whatever stock is being served. We also use GraphQL to
        manipulate and grab our data. For example, the graph on each stock page
        is created in GraphQL using information in the database. The database is
        maintained on MongoDB and populated using a Python script. The Python
        script accesses two separate APIs that work together to synthesize
        instances of three different models which are stored in the database
        under different collections. It is this data that is then manipulated by
        Gatsby to create our webpages.
      </p>
      <div>
        <h2
          className="home"
          style={{ marginTop: 15, fontWeight: "bold" }}
          align="center"
        >
          {" "}
          Team Stats{" "}
        </h2>
      </div>
      <p style={{ fontSize: 20 }} align="center">
        Total Commits: {totalCommits}
      </p>
      <p style={{ fontSize: 20 }} align="center">
        Total Issues: {totalIssues}
      </p>
      <p style={{ fontSize: 20 }} align="center">
        Link to <a href="https://github.com/kunalJa/461L-Stock-Project">Repo</a>
      </p>
    </>
  )
}

const PersonCard = ({
  avatar,
  name,
  bio,
  major,
  responsibilities,
  commitCount,
  issues,
}) => (
  <div className="card text-white bg-dark mb-3">
    <img className="card-img-top" src={avatar} alt="" />
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{bio}</p>
      <p>{major}</p>
      <p>{responsibilities}</p>
      <p>Commits: {commitCount}</p>
      <p>Open/Closed Issues: {issues}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted"></small>
    </div>
  </div>
)

export default Aboutpage
