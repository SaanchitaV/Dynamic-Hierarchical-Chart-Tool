import {mydata} from './inputnodedata.js';
import {defaultdata} from './defaultdata.js';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  useReactFlow,
  getSmoothStepPath
} from 'react-flow-renderer';
import { Handle,Position } from 'react-flow-renderer';
import './styles.css';
import Im from './image.png';
import ProfilePic from './profilepic.js';
import 'antd/dist/antd.css';
import { FaCamera} from "react-icons/fa"
import localforage from 'localforage';
import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';
import Moveable from "moveable";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { BlockPicker } from 'react-color';
import { SketchPicker } from 'react-color';
import Popover from '@mui/material/Popover';
import PropTypes from 'prop-types';
import { ThemeProvider, useTheme, makeStyles } from '@mui/styles';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import {useReactToPrint } from 'react-to-print';
import jsPDF from "jspdf";
//import data1 from "./data1.json";
import { elementAcceptingRef } from '@mui/utils';
import axios from 'axios';


let empnodeid = 0;
let ceonodeid = 0;
let mannodeid = 0;

function Orgchartdata({data}){
    let imgid = ceonodeid++;
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const [isShown, setIsShown] = useState(true)
        const handleClick = event => {
    
            setIsShown(current => !current);
          
        }
        const [image, setImage] = useState({preview:"", raw:""});
    
        const handleChange = e => {
            if (e.target.files.length) {
                setImage({
                        preview: URL.createObjectURL(e.target.files[0]),
                        raw: e.target.files[0]
                    });
                
                 };
            };
                
        const handleUpload = async e => {
            e.preventDefault();
            const formData = new FormData();
                formData.append("image", image.raw);
                
            await fetch("YOUR_URL", {
                method:"POST",
                headers: {
                        "Content-Type" : "multipart/form-data"
                    },
                        body: formData
                });
            };



        const [popupMenu, setPopUpMenu] = React.useState(null);
        const open = Boolean(popupMenu);
        const handleMenuOpen = (event) => {
            setPopUpMenu(event.currentTarget);
            }
        const handleMenuClose = () => {
                setPopUpMenu(null);
            } 
            
            
        const[showpicker, setShowPicker] = useState(false);
        const [showfontpicker, setShowfontpicker] = useState(false);
        const [showborderpicker, setShowborderpicker] = useState(false);
  
        const[selectedColor, setSelectedColor] = useState('#96B8F1');
        const[selectedfontColor, setSelectedFontColor] = useState('#000000');
        const[selectedborderColor, setSelectedBorderColor] = useState('#000000');

    return(
        <>
        {
            mydata.map(record =>{
                return(
                    <>
                    <p></p>
                    
                    <div className='text-updater-node' style={{backgroundColor: selectedColor, color: selectedfontColor, borderColor: selectedborderColor}}>
                    <Grid container>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} style={{justifyContent:'center', alignContent:'center', justifyItems:'center', alignItems:'center'}}>
                        <div className='profile-pic' style={{borderColor: selectedborderColor}}>
                            <img className='photo'src={record.image}/>
                        </div>
        
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                        <IconButton aria-label="more" id="long-button" aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open? 'true':undefined} aria-haspopup="true" onClick={handleMenuOpen}>
                                <MoreVertIcon/>
                                </IconButton>
                                <Menu id="basic-menu" anchorEl={popupMenu} open={open} onClose={handleMenuClose} MenuListProps={{'aria-labelledby': 'long-button'}}>
                            <MenuItem>
                                <ListItemIcon>
                                    &nbsp;
                                    <EmailIcon fontSize='large'/>
                                    &nbsp;
                                    <TwitterIcon fontSize='large'/> 
                                    &nbsp;
                                    <LinkedInIcon fontSize='large'/>
                                    &nbsp;
                                    <PhoneIcon fontSize='large'/>   
                                </ListItemIcon>
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={()=>setShowPicker(showpicker=> !showpicker)}>{showpicker? 'Close Colour picker': 'Change Node Colour'}</MenuItem>
                            {
                                showpicker && (
                                        <SketchPicker color={selectedColor} onChangeComplete={color => setSelectedColor(color.hex)} />                           
                                    
                                )
                            }
                            <MenuItem onClick={()=>setShowfontpicker(showfontpicker=> !showfontpicker)}>{showfontpicker? 'Close Colour picker': 'Change Text Colour'}</MenuItem>
                            {
                                showfontpicker && (
                                    <SketchPicker color={selectedfontColor} onChangeComplete={fontcolor => setSelectedFontColor(fontcolor.hex)} /> 
                                                                        
                                    
                                )
                            }
                            <MenuItem onClick={()=>setShowborderpicker(showborderpicker => !showborderpicker)}>{showborderpicker? 'Close Colour picker': 'Change Border Colour'}</MenuItem>
                            {
                                showborderpicker && (
                                    <SketchPicker color={selectedborderColor} onChangeComplete={bordercolor => setSelectedBorderColor(bordercolor.hex)} /> 
                                                                        
                                    
                                )
                            }
                           
                            <MenuItem onClick={handleClick}>Delete Node</MenuItem>
                        </Menu>
                        </Grid>
                        
                            
                                
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <input id="text" name="text" placeholder="Name" value={record.name} onChange={onChange} style={{width:110,height:15, textAlign:'center', fontSize:'0.85rem', alignSelf:'left',backgroundColor:`rgba(109, 157, 234,0)`, fontWeight: 'bolder'}}  /> 
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <input id="text" name="text" placeholder="Designation" value={record.designation} onChange={onChange} style={{width:100, textAlign:'center', fontSize:'0.65rem', alignSelf:'left',backgroundColor:`rgba(109, 157, 234,0)`, borderBottom:'0mm'}}/>
                                    </Grid>   
        
                    
                    </Grid>
        
                </div>
                </>

                )
            })
        }
        </>

    )
}

function defaultNode(){
    return(
        <>
        {

        }
        </>
    )
}



/*const nodeTypes = {nodeinput: inputNode}

const initialNodes = [
    {
      id: '1',
      type: 'nodeinput',
      position: { x: 250, y: 5 },
    },
  ];
function Orgchartdata(){
    


    return(
        <>
        {
            Records.map( record => {
                return(
                    <div>
                        {record.name}
                        <br></br>
                        {record.designation}
                    </div>
                )
            })
        }
        </>
        
    )
    return(
      <>
      <inputNode/>
      </>
    )
}*/

function Aa(){
    return(
        <Orgchartdata/>
    )
}

export default Aa;