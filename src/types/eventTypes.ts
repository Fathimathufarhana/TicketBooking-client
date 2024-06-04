export interface Event {
  _id: string
  title: string
  time: {
    start_date: Date | null | string
    end_date: Date | null | string
    moment: string
  }
  description: string
  totalTickets: number
  availability: number
  duration: string
  image: string
  price: number
  venue: string
  isDeleted: Boolean
  createdAt: string
  updatedAt: string
  star_rating: number
}

export const defaultEventData:Event = {
  _id: '',
  title: '',
  time: {
    start_date: null,
    end_date: null,
    moment: '',
  },
  description: '',
  totalTickets: 0,
  availability: 0,
  duration: '',
  venue: '',
  image: '',
  price: 0,
  isDeleted: false,
  createdAt: '',
  updatedAt: '',
  star_rating: 0
} 