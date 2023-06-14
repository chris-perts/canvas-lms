/*
 * Copyright (C) 2023 - present Instructure, Inc.
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

import React, {useState, useCallback} from 'react'
import DiscussionTopicForm from './DiscussionTopicForm'

export default {
  title: 'Examples/Discussion Create\\Edit/Components/DiscussionTopicForm',
  component: DiscussionTopicForm,
  argTypes: {},
}

export function Primary(args) {
  const [color, setColor] = useState(null)

  const onSubmit = useCallback(
    _ => {
      setColor(args.submitColor)
    },
    [args.submitColor]
  )

  return (
    <div style={{backgroundColor: color, padding: '100px'}}>
      <DiscussionTopicForm submitForm={onSubmit} />
    </div>
  )
}
Primary.args = {
  submitColor: '#516dd0',
}
