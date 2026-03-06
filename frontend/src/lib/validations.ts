import { z } from 'zod'

const loginFormSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(6)
})

const registerFormSchema = z
  .object({
    fullName: z.string().min(6),
    username: z.string().min(6).max(10),
    password: z.string().min(6),
    passwordRetype: z.string().min(6)
  })
  .refine((data) => data.password === data.passwordRetype, {
    message: 'Passwords are not matching',
    path: ['passwordRetype']
  });

const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional()
})

const deleteAccountFormSchema = z
  .object({
    username: z.string().min(6),
    usernameCurrent: z.string().min(6).optional()
  })
  .passthrough()
  .refine((data) => data.username === data.usernameCurrent, {
    message: 'Username is not matching',
    path: ['username']
  })

const changePasswordFormSchema = z
  .object({
    password: z.string().min(8),
    passwordNew: z.string().min(8),
    passwordRetype: z.string().min(8)
  })
  .refine((data) => data.passwordNew !== data.password, {
    message: 'Both new and current passwords are same',
    path: ['passwordNew']
  })
  .refine((data) => data.passwordNew === data.passwordRetype, {
    message: 'Passwords are not matching',
    path: ['passwordRetype']
  })

const createManufacturerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name is required!",
    }),
    description: z.string().optional(),
  });

export {
  changePasswordFormSchema,
  deleteAccountFormSchema,
  loginFormSchema,
  profileFormSchema,
  registerFormSchema,
  createManufacturerSchema
}
