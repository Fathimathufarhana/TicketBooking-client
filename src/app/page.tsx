import { Box, Grid } from "@mui/material";
import "../style/style.css"
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";


export default function Home() {
  return (
    <Box>
      <Header/>
      <Grid>
        <Box className="banner"></Box>
      </Grid>
      <Footer />
    </Box>
  );
}
