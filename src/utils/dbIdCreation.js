import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default uuidv4() + DateTime.now().toUnixInteger()
