import { createContext, useContext, ReactNode } from 'react';
import { useDualAudioController, DualAudioContextTypeWithRefs } from './useDualAudioController';

const DualAudioContext = createContext<DualAudioContextTypeWithRefs | undefined>(undefined);

export function DualAudioProvider({ children }: { children: ReactNode }) {
    const dualAudio = useDualAudioController();
    return (
        <DualAudioContext.Provider value={dualAudio}>
            {children}
        </DualAudioContext.Provider>
    );
}

export function useDualAudio(): DualAudioContextTypeWithRefs {
    const context = useContext(DualAudioContext);
    if (!context) {
        throw new Error('useDualAudio must be used within a DualAudioProvider');
    }
    return context;
} 