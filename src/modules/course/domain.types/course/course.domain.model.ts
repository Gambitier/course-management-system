import { UserDomainModel } from '@modules/user/domain.types/user';

export type CourseDomainModel = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  topics: string[];
  durationMinutes: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date | null;
  createdByUser?: UserDomainModel;
};

export type CreateCourseDomainModel = {
  title: string;
  description: string;
  videoUrl: string;
  topics: string[];
  durationMinutes: number;
  category: string;
  createdByUserId: string;
};

export type UpdatCourseDomainModel = {
  title: string;
  description: string;
  videoUrl: string;
  topics: string[];
  durationMinutes: number;
  category: string;
};
