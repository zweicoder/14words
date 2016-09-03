import React from 'react'
import Section from 'components/Section';
import { fetchEncoded } from 'utils/encoderService';

class EncoderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mode !== this.props.mode) {
      this.props = nextProps;
      this.encodeAddress(this.state.input)
    }
  }

  encodeAddress = (addr)=> {
    this.setState({ message: null });
    this.setState({ result: null });
    if (!addr) {
      return;
    }

    if (!addr.match(/^0x[a-fA-F0-9]{40}$/)) {
      this.setState({ message: `Not a valid Ethereum Address!` });
      return;
    }
    fetchEncoded(addr, this.props.mode).then((res)=> {
      this.setState({ result: res })
    })
      .catch((err)=> {
        console.error('Error while fetching encoded result: ', err);
        this.setState({ message: err })
      })
  };

  handleInputChange = (e) => {
    const inp = e.target.value;
    this.setState({ input: inp });
    this.encodeAddress(inp);
  };

  render() {
    return <Section
      header="Turn your Ethereum Address into a sentence!"
      inputPlaceholder="Put Your Address Here"
      onChange={this.handleInputChange}
      message={this.state.message}
      result={this.state.result}
    />
  }
}

EncoderSection.propTypes = {
  mode: React.PropTypes.string.isRequired
};

export default EncoderSection;