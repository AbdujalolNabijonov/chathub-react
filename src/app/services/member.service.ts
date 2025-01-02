import { API_URL } from "../../libs/config";
import { T } from "../../libs/types/common";
import { Member, MemberSignupInput } from "../../libs/types/member";
import axios from "axios";

export default class MemberService {
    private readonly apiUrl
    constructor() {
        this.apiUrl = API_URL;
    }

    public async signup(data: MemberSignupInput): Promise<Member> {
        try {
            console.log("METHOD: signup")
            const formData = new FormData()
            formData.append("memberNick", data.memberNick)
            formData.append("memberPhone", data.memberPhone)
            formData.append("memberPassword", data.memberPassword)
            formData.append("memberImage", data.memberImage)
            const response = await axios({
                method: "POST",
                url: this.apiUrl + "/signup",
                data: formData,
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            });
            return response.data
        } catch (err: any) {
            console.log(`Error: signup, ${err.message}`);
            throw err
        }
    }
}