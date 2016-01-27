import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import shouldComponentUpdate from 'react-pure-render/function';
// import debug from 'debug';

import HikesMap from './Map.jsx';
import { setTitle } from '../../../redux/actions';

import contain from '../../../utils/professor-x';

// const log = debug('fcc:hikes');

const mapStateToProps = state => state.hikesApp.hikes;
const fetchOptions = {
  fetchAction: 'fetchHikes',

  isPrimed: ({ hikes }) => hikes && !!hikes.length,
  getPayload: ({ params: { dashedName } }) => dashedName,

  shouldContainerFetch(props, nextProps) {
    return props.params.dashedName !== nextProps.params.dashedName;
  }
};

export class Hikes extends React.Component {
  static displayName = 'Hikes'

  static propTypes = {
    children: PropTypes.element,
    hikes: PropTypes.array,
    params: PropTypes.object,
    setTitle: PropTypes.func
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('Hikes');
  }

  shouldComponentUpdate = shouldComponentUpdate

  renderMap(hikes) {
    return (
      <HikesMap hikes={ hikes }/>
    );
  }

  render() {
    const { hikes } = this.props;
    const preventOverflow = { overflow: 'hidden' };
    return (
      <div>
        <Row style={ preventOverflow }>
          {
            // render sub-route
            this.props.children ||
            // if no sub-route render hikes map
            this.renderMap(hikes)
          }
        </Row>
      </div>
    );
  }
}

// export redux and fetch aware component
export default compose(
  connect(mapStateToProps, { setTitle }),
  contain(fetchOptions)
)(Hikes);
