import React from 'react'
import Section from 'components/Section';
import { fetchDecoded } from 'utils/encoderService';
import { SCOWL_MODE, BIP39_MODE } from 'utils/constants';

class DecoderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mode !== this.props.mode) {
      this.props = nextProps;
      this.decodeAddress(this.state.input)
    }
  }

  decodeAddress = (addr) => {
    this.setState({ message: null });
    this.setState({ result: null });
    if (!addr) {
      return;
    }

    const requiredLength = getRequiredLength(this.props.mode);
    if (addr.split(' ').length !== requiredLength) {
      this.setState({ message: `Input should have ${requiredLength} words!` });
      return;
    }

    fetchDecoded(addr, this.props.mode).then((res)=> {
      this.setState({ result: res })
    })
      .catch((err)=> {
        console.error('Error while fetching decoded result: ', err);
        this.setState({ message: err })
      })
  };

  handleInputChange = (e) => {
    const inp = e.target.value;
    this.setState({ input: inp });
    this.decodeAddress(inp);
  };

  render() {
    return <Section
      header={`Translate a sentence into an address!`}
      inputPlaceholder="Put Your Sentence Here"
      onChange={this.handleInputChange}
      message={this.state.message}
      result={this.state.result}
    />
  }
}

function getRequiredLength(mode) {
  switch (mode) {
    case BIP39_MODE:
      return 15;
    case SCOWL_MODE:
      return 14;
    default:
      console.error('Bad mode: ', mode);
      return -1;
  }
}

DecoderSection.propTypes = {
  mode: React.PropTypes.string.isRequired
};

export default DecoderSection;