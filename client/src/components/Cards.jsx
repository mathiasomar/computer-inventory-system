import { Typography } from "@mui/material";
import {
    FaClipboardCheck,
    FaExclamationCircle,
    FaList,
    FaScrewdriver,
    FaUsers,
  } from "react-icons/fa";

const Cards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <div className="card">
          <span className="bg-blue-400 p-4 text-white">
            <FaUsers size={70} />
          </span>
          <div className="flex flex-col">
            <Typography variant="h4">20</Typography>
            <Typography variant="body" sx={{ fontSize: "13px", color: "gray" }}>
              Users
            </Typography>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="card">
          <span className="bg-cyan-400 p-4 text-white">
            <FaList size={70} />
          </span>
          <div className="flex flex-col">
            <Typography variant="h4">20</Typography>
            <Typography variant="body" sx={{ fontSize: "13px", color: "gray" }}>
              Devices
            </Typography>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="card">
          <span className="bg-green-400 p-4 text-white">
            <FaClipboardCheck size={70} />
          </span>
          <div className="flex flex-col">
            <Typography variant="h4">20</Typography>
            <Typography variant="body" sx={{ fontSize: "13px", color: "gray" }}>
              Good Condition
            </Typography>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="card">
          <span className="bg-red-400 p-4 text-white">
            <FaExclamationCircle size={70} />
          </span>
          <div className="flex flex-col">
            <Typography variant="h4">20</Typography>
            <Typography variant="body" sx={{ fontSize: "13px", color: "gray" }}>
              Bad Condition
            </Typography>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="card">
          <span className="bg-orange-400 p-4 text-white">
            <FaScrewdriver size={70} />
          </span>
          <div className="flex flex-col">
            <Typography variant="h4">20</Typography>
            <Typography variant="body" sx={{ fontSize: "13px", color: "gray" }}>
              To Upgrade
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
