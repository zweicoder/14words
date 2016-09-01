import React, { Component } from 'react';
import styles from './styles.css';
import Helmet from 'react-helmet';
import { fetchEncoded, fetchDecoded } from 'utils/encoderService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  encodeAddress = (e) => {
    this.setState({ encodeMessage: null });
    this.setState({ encodeResult: null });

    const inp = e.target.value;
    if (!inp) {
      return;
    }

    if (!inp.match(/^0x[a-fA-F0-9]{40}$/)) {
      this.setState({ encodeMessage: `Not a valid Ethereum Address!` });
      return;
    }

    fetchEncoded(inp).then((res)=> {
      this.setState({ encodeResult: res })
    })
      .catch((err)=> {
        this.setState({ encodeMessage: err })
      })
  };

  decodeAddress = (e) => {
    this.setState({ decodeMessage: null });
    this.setState({ decodeResult: null });

    const inp = e.target.value;
    if (!inp) {
      return;
    }

    if (inp.split(' ').length !== 14) {
      this.setState({ decodeMessage: `Not a valid 14words sentence!` });
      return;
    }

    fetchDecoded(inp).then((res)=> {
      this.setState({ decodeResult: res })
    })
  };

  render() {
    return (
      <div className={styles.App}>
        <Helmet title="14words"/>
        <div className={styles["App-header"]}>
          <span className={styles["App-header-title"]}>14words</span>
          <span className={styles["App-header-subtitle"]}> Human Readable Ethereum Addresses</span>
        </div>
        <div className={styles.container}>
          <section className={styles.section}>
            <div className={styles.header}> Turn your Ethereum Address into 14 words!</div>
            <input placeholder="Put Your Address Here" size="30" onInput={this.encodeAddress}/>
            {this.state.encodeMessage ? <span className={styles.message}>{this.state.encodeMessage}</span> : null}
            {this.state.encodeResult ? <span className={styles.result}>{this.state.encodeResult}</span> : null}
          </section>
          <section className={styles.section}>
            <div className={styles.header}> Translate a 14 words sentence into an address!</div>
            <input placeholder="Put Your Sentence Here" size="30" onInput={this.decodeAddress}/>
            {this.state.decodeMessage ? <span className={styles.message}>{this.state.decodeMessage}</span> : null}
            {this.state.decodeResult ? <span className={styles.result}>{this.state.decodeResult}</span> : null}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
