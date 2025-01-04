import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    colors,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { Message } from "../../../libs/config";
import MemberService from "../../services/member.service";
import { MemberLoginInput } from "../../../libs/types/member";
import { useSocket } from "../../hooks/useSocket";




const Login = (props: any) => {
    const navigate = useNavigate()
    const [room, setRoom] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [memberNick, setMemberNick] = useState<string>("")
    const { setAuthMember } = useGlobals()
    const { socket, setSocketRoom } = useSocket()

    //handlers
    const handleChangePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const handleChangeName = (e: any) => {
        setMemberNick(e.target.value)
    }
    const handleChange = (e: any) => {
        setRoom(e.target.value)
        setSocketRoom(e.target.value)
    }
    const handleClickShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const handleRequestLogin = async () => {
        try {
            if (memberNick === "" || password === "") throw new Error(Message.error3);
            if (password.length < 5) throw new Error(Message.error7)
            const data: MemberLoginInput = {
                memberNick,
                memberPassword: password
            }
            const memberService = new MemberService()
            const member = await memberService.login(data);
            localStorage.setItem("member", JSON.stringify(member));
            localStorage.setItem("socketRoom", JSON.stringify(room))
            setAuthMember(member)
            navigate("/chat",{replace:true})
            window.location.reload()
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="container">
            <Stack className="auth">
                <Stack className={"title"}>
                    <Avatar src="/img/icons/logo.png" sx={{ height: 70, width: 70 }} />
                    <Typography fontWeight={700} fontSize={30}>Join CHATHUB</Typography>
                </Stack>
                <Stack className="inputs">
                    <TextField
                        fullWidth
                        placeholder="Nickname"
                        sx={{ marginBottom: '10px' }}
                        label="Nickname"
                        onChange={handleChangeName}
                    >
                    </TextField>
                    <FormControl sx={{ mt: 2 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChangePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{ width: "50px", height: "50px", mb: 1 }}
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <div style={{ color: "red", marginBottom: "5px", fontSize: "14px", opacity: 0.7 }}>Please, insert al least 6 charters</div>
                </Stack>
                <FormControl>
                    <InputLabel id="room">Room</InputLabel>
                    <Select
                        labelId="room"
                        id="demo-simple-select-helper"
                        value={room}
                        label="Age"
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={"React Native"}>React Native</MenuItem>
                        <MenuItem value={"React"}>React</MenuItem>
                        <MenuItem value={"Next"}>Next</MenuItem>
                        <MenuItem value={"Python"}>Python</MenuItem>
                        <MenuItem value={"JS"}>JS</MenuItem>
                        <MenuItem value={"PHP"}>PHP</MenuItem>
                        <MenuItem value={"NEST"}>NESTS</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleRequestLogin}>Join the room</Button>
                <Typography textAlign={"center"} marginTop={2}>Do you have an account? <a href="/">signup</a></Typography>
            </Stack>
        </Stack>
    )
}

export default Login