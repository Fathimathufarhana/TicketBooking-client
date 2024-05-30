// import UpcomingEvents from "@/components/events/UpcomingEvents";
import { Box, Grid, Typography } from "@mui/material";
import "../style/style.css"
import Header from "@/components/layout/header/Header";
import CurrentLocation from "@/components/location/Currentlocation";
import Footer from "@/components/layout/footer/Footer";


export default function Home() {
  return (
    <Box>
    <Header/>
    <Grid>
      <Box className="banner"></Box>
    </Grid>

    <Box className='upcoming-events container'>
      <Typography className='section-title'>Upcoming Events</Typography>
      {/* <UpcomingEvents/> */}
    </Box>
<CurrentLocation />
<Footer />
</Box>
  );
}
