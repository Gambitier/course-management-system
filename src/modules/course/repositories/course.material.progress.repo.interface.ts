///////////////////////////////

export const ICourseMaterialProgressRepository = Symbol(
  'ICourseMaterialProgressRepository',
);

export interface ICourseMaterialProgressRepository {
  upsertCourseMaterialProgess(
    courseEnrollmentId: string,
    courseMaterialId: string,
    progressPercentage: number,
  ): Promise<boolean>;
}
