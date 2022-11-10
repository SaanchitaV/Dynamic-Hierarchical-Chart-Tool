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
import './styles2.css';
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
  const foreignObjectSize = 40;
  const rfstyle = {
    backgroundColor: `rgb(255, 255, 255)`
}

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


function RelationshipNode(){
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    
    const [isShown, setIsShown] = useState(true)
    const handleClick = event => {

        setIsShown(current => !current);
      
    }

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
            isShown && (
                <div id="relNode" style={{backgroundColor: selectedColor, color: selectedfontColor, borderColor: selectedborderColor}}>
                     <Handle type="source" position={Position.Top} />
                    <Grid container>
                        <Grid item>
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

                        <Grid item>
                            <input type="text" placeholder='Relationship' onChange={onChange} style={{width:100,height:15, textAlign:'center', fontSize:'0.85rem', alignSelf:'left',backgroundColor:`rgba(125, 210, 211,0)`,fontWeight: 'bolder', border:'none'}}></input>
                        </Grid>
                    </Grid>
                    <Handle type="source" position={Position.Bottom} />
                </div>
            )
        }
        </>
    )
}

const nodeTypes = {relnode: RelationshipNode}
const edgeTypes = {edgeone: ButtonEdge}


function Sidebar (){
    
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    
      return (
        <aside style={{width:100, margin: 20}}>
          <div id="rel" style={{width:100, height:70}} onDragStart={(event) => onDragStart(event, 'relnode')} draggable>
          </div>
        </aside>
      );
}


const initialNodes = [
    {
      id: '1',
      type: 'relnode',
      position: { x: 250, y: 5 },
    },
  ];
  
  let id = 0;
  const getId = () => `dndnode_${id++}`;

const ERTool = () => {
    const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({...params, type: 'buttonedge'}, eds)), []);
  const flowKey = 'example-flow';

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
        const relNode = {
            id: getId(),
            type:'relnode',
            position,
           
          };
          
          if(type === 'relnode')
          {
            setNodes((nds) => nds.concat(relNode));
          }
               
    },
  );

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
            style={rfstyle}
            snapToGrid={true}
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

}

export default ERTool;