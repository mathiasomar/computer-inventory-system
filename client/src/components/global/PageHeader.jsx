import { Button } from "@mui/material";
// import { Link } from "react-router-dom";

const PageHeader = ({ pageTitle, href, btnText, btnIcon, showBtn }) => {
  return (
    <div className="w-full bg-blue-800/15 py-2 px-2 flex items-center justify-between">
      <h1 className="font-[600] text-lg">{pageTitle}</h1>
      {showBtn && (
        <a href={href}>
          <Button
            variant="contained"
            color="primary"
            startIcon={btnIcon}
            size="medium"
          >
            {btnText}
          </Button>
        </a>
      )}
    </div>
  );
};

export default PageHeader;
