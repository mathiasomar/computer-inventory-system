import { Alert, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Message = ({ msg }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-2">
      <Collapse in={open}>
        <Alert
          severity="error"
          className="mb-3"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <AiOutlineClose fontSize="inherit" />
            </IconButton>
          }
        >
          {msg}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Message;
