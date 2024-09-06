import { StaticImageData } from 'next/image';

export interface Member {
  name: string;
  img: StaticImageData;
  email: string;
  location: string;
  description: string;
  github: string;
}

export interface TeamCardProps {
  members: Member[];
}
