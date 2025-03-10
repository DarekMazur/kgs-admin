export interface IRole {
  id: number
  name: string
  type: string
}

export interface IMessage {
  id: string
  header: string
  message: string
  sendTime: Date
  openedTime: Date | string | null
  sender: {
    id: string
    username: string
    role: string
  }
  recipient: {
    id: string
    username: string
    role: string
  }
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

export interface ILogin {
  email: string | null
  password: string | null
}

export interface IUser {
  id: string
  username: string | null
  email: string | null
  password: string | null
  avatar: string
  description?: string
  messages: {
    inbox: IMessage[]
    sent: IMessage[]
  }
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

export interface IAuthValue {
  isAuthenticated: boolean
  token: string | null
  login: (userToken: string, userId: string, isPermanent: boolean) => void
  logout: () => void
}

export interface IMinMax {
  min?: number
  max: number
}

export interface IUserParams {
  roleId?: IMinMax | number
  registration?: IMinMax | number
  status?: Array<'inactive' | 'suspended' | 'banned'>
}
