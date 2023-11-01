import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import { BackNavigation } from '../shared/components/header';
import { User } from '../modules/users/models/user';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as 'column', // Specify the correct type
  alignItems: 'center',
  marginTop: '5px'
};

const columnContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start'
};

const columnStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 30px'
};

const separatorStyle: React.CSSProperties = {
  borderRight: '2px solid #000' // Add a right border to separate the columns
};

const sectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '50px'
};

const labelStyle: React.CSSProperties = {
  textAlign: 'justify',
  fontWeight: 'normal' as 'normal', // Specify the correct type
  fontFamily: 'Roboto Mono',
  fontSize: '25px',
  whiteSpace: 'nowrap',
  wordSpacing: '2px',
  marginBottom: '10px',
  marginRight: '10px'
};

const textStyle: React.CSSProperties = {
  whiteSpace: 'nowrap' as 'nowrap', // Specify the correct type
  wordSpacing: '2px',
  textAlign: 'justify',
  fontFamily: 'Roboto Mono',
  fontSize: '25px',
  //marginLeft: '10px',
  marginBottom: '10px'
};

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
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation text="Back to the main page" to="/" />
        </div>

        <div style={containerStyle}>
          <div style={sectionStyle}>
            <div style={{ ...columnContainerStyle, ...separatorStyle }}>
              <div style={columnStyle}>
                <h1
                  style={{
                    ...labelStyle,
                    fontFamily: 'Roboto Mono',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    marginBottom: '20px',
                    marginRight: '20px'
                  }}
                >
                  User Details
                </h1>
                <br />
                <h2
                  style={{
                    ...labelStyle,
                    ...textStyle,
                    fontFamily: 'Roboto Mono',
                    marginRight: '20px'
                  }}
                >
                  <span style={labelStyle}>
                    <strong>Username:</strong>{' '}
                  </span>
                  {username}
                </h2>
                <h2
                  style={{
                    ...labelStyle,
                    ...textStyle,
                    fontFamily: 'Roboto Mono'
                  }}
                >
                  <span style={labelStyle}>
                    <strong>Number of Posts:</strong>{' '}
                  </span>
                  test
                </h2>
                <h2
                  style={{
                    ...labelStyle,
                    ...textStyle,
                    fontFamily: 'Roboto Mono',
                    marginBottom: '20px'
                  }}
                >
                  <span style={labelStyle}>
                    <strong>Number of Comments:</strong>{' '}
                  </span>
                  test
                </h2>
              </div>
            </div>

            <div style={columnContainerStyle}>
              <div style={columnStyle}>
                <h1
                  style={{
                    ...labelStyle,
                    fontFamily: 'Roboto Mono',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    marginBottom: '20px',
                    marginRight: '20px'
                  }}
                >
                  User With Most Comments
                </h1>
                <br />
                <h2
                  style={{
                    ...labelStyle,
                    ...textStyle,
                    fontFamily: 'Roboto Mono',
                    marginBottom: '10px'
                  }}
                >
                  <span style={labelStyle}>
                    <strong>Username:</strong>
                  </span>
                  test
                </h2>
                <h2
                  style={{
                    ...labelStyle,
                    ...textStyle,
                    fontFamily: 'Roboto Mono',
                    marginBottom: '10px'
                  }}
                >
                  <span style={labelStyle}>
                    <strong>Number of Comments:</strong>
                  </span>
                  test
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default MemberPage;
