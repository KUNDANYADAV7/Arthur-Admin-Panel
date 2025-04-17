export interface Blog {
  id: number;
  title: string;
  image: string;
  date: string;
  content: string;
  excerpt?: string;
  category: string; // Add this line
}