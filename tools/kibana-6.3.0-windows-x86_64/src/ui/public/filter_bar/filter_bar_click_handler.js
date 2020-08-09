import _ from 'lodash';
import { dedupFilters } from './lib/dedup_filters';
import { uniqFilters } from './lib/uniq_filters';
import { findByParam } from '../utils/find_by_param';
import { toastNotifications } from '../notify';

export function FilterBarClickHandlerProvider() {

  return function ($state) {
    return function (event, simulate) {
      if (!$state) return;

      let aggConfigResult;

      // Hierarchical and tabular data set their aggConfigResult parameter
      // differently because of how the point is rewritten between the two. So
      // we need to check if the point.orig is set, if not use try the point.aggConfigResult
      if (event.point.orig) {
        aggConfigResult = event.point.orig.aggConfigResult;
      } else if (event.point.values) {
        aggConfigResult = findByParam(event.point.values, 'aggConfigResult');
      } else {
        aggConfigResult = event.point.aggConfigResult;
      }

      if (aggConfigResult) {
        const isLegendLabel = !!event.point.values;
        let aggBuckets = _.filter(aggConfigResult.getPath(), { type: 'bucket' });

        // For legend clicks, use the last bucket in the path
        if (isLegendLabel) {
          // series data has multiple values, use aggConfig on the first
          // hierarchical data values is an object with the addConfig
          const aggConfig = findByParam(event.point.values, 'aggConfig');
          aggBuckets = aggBuckets.filter((result) => result.aggConfig && result.aggConfig === aggConfig);
        }

        let filters = _(aggBuckets)
          .map(function (result) {
            try {
              return result.createFilter();
            } catch (e) {
              if (!simulate) {
                toastNotifications.addSuccess(e.message);
              }
            }
          })
          .flatten()
          .filter(Boolean)
          .value();

        if (!filters.length) return;

        if (event.negate) {
          _.each(filters, function (filter) {
            filter.meta = filter.meta || {};
            filter.meta.negate = true;
          });
        }

        filters = dedupFilters($state.filters, uniqFilters(filters), { negate: true });

        if (!simulate) {
          $state.$newFilters = filters;
        }
        return filters;
      }
    };
  };
}
