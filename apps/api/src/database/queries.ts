export const findUserByPhoneNumberQuery = `
      SELECT * FROM users
      WHERE phone_number = $1;
`;

export const createUserQuery = `
      INSERT INTO users (id, username, phone_number, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
`;

export const findUserByIdQuery = `
      SELECT id, phone_number, username, created_at, updated_at 
      FROM users
      WHERE id = $1;
`;

export const createAuthTokenQuery = `
      INSERT INTO auth_tokens (id, user_id, token, expires_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
`;

export const findAuthTokenByUserIdQuery = `
      SELECT * FROM auth_tokens
      WHERE user_id = $1;
`;

export const findUserByUsernameQuery = `
      SELECT * FROM users
      WHERE username = $1;
`;

export const deleteAuthTokenByUserIdQuery = `
      DELETE FROM auth_tokens
      WHERE user_id = $1;
`;
