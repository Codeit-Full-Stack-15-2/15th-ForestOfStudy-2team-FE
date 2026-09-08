import { MOCK_STUDY_HEADER } from '@/mocks/studyMockData';
import {create} from 'zustand';

export const useFocusPointStore = create((set)=>({
    studyId: null,
    point : 0,

    fetchPoint: (studyId) => {
        //TODO: DB 연동 후 API 호출 로직으로 교체
        set({studyId, point: MOCK_STUDY_HEADER.totalPoints})
    },

    addPoint : (amount) => {
        set((state)=> ({ point: state.point + amount}));
        //TODO: DB 연동 후 서버 반영 API 호출 추가
    }
}))