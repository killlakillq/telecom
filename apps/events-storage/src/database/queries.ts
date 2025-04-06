export const saveEventQuery = `
      INSERT INTO call_events (
        id, event_type, event_data, source, timestamp
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

export const findUserByCallerIdQuery = `
      SELECT * FROM users
      WHERE phone_number = $1
`;

export const createUserQuery = `
      INSERT INTO users (id, username, phone_number, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
`;
