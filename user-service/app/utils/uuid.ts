import { v4 as uuidv4 } from "uuid";

export const genUUID = (): string => uuidv4();


// import bcrypt from "bcrypt";

// export const hashPass = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
// export const compPass = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);