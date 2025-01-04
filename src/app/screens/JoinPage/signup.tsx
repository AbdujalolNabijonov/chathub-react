import { useEffect, useState } from "react"
import { Avatar, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material"
import { CloudUploadOutlined, Visibility, VisibilityOff } from "@mui/icons-material"
import styled from "styled-components"
import { IMAGE_FORMATS, Message } from "../../../libs/config"
import { sweetErrorHandling } from "../../../libs/sweetAlert"
import MemberService from "../../services/member.service"
import { MemberSignupInput } from "../../../libs/types/member"
import { useGlobals } from "../../hooks/useGlobals"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../../hooks/useSocket"

const SignUp = (props: any) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [imagePreview, setImagePreView] = useState<string>("/img/example.jpg")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [room, setRoom] = useState("")
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [file, setFile] = useState("")
    const { setAuthMember } = useGlobals()
    const navigate = useNavigate()
    const { setSocketRoom } = useSocket()


    //Handlers
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleClickShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const handlePreview = async (e: any) => {
        try {
            const file = e.target.files[0]
            if (!IMAGE_FORMATS.includes(file.type)) throw new Error(Message.error5)
            const url = URL.createObjectURL(file)
            setFile(file)
            setImagePreView(url)
        } catch (err: any) {
            console.log(`ERROR: handlePreview, ${err}`)
            await sweetErrorHandling(err)
        }
    }

    const handleRequestSignup = async (e: any) => {
        try {
            if (name === "" || phone === "" || password === "" || imagePreview === "") throw new Error(Message.error3);
            if (password !== repeatPassword) throw new Error(Message.error6)

            const data: MemberSignupInput = {
                memberNick: name || "",
                memberPhone: phone || "",
                memberPassword: password || "",
                memberImage: file
            }
            const memberService = new MemberService();
            const member = await memberService.signup(data);
            setAuthMember(member)
            localStorage.setItem("member", JSON.stringify(member))
            navigate("/chat")
            window.location.reload()
        } catch (err) {
            console.log(`ERROR: handleRequestSignup, ${err}`)
            await sweetErrorHandling(err)
        }
    }

    const handleChangeRoom = (e: any) => {
        setRoom(e.target.value)
        setSocketRoom(e.target.value)
    }

    return (
        <Stack className="container">
            <Stack className="signup">
                <Stack className="title">
                    <Avatar sx={{ height: "70px", width: "70px" }} src="/img/icons/logo.png" />
                    <Typography fontSize={25} fontWeight={600}>CHATHUB Signup</Typography>
                </Stack>
                <Stack className="inputs">
                    <Stack>
                        <TextField
                            fullWidth
                            onChange={(e: any) => setName(e.target.value)}
                            placeholder="Nickname"
                            sx={{ marginBottom: '10px' }}
                            label="Nickname"
                        >
                        </TextField>
                        <TextField
                            fullWidth
                            value={phone}
                            onChange={(e: any) => {
                                const input = e.target.value
                                setPhone(input.replace(/[^0-9]/g, ""))
                            }}
                            placeholder="Phone Number"
                            sx={{ marginBottom: '10px' }}
                            label="Phone Number"
                        >
                        </TextField>
                    </Stack>
                    <Stack>
                        <FormControl variant="outlined" sx={{ flex: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e: any) => setPassword(e.target.value)}
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
                        <FormControl variant="outlined" sx={{ flex: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e: any) => setRepeatPassword(e.target.value)}
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
                                label="Repeat Password"
                            />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ mt: 2 }}>
                        <InputLabel id="room">Room</InputLabel>
                        <Select
                            labelId="room"
                            id="demo-simple-select-helper"
                            value={room}
                            label="Age"
                            onChange={handleChangeRoom}
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
                </Stack>
                <Stack className="photo">
                    <Box className="img">
                        <img src={imagePreview} width={"100%"} height={"100%"} alt="person" />
                    </Box>
                    <Box className="photo-info">
                        <Box>Member Image</Box>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadOutlined />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handlePreview}
                                multiple
                            />
                        </Button>
                        <Box>
                            Please upload member image.
                            Attention only:.jpg, .jpeg, or .png.
                            formats allowed!
                        </Box>
                    </Box>
                </Stack>
                <Button variant="contained" onClick={handleRequestSignup} sx={{ mt: 3 }}>Sign Up</Button>
                <Typography textAlign={"center"} fontSize={14} marginTop={1}>Do you have account? Then click <a href="/login">login</a></Typography>
            </Stack>
        </Stack>
    )
}

export default SignUp