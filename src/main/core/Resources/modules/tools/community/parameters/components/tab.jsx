import React from 'react'
import {PropTypes as T} from 'prop-types'

import {url} from '#/main/app/api'
import {trans} from '#/main/app/intl/translation'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'
import {ToolPage} from '#/main/core/tool/containers/page'

import {route} from '#/main/core/workspace/routing'
import {Workspace as WorkspaceTypes} from '#/main/core/workspace/prop-types'
import {selectors} from '#/main/core/tools/community/parameters/store'

const ParametersTab = props =>
  <ToolPage
    path={[{
      type: LINK_BUTTON,
      label: trans('parameters'),
      target: `${props.path}/parameters`
    }]}
    subtitle={trans('parameters')}
  >
    <FormData
      level={3}
      name={selectors.FORM_NAME}
      buttons={true}
      save={{
        type: CALLBACK_BUTTON,
        callback: () => props.save(props.workspace)
      }}
      cancel={{
        type: LINK_BUTTON,
        target: props.path,
        exact: true
      }}
      sections={[
        {
          icon: 'fa fa-fw fa-user-plus',
          title: trans('registration'),
          primary: true,
          fields: [
            {
              name: 'registration.url',
              type: 'url',
              label: trans('registration_url'),
              calculated: () => `${url(['claro_index', {}, true])}#${route(props.workspace)}`,
              required: true,
              disabled: true
            }, {
              name: 'registration.selfRegistration',
              type: 'boolean',
              label: trans('activate_self_registration'),
              help: trans('self_registration_workspace_help'),
              linked: [
                {
                  name: 'registration.validation',
                  type: 'boolean',
                  label: trans('validate_registration'),
                  help: trans('validate_registration_help'),
                  displayed: props.workspace.registration && props.workspace.registration.selfRegistration
                }
              ]
            }, {
              name: 'registration.selfUnregistration',
              type: 'boolean',
              label: trans('activate_self_unregistration'),
              help: trans('self_unregistration_workspace_help')
            }, {
              name: 'registration.defaultRole',
              type: 'role',
              label: trans('default_role'),
              options: {
                picker: props.workspace ? {
                  url: ['apiv2_workspace_list_roles', {id: props.workspace.id}],
                  filters: []
                } : undefined
              }
            }
          ]
        }, {
          icon: 'fa fa-fw fa-key',
          title: trans('access_restrictions'),
          fields: [
            {
              name: 'access_max_users',
              type: 'boolean',
              label: trans('restrict_users_count'),
              calculated: () => props.workspace.restrictions && null !== props.workspace.restrictions.maxUsers && '' !== props.workspace.restrictions.maxUsers,
              onChange: checked => {
                if (checked) {
                  // initialize with the current nb of users with the role
                  props.updateProp('restrictions.maxUsers', 0)
                } else {
                  // reset max users field
                  props.updateProp('restrictions.maxUsers', null)
                }
              },
              linked: [
                {
                  name: 'restrictions.maxUsers',
                  type: 'number',
                  label: trans('users_count'),
                  displayed: props.workspace.restrictions && null !== props.workspace.restrictions.maxUsers && '' !== props.workspace.restrictions.maxUsers,
                  required: true,
                  options: {
                    min: 0
                  }
                }
              ]
            }
          ]
        }
      ]}
    />
  </ToolPage>

ParametersTab.propTypes = {
  path: T.string.isRequired,
  workspace: T.shape(WorkspaceTypes.propTypes),
  updateProp: T.func.isRequired,
  save: T.func.isRequired
}

export {
  ParametersTab
}
