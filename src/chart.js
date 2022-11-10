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




localforage.config({
    name: 'react-flow-docs',
    storeName: 'flows',
  });

const rfstyle = {
    backgroundColor: `rgb(52, 114, 230)`
}


let empnodeid = 0;
let ceonodeid = 0;
let mannodeid = 0;


const foreignObjectSize = 40;


const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
  };

  function ButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }) {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const [isShown, setIsShown] = useState(true);
    const handleClick = event => {

        setIsShown(current => !current);
      
    }


    const edgePath = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    return (
        <>
        {isShown && (
            <>
            <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
          />
          <foreignObject
            width={foreignObjectSize}
            height={foreignObjectSize}
            x={edgeCenterX - foreignObjectSize / 2}
            y={edgeCenterY - foreignObjectSize / 2}
            className="edgebutton-foreignobject"
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <body onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {isHovering && (
                       <button className="edgebutton" onClick={handleClick} >
                       ×
                     </button>
                    )}
              
            </body>
          </foreignObject>
          </>
           
        )}
          
        </>
      );
    }

let dividceo = 0;   


function TextUpdaterNodeCeo ({data}){

    let imgid = ceonodeid++;
    let divid = dividceo++;
    

        const onChange = useCallback((evt) => {
            console.log(evt.target.value);
        }, []);
    
        const [isHovering, setIsHovering] = useState(false);
    
        const handleMouseOver = () => {
            setIsHovering(true);
        };
    
        const handleMouseOut = () => {
            setIsHovering(false);
        }
    
        const [isHoveringProfilePic, setIsHoveringProfilePic] = useState(false);
        const handleMouseOverProfilePic = () => {
            setIsHoveringProfilePic(true);
        };
    
        const handleMouseOutProfilePic = () => {
            setIsHoveringProfilePic(false);
        }
    
    
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

          /*const [users, setUsers] = useState([]);
          
          const getUsers = async () => {
              const response = await fetch(data1);
              setUsers(await response.json());
           
          }

          useEffect(() => {
              getUsers();
          }, [])*/
    
         
    
          const[showpicker, setShowPicker] = useState(false);
          const [showfontpicker, setShowfontpicker] = useState(false);
          const [showborderpicker, setShowborderpicker] = useState(false);

          const[selectedColor, setSelectedColor] = useState('#96B8F1');
          const[selectedfontColor, setSelectedFontColor] = useState('#000000');
          const[selectedborderColor, setSelectedBorderColor] = useState('#000000');
    
        return(
            <>
            { isShown && (              
                <div className="text-updater-node" style={{backgroundColor: selectedColor, color: selectedfontColor, borderColor: selectedborderColor}} >
                 <Grid container> 
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} style={{justifyContent:'center', alignContent:'center', justifyItems:'center', alignItems:'center'}}>
                    <div className="profile-pic" onMouseOver={handleMouseOverProfilePic} onMouseOut={handleMouseOutProfilePic} style={{borderColor: selectedborderColor}}>
                    <label htmlFor={imgid}>
                            {image.preview ? (
                                <img className='photo' src={image.preview} alt="dummy" />
    
                            ) : (
                                <>
                                    <span>
                                        <FaCamera onClick={handleUpload}/>
                                        <h6>Upload</h6>
                                    </span>
                                </>
                            )}
                        </label>
                        <input 
                           type="file"
                           id={imgid}
                           style={{display:"none"}}
                           onChange={handleChange}
                           />                                
                        
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
                    <input id="text" name="text" placeholder="Name" onChange={onChange} style={{width:110,height:15, textAlign:'center', fontSize:'0.85rem', alignSelf:'left',backgroundColor:`rgba(109, 157, 234,0)`, fontWeight: 'bolder'}}  /> 
    
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <input id="text" name="text" placeholder="Designation" onChange={onChange} style={{width:100, textAlign:'center', fontSize:'0.65rem', alignSelf:'left',backgroundColor:`rgba(109, 157, 234,0)`, borderBottom:'0mm'}}/>
    
                    </Grid>
                    
                     
                     </Grid>
                    
                       
                <Handle type="source" position={Position.Bottom} />
               
            </div>
           
           
    
            )}
    
    </>
            
        )

}


function TextUpdaterNodeMan({data}) {
    let imgid = mannodeid++;
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const [isHoveringProfilePic, setIsHoveringProfilePic] = useState(false);
    const handleMouseOverProfilePic = () => {
        setIsHoveringProfilePic(true);
    };

    const handleMouseOutProfilePic = () => {
        setIsHoveringProfilePic(false);
    }

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

    const[selectedColor, setSelectedColor] = useState('#7DD2D3');
    const[selectedfontColor, setSelectedFontColor] = useState('#000000');
    const[selectedborderColor, setSelectedBorderColor] = useState('#000000');

    return(
        <>
        { isShown && (
            <div className="text-updater-node" style={{backgroundColor: selectedColor, color: selectedfontColor,borderColor: selectedborderColor}}>
            <Handle type="target" position={Position.Top}/>
            <Grid container> 
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} style={{justifyContent:'center', alignContent:'center', justifyItems:'center', alignItems:'center'}}>
                <div className="profile-pic" onMouseOver={handleMouseOverProfilePic} onMouseOut={handleMouseOutProfilePic} style={{borderColor: selectedborderColor}}>
                <label htmlFor={imgid}>
                        {image.preview ? (
                            <img className='photo' src={image.preview} alt="dummy" />

                        ) : (
                            <>
                                <span>
                                    <FaCamera onClick={handleUpload}/>
                                    <h6>Upload</h6>
                                </span>
                            </>
                        )}
                    </label>
                    <input 
                       type="file"
                       id={imgid}
                       style={{display:"none"}}
                       onChange={handleChange}
                       />                                                    
                </div>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <IconButton aria-label="more" id="long-button" aria-controls={open ? 'long-menu' : undefined} aria-expanded={open? 'true':undefined} aria-haspopup="true" onClick={handleMenuOpen}>
                    <MoreVertIcon/>
                    </IconButton>
                    <Menu id="basic-menu" anchorEl={popupMenu} open={open} onClose={handleMenuClose} MenuListProps={{'aria-labelledby': 'long-button'}}>
                            <MenuItem>
                                <ListItemIcon>
                                    &nbsp;
                                    <EmailIcon fontSize='large'/>
                                    &nbsp;
                                    <SendIcon fontSize='large'/> 
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
                <input id="text" name="text" placeholder="Name" onChange={onChange} style={{width:100,height:15, textAlign:'center', fontSize:'0.85rem', alignSelf:'left',backgroundColor:`rgba(125, 210, 211,0)`,fontWeight: 'bolder'}}  /> 

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <input id="text" name="text" placeholder="Designation" onChange={onChange} style={{width:100, textAlign:'center', fontSize:'0.65rem', alignSelf:'left',backgroundColor:`rgba(125, 210, 211,0)`, borderBottom:'0mm'}}/>
                </Grid>
                 </Grid>            
            <Handle type="source" position={Position.Bottom} />
        </div>

        )}
        

        </>
    )
}

function TextUpdaterNodeEmp({data}) {

    const [user,setUser] = useState({
        Person: "",
        Designation: ""
    });

    const {Person, Designation} = user;
    const onInputChange = e => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSaveNode = async e =>{
        e.preventDefault();

        const data1 = {
            Person: user.Person,
            Designation: user.Designation

        }
        /*await axios.post("./data1.json", user)
        alert('Data Inserted')*/
        await axios.post('./data1.json',)
    }

    

    let imgid = empnodeid++;
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    }

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

    const[selectedColor, setSelectedColor] = useState('#EC9AB6');
    const[selectedfontColor, setSelectedFontColor] = useState('#000000');
    const[selectedborderColor, setSelectedBorderColor] = useState('#000000');
    return(
        <>
        { isShown && (
            <div className="text-updater-node" style={{backgroundColor: selectedColor, color: selectedfontColor,borderColor: selectedborderColor}}>
            <Handle type="target" position={Position.Top}/>
            <Grid container> 
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} style={{justifyContent:'center', alignContent:'center', justifyItems:'center', alignItems:'center'}}>
                <div className="profile-pic" style={{borderColor: selectedborderColor}}>
                <label htmlFor={imgid}>
                        {image.preview ? (
                            <img className='photo' src={image.preview} alt="dummy" />

                        ) : (
                            <>
                                <span>
                                    <FaCamera onClick={handleUpload}/>
                                    <h6>Upload</h6>
                                </span>
                            </>
                        )}
                    </label>
                    <input 
                       type="file"
                       id={imgid}
                       style={{display:"none"}}
                       onChange={handleChange}
                       />                                   
                </div>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <IconButton aria-label="more" id="long-button" aria-controls={open ? 'long-menu' : undefined} aria-expanded={open? 'true':undefined} aria-haspopup="true" onClick={handleMenuOpen}>
                    <MoreVertIcon/>
                    </IconButton>
                    <Menu id="basic-menu" anchorEl={popupMenu} open={open} onClose={handleMenuClose} MenuListProps={{'aria-labelledby': 'long-button'}}>
                        <MenuItem>
                                <ListItemIcon>
                                    &nbsp;
                                    <EmailIcon fontSize='large'></EmailIcon>
                                    &nbsp;
                                    <SendIcon fontSize='large'/> 
                                    &nbsp;
                                    <LinkedInIcon fontSize='large'/>
                                    &nbsp;
                                    <PhoneIcon fontSize='large'/>   
                                </ListItemIcon>
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={()=>setShowPicker(showpicker=> !showpicker)}>{showpicker? 'Close colour picker': 'Change Node Colour'}</MenuItem>
                            {
                                showpicker && (
                                        <SketchPicker color={selectedColor} onChangeComplete={color => setSelectedColor(color.hex)} />                           
                                    
                                )
                            }
                            <MenuItem onClick={()=>setShowfontpicker(showfontpicker=> !showfontpicker)}>{showfontpicker? 'Close colour picker': 'Change Text Colour'}</MenuItem>
                            {
                                showfontpicker && (
                                    <SketchPicker color={selectedfontColor} onChangeComplete={fontcolor => setSelectedFontColor(fontcolor.hex)} /> 
                                                                        
                                    
                                )
                            }
                            <MenuItem onClick={()=>setShowborderpicker(showborderpicker => !showborderpicker)}>{showborderpicker? 'Close colour picker': 'Change Border Colour'}</MenuItem>
                            {
                                showborderpicker && (
                                    <SketchPicker color={selectedborderColor} onChangeComplete={bordercolor => setSelectedBorderColor(bordercolor.hex)} /> 
                                                                        
                                    
                                )
                            }
                            <MenuItem onClick={handleSaveNode}>Save Node Data</MenuItem>
                            <MenuItem onClick={handleClick}>Delete Node</MenuItem>
                        </Menu>
                    
                </Grid>
                
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}  justify='center'>
                 <form> 
                <input id="text" name="Person" placeholder="Name" onChange={e => onInputChange(e)} value={Person} style={{width:100,height:15, textAlign:'center', fontSize:'0.85rem', alignSelf:'left',backgroundColor:`rgba(125, 210, 211,0)`,fontWeight: 'bolder'}}  /> 
                </form>  
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}  justify='center'>
                <form>  
                <input id="text" name="Designation" placeholder="Designation" onChange={e => onInputChange(e)} value={Designation}  style={{width:100, textAlign:'center', fontSize:'0.65rem', alignSelf:'left',backgroundColor:`rgba(125, 210, 211,0)`, borderBottom:'0mm'}}/>
                </form>
                </Grid> 
                           
                 </Grid>
        </div>    
        )}

        </>
    )
} 

const nodeTypes = { textUpdaterceo: TextUpdaterNodeCeo, textUpdaterman: TextUpdaterNodeMan,textUpdaterEmp: TextUpdaterNodeEmp};
const edgeTypes = { buttonedge: ButtonEdge};

function Sidebar (){
    
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    
      return (
        <aside style={{width:100, margin: 20}}>
          <div className="dndnode input" style={{width:100, height:70}} onDragStart={(event) => onDragStart(event, 'textUpdaterceo')} draggable>
          </div>
          <div className="dndnode default" style={{width:100, height:70}} onDragStart={(event) => onDragStart(event, 'textUpdaterman')} draggable>
          </div>
          <div className="dndnode output" style={{width:100, height:70}} onDragStart={(event) => onDragStart(event, 'textUpdaterEmp')} draggable>
          </div>
        </aside>
      );
}
const initialNodes = [
  {
    id: '1',
    type: 'textUpdaterceo',
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;




/*const handleSave = (event) => {
    event.preventDefault();
    const data = document.activeElement('a')
    const formJSON = document.getElementById('text').value;
    const jsonData = JSON.stringify(formJSON,null,2);
    const file = new Blob(jsonData, {
        type: 'application/json'
    })
    
    data.href = URL.createObjectURL(file);
    data.download = "data.json";
    document.body.appendChild(data);
    data.click();

    const [user,setUser] = useState({
        name: "",
        designation: ""
    });

    const {name, designation} = user;
    const onInputChange = e => {
        e.preventDefault();
        await axios.post("./data1.json",user);
        alert('Data Inserted');
    }

}*/

const OrgChart = () => {
  const canvasRef = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({...params, type: 'buttonedge'}, eds)), []);
  const flowKey = 'example-flow';
  const onSave = useCallback(() => {
      if(reactFlowInstance) {
          const flow = reactFlowInstance.toObject();
          localforage.setItem(flowKey, flow);
      }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
      const restoreFlow = async () => {
          const flow = await localforage.getItem(flowKey)

          if (flow) {
              setNodes(flow.nodes || []);
              setEdges(flow.edges || []);
          }
      };

      restoreFlow();
  }, [setNodes,setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
        const ceoNode = {
            id: getId(),
            type:'textUpdaterceo',
            position,
           
          };
          const manNode = {
            id: getId(),
            type:'textUpdaterman',
            position        
          };
          const empNode = {
            id: getId(),
            type:'textUpdaterEmp',
            position
          };
          if(type === 'textUpdaterceo')
          {
            setNodes((nds) => nds.concat(ceoNode));
          }
          if(type === 'textUpdaterEmp')
          {
            setNodes((nds) => nds.concat(empNode));
          }
          if(type === 'textUpdaterman')
          {
            setNodes((nds) => nds.concat(manNode));
          }      
    },
  );

  const Convert = () =>{
      const cmpref = useRef();
      const handlePrint = useReactToPrint({
          content: () => cmpref.current,
      })
  }

  return (
    <div style={{width:1500, height:750}}>
    <div className="dndflow" >
    <ReactFlowProvider style={rfstyle}>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            snapToGrid={true}
            style={rfstyle}
            connectionLineType = "step"
            fitView
          >      
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
    </div>
  );
};

export default OrgChart;


