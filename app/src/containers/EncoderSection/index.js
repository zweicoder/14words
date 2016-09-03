import React from 'react'
import Section from 'components/Section';
import { fetchEncoded } from 'utils/encoderService';

class EncoderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  encodeAddress = (e) => {
    this.setState({ message: null });
    this.setState({ result: null });

    const inp = e.target.value;
    if (!inp) {
      return;
    }

    if (!inp.match(/^0x[a-fA-F0-9]{40}$/)) {
      this.setState({ message: `Not a valid Ethereum Address!` });
      return;
    }

    fetchEncoded(inp, this.props.mode).then((res)=> {
      this.setState({ result: res })
    })
      .catch((err)=> {
        this.setState({ message: err })
      })
  };

  render() {
    return <Section
      header="Turn your Ethereum Address into 14 words!"
      inputPlaceholder="Put Your Address Here"
      onChange={this.encodeAddress}
      message={this.state.message}
      result={this.state.result}
    />
  }
}

EncoderSection.propTypes = {
  mode: React.PropTypes.func.isRequired
};