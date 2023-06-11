import User from './user.model'

// Fetch LastUser
const lastUser = async (): Promise<string | null> => {
  const user = await User.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 })
  if (!user) return null
  return user.id
}

export const generateUserId = async () => {
  const lastUserId = (await lastUser()) || String(0).padStart(5, '0')
  const currentUserId = (parseInt(lastUserId) + 1).toString().padStart(5, '0')
  return currentUserId
}
