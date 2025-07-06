import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon API',
      version: '1.0.0',
      description: 'API for retrieving Pokémon data',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        UserPokemon: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              example: 1,
              description: 'The ID of the user',
            },
            pokemonId: {
              type: 'integer',
              example: 25,
              description: 'The ID of the Pokémon',
            },
          },
          required: ['userId', 'pokemonId'],
        },
        User: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    example: 1,
                    readOnly: true, 
                },
            },
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
