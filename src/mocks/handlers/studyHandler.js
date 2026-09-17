import { http, HttpResponse, delay } from 'msw';
import { MOCK_STUDY_HEADER } from '../studyMockData';

export const studyHandlers = [
  http.get('/studies', async () => {
    await delay(200);
    return HttpResponse.json([MOCK_STUDY_HEADER]);
  }),

  http.post('/studies/:study_id', async ({ request }) => {
    const newStudy = await request.json();
    return HttpResponse.json({ id: Date.now(), ...newStudy }, { status: 201 });
  }),

  http.get('/studies/:study_id', async ({ params }) => {
    return HttpResponse.json({
      ...MOCK_STUDY_HEADER,
      studyId: Number(params.study_id),
    });
  }),
];
