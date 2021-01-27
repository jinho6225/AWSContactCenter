export default {
  type: "object",
  properties: {
    phoneNumber: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: { type: 'string' }

  },
  required: ['phoneNumber', 'firstName', 'lastName', 'age']
} as const;
