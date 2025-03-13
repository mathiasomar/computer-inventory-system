import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white z-50 grid place-items-center">
      <CircularProgress />
    </div>
  );
};

export default Loader;
