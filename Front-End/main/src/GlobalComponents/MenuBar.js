import './MenuBar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { 
    AppBar, 
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem
 } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function MenuBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAnalysisClick = () => {
        navigate('/');
        handleClose();
    };

    const handleDatabaseClick = () => {
        navigate('/database');
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleAnalysisClick}>Analyze Document</MenuItem>
                        <MenuItem onClick={handleDatabaseClick}>Database</MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Fake News Detector
                    </Typography>
                    {/* Here in case we want to add new features such as saving file and link upload results */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MenuBar;