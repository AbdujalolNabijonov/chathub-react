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
import { useState } from "react"
import { useNavigate } from "react-router-dom";




export const Join = (props: any) => {
    const navigate = useNavigate()
    const [room, setRoom] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false)

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
                    <Typography fontWeight={700} fontSize={30}>Join ChatHub</Typography>
                </Stack>
                <Stack className="inputs">
                    <TextField
                        fullWidth
                        placeholder="Nickname"
                        sx={{ marginBottom: '10px' }}
                        label="Nickname"
                    >
                    </TextField>
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