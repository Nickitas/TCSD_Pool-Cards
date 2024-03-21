import { create } from 'zustand';

export const useAlertStore = create((set) => ({
    alertState: {
        isShow: false,
        title: '',
        message: ''
    },
    setAlertState: (newState) => set(state => ({ 
        alertState: { 
            ...state.alertState, 
            ...newState 
        } 
    })),
}));