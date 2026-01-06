/**
 * Generates a refresh token identifier for a given user.
 * @param userId - The unique identifier of the user.
 * @returns A string representing the refresh token for the user.
 * No exceptions are thrown by this function.
 */
export const cookieNameGenerator = (userId: number): string => {
    return `refreshToken_user_${userId}`;
}