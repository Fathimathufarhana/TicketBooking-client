export interface Ticket {
    _id: string
    title: string
    time: {
      start_date: Date | null | string
      end_date: Date | null | string
      moment: string
    }
  price: number
  createdAt: string
  updatedAt: string
  date: Date
  ticket: number
}