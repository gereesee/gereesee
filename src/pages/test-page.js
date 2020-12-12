import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/common/Layout";

export default function TestPage({data}) {
  console.log(data);
  return (
    <Layout>
      <h1>My Site's files</h1>
      <table>
        <tbody>
        <tr>
          <th>relativePath</th>
          <th>birthTime</th>
          <th>base</th>
        </tr>
        { data.allFile.edges.map(({node}, index) => (
          <tr key={index}>
            <td>{node.relativePath}</td>
            <td>{node.birthTime}</td>
            <td>{node.base}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(sort: {fields: base, order: DESC}) {
      edges {
        node {
          relativePath
          birthTime(formatString: "YYYY-MM-DD")
          base
        }
      }
    }
  }
`