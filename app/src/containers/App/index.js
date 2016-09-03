import React, { Component } from 'react';
import styles from './styles.css';
import Helmet from 'react-helmet';
import { fetchEncoded, fetchDecoded } from 'utils/encoderService';
import {SCOWL_MODE, BIP39_MODE} from 'utils/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //TODO split to <Encoder> and <Decoder> components if free
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

    fetchEncoded(inp, this.state.encoderMode).then((res)=> {
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
    let requiredLength;
    switch (this.state.encoderMode) {
      case BIP39_MODE:
        requiredLength = 15;
        break;
      case SCOWL_MODE:
        requiredLength = 14;
        break;
      default:
        console.error('Bad mode: ', this.state.encoderMode)
    }
    if (inp.split(' ').length !== requiredLength) {
      this.setState({ decodeMessage: `Not a valid 14words sentence!` });
      return;
    }

    fetchDecoded(inp, this.state.encoderMode).then((res)=> {
      this.setState({ decodeResult: res })
    })
      .catch((err)=> {
        this.setState({ decodeMessage: err })
      })
  };

  changeInputMode = (e) => {
    this.setState({ encoderMode: e.target.value })
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
          <div className={styles.chooser}>
            <div>Encoder</div>
            <select defaultValue="BIP39" onChange={this.changeInputMode}>
              <option value={BIP39_MODE}>BIP39 (15 commonly used words)</option>
              <option value={SCOWL_MODE}>Scowl (Original 14words)</option>
            </select>
          </div>
          <section className={styles.section}>
            <div className={styles.header}> Turn your Ethereum Address into 14 words!</div>
            <input placeholder="Put Your Address Here" size="30" onChange={this.encodeAddress}/>
            {this.state.encodeMessage ? <span className={styles.message}>{this.state.encodeMessage}</span> : null}
            {this.state.encodeResult ? <span className={styles.result}>{this.state.encodeResult}</span> : null}
          </section>
          <section className={styles.section}>
            <div className={styles.header}> Translate a 14 words sentence into an address!</div>
            <input placeholder="Put Your Sentence Here" size="30" onChange={this.decodeAddress}/>
            {this.state.decodeMessage ? <span className={styles.message}>{this.state.decodeMessage}</span> : null}
            {this.state.decodeResult ? <span className={styles.result}>{this.state.decodeResult}</span> : null}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
