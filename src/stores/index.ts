import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

interface States {
  bears: number;
  increase: (by: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isDidiao: boolean;
  setIsDidiao: (isDidiao: boolean) => void;
}

const useCaches = create<States>()(
  devtools(
    persist(
      set => ({
        bears: 0,
        increase: by => set(state => ({bears: state.bears + by})),
        theme: '#987123',
        setTheme: theme => set({theme}),
        isDidiao: false,
        setIsDidiao: isDidiao => set({isDidiao}),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          theme: state.theme,
          isDidiao: state.isDidiao,
        }),
      },
    ),
  ),
);

export {useCaches};
