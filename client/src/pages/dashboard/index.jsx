import { Box } from "@mui/material";
import PageHeader from "../../components/global/PageHeader";
import Cards from "../../components/Cards";

const Dashboard = () => {
  return (
    <Box>
      <PageHeader pageTitle="Dashboard" />

      <Box mt={4}>
        <Cards />
      </Box>
    </Box>
  );
};

export default Dashboard;
