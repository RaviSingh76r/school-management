import {z} from "zod"

// export const usernameValidation = z.string()
//   .min(8)
//   .max(24)
//   .refine(value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,24}$/.test(value), {
//     message: 'Invalid username. It must contain at least one uppercase letter, one lowercase letter, one digit, and be between 8 and 24 characters long.',
//     path: ['username']
//   });

// Define a schema for username validation
const usernameValidation = z.string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  // .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" });


export const emailValidation = z.string()
  .refine(value => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value), {
    message: 'Invalid email address.'
  });

export const passwordValidation = z.string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .max(32, { message: 'Password must be at most 32 characters long.' })
  .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/g.test(value), {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&).'
  });

export const registrationValidation = z.object({
  username: usernameValidation,
  firstName: z.string(),
  lastName: z.string(),
  email: emailValidation,
  password: passwordValidation,
  role: z.string()
})

export const loginValidation = z.object({
  username: z.string(),
  password: passwordValidation
})