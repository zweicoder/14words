import React, { Component } from 'react';
import styles from './styles.css';
import Helmet from 'react-helmet';
import EncoderSection from 'containers/EncoderSection';
import DecoderSection from 'containers/DecoderSection';
import { SCOWL_MODE, BIP39_MODE } from 'utils/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
            <select defaultValue={BIP39_MODE} onChange={this.changeInputMode}>
              <option value={BIP39_MODE}>BIP39 (15 commonly used words)</option>
              <option value={SCOWL_MODE}>Scowl (Original 14words)</option>
            </select>
          </div>
          <EncoderSection mode={this.state.encoderMode || BIP39_MODE}/>
          <DecoderSection mode={this.state.encoderMode || BIP39_MODE}/>
        </div>
      </div>
    );
  }
}

export default App;
