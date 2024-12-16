import { handlers as postHandlers } from './posts'
import { handlers as peakHandlers } from './peaks'
import { handlers as userHandlers } from './users'
import { handlers as roleHandlers } from './roles'
import { handlers as messageHandlers } from './messages'

export const handlers = [
  ...postHandlers,
  ...peakHandlers,
  ...userHandlers,
  ...roleHandlers,
  ...messageHandlers
]
