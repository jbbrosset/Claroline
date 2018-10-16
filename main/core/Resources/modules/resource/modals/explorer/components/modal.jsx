import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import omit from 'lodash/omit'

import {trans} from '#/main/core/translation'
import {Router, withRouter} from '#/main/app/router'
import {Button} from '#/main/app/action/components/button'
import {Modal} from '#/main/app/overlay/modal/components/modal'

import {ResourceNode as ResourceNodeTypes} from '#/main/core/resource/prop-types'
import {ResourceExplorer} from '#/main/core/resource/explorer/containers/explorer'

import {selectors} from '#/main/core/resource/modals/explorer/store'

class ExplorerModalContent extends Component {
  constructor(props) {
    super(props)

    this.state = {initialized: false}
  }

  render() {
    const selectAction = this.props.selectAction(this.props.selected)

    const ownProps = [
      'match',
      'location',
      'staticContext',
      'history',
      'root',
      'current',
      'currentDirectory',
      'primaryAction',
      'actions',
      'confirmText',
      'selected',
      'selectAction',
      'initialize',
      'filters'
    ]

    return (
      <Modal
        {...omit(this.props, ownProps)}
        subtitle={this.props.currentDirectory && this.props.currentDirectory.name}
        onEntering={() => {
          this.props.initialize(this.props.root, this.props.filters)

          if (this.props.current) {
            this.props.history.push(`/${this.props.current.id}`)
          }

          this.setState({initialized: true})
        }}
        className="resources-picker"
        bsSize="lg"
      >
        {this.state.initialized &&
          <ResourceExplorer
            name={selectors.STORE_NAME}
            primaryAction={this.props.primaryAction}
            actions={this.props.actions}
          />
        }

        <Button
          label={trans('select', {}, 'actions')}
          {...selectAction}
          className="modal-btn btn"
          primary={true}
          disabled={0 === this.props.selected.length || !this.state.initialized}
          onClick={this.props.fadeModal}
        />
      </Modal>
    )
  }
}

ExplorerModalContent.propTypes = {
  history: T.shape({
    push: T.func.isRequired
  }).isRequired,
  root: T.shape(
    ResourceNodeTypes.propTypes
  ),
  currentDirectory: T.shape(
    ResourceNodeTypes.propTypes
  ),
  current: T.shape({
    id: T.string.isRequired
  }),
  primaryAction: T.func,
  actions: T.func,
  selectAction: T.func.isRequired, // action generator for the select button
  selected: T.array.isRequired,
  filters: T.array,
  initialize: T.func.isRequired,
  fadeModal: T.func.isRequired
}

const RoutedExplorerModal = withRouter(ExplorerModalContent)

const ExplorerModal = props =>
  <Router embedded={true}>
    <RoutedExplorerModal {...props} />
  </Router>

ExplorerModal.propTypes = {
  root: T.shape(
    ResourceNodeTypes.propTypes
  ),
  currentDirectory: T.shape(
    ResourceNodeTypes.propTypes
  ),
  current: T.shape({
    id: T.string.isRequired
  }),
  primaryAction: T.func,
  actions: T.func,
  selectAction: T.func.isRequired, // action generator for the select button
  selected: T.array.isRequired,
  filters: T.array,
  initialize: T.func.isRequired,
  fadeModal: T.func.isRequired
}

ExplorerModal.defaultProps = {
  icon: 'fa fa-fw fa-folder',
  title: trans('resource_explorer', {}, 'resource'),
  filters: [],
  current: null
}

export {
  ExplorerModal
}
