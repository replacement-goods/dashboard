import { graphql } from "gatsby"
import React from "react"
import withLocation from '../components/withLocation';

class IndexComponent extends React.Component {
  render() {
    const userId = this.props.search.user_id;
    if (!userId) {
      return;
    }
    const data = this.props.data.allContributionsCsv.edges;
    const cleanData = data.filter((row) => row.node.Referrer_ID === userId);
    let total = 0;
    cleanData.map((row) => {
      total += Number(row.node.Amount.replace(/[^0-9.-]+/g,""));
    });
    return (
      <div style={{ maxWidth: '1024px', width: 'calc(100% - 50px)', margin: '0 auto' }}>
        <p>You've earned {`$${total.toFixed(2)}`} to date, worth {total / 2} shares.</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Referrer</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Shares Earned</th>
            </tr>
          </thead>
          <tbody>
            {cleanData.map((row, i) => (
              <tr key={`${row.node.Pledge_ID} ${i}`}>
                <td>{row.node.Pledge_ID}</td>
                <td>{row.node.Referrer_ID}</td>
                <td>{row.node.Name}</td>
                <td>{row.node.Amount}</td>
                <td>{Number(row.node.Amount.replace(/[^0-9.-]+/g,"")) / 2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default withLocation(IndexComponent);

export const IndexQuery = graphql`
  query {
    allContributionsCsv {
      edges {
        node {
          Name
          Pledge_ID
          Referrer_ID
          Amount
        }
      }
    }
  }
`