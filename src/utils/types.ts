export interface IRole {
  id: number
  name: string
  type: string
}

export interface IMessage {
  id: string
  priority: number
  header: string
  message: string
  sendTime: Date
  openedTime: Date | null
}

export interface IPeak {
  id: string
  name: string
  height: number
  description: string
  trial: string
  image: string
  localizationLat: number
  localizationLng: number
}

export interface IPost {
  id: string
  notes: string
  photo: string
  peak: IPeak
  isHidden: boolean
  createdAt: Date
  author: {
    id: string
    username: string
    firstName?: string
    avatar?: string
    isSuspended: boolean
    isBanned: boolean
    role: number
  }
}

export interface IUser {
  id: string
  username: string | null
  email: string | null
  password: string | null
  avatar: string
  description?: string
  messages: IMessage[]
  firstName?: string
  lastName?: string
  isBanned: boolean
  suspensionTimeout?: Date
  totalSuspensions: number
  isConfirmed: boolean
  posts: IPost[]
  registrationDate: Date
  role: IRole
}
