import { Box, Chip, } from '@mui/material';
import { useRef, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../features/graph/graphSlice';
import { editUser } from '../../features/user/userAPI';
import { setUser } from '../../features/user/userSlice';

export default function ProfileTags({ isMyProfile, }) {
  const me = useSelector(state => state.user.user);
  const user = useSelector(state => state.graph.user);
  const dispatch = useDispatch();
  const chipInputRef = useRef(null);
  let [tag, setTag] = useState("");
  let [chipActive, setChipActive] = useState(false);

  const addTag = (tagElement) => {
    const newTags = me.tags + "#" + tagElement.textContent;
    const editedUser = {
      id: me.id, tags: newTags
    };
    editUser(editedUser);
    dispatch(setUser({ ...me, tags: newTags }));
    dispatch(setCurrentUser({ ...me, tags: newTags }));
  }

  let deleteTag = (tag) => {
    const newTags = me.tags.split('#').filter(value => value !== tag).join('#');
    editUser({ id: me.id, tags: newTags })
    dispatch(setUser({ ...me, tags: newTags }));
  }
  useLayoutEffect(() => {
    if (chipInputRef && chipInputRef.current) {
      chipInputRef.current.focus()
    }
  }, [chipInputRef, chipActive]);

  let tagsElements;
  if (isMyProfile) {
    tagsElements = me.tags.split('#').slice(1).map(tag => {
      return <Chip
        label={"#" + tag}
        variant="outlined"
        onDelete={(isMyProfile) ? () => deleteTag(tag) : () => { }}
        sx={{ margin: 1 }}
      />
    })
  } else {
    tagsElements = user.tags.split('#').slice(1).map(tag => {
      return <Chip
        label={"#" + tag}
        variant="outlined"
        sx={{ margin: 1 }}
      />
    })
  }

  return (
    <Box>
      {tagsElements}
      {chipActive &&
        <div style={editChipContainer}>
          <span style={editChipSharp}>#</span>
          <span style={editChipValue} id="editChip"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onChange={(e) => setTag(e.target.value)}
            onBlur={() => {
              console.log(chipInputRef)
              setChipActive(false);
              addTag(chipInputRef.current);
            }}
            ref={chipInputRef}
          >{tag}</span>
        </div>
      }
      {(isMyProfile) && <span onClick={() => setChipActive(true)}>+</span>}
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
