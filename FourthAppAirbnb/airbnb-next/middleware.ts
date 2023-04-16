export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        "/trips",
        "/trips/[id]",
        '/reservations/[id]',
        '/reservations',
        '/favorites',
        '/properties',
    ]
}