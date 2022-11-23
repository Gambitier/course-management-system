///////////////////////////////

export const ICourseMaterialProgressRepository = Symbol(
  'ICourseMaterialProgressRepository',
);

export interface ICourseMaterialProgressRepository {
  getCourseOverallProgressPercentage(
    courseEnrollmentId: string,
  ): Promise<number>;

  upsertCourseMaterialProgess(
    courseEnrollmentId: string,
    courseMaterialId: string,
    progressPercentage: number,
  ): Promise<string>;
}
