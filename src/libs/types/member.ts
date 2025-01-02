export interface Member {
    _id: string
    memberNick: string
    memberPhone: string
    memberImage: string
    updatedAt: Date
    createdAt: Date
}


export interface MemberSignupInput {
    memberNick: string;
    memberPassword: string
    memberPhone: string;
    memberImage: any
}

export interface MemberLoginInput {
    memberNick: string;
    memberPassword: string;
}