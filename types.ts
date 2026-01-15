
export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  story: string;
  date: string;
}

export interface DateIdea {
  title: string;
  description: string;
  budget: string;
  setting: string;
  activity: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type AppSection = 'home' | 'dates' | 'memories' | 'chat' | 'letters';
