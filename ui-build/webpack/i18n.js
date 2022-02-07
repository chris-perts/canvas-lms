/*
 * Copyright (C) 2015 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = function(input) {
  throw "Should not ever make it to the actual i18n loader because those resources don't exist"
}

// This adapts the functionality of an old require-js plugin that would scope down
// the i18nObj when required with a given format require('i18n!some_scope').  We
// should probably phase this out over time in favor of not specifying loaders
// in require statements, but it seems to replace the functionality for now.
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  this.cacheable()
  let scopeName = this.query.replace('?', '')

  // translations generated by i18nliner have these prefixes that we can just
  // snip out before loading the scope
  //
  // plugins have their plugin name in the midst of app.gems.plugins.analytics.app.views.jst.something
  // so we need a regex that will filter those out too
  scopeName = scopeName
    .replace(/^[^\s]*\.app\.views\.jst\./, '')
    .replace(/^[^\s]*\.ember\.([^\s]*\.)templates\./, '$1')

  if (scopeName.includes('ic_submission-download-dialog')) {
    // TODO: I'm so, so sorry about this.  Figure out how to scope
    // correctly for this one exceptional case later
  } else {
    scopeName = scopeName.replace(/-/, '_')
  }

  // in development, we can save bandwidth and build time by not bothering
  // to include translation artifacts during the build.
  // RAILS_LOAD_ALL_LOCALES: '1' or 'true' to enable
  // RAILS_LOAD_ALL_LOCALES: '0' to disable in production mode
  const shouldTranslate = (
    process.env.RAILS_LOAD_ALL_LOCALES === '1' ||
    process.env.RAILS_LOAD_ALL_LOCALES === 'true' ||
    process.env.RAILS_LOAD_ALL_LOCALES !== '0' && (
      process.env.RAILS_ENV == 'production' ||
      process.env.NODE_ENV == 'production'
    )
  )
  const translationDependency = shouldTranslate
    ? `
      import 'translations/${scopeName}';
      import 'translations/_core';
    `
    : `
      import 'translations/_core_en';
    `

  const scopedJavascript = `
    import I18n from '@canvas/i18n/i18nObj';
    ${translationDependency}

    export default I18n.scoped('${scopeName}');
  `

  return scopedJavascript
}
