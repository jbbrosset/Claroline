import {trans} from '#/main/app/intl/translation'

import {ActivityTab} from '#/plugin/analytics/dashboard/administration/activity/containers/tab'
import {ActivityOverview} from '#/plugin/analytics/dashboard/administration/activity/components/overview'

export default () => ({
  name: 'activity',
  order: 1,
  meta: {
    icon: 'fa fa-fw fa-chart-line',
    label: trans('activity')
  },
  components: {
    tab: ActivityTab,
    overview: ActivityOverview
  }
})
