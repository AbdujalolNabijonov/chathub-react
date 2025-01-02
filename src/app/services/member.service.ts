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
            console.log(response.data)
            return response.data
        } catch (err: any) {
            console.log(`Error: signup, ${err.message}`);
            throw err
        }
    }

    public async login() {

    }

    public async logout(): Promise<void> {
        try {
            console.log("METHOD: logout");
            const response = await axios.get(this.apiUrl + "/logout", { withCredentials: true });
            return response.data
        } catch (err: any) {
            console.log(`Error: logout, ${err.message}`);

        }
    }
}