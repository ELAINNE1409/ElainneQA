import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';

export class MemberPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getUserName() {
    return this.props.match.params.username;
  }

  render() {
    const username = this.getUserName();
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header
            title="Domain-Driven Designers"
            subtitle="Where awesome Domain-Driven Designers are made"
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '50px',
              width: '100%' // Increase the width to prevent text wrapping
            }}
          >
            <div style={{ flex: 1, marginRight: '10px' }}>
              <h1
                style={{
                  fontWeight: 'bold',
                  color: 'green',
                  textAlign: 'justify',
                  marginBottom: '20px' // Add margin at the bottom for vertical spacing
                }}
              >
                User Details
              </h1>
              <br />
              <h2
                style={{
                  textAlign: 'justify',
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                  wordSpacing: '2px',
                  marginBottom: '10px' // Add margin at the bottom for vertical spacing
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Username: </span>
                {username}
              </h2>
              <h2
                style={{
                  textAlign: 'justify',
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                  wordSpacing: '2px',
                  marginBottom: '10px' // Add margin at the bottom for vertical spacing
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Number of Posts: </span>{' '}
                test
              </h2>
              <h2
                style={{
                  textAlign: 'justify',
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                  wordSpacing: '2px',
                  marginBottom: '10px' // Add margin at the bottom for vertical spacing
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Number of Comments: </span>{' '}
                test
              </h2>
              <br />
            </div>

            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontWeight: 'bold',
                  color: 'green',
                  textAlign: 'justify',
                  marginBottom: '20px' // Add margin at the bottom for vertical spacing
                }}
              >
                User With Most Comments
              </h1>
              <br />
              <h2
                style={{
                  textAlign: 'justify',
                  fontWeight: 'normal',
                  whiteSpace: 'normal',
                  wordSpacing: '20px',
                  marginBottom: '10px' // Add margin at the bottom for vertical spacing
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Username: </span> test
              </h2>
              <h2
                style={{
                  textAlign: 'justify',
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                  wordSpacing: '2px',
                  marginBottom: '10px'
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Number of Comments: </span>{' '}
                test
              </h2>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default MemberPage;
