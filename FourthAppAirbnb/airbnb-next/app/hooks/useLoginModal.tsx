import { create } from 'zustand'

interface LoginModalStore{
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useLoginModal =  create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set((state) => ({isOpen: true})),
    onClose: () => set((state) => ({isOpen: false}))
}))

export default useLoginModal