export const isVerified = (user: any) => {
 
    return user.ev === 1 && user.sv === 1

}

export const isForEmailVerification = (user: any) => {
    return user.ev === 0
}

export const isForSmsVerification = (user: any) => {
    return user.sv === 0
}

export const isProfileComplete = (user: any) => {
    return user.profile_complete === 1
}