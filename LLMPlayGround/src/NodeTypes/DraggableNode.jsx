import {useState,useContext} from "react";
import { FiCodepen } from "react-icons/fi";
import { BsInputCursor } from "react-icons/bs";
import { MyTopPanelContext } from "../Partitions/Flow.jsx";
import Tooltip from "@mui/joy/Tooltip";

export const DraggableNode = ({ type,label }) => {
   const {mode}= useContext(MyTopPanelContext);
   const styles=getStyles(mode);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData( "application/reactflow", JSON.stringify(appData) );
    event.dataTransfer.effectAllowed = "move";
  };
  const mapper = { LLM: <FiCodepen  style={styles.icon}/>, TextInput: <BsInputCursor style={styles.icon} /> };

  return (
    <>
      <Tooltip title={label} variant="soft" placement="right-end">
        <div
          style={{ ...styles.container }}
          onDragStart={(event) => {
            onDragStart(event, type);
          }}
          onDragEnd={(event) => (event.target.style.cursor = "grab")}
          onMouseEnter={(event) => {
            event.currentTarget.style.cursor = "grab";
          }}
          draggable
        >
          {mapper[label]}
        </div>
      </Tooltip>
    </>
  );
};
const getStyles = (mode) => ({
  container: {
    width: "60%",
    height: "60px",
    backgroundColor: "white",
    display: "flex",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + (mode ? "black" : "white"),
    boxShadow: "1px 1px  " + (mode ? "black" : "white"),
    margin: "1px",
    borderRadius: "10px 10px",
  },
  icon: {
    width: "20px",
    height: "30px",
  },
});
