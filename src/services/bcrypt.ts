import bcrypt from 'bcryptjs'

export async function encrypt(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(value, salt)
}

export async function decrypt(
  value: string,
  compare: string
): Promise<boolean> {
  return bcrypt.compare(value, compare)
}
