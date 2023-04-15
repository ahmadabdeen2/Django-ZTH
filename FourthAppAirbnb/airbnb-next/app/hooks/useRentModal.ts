import { create } from 'zustand'

interface RentModalStore{
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useRentModal =  create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set((state) => ({isOpen: true})),
    onClose: () => set((state) => ({isOpen: false}))
}))

export default useRentModal