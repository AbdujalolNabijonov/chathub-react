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




const Login = (props: any) => {
    const navigate = useNavigate()
    const [room, setRoom] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { authMember } = useGlobals()

    //LifeCicle
    useEffect(() => {
        if (!authMember) navigate("/")
    }, [])
    //handlers
    const handleChange = (e: any) => {
        setRoom(e.target.value)
    }
    const handleClickShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }
    const handleLink = () => {
        navigate("/chat")
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
                    >
                    </TextField>
                    <FormControl sx={{ mt: 2 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
                <Button variant="outlined" onClick={handleLink}>Join the room</Button>
            </Stack>
        </Stack>
    )
}

export default Login