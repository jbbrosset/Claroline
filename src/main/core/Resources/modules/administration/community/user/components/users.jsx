import React, {Fragment} from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {hasPermission} from '#/main/app/security'
import {LINK_BUTTON} from '#/main/app/buttons'
import {actions as listActions} from '#/main/app/content/list/store'
import {selectors as securitySelectors} from '#/main/app/security/store'
import {trans} from '#/main/app/intl/translation'
import {Alert} from '#/main/app/alert/components/alert'

import {selectors as toolSelectors} from '#/main/core/tool/store'
import {selectors as baseSelectors} from '#/main/core/administration/community/store'
import {selectors} from '#/main/core/administration/community/user/store'
import {route} from '#/main/core/user/routing'
import {UserList} from '#/main/core/user/components/list'
import {getActions} from '#/main/core/user/utils'
import {constants} from '#/main/core/user/constants'

const UsersList = props =>
  <Fragment>
    {props.limitReached &&
      <Alert type="warning" style={{marginTop: 20}}>{trans('users_limit_reached')}</Alert>
    }

    <UserList
      name={`${baseSelectors.STORE_NAME}.users.list`}
      url={['apiv2_user_list_managed']}
      delete={{
        url: ['apiv2_user_delete_bulk'],
        displayed: (users) => 0 < users.filter(user => hasPermission('delete', user) && user.restrictions.disabled).length
      }}
      primaryAction={(row) => ({
        type: LINK_BUTTON,
        target: `${props.path}/users/form/${row.id}`,
        label: trans('edit', {}, 'actions')
      })}
      actions={(rows) => getActions(rows, {
        add: () => props.invalidateList(`${baseSelectors.STORE_NAME}.users.list`),
        update: () => props.invalidateList(`${baseSelectors.STORE_NAME}.users.list`),
        delete: () => props.invalidateList(`${baseSelectors.STORE_NAME}.users.list`)
      }, props.path, props.currentUser).then((actions) => [].concat(actions, [
        // TODO : reuse dynamic show-profile action
        // it's not possible now because the action expects the tool has a route for the profile (which is not the case in admin)
        {
          name: 'show-profile',
          type: LINK_BUTTON,
          icon: 'fa fa-fw fa-address-card',
          label: trans('show_profile'),
          target: route(rows[0]),
          displayed: hasPermission('open', rows[0]),
          scope: ['object']
        }
      ]))}
      customDefinition={[
        {
          name: 'meta.personalWorkspace',
          alias: 'hasPersonalWorkspace',
          type: 'boolean',
          label: trans('has_personal_workspace')
        }, {
          name: 'roles',
          alias: 'role',
          type: 'roles',
          label: trans('roles'),
          calculated: (user) => user.roles.filter(role => constants.ROLE_PLATFORM === role.type),
          displayed: true,
          sortable: false
        }
      ]}
    />
  </Fragment>

UsersList.propTypes = {
  currentUser: T.object,
  path: T.string.isRequired,
  limitReached: T.bool.isRequired,
  invalidateList: T.func.isRequired,
  platformRoles: T.array.isRequired
}

UsersList.defaultProps = {
  platformRoles: []
}

const Users = connect(
  state => ({
    currentUser: securitySelectors.currentUser(state),
    path: toolSelectors.path(state),
    platformRoles: baseSelectors.platformRoles(state),
    limitReached: selectors.limitReached(state)
  }),
  dispatch => ({
    invalidateList(name) {
      dispatch(listActions.invalidateData(name))
    }
  })
)(UsersList)

export {
  Users
}
