import { Box, Chip, } from '@mui/material';
import { useRef, useState, useLayoutEffect } from "react";
import { useSelector } from 'react-redux';
import { editUser } from '../../features/user/userAPI';

export default function ProfileTags({ tags, isMyProfile, graphData, setGraphData, updateTags }) {
  const me = useSelector(state => state.user.user);
  const chipInputRef = useRef(null);
  let [tag, setTag] = useState("yourtag");
  let [chipActive, setChipActive] = useState(false);

  const addTag = (tagElement) => {
    console.log("adding tag = ", tagElement.textContent)
    const tag = tagElement.textContent;
    const editedUser = {
      id: me.id, tags: me.tags + "#" + tag
    };
    editUser(editedUser);
  }

  let deleteTag = (tag) => {
    console.log("deleting tag " + tag)
  }
  useLayoutEffect(() => {
    if (chipInputRef && chipInputRef.current) {
      chipInputRef.current.focus()
    }
  }, [chipInputRef, chipActive]);

  return (
    <Box>
      {
        me.tags.split('#').slice(1).map(tag => {
          return <Chip
            label={"#" + tag}
            variant="outlined"
            onDelete={(isMyProfile) ? () => deleteTag(tag) : () => { }}
            sx={{ margin: 1 }}
          />
        })
      }
      {chipActive &&
        <div style={editChipContainer}>
          <span style={editChipSharp}>#</span>
          <span style={editChipValue} id="editChip"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onChange={(e) => setTag(e.target.value)}
            onBlur={() => {
              setChipActive(false);
              addTag(chipInputRef.current);
            }}
            ref={chipInputRef}
          >{tag}</span>
        </div>
      }
      <span onClick={() => setChipActive(true)}>+</span>
    </Box>
  )
}



const editChipContainer = {
  maxWidth: "100%",
  fontFamily: "Montserrat",
  fontSize: "0.8125rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "32px",
  color: "rgba(0, 0, 0, 0.87)",
  backgroundColor: "rgba(0, 0, 0, 0.08)",
  borderRadius: "16px",
  whiteSpace: "nowrap",
  transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  cursor: "default",
  outline: "0",
  textDecoration: "none",
  border: "0",
  padding: "0",
  verticalAlign: "middle",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "1px solid #bdbdbd",
  margin: "8px",
}

const editChipSharp = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingLeft: "12px",
  whiteSpace: "nowrap",
  border: "0px",
  outline: "0px solid transparent",
}

const editChipValue = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingRight: "12px",
  whiteSpace: "nowrap",
  border: "0px",
  outline: "0px solid transparent",
}
