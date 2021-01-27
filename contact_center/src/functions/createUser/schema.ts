export default {
  type: "object",
  properties: {
    phoneNumber: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' }
  },
  required: ['phoneNumber', 'firstName', 'lastName']
} as const;
