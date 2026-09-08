import { http, HttpResponse, delay } from 'msw';
import { MOCK_STUDY_HEADER } from '../studyMockData';


export const focusPointHandler = [
  http.patch('/studies/:study_id/points', async ({ params, request }) => {
    await delay(200);
    const { points } = await request.json();

    MOCK_STUDY_HEADER.totalPoints += (MOCK_STUDY_HEADER.totalPoints || 0) + (Number(points) || 0);

    return HttpResponse.json({
      studyId: Number(params.study_id),
      totalPoints: MOCK_STUDY_HEADER.totalPoints,
      message: '포인트 업데이트 성공',
    });
  }),
];
