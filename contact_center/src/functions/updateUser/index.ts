import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'PUT',
        path: 'update-user',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
