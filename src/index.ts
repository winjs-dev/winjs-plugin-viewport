import { deepmerge, reduceConfigs } from '@winner-fed/utils';
import type { IApi } from '@winner-fed/winjs';
import mobile from 'postcss-mobile-forever';

export default (api: IApi) => {
  api.describe({
    key: 'viewport',
    enableBy: api.EnableBy.config,
    config: {
      schema({ zod }) {
        return zod.record(zod.any());
      },
    },
  });

  api.modifyConfig((memo) => {
    const { viewport } = api.userConfig;

    if (!viewport) {
      return;
    }

    const defaultOptions = {
      appSelector: '#root',
    };

    const mergeViewportConfig = reduceConfigs({
      initial: defaultOptions,
      config: viewport || {},
      mergeFn: deepmerge,
    });

    memo.extraPostCSSPlugins ??= [];
    memo.extraPostCSSPlugins.push(
      // postcss postcss-mobile-forever
      mobile(mergeViewportConfig),
    );

    return memo;
  });
};
