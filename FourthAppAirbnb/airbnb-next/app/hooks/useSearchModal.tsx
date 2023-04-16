import { create } from 'zustand'

interface SearchModalStore{
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useSearchModal =  create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set((state) => ({isOpen: true})),
    onClose: () => set((state) => ({isOpen: false}))
}))

export default useSearchModal