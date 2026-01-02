export const cookieNameGenerator = (userId: number): string => {
    return `refreshToken_user_${userId}`;
}