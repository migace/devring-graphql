import gql from "graphql-tag";
import styled from "styled-compoentns"
import { graphql } from "react-apollo";

function App({ data: { allPosts = [] } }) {
  return (
    <div className="App">
      <h1>Posts:</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        
          {allPosts.length > 0 && (
            <tbody>
            {allPosts.map(({ id, title, body }) => (
              <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{body}</td>
                </tr>
              ))}
              </tbody>
          )}
        
      </table>
    </div>
  );
}

const GET_POSTS = gql`
  query {
    allPosts {
      id,
      body
    }
  }
`;


const h1 = styled.h1`
  width: 100px;
`;

export default graphql(GET_POSTS)(App);
