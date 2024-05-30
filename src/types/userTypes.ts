export interface User  {
    _id: string
    first_name : string
    last_name : string
    email : string
    password : string
    gender : string
    age : number
    phone: {
      phone_number: number
      country_code: string
    }
    address: {
      city: string
      country: string
      pin_code: number
      state: string
    } 
    
  }

  export const defaultUserData:User = {
    _id: "",
    first_name : "",
    last_name : "",
    email : "",
    password : "",
    gender : "",
    age : 0,
    phone: {
      phone_number: 0,
      country_code: "",
    },
    address: {
      city: "",
      country: "",
      pin_code: 0,
      state: "",
    }
  }
  