import React from 'react'
import Section from 'components/Section';
import { fetchDecoded } from 'utils/encoderService';
import { SCOWL_MODE, BIP39_MODE } from 'utils/constants';

class DecoderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  decodeAddress = (e) => {
    this.setState({ message: null });
    this.setState({ result: null });

    const inp = e.target.value;
    if (!inp) {
      return;
    }

    let requiredLength;
    const { mode } = this.props;
    switch (mode) {
      case BIP39_MODE:
        requiredLength = 15;
        break;
      case SCOWL_MODE:
        requiredLength = 14;
        break;
      default:
        console.error('Bad mode: ', mode)
    }
    if (inp.split(' ').length !== requiredLength) {
      this.setState({ message: `Input should have ${requiredLength} words!` });
      return;
    }

    fetchDecoded(inp, mode).then((res)=> {
      this.setState({ result: res })
    })
      .catch((err)=> {
        this.setState({ message: err })
      })
  };

  render() {
    return <Section
      header="Translate a 14 words sentence into an address!"
      inputPlaceholder="Put Your Sentence Here"
      onChange={this.decodeAddress}
      message={this.state.message}
      result={this.state.result}
    />
  }
}

DecoderSection.propTypes = {
  mode: React.PropTypes.func.isRequired
};