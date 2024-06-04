export interface FormData {
    title: string;
    time: {
      start_date: string | null;
      end_date?: string | null;
      moment: string;
    };
    description: string;
    totalTickets: number;
    duration: string;
    image: string;
    venue: string;
    price: number;
  }
  