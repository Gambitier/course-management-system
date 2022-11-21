import { UserDomainModel } from '@modules/user/domain.types/user';

export type CourseDomainModel = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  topics: string[];
  durationMinutes: bigint;
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
  durationMinutes: bigint;
  category: string;
  createdByUserId: string;
};
