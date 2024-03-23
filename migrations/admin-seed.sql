CREATE OR REPLACE FUNCTION encryptPassword(password TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(password::bytea, 'base64');
END;
$$ LANGUAGE plpgsql;

INSERT INTO users (id, email, password, role)
VALUES (9999, 'admin@gmail.com', encryptPassword('adminpassword'), 'admin');
