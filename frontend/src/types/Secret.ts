export interface Secret {
  id: string
  name: string
  email: string
  password: string
  [x: string]: any
}

export default Secret
