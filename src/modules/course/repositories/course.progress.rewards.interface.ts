///////////////////////////////

export const ICourseProgressRewardRepository = Symbol(
  'ICourseProgressRewardRepository',
);

export interface ICourseProgressRewardRepository {
  updateCourseRewardPoints(
    courseEnrollmentId: string,
    rewardPoints: number,
    overallProgressPercentage: number,
  ): unknown;
}
