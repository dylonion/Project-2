POST /auth/login 302 261.293 ms - 58
{ error: operator does not exist: character varying = integer
    at Connection.parseE (/Users/dylanmoylan/code/wdi/PROJECTS/PROJECT_02-MVC/Project-2/node_modules/pg/lib/connection.js:546:11)
    at Connection.parseMessage (/Users/dylanmoylan/code/wdi/PROJECTS/PROJECT_02-MVC/Project-2/node_modules/pg/lib/connection.js:371:19)
    at Socket.<anonymous> (/Users/dylanmoylan/code/wdi/PROJECTS/PROJECT_02-MVC/Project-2/node_modules/pg/lib/connection.js:114:22)
    at emitOne (events.js:115:13)
    at Socket.emit (events.js:210:7)
    at addChunk (_stream_readable.js:266:12)
    at readableAddChunk (_stream_readable.js:253:11)
    at Socket.Readable.push (_stream_readable.js:211:10)
    at TCP.onread (net.js:585:20)
  name: 'error',
  length: 214,
  severity: 'ERROR',
  code: '42883',
  detail: undefined,
  hint: 'No operator matches the given name and argument type(s). You might need to add explicit type casts.',
  position: '45',
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'parse_oper.c',
  line: '726',
  routine: 'op_error' }

Fixed - was trying to set user_id in DB to user.name, typecasting error.

